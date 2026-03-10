import Link from "next/link";
import { Zap } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/demo", label: "Demo" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] bg-[var(--background)] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
              <Zap className="h-3.5 w-3.5 text-[var(--accent)]" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white [font-family:var(--font-outfit)]">
              OmniComm
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-7">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] text-slate-500 transition-colors duration-200 hover:text-slate-300"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 sm:flex-row">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} OmniComm. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-slate-600" title="Coming soon">Privacy</span>
            <span className="text-xs text-slate-600" title="Coming soon">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
