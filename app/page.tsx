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
    tag: "Step 1",
    title: "You Miss a Call.",
    text: "You're under a sink or on a roof. A customer calls, but you can't answer.",
  },
  {
    icon: Bot,
    tag: "Step 2",
    title: "AI Texts Them Instantly.",
    text: "Within 4 seconds, our polite AI texts them asking what they need.",
  },
  {
    icon: CheckCircle2,
    tag: "Step 3",
    title: "You Get the Job.",
    text: "The AI answers their questions and collects their info. You check your phone to a warm lead.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-transparent">
      
      {/* ═══ HERO (Apple Aurora + Minimalist) ═══ */}
      <section className="relative px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8 border-b border-white/10 bg-aurora">
        <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl [font-family:var(--font-outfit)]"
            >
              We text your missed <br className="hidden lg:block"/>
              <span className="text-purple-500">calls</span> so you don't <br className="hidden lg:block"/>
              lose the job.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 max-w-2xl text-xl leading-relaxed text-zinc-300 lg:mx-0 mx-auto"
            >
              You're busy. When you miss a call, our AI instantly texts them back to schedule the appointment. Never lose a lead to a competitor again.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-10 flex flex-col items-center lg:items-start lg:flex-row gap-4"
            >
              <Link
                href="/dashboard/settings"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white hover:bg-slate-200 text-zinc-900 px-8 py-4 text-base font-bold shadow-xl transition-all duration-300 active:scale-[0.98] w-full sm:w-auto"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-6 flex flex-col items-center lg:items-start text-sm text-zinc-400 gap-2"
            >
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-zinc-500"/> Setup takes 5 minutes</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-zinc-500"/> No technical skills required</span>
            </motion.div>
          </div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
             className="flex-1 w-full max-w-[400px] lg:max-w-none relative z-20"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/30 blur-[100px] rounded-full -z-10" />
            <PhoneSimulator />
          </motion.div>

        </div>
      </section>

      {/* ═══ HOW IT WORKS (Minimal Layout) ═══ */}
      <Section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 bg-transparent">
        <div className="mx-auto max-w-6xl">
          <motion.h2 variants={fadeUp} className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]">
            How it works in 3 simple steps.
          </motion.h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, tag, title, text }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass-strong card-hover relative flex flex-col rounded-[2rem] p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                   <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-md border border-white/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[13px] font-bold text-zinc-500">
                    {tag}
                  </span>
                </div>
               
                <h3 className="text-xl font-bold tracking-tight text-white [font-family:var(--font-outfit)]">
                  {title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-zinc-400">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ INTERACTIVE DEMO (Minimal) ═══ */}
      <Section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 bg-transparent border-y border-white/5">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]">
            Don't believe us? Try it yourself.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-zinc-400">
             Type "I need a plumber" in the chat box above, or directly play with the simulator on our Demo page.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-8 py-4 text-base font-bold text-white shadow-sm transition-all hover:bg-white/10 hover:border-white/20"
              >
                Play Live Demo
                <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ═══ FLAT PRICING (Glassmorphism) ═══ */}
      <Section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 bg-aurora">
        <div className="mx-auto max-w-lg">
          <motion.h2 variants={fadeUp} className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]">
            One simple price.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="mt-12 overflow-hidden rounded-[2.5rem] glass-strong p-8 sm:p-12"
          >
            <div className="flex items-baseline gap-1 justify-center">
              <span className="text-6xl font-extrabold tracking-tight text-white [font-family:var(--font-outfit)]">$197</span>
              <span className="text-lg font-medium text-zinc-400">/mo</span>
            </div>
            <p className="mt-4 text-center text-base text-zinc-400 font-medium">
              Cancel anytime. No contracts. Unlimited AI usage.
            </p>

            <div className="my-8 h-px bg-white/10" />

            <ul className="space-y-4">
              {["Unlimited AI Text Responses", "Dedicated Twilio Phone Number", "Zero-Code Live Dashboard", "Priority Email Support"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-base text-zinc-200 font-medium justify-center">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-purple-500" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/dashboard/settings"
              className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 hover:bg-purple-500 p-4 text-lg font-bold text-white shadow-lg shadow-purple-600/20 transition-all duration-300 active:scale-[0.98]"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </Section>

    </div>
  );
}
