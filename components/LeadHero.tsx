import { DynamicFunnel } from "./DynamicFunnel";
import { Shield, Star, Zap } from "lucide-react";

export function LeadHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--background)] bg-space px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Copy */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <p className="hero-animate hero-animate-delay-1 inline-flex items-center gap-2 self-center rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)] backdrop-blur-xl lg:self-start">
            <Zap className="h-3.5 w-3.5" aria-hidden />
            Instant quote &middot; 24/7
          </p>
          <h1 className="hero-animate hero-animate-delay-1 mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl [font-family:var(--font-outfit)]">
            Stop losing revenue to{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] via-sky-300 to-[var(--accent-secondary)] bg-clip-text text-transparent">
              missed calls.
            </span>
          </h1>
          <p className="hero-animate hero-animate-delay-2 mt-6 max-w-lg text-lg leading-relaxed text-slate-400 sm:text-xl">
            Turn missed calls into instant quotes. Tell us what you need below&mdash;our team will text you with a ballpark and next steps.
          </p>

          {/* Speed guarantee */}
          <div className="hero-animate hero-animate-delay-3 mt-8 inline-flex items-center gap-3 self-center rounded-2xl border border-[var(--accent)]/10 bg-[var(--accent)]/[0.04] px-5 py-3 backdrop-blur-xl lg:self-start">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent)]/10">
              <Zap className="h-4 w-4 text-[var(--accent)]" aria-hidden />
            </span>
            <span className="text-sm text-slate-300">
              Avg. Response Time:{" "}
              <span className="font-mono font-semibold text-[var(--accent)]">2m 41s</span>
            </span>
          </div>

          {/* Trust row */}
          <div className="hero-animate hero-animate-delay-3 mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-slate-300">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
              5-star &middot; 500+ locals
            </span>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-slate-300">
              <Shield className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
              Licensed &amp; insured
            </span>
          </div>
        </div>

        {/* Right: Funnel */}
        <div id="estimate" className="hero-animate hero-animate-delay-4 flex scroll-mt-28 items-center justify-center">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Get your instant quote
            </p>
            <DynamicFunnel />
          </div>
        </div>
      </div>
    </section>
  );
}
