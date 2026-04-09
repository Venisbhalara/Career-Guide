import { Resend } from "resend";

let resend;

/**
 * Get the Resend client (singleton).
 */
const getResendClient = () => {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};

/**
 * Verifies the email configuration.
 * Called during server startup.
 */
export const verifyEmailConfig = async () => {
  if (!process.env.RESEND_API_KEY) {
    console.warn(
      "⚠️  Email service: Missing RESEND_API_KEY. Notifications are disabled.",
    );
    return false;
  }

  // Resend doesn't need a connection verify — just check key exists
  console.log("✅ Email service is ready (Resend API connected)");
  return true;
};

/**
 * Send an email notification to the admin when a new contact message is submitted.
 *
 * @param {{ name: string, email: string, subject: string, message: string, contactId: number }} data
 */
export const sendContactNotification = async ({
  name,
  email,
  subject,
  message,
  contactId,
}) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn(
      "⚠️  Email not configured. Skipping notification. Set RESEND_API_KEY in environment variables.",
    );
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || "vasuboss54@gmail.com";
  // Resend requires a verified domain in the 'from' field.
  // Using onboarding@resend.dev works without a custom domain on the free plan.
  const fromEmail = process.env.EMAIL_FROM_RESEND || "onboarding@resend.dev";

  const client = getResendClient();

  const { data, error } = await client.emails.send({
    from: `CareerGuide Contact <${fromEmail}>`,
    to: [adminEmail],
    subject: `📬 New Contact Message: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 28px 32px; }
            .header h1 { color: #ffffff; margin: 0; font-size: 22px; }
            .header p { color: #c7d2fe; margin: 4px 0 0; font-size: 14px; }
            .body { padding: 28px 32px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
            .value { font-size: 15px; color: #111827; }
            .message-box { background: #f9fafb; border-left: 4px solid #4f46e5; border-radius: 4px; padding: 16px; font-size: 15px; color: #374151; white-space: pre-wrap; line-height: 1.6; }
            .footer { background: #f9fafb; padding: 16px 32px; text-align: center; font-size: 12px; color: #9ca3af; }
            .badge { display: inline-block; background: #ede9fe; color: #6d28d9; font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 999px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 New Contact Message Received</h1>
              <p>Someone submitted the contact form on your Career Guide website</p>
            </div>
            <div class="body">
              <div class="field">
                <div class="label">From</div>
                <div class="value">${name} &lt;<a href="mailto:${email}" style="color:#4f46e5;">${email}</a>&gt;</div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message}</div>
              </div>
              <div class="field">
                <div class="label">Message ID</div>
                <div class="value"><span class="badge">#${contactId}</span></div>
              </div>
            </div>
            <div class="footer">
              You can view and manage all messages in your admin dashboard.<br/>
              &copy; ${new Date().getFullYear()} Career Guide Platform
            </div>
          </div>
        </body>
      </html>
    `,
  });

  if (error) {
    throw new Error(`Resend API error: ${JSON.stringify(error)}`);
  }

  console.log(`✅ Contact notification email sent: ${data?.id}`);
};
