import { NextResponse, type NextRequest } from "next/server";
import { EmailNotConfiguredError, sendEmail } from "@/lib/email";
import { SERVICE_FIELDS, validateInquiry, type InquiryType, type InquiryValues } from "@/lib/inquiry";
import { buildInquiryEmail } from "@/lib/inquiryEmail";
import { SITE_URL } from "@/lib/siteUrl";

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
  const { subject, text, html } = buildInquiryEmail({
    type,
    name: values.fullName,
    email: values.email,
    phone: values.phone,
    details: SERVICE_FIELDS[type].map((f) => [f.label, values[f.name] ?? ""]),
    notes: values.notes,
    submittedAt: new Date().toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "medium", timeStyle: "short" }),
    siteUrl: SITE_URL,
  });

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
