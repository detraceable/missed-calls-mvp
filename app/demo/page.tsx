import { PhoneSimulator } from "@/components/demo/PhoneSimulator";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Live Interactive Demo | OmniComm",
  description: "Test the AI instantly. See how OmniComm works from your customer's perspective without using a real phone.",
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col pt-20">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-space opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-12">
        
        {/* Left Side: Copy */}
        <div className="flex-1 max-w-xl relative z-10">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-sky-700">
              Live Testing Environment
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] [font-family:var(--font-outfit)]">
            Test the AI.<br />
            <span className="text-sky-600">See the magic.</span>
          </h1>
          
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            We've set up a simulated phone for &quot;Apex Plumbing&quot;. Assume you just called them, they didn't answer, and you immediately received this text. 
          </p>
          <p className="mt-4 text-slate-600 font-medium pb-2 border-b border-slate-200">
            Send a message and see how the AI handles it.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              "Ask for a quote on a broken water heater",
              "Tell it you have an emergency leak",
              "Ask what their dispatch fee is",
            ].map((prompt, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-sm text-slate-700 font-medium">Try this: <span className="text-slate-500 font-normal">"{prompt}"</span></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Phone Simulator */}
        <div className="flex-1 w-full max-w-[400px] lg:max-w-none flex justify-center lg:justify-end relative z-10">
          <div className="relative">
            {/* Glow effect behind phone */}
            <div className="absolute -inset-4 bg-sky-400/20 blur-3xl rounded-full" />
            <PhoneSimulator />
          </div>
        </div>

      </div>
    </div>
  );
}
