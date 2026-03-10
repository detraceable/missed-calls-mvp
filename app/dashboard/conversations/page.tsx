import { getDb } from '@/lib/db';
import { CommunicationRow, BusinessRow } from '@/types/dashboard';
import { ConversationView } from '@/components/dashboard/ConversationView';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export default async function ConversationsPage() {
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

  const businesses = await db<BusinessRow[]>`
    SELECT id FROM businesses WHERE owner_id = ${userId} LIMIT 1
  `;
  const userBusinessId = businesses.length > 0 ? businesses[0].id : null;

  if (!userBusinessId) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <p className="text-sm text-zinc-400">No businesses found.</p>
        <p className="text-xs text-zinc-600">Please visit the settings tab to configure your business.</p>
      </div>
    );
  }

  const communications = await db<CommunicationRow[]>`
    SELECT id, business_id, business_phone, customer_phone, status, trigger_source, system_prompt, message_history, created_at, updated_at
    FROM communications
    WHERE business_id = ${userBusinessId}
    ORDER BY updated_at DESC
  `;

  return <ConversationView communications={communications} />;
}
