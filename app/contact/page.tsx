import Link from "next/link";
import { MessageSquare, MousePointer2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Contact | Get in Touch",
  description: "Get a free estimate by form or text. We reply within ~3 minutes, 24/7.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] bg-apex pt-28">
      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]">
          Get in touch
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Two ways to reach us—both get a reply within ~3 minutes.
        </p>

        <div className="mt-12 space-y-5">
          <Link
            href="/#estimate"
            className="card-hover flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#00d4ff]/10 text-[#00d4ff]">
              <MousePointer2 className="h-7 w-7" aria-hidden />
            </div>
            <div>
              <h2 className="font-bold text-white [font-family:var(--font-outfit)]">Use the estimate form</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Pick what you need, enter your number—we'll text you back.
              </p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-[#00d4ff]" aria-hidden />
          </Link>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#00d4ff]/10 text-[#00d4ff]">
                <MessageSquare className="h-7 w-7" aria-hidden />
              </div>
              <div>
                <h2 className="font-bold text-white [font-family:var(--font-outfit)]">Text us directly</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Use the floating &ldquo;Text us&rdquo; button at the bottom right. Name, phone, and message—we'll reply fast.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-zinc-600">
          Available 24/7 · Free estimate · No obligation
        </p>
      </div>
    </div>
  );
}
