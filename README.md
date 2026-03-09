# Missed Call Rescue — Lead Capture MVP

A high-converting, 24/7 lead-capture page for local service businesses. Captures phone numbers and qualifies leads via an interactive funnel and an SMS-style widget.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s included

- **Hero + funnel**: Multi-step wizard (service type → drill-down → phone capture). Submissions are sent to `POST /api/leads`.
- **SMS widget**: Floating “Text us directly” form (name, phone, message). Same API.
- **API**: `POST /api/leads` validates payloads, rate-limits by IP, saves leads to **Supabase Postgres** when `DATABASE_URL` is set, and optionally forwards to a webhook.
- **Validation**: Client- and server-side (phone length, required fields, max lengths).
- **Loading & errors**: Submit states and error messages with `aria-live` for accessibility.

## Environment

Copy `.env.example` to `.env.local` (or use the existing `.env.local` with your Supabase credentials). **Do not commit `.env.local`** — it contains your database password.

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | **Required for saving leads.** Supabase Postgres connection string (pooler, port 5432). From Supabase → Project Settings → Database → Connection string (URI). |
| `LEADS_WEBHOOK_URL` | Optional. URL that receives each lead as JSON (e.g. Zapier/Make webhook). POST body: `{ source, phone, ... }` plus `_timestamp`. |

The app creates a `leads` table automatically on first insert. View leads in Supabase → Table Editor.

## What you still need to do (MVP → production)

1. **Send SMS**  
   The app does not send SMS. Add a server action or external automation (e.g. Twilio in Zapier/Make) that runs when a new row appears in `leads` and sends the “We’ll text you in 3 minutes” message.

2. **Rate limiting in production**  
   The API uses in-memory rate limiting (per IP). For multiple instances or serverless, use something like Upstash Redis.

3. **Deploy**  
   Deploy to Vercel, set `DATABASE_URL` (and optionally `LEADS_WEBHOOK_URL`) in project env, and point your domain to the app. **Rotate your DB password** if the repo is ever shared or made public.

---

This is a [Next.js](https://nextjs.org) project (App Router, TypeScript, Tailwind, Framer Motion).
