import { LeadHero } from "@/components/LeadHero";
import { BentoGrid } from "@/components/BentoGrid";
import { FomoToast } from "@/components/FomoToast";

export const metadata = {
  title: "Live Demo | OmniComm",
  description: "See how OmniComm works from your customer's perspective. Live demo of the missed-call text-back system.",
};

export default function DemoPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)]">
      <LeadHero />
      <BentoGrid />
      <FomoToast />
    </div>
  );
}
