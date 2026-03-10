import Link from 'next/link';
import { Send, Upload, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Campaigns',
  description: 'Dead-lead campaigns and bulk SMS.',
};

export default function CampaignsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
          <Send className="h-5 w-5 text-[var(--accent)]" />
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold tracking-tight">Campaigns</h1>
          <p className="text-xs text-zinc-500">Dead-lead revival and bulk outreach</p>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/10">
          <Upload className="h-7 w-7 text-[var(--accent)]" />
        </div>
        <h2 className="mt-5 text-lg font-semibold tracking-tight text-white">Upload a CSV to start</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
          Upload phone numbers and a first message. We&apos;ll create a conversation for each lead and send the opening SMS. Reply handling works like missed calls.
        </p>
        <p className="mt-6 text-xs text-zinc-600">
          Campaign UI coming soon. Use Settings to configure your business in the meantime.
        </p>
        <Link
          href="/dashboard/settings"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)]/10 px-4 py-2.5 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent)]/15"
        >
          Go to Settings
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
