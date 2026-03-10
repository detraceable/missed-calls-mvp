"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneIncoming } from "lucide-react";

const FOMO_ITEMS = [
  { text: "Emergency Plumbing quote sent", phone: "555-0198", location: "Queens" },
  { text: "HVAC missed call recovered", phone: "555-0347", location: "Brooklyn" },
  { text: "Roof inspection quote sent", phone: "555-0512", location: "Bronx" },
  { text: "Plumbing estimate texted", phone: "555-0821", location: "Manhattan" },
  { text: "Electrical quote delivered", phone: "555-0934", location: "Jersey City" },
  { text: "Water heater quote sent", phone: "555-0673", location: "Hoboken" },
  { text: "AC repair call recovered", phone: "555-0159", location: "Astoria" },
  { text: "Drain cleaning quote sent", phone: "555-0442", location: "Newark" },
];

export function FomoToast() {
  const [active, setActive] = useState<(typeof FOMO_ITEMS)[0] | null>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const show = () => {
      setActive(FOMO_ITEMS[idx % FOMO_ITEMS.length]);
      setIdx((i) => i + 1);
      setTimeout(() => setActive(null), 4000);
    };

    const delay = 8000 + Math.random() * 10000;
    const t = setTimeout(show, delay);
    return () => clearTimeout(t);
  }, [idx]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, x: -40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -40, y: 10 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-6 left-6 z-50 flex max-w-xs items-center gap-3 rounded-xl border border-white/[0.07] bg-[#111]/90 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-lg"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#00d4ff]/15">
            <PhoneIncoming className="h-4 w-4 text-[#00d4ff]" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {active.text}
            </p>
            <p className="text-xs text-zinc-500">
              Just now · {active.location}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
