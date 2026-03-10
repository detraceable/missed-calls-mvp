import Link from "next/link";
import { Wrench, Thermometer, Cpu, ClipboardList } from "lucide-react";

const SERVICES = [
  {
    icon: Thermometer,
    title: "HVAC",
    description: "Installation, repair, and maintenance. Heating and cooling, fast.",
    cta: "Get HVAC quote",
  },
  {
    icon: Wrench,
    title: "Plumbing",
    description: "Leaks, clogs, installations. Emergency and scheduled service.",
    cta: "Get plumbing quote",
  },
  {
    icon: Cpu,
    title: "Tech support",
    description: "Setup, troubleshooting, and repairs for home and business.",
    cta: "Get tech support",
  },
  {
    icon: ClipboardList,
    title: "Other projects",
    description: "Not sure? Tell us what you need and we'll point you in the right direction.",
    cta: "Describe your project",
  },
];

export const metadata = {
  title: "Services | HVAC, Plumbing, Tech Support",
  description: "HVAC, plumbing, and tech support. Free estimate in 30 seconds. We text you back in minutes.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] bg-apex pt-28">
      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]">
          What we do
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          One form, one text back. Get a ballpark and next steps for any of these.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, description, cta }) => (
            <Link
              key={title}
              href="/#estimate"
              className="card-hover group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00d4ff]/10 text-[#00d4ff] ring-1 ring-[#00d4ff]/15 transition group-hover:bg-[#00d4ff]/20">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h2 className="mt-4 font-bold text-white [font-family:var(--font-outfit)]">{title}</h2>
              <p className="mt-2 text-sm text-zinc-400">{description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[#00d4ff] group-hover:underline">
                {cta} →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-flex rounded-full bg-[#00d4ff] px-6 py-3 font-semibold text-black transition hover:bg-[#33e0ff] active:scale-95"
          >
            Get your instant quote
          </Link>
        </div>
      </div>
    </div>
  );
}
