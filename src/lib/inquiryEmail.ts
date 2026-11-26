/**
 * The email Irma and John receive for each website inquiry. Built with tables
 * and inline styles, since many email apps ignore stylesheets. No imports, so
 * a preview can be rendered outside Next (see README).
 */

export type InquiryEmailInput = {
  type: "buy" | "sell" | "rent";
  name: string;
  email: string;
  phone?: string;
  /** Answers to the form's other questions, as [label, value], in order */
  details: [string, string][];
  notes?: string;
  /** e.g. "Nov 26, 2026, 3:45 PM" in San Antonio time */
  submittedAt: string;
  /** The site's address, for the logo and links */
  siteUrl: string;
};

const BLUE = "#002868";
const RED = "#C80000";
const SLATE = "#4B5874";
const LINE = "#E3E7ED";
const CLOUD = "#F5F6F9";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const HEADLINES = { buy: "wants to buy a home", sell: "wants to sell a home", rent: "is looking for a rental" };
const LABELS = { buy: "Buying inquiry", sell: "Home valuation request", rent: "Rental inquiry" };
const REPLY_SUBJECTS = { buy: "Your home search", sell: "Your home valuation", rent: "Your rental search" };

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Shows 10-digit US numbers as (210) 555-0100 and returns a dialable +1 number. */
function phoneParts(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (digits.length !== 10) return { display: raw, dial: raw.replace(/[^\d+]/g, "") };
  return { display: `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`, dial: `+1${digits}` };
}

function button(href: string, label: string, primary: boolean) {
  const style = primary
    ? `background:${BLUE};color:#ffffff;border:1px solid ${BLUE};`
    : `background:#ffffff;color:${BLUE};border:1px solid ${BLUE};`;
  return `<a href="${esc(href)}" style="${style}display:inline-block;margin:0 6px 8px 0;padding:11px 18px;border-radius:6px;font:600 14px/1 ${FONT};text-decoration:none;white-space:nowrap">${esc(label)}</a>`;
}

export function buildInquiryEmail(input: InquiryEmailInput) {
  const { type, name, email, details, submittedAt, siteUrl } = input;
  const notes = input.notes?.trim() ?? "";
  const phone = input.phone?.trim() ? phoneParts(input.phone.trim()) : null;
  const first = name.split(/\s+/)[0] || name;
  const label = LABELS[type];

  const subject = `New ${label.toLowerCase()} from ${name}`.replace(/[\r\n]+/g, " ");
  const preheader = details.map(([, v]) => v).filter(Boolean).join(" · ");
  const mailto = `mailto:${email}?subject=${encodeURIComponent(`Re: ${REPLY_SUBJECTS[type]}`)}`;

  const rows = [
    ["Email", `<a href="mailto:${esc(email)}" style="color:${BLUE}">${esc(email)}</a>`],
    ...(phone ? [["Phone", `<a href="tel:${esc(phone.dial)}" style="color:${BLUE}">${esc(phone.display)}</a>`]] : []),
    ...details.map(([k, v]) => [esc(k), v ? esc(v) : `<span style="color:${SLATE}">Not given</span>`]),
  ];

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${CLOUD}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CLOUD}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${LINE};border-radius:10px;overflow:hidden">
  <tr><td style="padding:20px 28px;border-bottom:1px solid ${LINE}">
    <img src="${esc(siteUrl)}/images/logo.png" width="88" height="64" alt="Get It Sold Realty" style="display:block;border:0;height:auto">
  </td></tr>
  <tr><td style="background:${BLUE};padding:26px 28px">
    <p style="margin:0 0 8px;font:600 12px/1.4 ${FONT};letter-spacing:.08em;text-transform:uppercase;color:#FF5C5C">New ${esc(label.toLowerCase())}</p>
    <h1 style="margin:0;font:600 24px/1.25 ${FONT};color:#ffffff">${esc(name)} ${HEADLINES[type]}</h1>
  </td></tr>
  <tr><td style="padding:24px 28px 16px">
    ${button(mailto, `Reply to ${first}`, true)}${phone ? button(`tel:${phone.dial}`, `Call ${phone.display}`, false) + button(`sms:${phone.dial}`, "Text", false) : ""}
  </td></tr>
  <tr><td style="padding:0 28px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${LINE}">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:12px 12px 12px 0;border-bottom:1px solid ${LINE};font:14px/1.45 ${FONT};color:${SLATE};width:38%;vertical-align:top">${k}</td><td style="padding:12px 0;border-bottom:1px solid ${LINE};font:500 15px/1.45 ${FONT};color:${BLUE};vertical-align:top">${v}</td></tr>`,
        )
        .join("\n      ")}
    </table>
  </td></tr>
  ${
    notes
      ? `<tr><td style="padding:22px 28px 0">
    <p style="margin:0 0 8px;font:600 13px/1.4 ${FONT};color:${SLATE}">Their message</p>
    <div style="border-left:3px solid ${RED};background:${CLOUD};padding:14px 16px;border-radius:0 6px 6px 0;font:15px/1.55 ${FONT};color:${BLUE};white-space:pre-wrap">${esc(notes)}</div>
  </td></tr>`
      : ""
  }
  <tr><td style="padding:24px 28px 26px">
    <p style="margin:0;font:13px/1.55 ${FONT};color:${SLATE}">Sent from the contact form on your website on ${esc(submittedAt)} (San Antonio time). Hit Reply to answer ${esc(first)} directly.</p>
  </td></tr>
</table>
<p style="margin:16px 0 0;font:12px/1.5 ${FONT};color:${SLATE}">Get It Sold Realty · The Nelson Team</p>
</td></tr></table>
</body></html>`;

  const text = [
    `New ${label.toLowerCase()} from the Get It Sold Realty website`,
    "",
    `${name} ${HEADLINES[type]}.`,
    "",
    `Email: ${email}`,
    ...(phone ? [`Phone: ${phone.display}`] : []),
    ...details.map(([k, v]) => `${k}: ${v || "Not given"}`),
    ...(notes ? ["", "Their message:", notes] : []),
    "",
    `Sent ${submittedAt} (San Antonio time). Reply to this email to answer ${first} directly.`,
  ].join("\n");

  return { subject, html, text };
}
