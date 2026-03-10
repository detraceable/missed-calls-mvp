import { LeadHero } from "@/components/LeadHero";
import { BentoGrid } from "@/components/BentoGrid";
import { FomoToast } from "@/components/FomoToast";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505]">
      <LeadHero />
      <BentoGrid />
      <FomoToast />
    </div>
  );
}
