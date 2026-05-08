export const welcome_email_template = (details) => {
  console.log("details", details);
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>
  </head>

  <body style="margin:0; padding:0; background-color:#f4f4f4;">
    
    <!-- Wrapper -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" style="padding:20px 0;">

          <!-- Container -->
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" 
                 style="background:#ffffff; border-radius:8px; overflow:hidden; font-family:Arial, sans-serif;">

            <!-- Header -->
            <tr>
              <td style="background:#4f46e5; padding:20px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:24px;">Your Company</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333333;">
                <h2 style="margin-top:0;">Hello 👋</h2>

                <p style="font-size:16px; line-height:1.5;">
                  Welcome to our service! We’re excited to have you on board.
                </p>

                <p style="font-size:16px; line-height:1.5;">
                  This is a sample email template you can customize for:
                  onboarding, notifications, newsletters, or updates.
                </p>

                <!-- Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:20px 0;">
                  <tr>
                    <td bgcolor="#4f46e5" style="border-radius:5px;">
                      <a href="https://example.com" 
                         style="display:inline-block; padding:12px 20px; color:#ffffff; text-decoration:none; font-size:16px;">
                        Get Started
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="font-size:14px; color:#666;">
                  If you didn’t request this email, you can safely ignore it.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f0f0f0; padding:15px; text-align:center; font-size:12px; color:#777;">
                © 2026 Your Company. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>`;
};
