import { NextResponse } from "next/server";
import { sendBookingNotification } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

// In-memory limiter — sufficient for a single persistent Node.js process
// (e.g. Hostinger's Node.js app / PM2). Won't hold across multiple instances.
const recentHits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (recentHits.get(ip) ?? []).filter(
    (t) => now - t < WINDOW_MS,
  );
  timestamps.push(now);
  recentHits.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot field — real visitors never see or fill it.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const date = typeof body.date === "string" ? body.date.trim() : "";
  const notes = typeof body.notes === "string" ? body.notes.trim() : "";

  if (!name || !email || !phone || !date || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  try {
    await sendBookingNotification({ name, email, phone, date, notes });
  } catch (error) {
    console.error("[booking] failed to send notification", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
