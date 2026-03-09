import { LeadHero } from "@/components/LeadHero";
import { StickySmsWidget } from "@/components/StickySmsWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 bg-mesh">
      <LeadHero />
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-sm text-slate-500">
          Available 24/7 · Licensed & insured · We respond in minutes
        </p>
      </footer>
      <StickySmsWidget />
    </div>
  );
}
