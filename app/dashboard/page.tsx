import { getDb } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { MessageSquare, PhoneMissed, Send, ArrowRight, LayoutDashboard } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardOverviewPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">Not authenticated.</p>
      </div>
    );
  }

  const db = getDb();
  let stats = { totalConversations: 0, missedCallCount: 0, openCount: 0 };

  if (db) {
    const businesses = await db<{ id: string }[]>`
      SELECT id FROM businesses WHERE owner_id = ${userId}::text LIMIT 1
    `;
    if (businesses.length > 0) {
      const [counts] = await db<{ total: number; missed: number; open: number }[]>`
        SELECT
          COUNT(*)::int AS total,
          COUNT(*) FILTER (WHERE trigger_source = 'missed_call')::int AS missed,
          COUNT(*) FILTER (WHERE status = 'open')::int AS open
        FROM communications
        WHERE business_id = ${businesses[0].id}
      `;
      if (counts) {
        stats = {
          totalConversations: counts.total,
          missedCallCount: counts.missed,
          openCount: counts.open,
        };
      }
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 lg:px-8 lg:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
            <LayoutDashboard className="h-5 w-5 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold tracking-tight">Overview</h1>
            <p className="text-xs text-zinc-500">Your OmniComm activity at a glance</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10">
              <MessageSquare className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-white">{stats.totalConversations}</p>
              <p className="text-xs text-zinc-500">Total conversations</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
              <PhoneMissed className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-white">{stats.missedCallCount}</p>
              <p className="text-xs text-zinc-500">Missed calls recovered</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <Send className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-white">{stats.openCount}</p>
              <p className="text-xs text-zinc-500">Open threads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-10 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-200">Quick actions</h2>
        <p className="mt-1 text-xs text-zinc-500">Jump to the main areas of your dashboard.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/dashboard/conversations"
            className="inline-flex items-center gap-2 rounded-lg bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.08]"
          >
            <MessageSquare className="h-4 w-4" />
            View conversations
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/dashboard/campaigns"
            className="inline-flex items-center gap-2 rounded-lg bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.08]"
          >
            <Send className="h-4 w-4" />
            Campaigns
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/dashboard/settings"
            className="inline-flex items-center gap-2 rounded-lg bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.08]"
          >
            Settings
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
