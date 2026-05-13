import {redis} from "../config/redis.js";

const RATE_LIMIT = 3; // max requests
const RATE_LIMIT_TTL = 30; // seconds window

export const ratelimiter_middleware = async (req, res, next) => {
    try {
        const request_ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress || "unknown";

        const request_route = req.path;
        const request_method = req.method;

        const RATE_LIMITER_KEY = `RATE_LIMITER:${request_route}:${request_method}:${request_ip}`;

        const current_count = await redis.get(RATE_LIMITER_KEY);

        if (current_count && parseInt(current_count) >= RATE_LIMIT) {
            const ttl = await redis.ttl(RATE_LIMITER_KEY);
            return res.status(429).json({
                message: `Too many requests! Try after ${ttl} seconds`,
                route: request_route,
                limit: RATE_LIMIT,
                retry_after: ttl,
            });
        }

        if (!current_count) {
            await redis.set(RATE_LIMITER_KEY, 1);
            await redis.expire(RATE_LIMITER_KEY, RATE_LIMIT_TTL);
        } else {
            await redis.incr(RATE_LIMITER_KEY);
        }

        // Add headers so client knows limit status
        res.setHeader("X-RateLimit-Limit", RATE_LIMIT);
        res.setHeader("X-RateLimit-Remaining", RATE_LIMIT - (parseInt(current_count) || 0) - 1);

        return next();
    } catch (error) {
        console.error("Rate limiter error:", error);
        return next();
    }
};
