import nodemailer from "nodemailer";

/**
 * Create a reusable transporter using environment variables.
 * Supports Gmail (and other SMTP providers).
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
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
  // If email credentials are not configured, skip silently
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn(
      "⚠️  Email not configured. Skipping notification. Set EMAIL_USER and EMAIL_PASSWORD in .env",
    );
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  const transporter = createTransporter();

  const mailOptions = {
    from: `"CareerGuideContact" <${fromEmail}>`,
    to: adminEmail,
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
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ Contact notification email sent: ${info.messageId}`);
};

/**
 * Send a confirmation email to the user who submitted the contact form.
 *
 * @param {{ name: string, email: string, subject: string, message: string }} data
 */
export const sendContactConfirmation = async ({
  name,
  email,
  subject,
  message,
}) => {
  // If email credentials are not configured, skip silently
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    return;
  }

  const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  const transporter = createTransporter();

  const mailOptions = {
    from: `"CareerGuideContact" <${fromEmail}>`,
    to: email,
    subject: `✅ We received your message — Career Guide`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 28px 32px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
            .header p { color: #c7d2fe; margin: 6px 0 0; font-size: 14px; }
            .body { padding: 32px; }
            .greeting { font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 12px; }
            .text { font-size: 15px; color: #374151; line-height: 1.7; margin-bottom: 16px; }
            .summary-box { background: #f9fafb; border-left: 4px solid #4f46e5; border-radius: 4px; padding: 16px 20px; margin: 24px 0; }
            .summary-label { font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
            .summary-value { font-size: 14px; color: #111827; margin-bottom: 12px; }
            .summary-value:last-child { margin-bottom: 0; }
            .message-preview { background: #ede9fe; border-radius: 4px; padding: 12px 16px; font-size: 14px; color: #4c1d95; white-space: pre-wrap; line-height: 1.6; }
            .footer { background: #f9fafb; padding: 16px 32px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
            .checkmark { font-size: 48px; display: block; text-align: center; margin-bottom: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="checkmark">✅</span>
              <h1>Message Received!</h1>
              <p>Thank you for reaching out to Career Guide</p>
            </div>
            <div class="body">
              <div class="greeting">Hi ${name},</div>
              <p class="text">
                Thank you for contacting us! We've received your message and our team will get back to you as soon as possible, typically within <strong>1–2 business days</strong>.
              </p>
              <div class="summary-box">
                <div class="summary-label">Your Subject</div>
                <div class="summary-value">${subject}</div>
                <div class="summary-label">Your Message</div>
                <div class="message-preview">${message}</div>
              </div>
              <p class="text">
                If your query is urgent, feel free to reach out to us directly by replying to this email.
              </p>
              <p class="text">
                Warm regards,<br/>
                <strong>The Career Guide Team</strong>
              </p>
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} Career Guide Platform &mdash; This is an automated confirmation email.
            </div>
          </div>
        </body>
      </html>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ Confirmation email sent to user: ${info.messageId}`);
};
