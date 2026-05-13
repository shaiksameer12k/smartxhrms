import jwt from "jsonwebtoken";
import { redis } from "../../config/redis.js";

// =====================
// Constants
// =====================
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "5m";
const JWT_REFRESH_IN = process.env.JWT_REFRESH_IN || "7d";
const MIN_SECRET_LENGTH = 32;
const BLACKLIST_PREFIX = "amazon:jwt:blacklist:";

// =====================
// Validate Secret on Startup
// =====================
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env!");
}
if (JWT_SECRET.length < MIN_SECRET_LENGTH) {
  throw new Error(
    `JWT_SECRET too short! Minimum ${MIN_SECRET_LENGTH} characters required`,
  );
}

// =====================
// Generate Access Token
// =====================
export const generate_access_token = (payload) => {
  // Edge Case 1: payload null or undefined
  if (!payload) {
    throw new Error("❌ Payload is required!");
  }

  // Edge Case 2: payload empty object
  if (Object.keys(payload).length === 0) {
    throw new Error("❌ Payload cannot be empty!");
  }

  // Edge Case 3: remove sensitive data from payload
  const { password, otp, card_number, cvv, ...safe_payload } = payload;

  // Edge Case 4: payload too large
  if (JSON.stringify(safe_payload).length > 8000) {
    throw new Error("❌ Payload too large! Max 8KB allowed");
  }

  return jwt.sign(safe_payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: JWT_EXPIRES_IN,
  });
};

// =====================
// Generate Refresh Token
// =====================
export const generate_refresh_token = (payload) => {
  if (!payload) {
    throw new Error("❌ Payload is required!");
  }

  const { password, otp, ...safe_payload } = payload;

  return jwt.sign(safe_payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: JWT_REFRESH_IN,
  });
};

// =====================
// Verify Token
// =====================
export const verify_token = async (token, req) => {
  const request_ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown";

  // Edge Case 1: token null or undefined
  if (!token) {
    return { success: false, message: "Please Login" };
  }

  // Edge Case 2: token empty string
  if (token.trim() === "") {
    return { success: false, message: "❌ Token cannot be empty!" };
  }

  // Edge Case 3: token malformed (must have 3 parts)
  const parts = token.split(".");
  if (parts.length !== 3) {
    return { success: false, message: "❌ Token is malformed!" };
  }

  try {
    // Edge Case 4: check blacklist (logged out tokens)
    const REDIS_JWT_TOKEN_KEY = `smartx:login:jwt:${request_ip}`;
    const stored_access_token = await redis.get(REDIS_JWT_TOKEN_KEY);
    const refreshToken = await req.cookies.refreshtoken;

    console.log("stored_access_token" , stored_access_token)

    if (!stored_access_token) {
      return {
        success: false,
        message: "❌ Session expired! Please login again",
      };
    }

    if (stored_access_token !== token) {
      return res.status(401).json({
        message: "❌ Invalid session! Please login again",
      });
    }

    // Edge Case 5: verify token (handles expired + tampered + wrong secret)
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"], // Edge Case 6: algorithm mismatch
      clockTolerance: 10, // Edge Case 7: 10 sec clock skew tolerance
    });

    return { success: true, data: decoded };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        success: false,
        message: "❌ Token expired! Please login again",
        expired_at: error.expiredAt,
      };
    }

    if (error.name === "JsonWebTokenError") {
      return { success: false, message: "❌ Invalid token!" };
    }

    return { success: false, message: "❌ Token verification failed!" };
  }
};

// =====================
// Extract Token from Header
// =====================
export const extract_token_from_header = (req) => {
  const auth_header = req.headers["authorization"];

  // Edge Case 1: no authorization header
  if (!auth_header) {
    return { success: false, message: "❌ Authorization header is missing!" };
  }

  // Edge Case 2: Bearer prefix missing
  if (!auth_header.startsWith("Bearer ")) {
    return { success: false, message: "❌ Token must start with 'Bearer '!" };
  }

  // Edge Case 3: extra spaces → "Bearer  token"
  const parts = auth_header.trim().split(/\s+/);
  if (parts.length !== 2) {
    return {
      success: false,
      message: "❌ Invalid Authorization header format!",
    };
  }

  const token = parts[1];

  // Edge Case 4: empty token after Bearer
  if (!token || token.trim() === "") {
    return { success: false, message: "❌ Token is missing after Bearer!" };
  }

  return { success: true, token, message: "" };
};

// =====================
// Blacklist Token (Logout)
// =====================
export const blacklist_token = async (token, request_ip) => {
  if (!token) return;

  try {
    const REDIS_JWT_TOKEN_KEY = `smartx:login:jwt:${request_ip}`;
    await redis.del(REDIS_JWT_TOKEN_KEY);
  } catch (error) {
    console.error("Blacklist token error:", error);
  }
};
