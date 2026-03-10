'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Zap, Bot, User, ChevronLeft, PhoneMissed, FileText } from 'lucide-react';
import type { CommunicationRow, ChatMessage } from '@/types/dashboard';

function formatPhone(phone: string | null) {
  if (!phone) return 'Unknown';
  if (phone.length === 12 && phone.startsWith('+1')) {
    return `(${phone.slice(2, 5)}) ${phone.slice(5, 8)}-${phone.slice(8)}`;
  }
  return phone;
}

function timeAgo(date: Date | string | null) {
  if (!date) return '';
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const triggerConfig: Record<string, { label: string; icon: typeof PhoneMissed; color: string }> = {
  missed_call: { label: 'Missed Call', icon: PhoneMissed, color: 'text-amber-400' },
  dead_lead: { label: 'Dead Lead', icon: FileText, color: 'text-purple-400' },
};

export function ConversationView({ communications }: { communications: CommunicationRow[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    communications.length > 0 ? communications[0].id : null
  );
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const selected = communications.find((c) => c.id === selectedId) ?? null;
  const messages: ChatMessage[] = selected?.message_history ?? [];

  return (
    <div className="flex h-[calc(100vh-52px)] lg:h-screen">
      {/* ── Left Pane: Inbox ── */}
      <div
        className={`
          w-full shrink-0 border-r border-white/5 lg:w-[340px]
          ${mobileShowChat ? 'hidden lg:flex' : 'flex'}
          flex-col
        `}
      >
        <div className="border-b border-white/5 px-5 py-4">
          <h2 className="font-display text-lg font-semibold tracking-tight">Inbox</h2>
          <p className="mt-0.5 text-xs text-zinc-500">{communications.length} conversation{communications.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {communications.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-5 py-16 text-center">
              <Phone className="h-8 w-8 text-zinc-700" />
              <p className="text-sm text-zinc-500">No conversations yet.</p>
              <p className="text-xs text-zinc-600">Missed calls and dead leads will appear here.</p>
            </div>
          ) : (
            communications.map((comm) => {
              const isActive = comm.id === selectedId;
              const trigger = triggerConfig[comm.trigger_source ?? ''];
              const TriggerIcon = trigger?.icon ?? Zap;
              const lastMsg = (comm.message_history ?? []).slice(-1)[0];

              return (
                <button
                  key={comm.id}
                  onClick={() => {
                    setSelectedId(comm.id);
                    setMobileShowChat(true);
                  }}
                  className={`
                    group flex w-full items-start gap-3 border-b border-white/[0.03] px-4 py-3.5 text-left transition-colors
                    ${isActive ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'}
                  `}
                >
                  <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isActive ? 'bg-[var(--accent)]/10' : 'bg-white/[0.04]'}`}>
                    <TriggerIcon className={`h-4 w-4 ${trigger?.color ?? 'text-zinc-400'}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium text-zinc-100">
                        {formatPhone(comm.customer_phone)}
                      </span>
                      <span className="shrink-0 text-[10px] text-zinc-600">{timeAgo(comm.updated_at)}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                        comm.status === 'open'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {comm.status === 'open' && (
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        )}
                        {comm.status ?? 'open'}
                      </span>
                      <span className="text-[10px] text-zinc-600">{trigger?.label}</span>
                    </div>
                    {lastMsg && (
                      <p className="mt-1 truncate text-xs text-zinc-500">
                        {lastMsg.role === 'assistant' ? 'AI: ' : ''}{lastMsg.content}
                      </p>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ── Right Pane: Chat Theater ── */}
      <div
        className={`
          flex-1 flex-col
          ${mobileShowChat ? 'flex' : 'hidden lg:flex'}
        `}
      >
        {!selected ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
              <Zap className="h-6 w-6 text-zinc-700" />
            </div>
            <p className="text-sm text-zinc-500">Select a conversation</p>
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 border-b border-white/5 px-5 py-3.5">
              <button
                onClick={() => setMobileShowChat(false)}
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)]/10">
                <Phone className="h-4 w-4 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-sm font-medium tracking-tight">{formatPhone(selected.customer_phone)}</p>
                <p className="text-[11px] text-zinc-500">
                  {triggerConfig[selected.trigger_source ?? '']?.label ?? 'Unknown'} &middot; {selected.status}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.06 } },
                    hidden: {},
                  }}
                  className="mx-auto flex max-w-2xl flex-col gap-3"
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={`${selected.id}-${i}`}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[80%] items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          msg.role === 'user' ? 'bg-[var(--accent)]/10' : 'bg-white/[0.06]'
                        }`}>
                          {msg.role === 'user'
                            ? <User className="h-3 w-3 text-[var(--accent)]" />
                            : <Bot className="h-3 w-3 text-zinc-400" />
                          }
                        </div>
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-br from-[var(--accent)] to-cyan-600 text-white shadow-lg shadow-cyan-500/10'
                              : 'bg-zinc-800/80 text-zinc-200'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
                  <p className="text-sm text-zinc-600">No messages in this thread yet.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
