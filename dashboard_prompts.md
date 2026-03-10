# [Prompt 1: For Antigravity Natively] Omni-Comm Dashboard Data Architecture

## Context
Working directory: `/Users/youssef/AutomatedMissedCalls/missed-calls-mvp`
We have an existing Next.js 14 App Router project. The PostgreSQL schema (`businesses`, `communications`), Twilio routing, and Stripe webhooks have already been securely constructed using raw SQL via the `postgres` NPM package in `lib/db.ts` (exporting `getDb()`). The database RLS policies dictate that Server Actions/API routes use the Service Role abstraction (bypassing RLS), so all queries must be explicit.

## Your Task
Your job is strictly to build the Next.js **Server Actions** and **Raw Page Data Boundaries** for the Omni-Comm Dashboard. Do not spend time on complex Tailwind styling or UI polish—focus 100% on bulletproof data fetching, comprehensive TypeScript interfaces, and secure Next.js mutations. You must act as an elite backend-centric full-stack engineer.

## Step 1: Server Actions & Types (`app/actions/settings.ts`)
- Create `types/dashboard.ts`. Export strict TypeScript interfaces for `BusinessRow`, `CommunicationRow`, and `ChatMessage`.
- Create `app/actions/settings.ts`.
- Export an async Server Action: `updateBusinessSettings(businessId: string, isActive: boolean, systemPrompt: string): Promise<{ success: boolean; error?: string }>`.
- **Validation**: Ensure `businessId` is a valid UUID and `systemPrompt` is not empty.
- **Database Execution**: Use `getDb()` to execute a raw parameterized `UPDATE` query on the `businesses` table. Ensure `updated_at` (if exists) is refreshed.
- **Caching**: Wrap in try/catch. On success, call `revalidatePath('/dashboard/settings')` and `revalidatePath('/dashboard/conversations')`.

## Step 2: The Conversations Data Controller (`app/dashboard/conversations/page.tsx`)
- This must be a Server Component.
- **Authentication Bypass (Temp)**: Assume a mock `userBusinessId` for now. Write a query to fetch the *first* `business` in the database to grab an ID to test with. Log a warning in the console that auth is bypassed.
- **Data Fetching**: Fetch all `communications` where `business_id = userBusinessId` ordered by `updated_at` DESC.
- **Type Safety**: Ensure the `message_history` JSONB column is strictly parsed and typed against your `CommunicationRow` interface.
- **Raw Rendering**: Render a raw, unstyled HTML list (`<ul>`) of the communications. For each li, display the customer phone number, trigger source, status, and use `<pre>` to dump the raw JSON of the chat history. *This is just to prove the DB pipes work.*

## Step 3: The Settings Data Controller (`app/dashboard/settings/page.tsx`)
- This must be a Server Component.
- **Data Fetching**: Fetch the `business` record for the mock `userBusinessId`. Hand-handle the 404 case if no business exists.
- **The Mutation Form**: Render a raw HTML `<form>` that uses the `updateBusinessSettings` Server Action from Step 1 via Next.js `action={}` prop.
- Ensure the form `<input type="checkbox" name="isActive">` and `<textarea name="systemPrompt">` are pre-filled with the current values from the database.
- Add a barebones submit button.

## Hard Constraints
- **NO ORMs**: Do NOT use Prisma, TypeORM, or `@supabase/supabase-js`. Strictly use `getDb()` from `lib/db.ts` which utilizes the `postgres` driver.
- **Injection Prevention**: All database pulls and pushes must use parameterized `` db`...` `` queries to prevent SQL injection. Never concatenate strings into SQL.
- **Server-First**: Do not use Client Components (`"use client"`) anywhere in this milestone. Rely entirely on Server Components and Next.js Server Actions.
- **Verification**: You must run `npx tsc --noEmit` locally to verify your TypeScript interfaces against the postgres records before declaring the step complete.

---
---

# [Prompt 2: For Cursor Composer] Premium SaaS UI/UX Polish

## Context
Working directory: `/Users/youssef/AutomatedMissedCalls/missed-calls-mvp`
The backend data plumbing, Next.js Server Actions, and raw data-fetching Pages have just been completely wired up by our backend architect. The raw data flows flawlessly to `app/dashboard/conversations/page.tsx` and the mutations work perfectly in `app/dashboard/settings/page.tsx`.

## Your Task
You are an elite, design-obsessed Frontend Architect known for building the top 1% of SaaS products on ProductHunt. Your job is to take the raw, unstyled data pages and transform them into a **breathtaking, ultra-premium dashboard interface**. 

## Step 1: The Global Dashboard Shell (`app/dashboard/layout.tsx`)
- Implement a sleek, modern sidebar navigation utilizing Tailwind CSS and `lucide-react` icons.
- **Responsiveness**: The sidebar must be fixed on desktop and collapse into a smooth hamburger menu (using Headless UI or Radix primitives if needed) on mobile.
- **Color Aesthetics**: Use a highly curated dark-mode palette. Example: `bg-zinc-950` for the sidebar, 1px subtle borders (`border-white/5` or `border-zinc-800`), and a crisp, deep slate main content area. Avoid "default" Tailwind blues; use curated accents like `indigo-500` or `emerald-500`.
- **Navigation States**: Include links for "Conversations", "Settings", and "Billing". The active route must have a glowing active state or a sleek left-border highlight.

## Step 2: The Conversational Engine (`app/dashboard/conversations/page.tsx`)
This page handles the `communications` array and the `message_history` JSON.
- **Architecture**: Refactor the raw UI into a fluid, two-pane layout (similar to Slack or modern iMessage on Mac). 
  - **Left Pane (30%)**: A scrollable inbox list of customer phone numbers.
  - **Right Pane (70%)**: The active chat theater.
- **The Inbox Component**: Render the phone numbers elegantly. Show the `trigger_source` (e.g., 'Missed Call' vs 'Dead Lead') with distinct, micro-sized SVG icons. Use a beautiful pill badge for `status` (pulsing green dot for 'open', muted gray for 'closed'). Active inbox items should have a `bg-zinc-800/50` hover/active state.
- **The Chat Theater**: Map over the `message_history` JSON.
    - `role: 'user'` bubbles: Right-aligned, colored with a highly vibrant primary brand gradient, white text, subtle drop shadow.
    - `role: 'assistant'` bubbles: Left-aligned, muted `bg-zinc-800`, light text.
- **Motion Polish**: Integrate `framer-motion` (already in `package.json`). When a user clicks a new conversation in the inbox, the chat bubbles should stagger-animate in slightly from the bottom-up.

## Step 3: Settings & Mutations (`app/dashboard/settings/page.tsx`)
- Transform the raw HTML form into a professional "Settings Card" layout with a defined header, descriptive subtext, and visually separated fields.
- **UI Components**:
  - Replace the standard checkbox with a beautiful, custom animated Toggle Switch (using standard Tailwind + React state) for the `is_active` field.
  - Style the `default_system_prompt` as a large, premium textarea utilizing `focus-within:ring-2 focus-within:ring-indigo-500/50` to give it a glowing focus state.
- **Mutation UX**: We are keeping the native Server Action `<form action={...}>`. To make it feel like a SPA, you must create a `"use client"` submit button component that uses `useFormStatus` from `react-dom`. When `pending` is true, the button should disable, reduce opacity, and swap the text to a spinning loader icon.

## Hard Constraints
- **DATA SANCTITY**: DO NOT touch or alter the Server Actions, the raw `getDb()` SQL queries, or the data-fetching boundaries. You are strictly the UI Architect. Do not break the data plumbing!
- **Pure Tailwind**: Achieve all look-and-feel using native Tailwind CSS utility classes. Do not stall out trying to `npm install` massive component libraries like Material UI.
- **Design Philosophy**: Emphasize typography. Use `tracking-tight` for headings, `text-zinc-400` for helper text, and generous spacing (`gap-6`, `p-8`). Make it look expensive.
