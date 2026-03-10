"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  ClipboardList,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { formatPhoneInput } from "@/lib/leads";

type Step = "choice" | "drill" | "capture" | "success";
type ServiceChoice = "emergency" | "maintenance" | "quote" | "question" | null;
type DrillOption = "asap" | "today" | "this_week" | "small" | "medium" | "large" | null;

const slide = {
  enter: (dir: number) => ({ x: dir * 50, opacity: 0, filter: "blur(6px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({ x: dir * -50, opacity: 0, filter: "blur(6px)" }),
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function getStepIndex(step: Step): number {
  if (step === "choice") return 1;
  if (step === "drill") return 2;
  return 3;
}

const COUNTDOWN_SECONDS = 3 * 60;

const CHOICES = [
  { id: "emergency" as const, label: "Emergency Repair", icon: AlertCircle },
  { id: "maintenance" as const, label: "Maintenance", icon: Wrench },
  { id: "quote" as const, label: "Get a Quote", icon: ClipboardList },
  { id: "question" as const, label: "Quick Question", icon: MessageCircle },
];

export function DynamicFunnel() {
  const [step, setStep] = useState<Step>("choice");
  const [direction, setDirection] = useState(1);
  const [service, setService] = useState<ServiceChoice>(null);
  const [drill, setDrill] = useState<DrillOption>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);

  const goTo = (next: Step, dir: number = 1) => {
    setDirection(dir);
    setStep(next);
    if (next === "success") setCountdown(COUNTDOWN_SECONDS);
  };

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const t = setInterval(() => setCountdown((c) => (c != null && c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const handleService = (value: ServiceChoice) => {
    setService(value);
    goTo(value === "question" ? "capture" : "drill");
  };

  const handleDrill = (value: DrillOption) => {
    setDrill(value);
    goTo("capture");
  };

  const handlePhoneChange = (raw: string) => {
    setPhone(formatPhoneInput(raw));
    setPhoneError("");
  };

  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length === 10;

  const handleCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneDigits.length < 10) {
      setPhoneError("Enter a valid 10-digit number.");
      return;
    }
    setPhoneError("");
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "funnel",
          phone: phoneDigits,
          service: service ?? "question",
          drill: drill ?? null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data?.error ?? "Something went wrong. Try again.");
        return;
      }
      goTo("success");
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const back = () => {
    if (step === "drill") {
      setDrill(null);
      goTo("choice", -1);
    } else if (step === "capture") {
      if (service === "question") goTo("choice", -1);
      else goTo("drill", -1);
      setPhone("");
      setPhoneError("");
      setSubmitError("");
    }
  };

  const isSizeDrill = service === "maintenance" || service === "quote";
  const stepIndex = getStepIndex(step);

  const fmtCountdown = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative min-h-[340px]">
      {/* Progress */}
      {step !== "success" && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-500">
              {step === "choice" ? "Step 1 of 3" : step === "drill" ? "Step 2 of 3" : "Step 3 of 3"}
            </span>
            <span className="font-mono text-[var(--accent)]">{stepIndex}/3</span>
          </div>
          <div className="progress-track mt-2 h-[3px] w-full">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
              initial={false}
              animate={{ width: `${(stepIndex / 3) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        {/* ─── Step 1: Choose service ─── */}
        {step === "choice" && (
          <motion.div
            key="choice"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-5"
          >
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white [font-family:var(--font-outfit)]">
                What do you need help with?
              </h2>
              <p className="mt-1 text-sm text-slate-500">Takes about 30 seconds.</p>
            </div>
            <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 gap-3">
              {CHOICES.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  variants={fadeUp}
                  type="button"
                  onClick={() => handleService(id)}
                  className="touch-target group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-white transition-all duration-200 hover:border-white/[0.1] hover:bg-white/[0.04] active:scale-[0.97] sm:min-h-0"
                >
                  <span className="rounded-xl bg-[var(--accent)]/[0.08] p-2.5 ring-1 ring-[var(--accent)]/10 transition-colors group-hover:bg-[var(--accent)]/[0.12]">
                    <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden />
                  </span>
                  <span className="text-center text-sm font-medium">{label}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* ─── Step 2: Drill-down ─── */}
        {step === "drill" && (
          <motion.div
            key="drill"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-5"
          >
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
            <h2 className="text-lg font-bold tracking-tight text-white [font-family:var(--font-outfit)]">
              {isSizeDrill ? "How big is the project?" : "When do you need us?"}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {isSizeDrill
                ? (["small", "medium", "large"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleDrill(s)}
                      className="touch-target rounded-2xl border border-white/[0.06] bg-white/[0.02] py-3.5 text-sm font-medium capitalize text-white transition-all duration-200 hover:border-white/[0.1] hover:bg-white/[0.04] active:scale-[0.97] sm:min-h-0"
                    >
                      {s}
                    </button>
                  ))
                : ([
                    { id: "asap" as const, label: "ASAP" },
                    { id: "today" as const, label: "Today" },
                    { id: "this_week" as const, label: "This week" },
                  ]).map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleDrill(id)}
                      className="touch-target rounded-2xl border border-white/[0.06] bg-white/[0.02] py-3.5 text-sm font-medium text-white transition-all duration-200 hover:border-white/[0.1] hover:bg-white/[0.04] active:scale-[0.97] sm:min-h-0"
                    >
                      {label}
                    </button>
                  ))}
            </div>
          </motion.div>
        )}

        {/* ─── Step 3: Capture phone ─── */}
        {step === "capture" && (
          <motion.div
            key="capture"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-5"
          >
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white [font-family:var(--font-outfit)]">
                Almost there.
              </h2>
              <p className="mt-1 text-slate-400">
                Drop your number and we&apos;ll text you immediately.
              </p>
            </div>
            <form onSubmit={handleCaptureSubmit} className="space-y-4">
              <div aria-live="polite" aria-atomic="true" className="min-h-[1.25rem]">
                {submitError && <p className="text-sm text-red-400">{submitError}</p>}
              </div>
              <div>
                <label htmlFor="funnel-phone" className="sr-only">Mobile number</label>
                <div className="relative">
                  <input
                    id="funnel-phone"
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="(555) 123-4567"
                    disabled={submitting}
                    className={`w-full rounded-2xl border bg-white/[0.02] px-4 py-4 font-mono text-lg tracking-wider text-white placeholder-slate-600 outline-none transition-all duration-300 focus:ring-2 disabled:opacity-60 ${
                      phoneError
                        ? "input-error border-red-500/40 focus:border-red-400 focus:ring-red-400/20"
                        : phoneValid
                          ? "input-success border-emerald-500/30 focus:border-emerald-400 focus:ring-emerald-400/20"
                          : "border-white/[0.06] focus:border-[var(--accent)]/40 focus:ring-[var(--accent)]/20"
                    }`}
                    aria-invalid={!!phoneError}
                    aria-describedby={phoneError ? "phone-error" : undefined}
                  />
                  {phoneValid && !phoneError && (
                    <CheckCircle2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-400" aria-hidden />
                  )}
                </div>
                <p className="mt-1.5 text-xs text-slate-600">We&apos;ll only text about your request.</p>
                {phoneError && (
                  <p id="phone-error" className="mt-1 text-sm text-red-400">{phoneError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="pulse-glow flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.95] py-4 text-base font-bold text-zinc-900 shadow-lg shadow-white/10 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-white/15 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    Sending&hellip;
                  </>
                ) : (
                  "Send for instant text"
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* ─── Success ─── */}
        {step === "success" && (
          <motion.div
            key="success"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center justify-center space-y-5 py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="rounded-full bg-[var(--accent)]/10 p-5 ring-4 ring-[var(--accent)]/10"
            >
              <CheckCircle2 className="h-14 w-14 text-[var(--accent)]" aria-hidden />
            </motion.div>
            <h2 className="text-2xl font-bold tracking-tight text-white [font-family:var(--font-outfit)]">
              Missed call saved!
            </h2>
            <p className="max-w-xs leading-relaxed text-slate-400">
              We&apos;ll text you at this number with a ballpark and next steps.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
