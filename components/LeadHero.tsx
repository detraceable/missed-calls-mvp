import { DynamicFunnel } from "./DynamicFunnel";
import { Shield, Star, Zap } from "lucide-react";

export function LeadHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505] px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-8 bg-apex">
      {/* Background grid texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Copy */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <p className="hero-animate hero-animate-delay-1 inline-flex items-center gap-1.5 self-center text-xs font-semibold uppercase tracking-widest text-[#00d4ff] lg:self-start">
            <Zap className="h-3.5 w-3.5" aria-hidden />
            Instant quote · 24/7
          </p>
          <h1 className="hero-animate hero-animate-delay-1 mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl [font-family:var(--font-outfit)]">
            Stop losing revenue to{" "}
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#0088ff] bg-clip-text text-transparent">
              missed calls.
            </span>
          </h1>
          <p className="hero-animate hero-animate-delay-2 mt-6 max-w-lg text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Turn missed calls into instant quotes. Tell us what you need below—our team will text you within 3 minutes with a ballpark and next steps.
          </p>

          {/* Speed guarantee */}
          <div className="hero-animate hero-animate-delay-3 mt-8 flex items-center gap-3 self-center rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-5 py-3 shadow-lg shadow-[#00d4ff]/10 lg:self-start">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00d4ff]/20">
              <Zap className="h-4 w-4 text-[#00d4ff]" aria-hidden />
            </span>
            <span className="text-sm font-semibold text-white">
              Avg. Response Time:{" "}
              <span className="font-mono text-[#00d4ff]">2m 41s</span>
            </span>
          </div>

          {/* Trust row */}
          <div className="hero-animate hero-animate-delay-3 mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-white">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
              5-star · 500+ locals
            </span>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-white">
              <Shield className="h-3.5 w-3.5 text-[#00d4ff]" aria-hidden />
              Licensed & insured
            </span>
          </div>
        </div>

        {/* Right: Funnel */}
        <div id="estimate" className="hero-animate hero-animate-delay-4 flex scroll-mt-28 items-center justify-center">
          <div className="glass-strong w-full max-w-md rounded-2xl p-6 shadow-2xl shadow-black/40 ring-1 ring-white/5 sm:p-8">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-[#00d4ff]">
              Get your instant quote
            </p>
            <DynamicFunnel />
          </div>
        </div>
      </div>
    </section>
  );
}
