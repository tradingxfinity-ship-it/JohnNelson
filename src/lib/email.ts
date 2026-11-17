import "server-only";
import nodemailer from "nodemailer";

export const DEFAULT_RECIPIENT = "getitsoldsa@gmail.com";

export type OutgoingEmail = {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
};

export class EmailNotConfiguredError extends Error {}

/**
 * Sends an email using SMTP settings from the environment. Resolves once the
 * provider accepts the message and rejects otherwise.
 *
 * EMAIL_TRANSPORT=log prints the message to the server console instead of
 * sending it. It is for local development only and is ignored in production.
 */
export async function sendEmail(email: OutgoingEmail): Promise<void> {
  const to = process.env.INQUIRY_TO_EMAIL || DEFAULT_RECIPIENT;

  if (process.env.EMAIL_TRANSPORT === "log" && process.env.NODE_ENV !== "production") {
    console.info(`[inquiry email] to=${to} replyTo=${email.replyTo}\nSubject: ${email.subject}\n\n${email.text}`);
    return;
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new EmailNotConfiguredError("SMTP_HOST, SMTP_USER, and SMTP_PASS must be set.");
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const fromAddress = process.env.INQUIRY_FROM_EMAIL || SMTP_USER;
  const info = await transporter.sendMail({
    from: { name: "Get It Sold Realty Website", address: fromAddress },
    to,
    replyTo: email.replyTo,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });

  if (info.rejected.length > 0 || info.accepted.length === 0) {
    throw new Error("Email provider did not accept the message.");
  }
}
