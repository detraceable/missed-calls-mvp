import { getDb } from './db';
import { twilioClient } from './twilio-client';

export async function fireDeadLeadCampaign(
  businessId: string,
  leads: { phone: string; firstMessage: string }[]
): Promise<{ sent: number; failed: number; errors: string[] }> {
  const db = getDb();
  if (!db) {
    throw new Error('Database connection not initialized. Check DATABASE_URL.');
  }

  // Verify business exists, is active, and subscription is valid
  const businesses = await db`
    SELECT id, is_active, subscription_status, twilio_number, default_system_prompt
    FROM businesses
    WHERE id = ${businessId}
  `;
  
  if (!businesses.length) {
    throw new Error(`Business ${businessId} not found.`);
  }

  const business = businesses[0];
  if (!business.is_active || !['active', 'trialing'].includes(business.subscription_status)) {
    throw new Error(`Business ${businessId} is inactive or has no valid subscription.`);
  }
  if (!business.twilio_number) {
    throw new Error(`Business ${businessId} has no assigned Twilio number.`);
  }

  const dbRecordsToInsert = leads.map((lead) => ({
    business_id: business.id,
    business_phone: business.twilio_number,
    customer_phone: lead.phone,
    status: 'open',
    trigger_source: 'dead_lead',
    system_prompt: business.default_system_prompt,
    message_history: db.json([
      { role: 'assistant', content: lead.firstMessage }
    ]),
  }));

  if (dbRecordsToInsert.length === 0) {
    return { sent: 0, failed: 0, errors: [] };
  }

  // Perform bulk insert inside an explicit transaction block
  await db.begin(async (sql: any) => {
    // We do bulk insert in chunks if needed or single bulk insert
    await sql`
      INSERT INTO communications ${sql(dbRecordsToInsert as any)}
    `;
  });

  const results = await Promise.allSettled(
    leads.map(async (lead) => {
      // Chunk SMS sends to respect rate limit? I'll do standard promise execution with a tiny delay
      // but the prompt specified: "Promise.allSettled for all SMS sends".
      const message = await twilioClient.messages.create({
        body: lead.firstMessage,
        from: business.twilio_number,
        to: lead.phone,
      });
      return message.sid;
    })
  );

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const res of results) {
    if (res.status === 'fulfilled') {
      sent++;
    } else {
      failed++;
      errors.push(res.reason?.message || String(res.reason));
    }
  }

  return { sent, failed, errors };
}
