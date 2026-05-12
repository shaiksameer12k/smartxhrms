import { Router } from "express";
import { send_otp, verify_otp } from "./auth.controller.js";

const router = new Router();

router.post("/sendotp", send_otp);
router.post("/verifyotp", verify_otp);

export default router;
