'use client';

import { useState } from 'react';

interface ToggleSwitchProps {
  name: string;
  defaultChecked?: boolean;
  label: string;
  description?: string;
}

export function ToggleSwitch({ name, defaultChecked = false, label, description }: ToggleSwitchProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-zinc-100">{label}</p>
        {description && <p className="mt-0.5 text-xs text-zinc-500">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-[var(--accent)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
          ${checked ? 'bg-[var(--accent)]' : 'bg-zinc-700'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0
            transition-transform duration-200 ease-in-out
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      {/* Hidden checkbox so native form submission picks up the value */}
      <input type="hidden" name={name} value={checked ? 'on' : 'off'} />
    </div>
  );
}
