"use client";

import { useState } from "react";
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
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30 glass-panel"
          >
            <div className="h-1 w-full bg-gradient-to-r from-sky-500 to-sky-400" aria-hidden />
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="flex items-center gap-2 font-semibold text-white">
                <span className="rounded-lg bg-sky-500/20 p-1.5">
                  <MessageCircle className="h-4 w-4 text-sky-400" aria-hidden />
                </span>
                Text us directly
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
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="p-4">
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
                    We’ll reply within ~3 minutes.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div aria-live="polite" aria-atomic="true" className="min-h-[1.25rem]">
                    {error && (
                      <p className="text-sm text-red-400">{error}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="widget-name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="widget-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError("");
                      }}
                      placeholder="Your name"
                      disabled={submitting}
                      maxLength={200}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/25 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label htmlFor="widget-phone" className="sr-only">
                      Phone
                    </label>
                    <input
                      id="widget-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setError("");
                      }}
                      placeholder="Mobile number"
                      disabled={submitting}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/25 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label htmlFor="widget-message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="widget-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What do you need?"
                      rows={3}
                      disabled={submitting}
                      maxLength={2000}
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/25 disabled:opacity-60"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-200 hover:bg-sky-400 hover:shadow-xl hover:shadow-sky-400/30 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Sending…
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
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-white/10 px-5 py-3.5 text-left text-sm font-medium text-white shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-200 hover:border-sky-500/30 hover:shadow-sky-500/15 glass-panel active:scale-[0.98]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500/20 ring-2 ring-sky-500/20">
              <MessageCircle className="h-5 w-5 text-sky-400" aria-hidden />
            </span>
            <span>Text us directly — avg response: 3 mins</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
