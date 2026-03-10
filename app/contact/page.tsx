import Link from "next/link";
import { MessageSquare, MousePointer2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Contact | Get in Touch",
  description: "Get a free estimate by form or text. We reply within ~3 minutes, 24/7.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 bg-mesh pt-24">
      <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Two ways to reach us—both get a reply within ~3 minutes.
        </p>

        <div className="mt-12 space-y-6">
          <Link
            href="/#estimate"
            className="card-hover flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-6 transition"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <MousePointer2 className="h-7 w-7" aria-hidden />
            </div>
            <div>
              <h2 className="font-semibold text-white">Use the estimate form</h2>
              <p className="mt-1 text-sm text-slate-400">
                Pick what you need, enter your number—we’ll text you back.
              </p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-emerald-400" aria-hidden />
          </Link>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <MessageSquare className="h-7 w-7" aria-hidden />
              </div>
              <div>
                <h2 className="font-semibold text-white">Text us directly</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Use the floating “Text us” button at the bottom right. Name, phone, and message—we’ll reply fast.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Available 24/7 · Free estimate · No obligation
        </p>
      </div>
    </div>
  );
}
