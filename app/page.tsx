"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  PhoneMissed,
  MessageSquareText,
  Bot,
  ArrowRight,
  Check,
  Sparkles,
  Shield,
  BarChart3,
  Clock,
  Phone,
  Users,
  Star,
} from "lucide-react";

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
    tag: "Trigger",
    title: "Customer calls. You miss it.",
    text: "You're on a job, in a meeting, or it's after hours. The call goes unanswered.",
  },
  {
    icon: MessageSquareText,
    tag: "Instant",
    title: "We text them in 5 seconds.",
    text: "Our system auto-sends a personalized SMS: \"Hey, sorry we missed you! How can we help?\"",
  },
  {
    icon: Bot,
    tag: "AI",
    title: "AI handles the conversation.",
    text: "The caller replies, our AI engages them, captures their need, and you get a qualified lead summary.",
  },
];

const FEATURES = [
  {
    icon: Phone,
    title: "Missed Call Text-Back",
    text: "Every unanswered call gets an instant SMS. Convert missed calls into live conversations automatically.",
  },
  {
    icon: Users,
    title: "Dead Lead Revival",
    text: "Upload a CSV of old leads. Our AI re-engages them with personalized outreach at scale.",
  },
  {
    icon: Bot,
    title: "AI Receptionist",
    text: "Your always-on AI rep. It answers, qualifies, and routes — so you never lose a lead to voicemail again.",
  },
];

const PLAN_FEATURES = [
  "Unlimited missed-call text-backs",
  "AI-powered SMS conversations",
  "Dead lead CSV campaigns",
  "Real-time conversation dashboard",
  "Custom AI personality & prompts",
  "Dedicated Twilio phone number",
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)] bg-space">
      {/* ═══ HERO ═══ */}
      <section className="relative px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent-secondary)]" />
            <span className="text-xs font-medium tracking-wide text-slate-300">
              AI-Powered Lead Recovery for Local Businesses
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl [font-family:var(--font-outfit)]"
          >
            Never lose a{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] via-sky-300 to-[var(--accent-secondary)] bg-clip-text text-transparent">
              missed call
            </span>{" "}
            again.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
          >
            When you miss a call, we instantly text the caller back with AI. They reply, the AI
            converses, and you get a qualified lead — all while you&apos;re on the job.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/dashboard/settings"
              className="group inline-flex items-center gap-2 rounded-2xl bg-white/[0.95] px-7 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg shadow-white/10 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-white/15 active:scale-[0.98]"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-slate-300 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
            >
              See Live Demo
            </Link>
          </motion.div>

          {/* Response time badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 inline-flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 backdrop-blur-xl"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent)]/10">
              <Clock className="h-4 w-4 text-[var(--accent)]" />
            </span>
            <span className="text-sm text-slate-400">
              Average text-back time:{" "}
              <span className="font-mono font-semibold text-[var(--accent)]">4.7 seconds</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <Section className="relative z-10 border-y border-white/[0.04] bg-white/[0.01] px-4 py-10 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {["Plumbers", "HVAC Techs", "Dentists", "Roofers", "Electricians", "Landscapers"].map((v) => (
            <span key={v} className="flex items-center gap-2 text-sm text-slate-500">
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]/40" />
              {v}
            </span>
          ))}
        </motion.div>
      </Section>

      {/* ═══ HOW IT WORKS ═══ */}
      <Section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.p variants={fadeUp} className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-secondary)]">
            How it works
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]">
            Three steps. Zero missed revenue.
          </motion.h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, tag, title, text }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass-panel group relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:border-white/[0.12] sm:p-8"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                  {tag}
                </span>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/[0.08] ring-1 ring-[var(--accent)]/10 transition-colors group-hover:bg-[var(--accent)]/[0.12]">
                  <Icon className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <h3 className="mt-5 text-base font-bold tracking-tight text-white [font-family:var(--font-outfit)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FEATURES ═══ */}
      <Section id="features" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.p variants={fadeUp} className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-secondary)]">
            Capabilities
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]">
            One engine. Infinite leverage.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-center text-slate-400">
            Every module runs on the same AI backbone. Activate what you need — no new code, no extra setup.
          </motion.p>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass-panel group relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:border-white/[0.12] sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-secondary)]/[0.08] ring-1 ring-[var(--accent-secondary)]/10 transition-colors group-hover:bg-[var(--accent-secondary)]/[0.12]">
                  <Icon className="h-5 w-5 text-[var(--accent-secondary)]" />
                </div>
                <h3 className="mt-5 text-base font-bold tracking-tight text-white [font-family:var(--font-outfit)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ PRICING ═══ */}
      <Section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <motion.p variants={fadeUp} className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-secondary)]">
            Pricing
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]">
            One plan. Everything included.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="glass-panel mt-12 overflow-hidden rounded-3xl p-8 sm:p-10"
          >
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-extrabold tracking-tight text-white [font-family:var(--font-outfit)]">$197</span>
              <span className="text-lg text-slate-500">/mo</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Cancel anytime. If you don&apos;t book 3 extra jobs in month one, we&apos;ll refund you.
            </p>

            <div className="my-8 h-px bg-white/[0.06]" />

            <ul className="space-y-3.5">
              {PLAN_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/[0.1]">
                    <Check className="h-3 w-3 text-[var(--accent)]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/dashboard/settings"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.95] py-3.5 text-sm font-semibold text-zinc-900 shadow-lg shadow-white/10 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-white/15 active:scale-[0.98]"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <Section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6">
          {[
            { icon: Star, text: "4.9/5 from 50+ businesses" },
            { icon: BarChart3, text: "12,400+ leads recovered" },
            { icon: Shield, text: "99.9% uptime SLA" },
          ].map(({ icon: Icon, text }) => (
            <motion.div
              key={text}
              variants={fadeUp}
              className="flex items-center gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 backdrop-blur-xl"
            >
              <Icon className="h-4 w-4 text-[var(--accent)]" />
              <span className="text-sm text-slate-400">{text}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative z-10 border-t border-white/[0.04] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]">
            Stop losing revenue today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-slate-400">
            Every missed call is money left on the table. Set up in under 10 minutes — no code required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard/settings"
              className="group inline-flex items-center gap-2 rounded-2xl bg-white/[0.95] px-7 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg shadow-white/10 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-white/15 active:scale-[0.98]"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-slate-300 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
            >
              See Live Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
