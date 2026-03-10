import Link from "next/link";
import { CreditCard, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Billing",
  description: "Manage your OmniComm subscription and billing.",
};

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
          <CreditCard className="h-5 w-5 text-[var(--accent)]" />
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold tracking-tight">Billing</h1>
          <p className="text-xs text-zinc-500">Manage your subscription</p>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
        <p className="text-sm text-zinc-400">
          Billing and subscription management are available from Settings. You can update your plan or payment method there.
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
