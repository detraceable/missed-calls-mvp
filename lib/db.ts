import postgres from "postgres";
import type { LeadPayload } from "@/types/lead";
import { sanitizeString } from "@/lib/leads";

const connectionString = process.env.DATABASE_URL;

let sql: ReturnType<typeof postgres> | null = null;

function getSql() {
  if (!connectionString) return null;
  if (!sql) {
    sql = postgres(connectionString, { max: 1 });
  }
  return sql;
}

/**
 * Creates the leads table if it doesn't exist. Safe to call on every request
 * (we'll call it once per process after first use).
 */
let tableEnsured = false;

export async function ensureLeadsTable(): Promise<void> {
  const db = getSql();
  if (!db) return;
  if (tableEnsured) return;
  await db.unsafe(`
    CREATE TABLE IF NOT EXISTS leads (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      source text NOT NULL,
      phone text NOT NULL,
      name text,
      message text,
      service text,
      drill text,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `);
  tableEnsured = true;
}

/**
 * Inserts a lead into the leads table. Requires DATABASE_URL to be set.
 * Sanitizes string fields before insert. Does nothing if DATABASE_URL is missing.
 */
export async function insertLead(payload: LeadPayload): Promise<void> {
  const db = getSql();
  if (!db) return;
  await ensureLeadsTable();
  const phone = sanitizeString(String(payload.phone));
  if (payload.source === "funnel") {
    await db`
      INSERT INTO leads (source, phone, service, drill)
      VALUES (
        ${payload.source},
        ${phone},
        ${payload.service},
        ${payload.drill ?? null}
      )
    `;
  } else {
    await db`
      INSERT INTO leads (source, phone, name, message)
      VALUES (
        ${payload.source},
        ${phone},
        ${sanitizeString(payload.name)},
        ${payload.message ? sanitizeString(payload.message) : null}
      )
    `;
  }
}

export function getDb() { return getSql(); }

export async function checkRateLimit(ip: string, limit: number, windowMs: number): Promise<boolean> {
  const db = getSql();
  if (!db) return false;
  
  const resetAt = new Date(Date.now() + windowMs);

  try {
    const res = await db`
      INSERT INTO rate_limits (ip_address, request_count, reset_at)
      VALUES (${ip}, 1, ${resetAt})
      ON CONFLICT (ip_address) DO UPDATE SET
        request_count = CASE
          WHEN rate_limits.reset_at < now() THEN 1
          ELSE rate_limits.request_count + 1
        END,
        reset_at = CASE
          WHEN rate_limits.reset_at < now() THEN ${resetAt}
          ELSE rate_limits.reset_at
        END
      RETURNING request_count
    `;
    
    if (res.length > 0 && res[0].request_count > limit) {
      return true;
    }
    return false;
  } catch (err) {
    console.error("[RateLimit] DB error:", err);
    return false; // Fail open
  }
}
