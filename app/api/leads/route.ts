import { NextResponse } from "next/server";
import type { LeadPayload } from "@/types/lead";
import {
  validateFunnelPayload,
  validateWidgetPayload,
  sanitizeString,
} from "@/lib/leads";
import { insertLead, checkRateLimit } from "@/lib/db";

const WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL;
function getClientIP(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  const ip = getClientIP(request);
  const isLimited = await checkRateLimit(ip, 10, 60_000);
  if (isLimited) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON." },
      { status: 400 }
    );
  }

  const source = body && typeof body === "object" && "source" in body ? (body as { source: string }).source : null;

  if (source === "funnel") {
    const result = validateFunnelPayload(body);
    if (!result.ok) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    const data = result.data;
    try {
      await insertLead(data);
    } catch (err) {
      console.error("[leads] DB insert failed:", err);
      return NextResponse.json(
        { success: false, error: "Failed to save lead. Please try again." },
        { status: 500 }
      );
    }
    await sendWebhookAndLog(data);
    return NextResponse.json({ success: true });
  }

  if (source === "widget") {
    const result = validateWidgetPayload(body);
    if (!result.ok) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    const data = result.data;
    try {
      await insertLead(data);
    } catch (err) {
      console.error("[leads] DB insert failed:", err);
      return NextResponse.json(
        { success: false, error: "Failed to save lead. Please try again." },
        { status: 500 }
      );
    }
    await sendWebhookAndLog(data);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, error: "Unknown lead source." },
    { status: 400 }
  );
}

async function sendWebhookAndLog(payload: LeadPayload): Promise<void> {
  const record = {
    ...payload,
    phone: sanitizeString(String(payload.phone)),
    ...(payload.source === "widget" && {
      name: sanitizeString(payload.name),
      message: sanitizeString(payload.message),
    }),
    _timestamp: new Date().toISOString(),
  };

  if (WEBHOOK_URL) {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        console.error("[leads] Webhook failed:", res.status, await res.text());
      }
    } catch (err) {
      console.error("[leads] Webhook error:", err);
    }
  }

  // Log in dev so you can see leads in the terminal.
  if (process.env.NODE_ENV !== "production") {
    console.log("[leads] New lead:", JSON.stringify(record, null, 2));
  }
}
