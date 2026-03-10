import { getDb } from '@/lib/db';
import { CommunicationRow } from '@/types/dashboard';
import { ConversationView } from '@/components/dashboard/ConversationView';

export const dynamic = 'force-dynamic';

export default async function ConversationsPage() {
  const db = getDb();
  if (!db) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">Database connection not established.</p>
      </div>
    );
  }

  const allBusinesses = await db`SELECT id FROM businesses LIMIT 1`;
  const userBusinessId = allBusinesses.length > 0 ? allBusinesses[0].id : null;

  if (!userBusinessId) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <p className="text-sm text-zinc-400">No businesses found.</p>
        <p className="text-xs text-zinc-600">Create a business to view conversations.</p>
      </div>
    );
  }

  console.warn('[Data Pipe Testing] Using mock business ID:', userBusinessId);

  const communications = await db<CommunicationRow[]>`
    SELECT id, business_id, business_phone, customer_phone, status, trigger_source, system_prompt, message_history, created_at, updated_at
    FROM communications
    WHERE business_id = ${userBusinessId}
    ORDER BY updated_at DESC
  `;

  return <ConversationView communications={communications} />;
}
