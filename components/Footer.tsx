import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/80 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-slate-500">
            Free estimate · No obligation · Available 24/7
          </p>
          <nav className="flex flex-wrap justify-center gap-6">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-slate-400 transition hover:text-emerald-400"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-6 text-center text-xs text-slate-600">
          Licensed & insured · We respond in minutes
        </p>
      </div>
    </footer>
  );
}
