import express from "express";
import { envconfig } from "./config/env.js";
import { db_connection } from "./config/DB/DB_Connection.js";
import adminRoutes from "./modules/admin/admin.route.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../swagger.js";
import errorMiddleware from "./utils/errormiddleware.js";
import preonboardingRoutes from "./modules/preonboarding/onboarding.route.js";
import {
  mailQue,
  mailservices_que,
  runAndVerifyQue,
} from "./utils/Ques/mailservices_que.js";
import { redis } from "./config/redis.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { ratelimiter_middleware } from "./middlewares/ratelimeter.js";
import {
  generate_access_token,
  verify_token,
} from "./middlewares/jwt/jwt_token.js";
import { authjwtmiddleware } from "./middlewares/jwt/auth_middleware.js";
import cookieParser from "cookie-parser";
import userRoutes from "./modules/users/users.routes.js";

const port = envconfig()?.PORT || 5000;
const app = express();
export const pool = db_connection();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

if (mailQue?.length > 0) {
  runAndVerifyQue();
}

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", preonboardingRoutes);
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  return res.send("Hello Bro");
});

// error middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Successfully Server is Running PORT http://localhost:${port}`);
});
