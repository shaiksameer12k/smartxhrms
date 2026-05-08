import crypto from "crypto";

export function trigger_pre_onboarding_template(details) {
  let { firstname, lastname, middlename, email } = details;
  let fullName = middlename
    ? `${firstname} ${middlename} ${lastname}`
    : `${firstname} ${lastname}`;
  const tempPassword = crypto.randomBytes(8).toString("base64");

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to the Smart-X</title>
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
                <h1 style="margin:0; font-size:22px;">Welcome Aboard 🎉</h1>
                <p style="margin:5px 0 0; font-size:14px; color:#cbd5e1;">
                  Pre-Onboarding Instructions
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:16px; color:#111827;">

                <p style="font-size:16px;">Hello <strong>${fullName}</strong>,</p>

                <p style="font-size:15px; line-height:1.6;">
                  We’re excited to have you join <strong>Smart-X</strong>. 
                  Your onboarding process has started. Please use the details below to access your employee portal.
                </p>

                <!-- Credentials Box -->
                <table width="100%" cellspacing="0" cellpadding="0" border="0"
                  style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; margin:20px 0;">
                  
                  <tr>
                    <td style="padding:15px; font-size:14px;">
                      <p style="margin:5px 0;"><strong>Email:</strong>${email}</p>
                      <p style="margin:5px 0;"><strong>Temporary Password:</strong>${tempPassword}</p>
                    </td>
                  </tr>

                </table>

             
                <!-- CTA Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:25px 0;">
                  <tr>
                    <td bgcolor="#2563eb" style="border-radius:6px;">
                      <a href="{{Onboarding_Link}}" 
                         style="display:inline-block; padding:12px 22px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold;">
                        Start Onboarding
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="font-size:14px; line-height:1.6;">
                  If you face any issues, please contact HR at 
                  <a href="mailto:hr@smartx.com" style="color:#2563eb;">hr@smartx.com</a>.
                </p>

                <p style="font-size:14px;">Looking forward to having you on the team 🚀</p>

                <p style="margin-top:25px; font-size:14px;">
                  Regards,<br />
                  <strong>Shaik Sameer</strong><br />
                  Smart-X
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
                © 2025 Smart-X. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>`;
}
