import nodemailer from "nodemailer";

interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailPayload) {
  // Check if SMTP environment variables are configured
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    console.warn(
      `⚠️ SMTP is not fully configured (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS are missing). Email notification was skipped.`
    );
    console.log(`[Mock Mail to ${to}] Subject: "${subject}" | Content: "${text}"`);
    return { success: false, error: "SMTP not configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port, 10),
      secure: port === "465", // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"Matrix Tags Alert" <${user}>`,
      to,
      subject,
      text,
      html: html || text.replace(/\n/g, "<br>"),
    });

    console.log(`📧 Email sent successfully: ${info.messageId}`);
    return { success: true };
  } catch (err) {
    console.error("❌ Failed to send email alert:", err);
    return { success: false, error: err };
  }
}
