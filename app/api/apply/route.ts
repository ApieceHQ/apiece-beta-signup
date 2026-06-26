import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  email?: unknown;
  urls?: unknown;
  referral?: unknown;
  company?: unknown; // honeypot
};

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: if a bot filled the hidden "company" field, silently accept and drop.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 }
    );
  }

  const urls = Array.isArray(body.urls)
    ? body.urls
        .filter((u): u is string => typeof u === "string")
        .map((u) => u.trim())
        .filter(Boolean)
        .slice(0, 20)
    : [];

  const referral = typeof body.referral === "string" ? body.referral.trim() : "";

  const record = {
    secret: process.env.APPS_SCRIPT_SECRET ?? "",
    timestamp: new Date().toISOString(),
    email,
    urls,
    referral,
  };

  const scriptUrl = process.env.APPS_SCRIPT_URL;

  if (!scriptUrl) {
    // No backend configured. In development, log so the UI flow is testable.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[apply] APPS_SCRIPT_URL not set — logging instead:", record);
      return NextResponse.json({ ok: true });
    }
    console.error("[apply] APPS_SCRIPT_URL is not configured.");
    return NextResponse.json(
      { ok: false, error: "Server is not configured." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      // Apps Script can be slow on cold start; give it room.
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[apply] Apps Script error", res.status, text);
      return NextResponse.json(
        { ok: false, error: "Could not record application." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[apply] Failed to reach Apps Script:", err);
    return NextResponse.json(
      { ok: false, error: "Could not record application." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
