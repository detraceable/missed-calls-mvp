"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-panel py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-white transition hover:text-emerald-400"
        >
          GetQuote
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition hover:text-emerald-400 ${
                pathname === href ? "text-emerald-400" : "text-slate-300"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#estimate"
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400 active:scale-95"
          >
            Get estimate
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="touch-target flex md:hidden rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="glass-panel border-t border-white/10 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                  pathname === href
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/#estimate"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Get estimate
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
