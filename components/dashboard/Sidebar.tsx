'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Settings, CreditCard, Menu, X, Zap } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const navItems = [
  { href: '/dashboard/conversations', label: 'Conversations', icon: MessageSquare },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-zinc-950 px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-[var(--accent)]" />
          <span className="font-display text-sm font-semibold tracking-tight">OmniComm</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/5 bg-zinc-950
          transition-transform duration-300 ease-out
          lg:static lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 border-b border-white/5 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/10">
            <Zap className="h-4 w-4 text-[var(--accent)]" />
          </div>
          <span className="font-display text-base font-semibold tracking-tight">OmniComm</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'bg-white/[0.06] text-white'
                    : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200'
                  }
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[var(--accent)]" />
                )}
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[var(--accent)]' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/5 px-5 py-6">
          <UserButton showName />
        </div>
      </aside>
    </>
  );
}
