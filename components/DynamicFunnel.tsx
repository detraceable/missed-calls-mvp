"use client";

import { useState } from "react";
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

type Step = "choice" | "drill" | "capture" | "success";

type ServiceChoice = "emergency" | "maintenance" | "quote" | "question" | null;

type DrillOption = "asap" | "today" | "this_week" | "small" | "medium" | "large" | null;

const slide = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0, filter: "blur(4px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({ x: dir * -80, opacity: 0, filter: "blur(4px)" }),
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export function DynamicFunnel() {
  const [step, setStep] = useState<Step>("choice");
  const [direction, setDirection] = useState(1);
  const [service, setService] = useState<ServiceChoice>(null);
  const [drill, setDrill] = useState<DrillOption>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const goTo = (next: Step, dir: number = 1) => {
    setDirection(dir);
    setStep(next);
  };

  const handleService = (value: ServiceChoice) => {
    setService(value);
    if (value === "question") {
      goTo("capture");
    } else {
      goTo("drill");
    }
  };

  const handleDrill = (value: DrillOption) => {
    setDrill(value);
    goTo("capture");
  };

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10) return "Enter a valid 10-digit number.";
    return "";
  };

  const handleCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePhone(phone);
    if (err) {
      setPhoneError(err);
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
          phone: phone.trim(),
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

  const choiceOptions = [
    { id: "emergency" as const, label: "Emergency Repair", icon: AlertCircle },
    { id: "maintenance" as const, label: "Maintenance", icon: Wrench },
    { id: "quote" as const, label: "Quote", icon: ClipboardList },
    { id: "question" as const, label: "Quick Question", icon: MessageCircle },
  ];

  return (
    <div className="relative min-h-[340px]">
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        {step === "choice" && (
          <motion.div
            key="choice"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold tracking-tight text-white">
              What do you need help with?
            </h2>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-3"
            >
              {choiceOptions.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  variants={item}
                  type="button"
                  onClick={() => handleService(id)}
                  className="group flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-4 text-white transition-all duration-200 hover:border-sky-500/30 hover:bg-white/10 hover:shadow-lg hover:shadow-sky-500/10 active:scale-[0.98]"
                >
                  <span className="rounded-lg bg-sky-500/10 p-2 transition-colors group-hover:bg-sky-500/20">
                    <Icon className="h-6 w-6 text-sky-400" aria-hidden />
                  </span>
                  <span className="text-center text-sm font-medium">{label}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}

        {step === "drill" && (
          <motion.div
            key="drill"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              {isSizeDrill
                ? "What size is the project?"
                : "When do you need us?"}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {isSizeDrill
                ? (["small", "medium", "large"] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleDrill(size)}
                      className="rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-medium capitalize text-white transition-all duration-200 hover:border-sky-500/30 hover:bg-white/10 hover:shadow-lg hover:shadow-sky-500/10 active:scale-[0.98]"
                    >
                      {size}
                    </button>
                  ))
                : (
                  [
                    { id: "asap" as const, label: "ASAP" },
                    { id: "today" as const, label: "Today" },
                    { id: "this_week" as const, label: "This week" },
                  ]
                ).map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleDrill(id)}
                    className="rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:border-sky-500/30 hover:bg-white/10 hover:shadow-lg hover:shadow-sky-500/10 active:scale-[0.98]"
                  >
                    {label}
                  </button>
                ))}
            </div>
          </motion.div>
        )}

        {step === "capture" && (
          <motion.div
            key="capture"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Perfect. We can handle that.
            </h2>
            <p className="text-slate-400">
              Enter your mobile number and our lead tech will text you within 3 minutes with next steps.
            </p>
            <form onSubmit={handleCaptureSubmit} className="space-y-4">
              <div aria-live="polite" aria-atomic="true" className="min-h-[1.5rem]">
                {submitError && (
                  <p className="text-sm text-red-400">{submitError}</p>
                )}
              </div>
              <div>
                <label htmlFor="funnel-phone" className="sr-only">
                  Mobile number
                </label>
                <input
                  id="funnel-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError("");
                  }}
                  placeholder="(555) 123-4567"
                  disabled={submitting}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/25 disabled:opacity-60"
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? "phone-error" : undefined}
                />
                {phoneError && (
                  <p id="phone-error" className="mt-1.5 text-sm text-red-400">
                    {phoneError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-200 hover:bg-sky-400 hover:shadow-xl hover:shadow-sky-400/30 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  "Send my number"
                )}
              </button>
            </form>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center justify-center space-y-5 py-10 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="rounded-full bg-sky-500/20 p-5 ring-4 ring-sky-500/20"
            >
              <CheckCircle2 className="h-14 w-14 text-sky-400" aria-hidden />
            </motion.div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              You’re in the queue.
            </h2>
            <p className="max-w-xs text-slate-400 leading-relaxed">
              We’ll text you at this number within about 3 minutes. Keep your phone handy.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
