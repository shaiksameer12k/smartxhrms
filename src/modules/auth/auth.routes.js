import { Router } from "express";
import { logoutuser, send_otp, verify_otp } from "./auth.controller.js";
import { authjwtmiddleware } from "../../middlewares/jwt/auth_middleware.js";
import jwt from "jsonwebtoken";
import { redis } from "../../config/redis.js";
const router = new Router();

// token

router.post("/logout", authjwtmiddleware, logoutuser);

// POST /auth/refresh-token
router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const request_ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown";

  console.log("refreshToken***", refreshToken);

  try {
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "No refresh token, please login again" });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    console.log("decoded", decoded?.user_name);

    // Check it exists in DB (protects against logout/reuse)
    //     const user = await User.findById(decoded.userId);
    //     if (!user || user.refreshToken !== refreshToken) {
    //         return res.status(403).json({ message: "Invalid refresh token, please login again" });
    //     }

    // Issue brand new access token
    const newAccessToken = jwt.sign(
      { userId: decoded?.user_name },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    console.log("newAccessToken", newAccessToken);

    // Save new access token in Redis
    const REDIS_JWT_TOKEN_KEY = `smartx:login:jwt:${request_ip}`;
    const REDIS_JWT_EXPIRY =
      jwt.decode(newAccessToken).exp - Math.floor(Date.now() / 1000);

    await redis.set(REDIS_JWT_TOKEN_KEY, newAccessToken);
    await redis.expire(REDIS_JWT_TOKEN_KEY, REDIS_JWT_EXPIRY);

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    // Refresh token itself expired → force login
    return res
      .status(403)
      .json({ message: "Session expired, please login again" });
  }
});

router.post("/sendotp", send_otp);
router.post("/verifyotp", verify_otp);

export default router;
