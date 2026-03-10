import Link from "next/link";
import { CheckCircle2, Clock, Shield, Users } from "lucide-react";

export const metadata = {
  title: "About Us | How We Work",
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
    <div className="min-h-screen overflow-x-hidden bg-[#050505] bg-apex pt-28">
      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]">
          About us
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          We're the team that answers when you need help—HVAC, plumbing, and tech support. No hold music, no runaround.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="card-hover rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition"
            >
              <Icon className="h-8 w-8 text-[#00d4ff]" aria-hidden />
              <h2 className="mt-3 font-bold text-white [font-family:var(--font-outfit)]">{title}</h2>
              <p className="mt-1 text-sm text-zinc-400">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/#estimate"
            className="inline-flex rounded-full bg-[#00d4ff] px-6 py-3 font-semibold text-black transition hover:bg-[#33e0ff] active:scale-95"
          >
            Get your instant quote
          </Link>
        </div>
      </div>
    </div>
  );
}
