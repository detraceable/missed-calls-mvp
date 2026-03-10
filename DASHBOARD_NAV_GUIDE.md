# Dashboard Tabs & Icons for Future Clients

Recommended sidebar structure for the OmniComm client dashboard. All icons are from **lucide-react** (already in your project).

---

## Core tabs (implement first)

| Tab | Icon | Route | Purpose |
|-----|------|--------|---------|
| **Overview** | `LayoutDashboard` | `/dashboard` | Default landing. Stats cards (missed calls caught, SMS sent, replies this week), mini chart. "At a glance" for busy owners. |
| **Conversations** | `MessageSquare` | `/dashboard/conversations` | Inbox + chat theater. Already built. |
| **Campaigns** | `Send` or `Megaphone` | `/dashboard/campaigns` | Dead-lead CSV upload, fire campaigns, view campaign history. Backend exists (`lib/dead-leads.ts`); add UI when you're ready. |
| **Settings** | `Settings` | `/dashboard/settings` | Business name, forwarding number, AI prompt, service on/off. Already built. |
| **Billing** | `CreditCard` | `/dashboard/billing` | Subscription status, manage payment, invoices. Placeholder page exists; wire to Stripe Customer Portal when ready. |

---

## Optional tabs (add when needed)

| Tab | Icon | Route | Purpose |
|-----|------|--------|---------|
| **Numbers** | `Phone` or `Smartphone` | `/dashboard/numbers` | Manage Twilio number(s), forwarding number. Good if you support multiple numbers per business. |
| **Analytics** | `BarChart3` or `TrendingUp` | `/dashboard/analytics` | Charts over time: missed calls, reply rate, leads by source. |
| **Team** | `Users` | `/dashboard/team` | Invite team members, roles (when you add multi-user). |
| **Integrations** | `Plug` or `Webhook` | `/dashboard/integrations` | Webhooks, Zapier, API keys. |
| **Help** | `HelpCircle` or `BookOpen` | `/dashboard/help` or external link | In-app help or link to docs. |

---

## Icon reference (lucide-react)

```ts
import {
  LayoutDashboard,  // Overview
  MessageSquare,    // Conversations
  Send,             // Campaigns (or Megaphone)
  Settings,         // Settings
  CreditCard,       // Billing
  Phone,            // Numbers
  BarChart3,        // Analytics
  Users,            // Team
  Plug,             // Integrations
  HelpCircle,       // Help
  Menu, X, Zap,     // Already used
} from 'lucide-react';
```

---

## Suggested order in sidebar

1. **Overview** (home)
2. **Conversations**
3. **Campaigns**
4. **Settings**
5. **Billing**

Then, in a "More" or bottom section (optional): Numbers, Analytics, Team, Integrations, Help.

---

## Quick rules

- **Overview** = default route when they hit `/dashboard` (redirect there if you use Overview as home).
- **Conversations** = daily use; keep it near the top.
- **Campaigns** = power feature; same tier as Conversations.
- **Settings** and **Billing** = lower frequency; bottom of main nav is fine.
- Use one icon per tab; same style (outline, 4x4) for consistency.
