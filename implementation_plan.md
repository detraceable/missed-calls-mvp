# Omni-Comm SMS Engine Implementation Plan

## 1. Database Migrations
**File:** `supabase/migrations/20240101000000_core_tables.sql`
- **`businesses` table:** 
  - `id` (uuid PK)
  - `owner_id` (uuid nullable)
  - `name` (text)
  - `twilio_number` (text unique)
  - `forwarding_number` (text)
  - `is_active` (bool default true)
  - `default_system_prompt` (text)
  - `stripe_customer_id` (text nullable)
  - `stripe_subscription_id` (text nullable)
  - `subscription_status` (text default 'trialing')
  - `created_at` (timestamptz)
- **`communications` table:**
  - `id` (uuid PK)
  - `business_id` (FK → businesses ON DELETE CASCADE)
  - `business_phone` (text)
  - `customer_phone` (text)
  - `status` (text default 'open')
  - `trigger_source` (text)
  - `system_prompt` (text)
  - `message_history` (jsonb default '[]')
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz with auto-update trigger)
- **RLS Note:** API routes use service role which bypasses RLS. Policies apply to future anon-key frontend usage.

## 2. Modified Files
- **`lib/db.ts`:** Append `export function getDb() { return getSql(); }`
- **`.env.example`:** Append new variables (listed in Section 4).

## 3. New Files
- **`lib/twilio-client.ts`:** Singleton Twilio client initialized with env vars.
- **`lib/validate-twilio.ts`:** Utility exporting `validateTwilioWebhook` using `twilio.validateRequest`.
- **`lib/stripe-client.ts`:** Singleton Stripe client.
- **`lib/openrouter.ts`:** Utility exporting `getAIReply(messageHistory, systemPrompt)` wrapped in try/catch without throwing.
- **`app/api/twilio/voice/route.ts`:** Validates webhook, looks up `business`, returns TwiML with `<Dial action="...">`.
- **`app/api/twilio/call-status/route.ts`:** Validates webhook, checks `DialCallStatus`, creates `communication` using `postgres.js` `db.json()`, sends first SMS.
- **`app/api/twilio/sms/route.ts`:** Searches for open `communication`, leverages OpenRouter `getAIReply`, updates `message_history`.
- **`app/api/stripe/webhook/route.ts`:** Uses `request.text()` for `stripeClient.webhooks.constructEvent`. Handles `checkout.session.completed`, `customer.subscription.updated`, and `customer.subscription.deleted`.
- **`lib/dead-leads.ts`:** Exports `fireDeadLeadCampaign` to bulk insert leads using SQL transaction and triggers Twilio SMS concurrently.

## 4. Environment Variables
To be appended to `.env.example`:
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PRICE_ID`
- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL` (default: meta-llama/llama-3-8b-instruct)
- `NEXT_PUBLIC_APP_URL`
