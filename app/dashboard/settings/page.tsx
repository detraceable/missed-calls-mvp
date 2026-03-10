import { getDb } from '@/lib/db';
import { BusinessRow } from '@/types/dashboard';
import { updateBusinessSettings } from '@/app/actions/settings';
import { ToggleSwitch } from '@/components/dashboard/ToggleSwitch';
import { SubmitButton } from '@/components/dashboard/SubmitButton';
import { Settings, Shield, Bell, Monitor } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">Not authenticated.</p>
      </div>
    );
  }

  const db = getDb();
  if (!db) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">Database connection not established.</p>
      </div>
    );
  }

  // Find their business
  let businesses = await db<BusinessRow[]>`
    SELECT * FROM businesses WHERE owner_id = ${userId}::text
  `;

  // Auto-provision a business for new users just to make the MVP smooth
  if (!businesses.length) {
    businesses = await db<BusinessRow[]>`
      INSERT INTO businesses (owner_id, name, default_system_prompt)
      VALUES (${userId}::text, 'My New Business', 'You are a helpful AI receptionist.')
      RETURNING *
    `;
  }

  const business = businesses[0];

  const submitAction = async (formData: FormData) => {
    'use server';
    await updateBusinessSettings(business.id, formData);
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-8 lg:px-8 lg:py-12">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
            <Settings className="h-5 w-5 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold tracking-tight">Settings</h1>
            <p className="text-xs text-zinc-500">Manage your business configuration</p>
          </div>
        </div>
      </div>

      <form action={submitAction} className="space-y-6">
        {/* Service Status Card */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="mb-5 flex items-center gap-2">
            <Shield className="h-4 w-4 text-zinc-400" />
            <h2 className="text-sm font-semibold tracking-tight text-zinc-200">Service Status</h2>
          </div>
          <ToggleSwitch
            name="isActive"
            defaultChecked={business.is_active}
            label="Auto-reply active"
            description="When enabled, missed calls and dead leads receive automatic AI-powered SMS replies."
          />
        </div>

        {/* System Prompt Card */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="mb-1">
            <h2 className="text-sm font-semibold tracking-tight text-zinc-200">AI System Prompt</h2>
            <p className="mt-1 text-xs text-zinc-500">
              This prompt shapes how the AI responds to your customers. Be specific about your business, services, and tone.
            </p>
          </div>
          <textarea
            name="systemPrompt"
            defaultValue={business.default_system_prompt || ''}
            rows={6}
            className="mt-4 w-full resize-none rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm
                       text-zinc-200 placeholder:text-zinc-600 transition-all duration-200
                       focus-within:ring-2 focus-within:ring-[var(--accent)]/30 focus-within:border-[var(--accent)]/40
                       focus:outline-none"
            placeholder="You are a helpful assistant for a local plumbing business..."
          />
        </div>

        {/* Business Info Card (read-only) */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="mb-4 text-sm font-semibold tracking-tight text-zinc-200">Business Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">Name</p>
              <p className="mt-1 text-sm text-zinc-300">{business.name || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">Twilio Number</p>
              <p className="mt-1 font-mono text-sm text-zinc-300">{business.twilio_number || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">Forwarding Number</p>
              <p className="mt-1 font-mono text-sm text-zinc-300">{business.forwarding_number || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">Subscription</p>
              <p className="mt-1 text-sm">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                  business.subscription_status === 'active'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : business.subscription_status === 'trialing'
                    ? 'bg-amber-500/10 text-amber-400'
                    : 'bg-zinc-800 text-zinc-500'
                }`}>
                  {business.subscription_status === 'active' && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                  {business.subscription_status ?? 'unknown'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Notification Preferences Card */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="mb-5 flex items-center gap-2">
            <Bell className="h-4 w-4 text-zinc-400" />
            <h2 className="text-sm font-semibold tracking-tight text-zinc-200">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            <ToggleSwitch
              name="emailNotifications"
              defaultChecked={true}
              label="Email Notifications"
              description="Receive daily summaries and billing updates via email."
            />
            <div className="h-px bg-white/[0.06] my-4" />
            <ToggleSwitch
              name="smsAlerts"
              defaultChecked={false}
              label="SMS Lead Alerts"
              description="Get a text message immediately when a new hot lead is captured."
            />
          </div>
        </div>

        {/* Display Settings Card */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="mb-5 flex items-center gap-2">
            <Monitor className="h-4 w-4 text-zinc-400" />
            <h2 className="text-sm font-semibold tracking-tight text-zinc-200">Display & Localization</h2>
          </div>
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-600 block mb-2">Timezone</label>
            <select
              name="timezone"
              defaultValue="America/New_York"
              className="w-full sm:w-1/2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 outline-none"
            >
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="Europe/London">London (GMT)</option>
            </select>
            <p className="mt-2 text-xs text-zinc-500">Reports and timestamps will be displayed in this timezone.</p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
