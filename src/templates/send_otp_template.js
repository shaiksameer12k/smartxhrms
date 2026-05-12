import crypto from "crypto";

export function trigger_otp_verification_template({ otp, email, fullName }) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification - Smart-X</title>
  </head>

  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">

    <!-- Wrapper -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" style="padding:30px 10px;">

          <!-- Container -->
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
            style="background:#ffffff; border-radius:10px; overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="background:#111827; padding:25px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:22px;">OTP Verification 🔐</h1>
                <p style="margin:5px 0 0; font-size:14px; color:#cbd5e1;">
                  Verify your identity to continue
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#111827;">

                <p style="font-size:16px;">Hello <strong>${fullName}</strong>,</p>

                <p style="font-size:15px; line-height:1.6;">
                  We received a request to verify your email address <strong>${email}</strong>.
                  Use the OTP below to complete your verification.
                </p>

                <!-- OTP Box -->
                <table width="100%" cellspacing="0" cellpadding="0" border="0"
                  style="margin:25px 0;">
                  <tr>
                    <td align="center">
                      <table cellspacing="0" cellpadding="0" border="0"
                        style="background:#f0f4ff; border:2px dashed #2563eb; border-radius:12px; padding:20px 40px;">
                        <tr>
                          <td align="center">
                            <p style="margin:0; font-size:13px; color:#6b7280; letter-spacing:1px;">
                              YOUR ONE TIME PASSWORD
                            </p>
                            <p style="margin:10px 0 0; font-size:42px; font-weight:bold; 
                                       color:#2563eb; letter-spacing:10px;">
                              ${otp}
                            </p>
                            <p style="margin:8px 0 0; font-size:12px; color:#ef4444;">
                              ⏱ Expires in 5 minutes
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Divider -->
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="border-top:1px solid #e5e7eb; padding:15px 0; text-align:center; 
                                font-size:13px; color:#6b7280;">
                      OR click the button below to verify directly
                    </td>
                  </tr>
                </table>

                <!-- CTA Verify Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" 
                  style="margin:10px auto 25px; display:block; text-align:center;">
                  <tr>
                    <td align="center" bgcolor="#2563eb" 
                      style="border-radius:8px; padding:0;">
                      <a href="{{Verification_Link}}?otp=${otp}&email=${email}"
                         style="display:inline-block; padding:14px 35px; color:#ffffff; 
                                text-decoration:none; font-size:15px; font-weight:bold;
                                letter-spacing:0.5px;">
                        ✅ Verify My Account
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Warning Box -->
                <table width="100%" cellspacing="0" cellpadding="0" border="0"
                  style="background:#fff7ed; border:1px solid #fed7aa; 
                         border-radius:8px; margin:20px 0;">
                  <tr>
                    <td style="padding:15px; font-size:13px; color:#92400e;">
                      <p style="margin:0;">⚠️ <strong>Security Notice:</strong></p>
                      <p style="margin:8px 0 0;">
                        Never share this OTP with anyone. Smart-X will never ask for your OTP 
                        over phone or email. If you did not request this, please ignore this email 
                        or contact us immediately at 
                        <a href="mailto:hr@smartx.com" style="color:#2563eb;">hr@smartx.com</a>
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="font-size:14px; line-height:1.6; color:#6b7280;">
                  This OTP is valid for <strong>5 minutes</strong> only. 
                  After expiry, please request a new OTP.
                </p>

                <p style="margin-top:25px; font-size:14px;">
                  Regards,<br />
                  <strong>Shaik Sameer</strong><br />
                  Smart-X
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f3f4f6; padding:15px; text-align:center; 
                         font-size:12px; color:#6b7280;">
                © 2025 Smart-X. All rights reserved. &nbsp;|&nbsp;
                <a href="mailto:hr@smartx.com" style="color:#6b7280;">hr@smartx.com</a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

  </body>
</html>`;
}
