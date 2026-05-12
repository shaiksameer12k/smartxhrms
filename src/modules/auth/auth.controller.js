import { redis } from "../../config/redis.js";
import { trigger_otp_verification_template } from "../../templates/send_otp_template.js";
import sendMail from "../../utils/mailconfg.js";
import { mailservices_que } from "../../utils/Ques/mailservices_que.js";
import { verifyUserInDB } from "./auth.querys.js";

const generate_otp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const send_otp = async (req, res) => {
  try {
    let project = "amazon";
    let store_data_type = "otp";
    let verification_type = req.body.type;
    let verify_data = req.body.mobile;

    if (!verify_data) {
      return res
        .status(400)
        .json({ message: `${verification_type} is required!` });
    }

    let isUserVerifiedInDB = await verifyUserInDB(verify_data);

    if (isUserVerifiedInDB.length === 0) {
      return res.status(400).json({
        message: `${verify_data} is not registered user, Please Sign Up`,
      });
    }

    let redis_otp_key = `${project}:${store_data_type}:${verification_type}:${verify_data}`;

    const existingOTP = await redis.get(redis_otp_key);

    if (existingOTP) {
      const ttl = await redis.ttl(redis_otp_key);
      return res.status(400).json({
        message: `OTP already sent! Please wait ${ttl} seconds`,
      });
    }

    const otp = generate_otp();

    if (verification_type === "email") {
      mailservices_que(
        sendMail(
          verify_data,
          " OTP Verification",
          trigger_otp_verification_template({
            otp,
            email: verify_data,
            fullName: isUserVerifiedInDB[0]?.user_name,
          }),
        ),
      );
    }

    await redis.set(redis_otp_key, otp);
    await redis.expire(redis_otp_key, 60 * 5);

    console.log(`OTP for ${verify_data}: ${otp}`);

    return res.status(200).json({
      message: "OTP sent successfully!",
      key: redis_otp_key,
      otp: otp,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verify_otp = async (req, res) => {
  try {
    const { key, otp } = req.body;

    if (!key || !otp) {
      return res.status(400).json({ message: "Key and OTP are required!" });
    }

    const savedOTP = await redis.get(key);

    if (!savedOTP) {
      return res
        .status(400)
        .json({ message: "❌ OTP expired! Please request a new OTP" });
    }

    console.log("verify", savedOTP, otp);

    if (savedOTP != otp) {
      return res
        .status(400)
        .json({ message: "❌ Invalid OTP! Please try again" });
    }

    await redis.del(key);

    return res.status(200).json({ message: "✅ OTP verified successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
