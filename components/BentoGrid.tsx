"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneOff, Smartphone, BotMessageSquare } from "lucide-react";

const STEPS = [
  {
    icon: PhoneOff,
    tag: "Step 1",
    title: "Missed a call?",
    text: "Your customer called but you\u2019re on the job. Instead of losing them, we capture the lead instantly.",
    span: "sm:col-span-2 sm:row-span-1",
  },
  {
    icon: Smartphone,
    tag: "Step 2",
    title: "Enter your number.",
    text: "They drop their mobile in our secure form\u2014it takes 30 seconds, no sign-up.",
    span: "sm:col-span-1 sm:row-span-2",
  },
  {
    icon: BotMessageSquare,
    tag: "Step 3",
    title: "We text back instantly.",
    text: "Our system fires back a text within 3 minutes with a ballpark estimate and next steps. The job is saved.",
    span: "sm:col-span-1 sm:row-span-1",
  },
];

export function BentoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative z-10 overflow-hidden bg-[var(--background)] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-secondary)]"
        >
          How it works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl [font-family:var(--font-outfit)]"
        >
          How we catch your missed cash.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-3 max-w-xl text-center text-slate-500"
        >
          Three steps. Zero missed revenue.
        </motion.p>

        <div className="mt-14 grid gap-5 sm:grid-cols-3 sm:grid-rows-2">
          {STEPS.map(({ icon: Icon, tag, title, text, span }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className={`glass-panel group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-white/[0.12] sm:p-8 ${span}`}
            >
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                  {tag}
                </span>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/[0.08] ring-1 ring-[var(--accent)]/10 transition-colors group-hover:bg-[var(--accent)]/[0.12]">
                  <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-white [font-family:var(--font-outfit)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
