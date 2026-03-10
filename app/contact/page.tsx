import Link from "next/link";
import { MessageSquare, MousePointer2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Contact | OmniComm",
  description: "Get a free estimate by form or text. We reply within ~3 minutes, 24/7.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)] bg-space pt-28">
      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-secondary)]">
          Reach out
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]">
          Get in touch
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          Two ways to reach us&mdash;both get a reply within ~3 minutes.
        </p>

        <div className="mt-14 space-y-5">
          <Link
            href="/demo#estimate"
            className="glass-panel group flex items-center gap-4 rounded-2xl p-6 transition-all duration-300 hover:border-white/[0.12]"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)]/[0.08] ring-1 ring-[var(--accent)]/10 transition-colors group-hover:bg-[var(--accent)]/[0.12]">
              <MousePointer2 className="h-6 w-6 text-[var(--accent)]" aria-hidden />
            </div>
            <div>
              <h2 className="font-bold tracking-tight text-white [font-family:var(--font-outfit)]">Use the estimate form</h2>
              <p className="mt-1 text-sm text-slate-400">
                Pick what you need, enter your number&mdash;we&apos;ll text you back.
              </p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-slate-600 transition-colors group-hover:text-[var(--accent)]" aria-hidden />
          </Link>

          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-secondary)]/[0.08] ring-1 ring-[var(--accent-secondary)]/10">
                <MessageSquare className="h-6 w-6 text-[var(--accent-secondary)]" aria-hidden />
              </div>
              <div>
                <h2 className="font-bold tracking-tight text-white [font-family:var(--font-outfit)]">Text us directly</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Use the floating &ldquo;Text us&rdquo; button at the bottom right. Name, phone, and message&mdash;we&apos;ll reply fast.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-slate-600">
          Available 24/7 &middot; Free estimate &middot; No obligation
        </p>
      </div>
    </div>
  );
}
