import { LeadHero } from "@/components/LeadHero";
import { HowItWorks } from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 bg-mesh">
      <LeadHero />
      <HowItWorks />
    </div>
  );
}
