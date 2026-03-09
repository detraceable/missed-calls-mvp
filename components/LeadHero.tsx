import { DynamicFunnel } from "./DynamicFunnel";
import { Shield, Star, Zap } from "lucide-react";

export function LeadHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-slate-950 px-4 py-16 sm:px-6 lg:px-8 bg-mesh">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Copy + trust badges */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h1 className="font-display hero-animate hero-animate-delay-1 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl [font-family:var(--font-syne),system-ui,sans-serif]">
            Stop Losing Jobs to Missed Calls.{" "}
            <span className="bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">
              Get an Instant Estimate 24/7.
            </span>
          </h1>
          <p className="hero-animate hero-animate-delay-2 mt-6 text-lg leading-relaxed text-slate-400 sm:text-xl">
            We know you’re on the job. Tell us what you need below—no forms, no wait. Our lead tech will text you within 3 minutes with a ballpark and next steps.
          </p>
          <div className="hero-animate hero-animate-delay-3 mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-black/5 backdrop-blur-md transition-all hover:border-sky-500/30 hover:bg-white/10 hover:shadow-sky-500/10">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
              5-Star Google Rated
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-black/5 backdrop-blur-md transition-all hover:border-sky-500/30 hover:bg-white/10 hover:shadow-sky-500/10">
              <Shield className="h-4 w-4 text-sky-400" aria-hidden />
              Licensed & Insured
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2.5 text-sm font-medium text-sky-200 shadow-lg shadow-sky-500/10 backdrop-blur-md transition-all hover:border-sky-500/40 hover:bg-sky-500/15">
              <Zap className="h-4 w-4 text-sky-400" aria-hidden />
              Avg Response: 3 mins
            </span>
          </div>
        </div>

        {/* Right: Funnel card */}
        <div className="hero-animate hero-animate-delay-4 flex items-center justify-center">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 shadow-2xl shadow-black/20 sm:p-8 ring-1 ring-white/5">
            <DynamicFunnel />
          </div>
        </div>
      </div>
    </section>
  );
}
