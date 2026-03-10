import Link from "next/link";
import { CheckCircle2, Clock, Shield, Users } from "lucide-react";

export const metadata = {
  title: "About | OmniComm",
  description: "We're a local team that responds in minutes. Licensed, insured, and trusted by hundreds of homeowners and businesses.",
};

const VALUES = [
  { icon: Clock, title: "Fast response", text: "We text you back within ~3 minutes, 24/7." },
  { icon: Shield, title: "Licensed & insured", text: "Every job is covered and done right." },
  { icon: Users, title: "Local team", text: "Trusted by 500+ homeowners and businesses." },
  { icon: CheckCircle2, title: "No pressure", text: "Free estimate, no obligation to book." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)] bg-space pt-28">
      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-secondary)]">
          Our story
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]">
          About us
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          We&apos;re the team that answers when you need help&mdash;HVAC, plumbing, and tech support. No hold music, no runaround.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="glass-panel group rounded-2xl p-6 transition-all duration-300 hover:border-white/[0.12]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/[0.08] ring-1 ring-[var(--accent)]/10 transition-colors group-hover:bg-[var(--accent)]/[0.12]">
                <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden />
              </div>
              <h2 className="mt-4 font-bold tracking-tight text-white [font-family:var(--font-outfit)]">{title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/demo#estimate"
            className="inline-flex items-center gap-2 rounded-2xl bg-white/[0.9] px-7 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg shadow-white/5 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-white/10 active:scale-[0.98]"
          >
            Get your instant quote
          </Link>
        </div>
      </div>
    </div>
  );
}
