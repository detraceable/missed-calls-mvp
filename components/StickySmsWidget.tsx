"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

function validatePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10) return "Enter a valid 10-digit number.";
  return "";
}

export function StickySmsWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [idlePulse, setIdlePulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIdlePulse(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const nameTrim = name.trim();
    if (!nameTrim) {
      setError("Name is required.");
      return;
    }
    const phoneErr = validatePhone(phone);
    if (phoneErr) {
      setError(phoneErr);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "widget",
          name: nameTrim,
          phone: phone.trim(),
          message: message.trim().slice(0, 2000),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Try again.");
        return;
      }
      setSent(true);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-panel fixed bottom-6 right-6 z-50 w-full max-w-sm overflow-hidden rounded-3xl"
          >
            <div className="h-[2px] w-full bg-gradient-to-r from-[var(--accent)] via-sky-300 to-[var(--accent-secondary)]" aria-hidden />
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
              <span className="flex items-center gap-2.5 text-sm font-semibold text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]/[0.08] ring-1 ring-[var(--accent)]/10">
                  <MessageCircle className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
                </span>
                Text us
              </span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  if (sent) {
                    setName("");
                    setPhone("");
                    setMessage("");
                    setSent(false);
                    setError("");
                  }
                }}
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/[0.05] hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="p-5">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-8 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <p className="font-semibold text-white">Message sent.</p>
                  <p className="mt-1.5 text-sm text-slate-400">
                    We&apos;ll reply at this number right away.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div aria-live="polite" aria-atomic="true" className="min-h-[1.25rem]">
                    {error && <p className="text-sm text-red-400">{error}</p>}
                  </div>
                  <div>
                    <label htmlFor="widget-name" className="sr-only">Name</label>
                    <input
                      id="widget-name"
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setError(""); }}
                      placeholder="Your name"
                      disabled={submitting}
                      maxLength={200}
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-[var(--accent)]/40 focus:ring-2 focus:ring-[var(--accent)]/20 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label htmlFor="widget-phone" className="sr-only">Phone</label>
                    <input
                      id="widget-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setError(""); }}
                      placeholder="Mobile number"
                      disabled={submitting}
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-[var(--accent)]/40 focus:ring-2 focus:ring-[var(--accent)]/20 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label htmlFor="widget-message" className="sr-only">Message</label>
                    <textarea
                      id="widget-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What do you need? (e.g. leak, installation, quote)"
                      rows={3}
                      disabled={submitting}
                      maxLength={2000}
                      className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-[var(--accent)]/40 focus:ring-2 focus:ring-[var(--accent)]/20 disabled:opacity-60"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.9] py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-white/5 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-white/10 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Sending&hellip;
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden />
                        Send
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="trigger"
            type="button"
            onClick={() => { setIdlePulse(false); setOpen(true); }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`glass-panel fixed bottom-6 right-6 z-50 flex touch-target items-center gap-3 rounded-2xl px-5 py-3.5 text-left text-sm font-medium text-white transition-all duration-300 hover:border-white/[0.12] sm:min-h-0 ${idlePulse ? "idle-pulse" : ""}`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/[0.08] ring-1 ring-[var(--accent)]/15">
              <MessageCircle className="h-5 w-5 text-[var(--accent)]" aria-hidden />
            </span>
            <span className="text-slate-300">Text us</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
