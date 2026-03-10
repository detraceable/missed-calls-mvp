"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MousePointer2, Phone, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: MousePointer2,
    title: "Pick what you need",
    text: "Emergency repair, maintenance, or a quote—choose in one tap.",
  },
  {
    icon: Phone,
    title: "Enter your number",
    text: "Just your mobile number. No long forms or sign-up.",
  },
  {
    icon: MessageSquare,
    title: "We text you back",
    text: "Our team replies within ~3 minutes with a ballpark and next steps.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="border-t border-white/5 bg-slate-950/50 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          How it works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mx-auto mt-2 max-w-xl text-center text-slate-400"
        >
          Three steps to a free estimate. No hassle.
        </motion.p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/20 transition hover:bg-emerald-500/30">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <p className="mt-4 font-semibold text-white">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {text}
              </p>
              {i < steps.length - 1 && (
                <span
                  className="absolute -right-4 top-6 hidden text-slate-600 sm:block"
                  aria-hidden
                >
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
