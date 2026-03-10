import { DynamicFunnel } from "./DynamicFunnel";
import { Shield, Star, Clock } from "lucide-react";

const AVATAR_COLORS = [
  "bg-amber-500",
  "bg-emerald-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-rose-500",
];

export function LeadHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-slate-950 px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:py-16 lg:px-8 bg-mesh">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: Copy + trust */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <p className="hero-animate hero-animate-delay-1 text-sm font-medium uppercase tracking-wider text-emerald-400">
            Free estimate · No obligation
          </p>
          <h1 className="font-display hero-animate hero-animate-delay-1 mt-2 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl [font-family:var(--font-syne),system-ui,sans-serif]">
            Stop losing jobs to missed calls.{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              Get a quote in 30 seconds.
            </span>
          </h1>
          <p className="hero-animate hero-animate-delay-2 mt-5 max-w-lg text-lg leading-relaxed text-slate-400 sm:text-xl">
            No forms, no hold music. Tell us what you need below—we’ll text you within 3 minutes with a ballpark and next steps.
          </p>
          <div className="hero-animate hero-animate-delay-3 mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="glass-badge inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 text-sm font-medium text-white shadow-lg">
              <Clock className="h-4 w-4 text-emerald-400" aria-hidden />
              Reply in ~3 min
            </span>
            <span className="glass-badge relative inline-flex items-center gap-2 rounded-full pl-2 pr-3.5 py-2.5 text-sm font-medium text-white shadow-lg">
              <span className="flex -space-x-2">
                {AVATAR_COLORS.map((bg, i) => (
                  <span
                    key={i}
                    className={`inline-block h-6 w-6 rounded-full border-2 border-slate-900 ${bg}`}
                    aria-hidden
                  />
                ))}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                5-star
              </span>
              <span className="text-slate-400">·</span>
              <span>Trusted by 500+ locals</span>
            </span>
            <span className="glass-badge inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 text-sm font-medium text-white shadow-lg">
              <Shield className="h-4 w-4 text-emerald-400" aria-hidden />
              Licensed & insured
            </span>
          </div>
          <p className="hero-animate hero-animate-delay-3 mt-6 text-sm text-slate-500">
            HVAC, plumbing, tech support. We’re here 24/7.
          </p>
        </div>

        {/* Right: Funnel card - enhanced glass */}
        <div id="estimate" className="hero-animate hero-animate-delay-4 flex scroll-mt-24 items-center justify-center sm:scroll-mt-28">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 shadow-2xl shadow-black/25 ring-1 ring-white/5 sm:p-8">
            <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-emerald-400">
              Get your free estimate
            </p>
            <DynamicFunnel />
          </div>
        </div>
      </div>
    </section>
  );
}
