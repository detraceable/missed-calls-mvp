import Link from "next/link";
import { Zap } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-white [font-family:var(--font-outfit)]">
            <Zap className="h-4 w-4 text-[#00d4ff]" aria-hidden />
            GetQuote
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-zinc-500 transition hover:text-[#00d4ff]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-zinc-600">
          Free estimate · No obligation · Available 24/7 · Licensed & insured
        </p>
      </div>
    </footer>
  );
}
