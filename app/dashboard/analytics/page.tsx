import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8 lg:py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
            <BarChart3 className="h-5 w-5 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold tracking-tight">Analytics</h1>
            <p className="text-xs text-zinc-500">View performance and call volume metrics</p>
          </div>
        </div>
      </div>

      <div className="flex h-64 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02]">
        <p className="text-sm text-zinc-500">Analytics dashboard coming soon.</p>
      </div>
    </div>
  );
}
