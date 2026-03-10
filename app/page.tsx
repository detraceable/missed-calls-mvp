"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  PhoneMissed,
  MessageSquareText,
  Bot,
  ArrowRight,
  Check,
  Shield,
  BarChart3,
  Clock,
  Phone,
  Users,
  Star,
  CheckCircle2,
  Wrench
} from "lucide-react";

import { PhoneSimulator } from "@/components/demo/PhoneSimulator";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const STEPS = [
  {
    icon: PhoneMissed,
    tag: "1. The Missed Call",
    title: "You're under a sink. The phone rings.",
    text: "You can't answer. A potential $1,500 job just went to voicemail.",
  },
  {
    icon: MessageSquareText,
    tag: "2. The AI Text-Back",
    title: "We instantly text the caller.",
    text: "Within 5 seconds, our system sends: \"Hey, this is Apex Plumbing. Sorry we missed you! How can we help?\"",
  },
  {
    icon: Bot,
    tag: "3. The Booking",
    title: "AI handles the triage.",
    text: "The caller replies, the AI gets their address and exact issue, and you check your phone to find a warm lead, ready to be scheduled.",
  },
];

const FEATURES = [
  {
    icon: Phone,
    title: "Missed Call Flow",
    text: "Intercept every missed call with an immediate, branded SMS. Be the first to respond.",
  },
  {
    icon: Users,
    title: "Database Reactivation",
    text: "Upload your old customer CSV. Our AI will text them to book seasonal maintenance at scale.",
  },
  {
    icon: Bot,
    title: "AI Receptionist",
    text: "Your AI is trained on your exact prices, dispatch fees, and FAQs. It sounds perfectly human.",
  },
];

const PLAN_FEATURES = [
  "Unlimited AI Missed-Call Texts",
  "Custom AI Personality & Knowledge Base",
  "Dedicated Twilio Phone Number",
  "Dead-Lead Reactivation Campaigns",
  "Zero-Code Dashboard",
  "Priority Email & Chat Support",
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      
      {/* ═══ HERO ═══ */}
      <section className="relative px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8 border-b border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Background Mesh (Light) */}
        <div className="absolute inset-0 bg-space pointer-events-none opacity-40" />

        <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5"
            >
              <Wrench className="h-3.5 w-3.5 text-sky-600" />
              <span className="text-xs font-semibold tracking-wide text-sky-800 uppercase">
                Built for Local Service Businesses
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl [font-family:var(--font-outfit)]"
            >
              Stop letting <br className="hidden lg:block"/>
              <span className="text-sky-600">missed calls</span>
              <br className="hidden lg:block"/> go to competitors.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl lg:mx-0 mx-auto"
            >
              Our AI instantly texts back every missed call, answers their questions, and secures their address while you're focused on the job.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-10 flex flex-col items-center lg:items-start lg:flex-row gap-4"
            >
              <Link
                href="/dashboard/settings"
                className="group inline-flex items-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white px-8 py-4 text-base font-bold shadow-lg shadow-sky-600/20 transition-all duration-300 active:scale-[0.98]"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <div className="flex flex-col items-center lg:items-start text-sm text-slate-500 mt-2 lg:mt-0 lg:ml-4">
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500"/> No credit card required</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500"/> Setup takes 5 minutes</span>
              </div>
            </motion.div>
          </div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.4 }}
             className="flex-1 w-full max-w-[400px] lg:max-w-none relative"
          >
            {/* Soft backdrop glow behind simulator */}
            <div className="absolute top-10 -inset-4 bg-sky-300/30 blur-3xl rounded-full h-[500px]" />
            <PhoneSimulator />
            
            {/* Decorative floaty badge */}
            <div className="absolute -left-12 top-24 bg-white px-4 py-3 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3 animate-bounce" style={{animationDuration: '3s'}}>
               <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                 <Clock className="w-5 h-5 text-emerald-600" />
               </div>
               <div>
                  <p className="text-xs text-slate-500 font-medium">Avg. Response</p>
                  <p className="text-[15px] font-bold text-slate-800">4.7 Seconds</p>
               </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <Section className="relative z-10 border-b border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6">
          <p className="w-full text-center text-sm font-semibold text-slate-400 mb-2 uppercase tracking-widest">Trusted by industry leaders</p>
          {["Plumbing", "HVAC", "Roofing", "Electrical", "Landscaping"].map((v) => (
            <span key={v} className="flex items-center gap-2 text-[17px] font-bold text-slate-300 tracking-tight [font-family:var(--font-outfit)]">
              {v}
            </span>
          ))}
        </motion.div>
      </Section>

      {/* ═══ HOW IT WORKS ═══ */}
      <Section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.15em] text-sky-600">
            How It Works
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl [font-family:var(--font-outfit)]">
            A bulletproof system for lead capture.
          </motion.h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, tag, title, text }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white group relative flex flex-col rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 hover:border-sky-200"
              >
                <div className="flex items-center justify-between mb-6">
                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    Step {i+1}
                  </span>
                </div>
               
                <h3 className="text-xl font-bold tracking-tight text-slate-900 [font-family:var(--font-outfit)]">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FEATURES ═══ */}
      <Section id="features" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl">
          <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.15em] text-emerald-600">
            Capabilities
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl [font-family:var(--font-outfit)]">
            Your 24/7 Digital Dispatcher.
          </motion.h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative flex flex-col p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-[19px] font-bold tracking-tight text-slate-900 [font-family:var(--font-outfit)]">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ PRICING ═══ */}
      <Section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-lg">
          <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.15em] text-sky-600">
            Pricing
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl [font-family:var(--font-outfit)]">
            Cheaper than 1 missed job.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="mt-12 overflow-hidden rounded-[2.5rem] bg-white p-8 sm:p-12 border border-slate-200 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                 <Star className="h-3 w-3 text-emerald-600 fill-emerald-600" />
              </span>
              <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Pro Plan</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-extrabold tracking-tight text-slate-900 [font-family:var(--font-outfit)]">$197</span>
              <span className="text-lg font-medium text-slate-500">/mo</span>
            </div>
            <p className="mt-4 text-[15px] text-slate-600 font-medium">
              Cancel anytime. If you don't book 3 extra jobs in month one, we'll refund you.
            </p>

            <div className="my-8 h-px bg-slate-100" />

            <ul className="space-y-4">
              {PLAN_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] text-slate-700 font-medium">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-500" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/dashboard/settings"
              className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 hover:bg-sky-500 p-4 text-base font-bold text-white shadow-lg shadow-sky-600/20 transition-all duration-300 active:scale-[0.98]"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative z-10 border-t border-slate-200 bg-white px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-space opacity-50" />
        <div className="relative mx-auto max-w-3xl text-center bg-slate-900 rounded-[3rem] p-12 sm:p-20 shadow-2xl flex flex-col items-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl [font-family:var(--font-outfit)] leading-tight">
            Stop losing revenue today.
          </h2>
          <p className="mt-6 text-lg text-slate-300 max-w-xl">
            Every missed call is money bleeding to your local competitors. Set up your AI Dispatcher in under 10 minutes.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto">
            <Link
              href="/dashboard/settings"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-2xl bg-sky-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-sky-400 active:scale-[0.98]"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-2xl bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Play Live Demo
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
