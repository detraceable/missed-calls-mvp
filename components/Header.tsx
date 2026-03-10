"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/demo", label: "Demo" },
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
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "glass-strong py-3 shadow-xl shadow-black/30"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
            <Zap className="h-4 w-4 text-[var(--accent)]" />
          </div>
          <span className="text-base font-bold tracking-tight text-white [font-family:var(--font-outfit)]">
            OmniComm
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`text-[13px] font-medium transition-colors duration-200 ${
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/dashboard/settings"
            className="rounded-xl bg-white/[0.9] px-5 py-2 text-[13px] font-semibold text-zinc-900 shadow-md shadow-white/5 transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-white/10 active:scale-[0.97]"
          >
            Get Started
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="touch-target flex rounded-xl p-2 text-slate-400 transition hover:bg-white/[0.05] hover:text-white md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="glass-strong mx-3 mt-2 overflow-hidden rounded-2xl border border-white/[0.06] md:hidden">
          <nav className="flex flex-col gap-0.5 p-2">
            {NAV.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-white/[0.06] text-white"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/dashboard/settings"
              onClick={() => setMobileOpen(false)}
              className="mt-1 rounded-xl bg-white/[0.9] px-4 py-3 text-center text-sm font-semibold text-zinc-900"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
