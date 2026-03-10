'use client';

import { useFormStatus } from 'react-dom';
import { Loader2, Check } from 'lucide-react';

export function SubmitButton({ label = 'Save changes' }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium
        transition-all duration-200
        ${pending
          ? 'cursor-not-allowed bg-zinc-800 text-zinc-500'
          : 'bg-[var(--accent)] text-zinc-950 shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-[0.98]'
        }
      `}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving…
        </>
      ) : (
        <>
          <Check className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}
