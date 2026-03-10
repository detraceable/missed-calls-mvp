import { LifeBuoy } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8 lg:py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
            <LifeBuoy className="h-5 w-5 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold tracking-tight">Help & Support</h1>
            <p className="text-xs text-zinc-500">Get assistance and read documentation</p>
          </div>
        </div>
      </div>

      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] gap-4">
        <p className="text-sm text-zinc-500">Need help? Contact our premium support team.</p>
        <a href="mailto:support@omnicomm.com" className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors">
          Email Support
        </a>
      </div>
    </div>
  );
}
