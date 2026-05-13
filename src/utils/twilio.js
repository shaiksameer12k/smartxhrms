import twilio from "twilio";

export const send_custom_sms = async (toContact, channel = "sms", otp) => {
  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_ACCOUNT_TOKEN,
    );

    // Use userName in your custom message 👇
    const message =
      channel === "whatsapp"
        ? `Hi *${"Shaik Sameer"}*! 👋\nYour OTP is *${otp}*.\nValid for 5 minutes. Do not share it with anyone.`
        : `Hi ${"Shaik Sameer"}! Your OTP is ${otp}. Valid for 5 minutes. Do not share it with anyone.`;

    await client.messages.create({
      body: message,
      from: "+919100138472",
      // channel === "whatsapp"
      //   ? `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`
      //   : process.env.TWILIO_PHONE_NUMBER,
      to:
        channel === "whatsapp" ? `whatsapp:+91${toContact}` : `+91${toContact}`,
    });

    return otp;
  } catch (error) {
    console.error("send_custom_sms error:", error.message);
    throw error;
  }
};
