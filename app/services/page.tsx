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
    description: "Not sure? Tell us what you need and we’ll point you in the right direction.",
    cta: "Describe your project",
  },
];

export const metadata = {
  title: "Services | HVAC, Plumbing, Tech Support",
  description: "HVAC, plumbing, and tech support. Free estimate in 30 seconds. We text you back in minutes.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 bg-mesh pt-24">
      <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What we do
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          One form, one text back. Get a ballpark and next steps for any of these.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, description, cta }) => (
            <Link
              key={title}
              href="/#estimate"
              className="card-hover group rounded-xl border border-white/10 bg-white/5 p-6 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/20 transition group-hover:bg-emerald-500/30">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h2 className="mt-4 font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm text-slate-400">{description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-emerald-400 group-hover:underline">
                {cta} →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-flex rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400 active:scale-95"
          >
            Get your free estimate
          </Link>
        </div>
      </div>
    </div>
  );
}
