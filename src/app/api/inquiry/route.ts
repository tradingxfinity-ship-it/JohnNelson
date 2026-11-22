import { NextResponse, type NextRequest } from "next/server";
import { EmailNotConfiguredError, sendEmail } from "@/lib/email";
import {
  FIELD_LABELS,
  INQUIRY_TYPE_LABELS,
  inquiryFieldNames,
  validateInquiry,
  type InquiryType,
  type InquiryValues,
} from "@/lib/inquiry";

export const runtime = "nodejs";

const MIN_FILL_MS = 3_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60_000 };
const MAX_BODY_BYTES = 16_000;

// Best-effort per-instance rate limit. Use a shared store (e.g. Upstash) if you need it across instances.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, message: "That submission is too large." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
  } catch {
    return NextResponse.json({ ok: false, message: "We couldn’t read that submission." }, { status: 400 });
  }

  // Spam checks: a filled honeypot or an instant submission gets a quiet success and no email
  const startedAt = Number(body.startedAt);
  if ((typeof body.website === "string" && body.website.trim() !== "") ||
      !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "We’ve received several inquiries from you in a short time. Please wait a few minutes." },
      { status: 429 },
    );
  }

  const values: InquiryValues = {};
  for (const [k, v] of Object.entries(body)) if (typeof v === "string") values[k] = v.trim();

  const errors = validateInquiry(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors, message: "Please check the highlighted fields." }, { status: 422 });
  }

  const type = values.inquiryType as InquiryType;
  const rows = inquiryFieldNames(type).map((name) => [FIELD_LABELS[name] ?? name, values[name] || "—"] as const);
  const typeLabel = INQUIRY_TYPE_LABELS[type];
  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "medium", timeStyle: "short" });

  const subject = `New ${typeLabel} inquiry from ${values.fullName}`.replace(/[\r\n]+/g, " ");
  const text = [
    `New ${typeLabel.toLowerCase()} inquiry from the Get It Sold Realty website.`,
    "",
    `Inquiry type: ${typeLabel}`,
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Submitted: ${submittedAt} (San Antonio time)`,
    "Reply to this email to respond directly to the visitor.",
  ].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;color:#002868;max-width:600px">
<h2 style="margin:0 0 16px">New ${typeLabel.toLowerCase()} inquiry</h2>
<table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">
<tr><td style="border-bottom:1px solid #E3E7ED;color:#4B5874;width:40%">Inquiry type</td><td style="border-bottom:1px solid #E3E7ED">${typeLabel}</td></tr>
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="border-bottom:1px solid #E3E7ED;color:#4B5874;vertical-align:top">${escapeHtml(label)}</td><td style="border-bottom:1px solid #E3E7ED;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="font-size:13px;color:#4B5874">Submitted ${submittedAt} (San Antonio time). Reply to this email to respond directly to the visitor.</p>
</div>`;

  try {
    await sendEmail({ subject, text, html, replyTo: values.email });
  } catch (err) {
    console.error("[inquiry] email failed:", err instanceof EmailNotConfiguredError ? err.message : err);
    return NextResponse.json(
      { ok: false, message: "Your inquiry wasn’t sent because of a problem on our end." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
