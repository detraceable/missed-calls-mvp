import { NextResponse } from "next/server";
import type { LeadPayload } from "@/types/lead";
import {
  validateFunnelPayload,
  validateWidgetPayload,
  sanitizeString,
} from "@/lib/leads";
import { insertLead } from "@/lib/db";

const WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

// In-memory rate limit by IP (resets on cold start). Replace with Redis/Upstash for production.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIP(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) return false;
  if (now > entry.resetAt) {
    rateLimitMap.delete(ip);
    return false;
  }
  return entry.count >= RATE_LIMIT_MAX;
}

function recordRequest(ip: string): void {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export async function POST(request: Request) {
  const ip = getClientIP(request);
  if (isRateLimited(ip)) {
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
    recordRequest(ip);
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
    recordRequest(ip);
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
