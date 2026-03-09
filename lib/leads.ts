import type { FunnelLeadPayload, WidgetLeadPayload } from "@/types/lead";

const PHONE_MIN_DIGITS = 10;
const PHONE_MAX_DIGITS = 15;
const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 200;
const MESSAGE_MAX_LENGTH = 2000;

/**
 * Normalize phone to digits only. Returns empty string if invalid chars.
 */
export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length < PHONE_MIN_DIGITS || digits.length > PHONE_MAX_DIGITS) {
    return "";
  }
  return digits;
}

export function formatPhoneForDisplay(digits: string): string {
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return digits;
}

export function validatePhone(value: string): { ok: boolean; error?: string } {
  const digits = value.replace(/\D/g, "");
  if (digits.length < PHONE_MIN_DIGITS) {
    return { ok: false, error: "Enter a valid 10-digit number." };
  }
  if (digits.length > PHONE_MAX_DIGITS) {
    return { ok: false, error: "Phone number is too long." };
  }
  return { ok: true };
}

export function validateFunnelPayload(
  body: unknown
): { ok: true; data: FunnelLeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid payload." };
  }
  const b = body as Record<string, unknown>;
  if (b.source !== "funnel") {
    return { ok: false, error: "Invalid source." };
  }
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const phoneResult = validatePhone(phone);
  if (!phoneResult.ok) {
    return { ok: false, error: phoneResult.error ?? "Invalid phone." };
  }
  const service = b.service;
  const validServices = ["emergency", "maintenance", "quote", "question"];
  if (typeof service !== "string" || !validServices.includes(service)) {
    return { ok: false, error: "Invalid service." };
  }
  const drill = b.drill ?? null;
  const validDrills = ["asap", "today", "this_week", "small", "medium", "large"];
  if (
    drill !== null &&
    (typeof drill !== "string" || !validDrills.includes(drill))
  ) {
    return { ok: false, error: "Invalid drill." };
  }
  return {
    ok: true,
    data: {
      source: "funnel",
      phone: normalizePhone(phone),
      service: service as FunnelLeadPayload["service"],
      drill: drill as FunnelLeadPayload["drill"],
    },
  };
}

export function validateWidgetPayload(
  body: unknown
): { ok: true; data: WidgetLeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid payload." };
  }
  const b = body as Record<string, unknown>;
  if (b.source !== "widget") {
    return { ok: false, error: "Invalid source." };
  }
  const name = typeof b.name === "string" ? b.name.trim() : "";
  if (name.length < NAME_MIN_LENGTH) {
    return { ok: false, error: "Name is required." };
  }
  if (name.length > NAME_MAX_LENGTH) {
    return { ok: false, error: "Name is too long." };
  }
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const phoneResult = validatePhone(phone);
  if (!phoneResult.ok) {
    return { ok: false, error: phoneResult.error ?? "Invalid phone." };
  }
  const message = typeof b.message === "string" ? b.message.trim() : "";
  if (message.length > MESSAGE_MAX_LENGTH) {
    return { ok: false, error: "Message is too long." };
  }
  return {
    ok: true,
    data: {
      source: "widget",
      name: name.slice(0, NAME_MAX_LENGTH),
      phone: normalizePhone(phone),
      message: message.slice(0, MESSAGE_MAX_LENGTH),
    },
  };
}

/** Sanitize string for logging/storage (no raw HTML). */
export function sanitizeString(s: string): string {
  return s.replace(/[\0<>]/g, "");
}
