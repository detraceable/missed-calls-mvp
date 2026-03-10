import { NextResponse, after } from 'next/server';
import { validateTwilioWebhook } from '@/lib/validate-twilio';
import { getDb } from '@/lib/db';
import { twilioClient } from '@/lib/twilio-client';
import { getAIReply, ChatMessage } from '@/lib/openrouter';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const rawBody = await request.text();
  
  if (!validateTwilioWebhook(request, rawBody)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const params = new URLSearchParams(rawBody);
  const to = params.get('To') || '';
  const from = params.get('From') || '';
  const body = params.get('Body') || '';

  if (!body.trim()) {
    return new NextResponse('<Response/>', { status: 200, headers: { 'Content-Type': 'text/xml' } });
  }

  // Use Next.js 'after' to keep the serverless function alive 
  // without blocking the immediate HTTP 200 OK response to Twilio.
  after(async () => {
    try {
      const db = getDb();
      if (!db) return;

      // Find latest open communication
      const communications = await db`
        SELECT id, system_prompt, message_history
        FROM communications
        WHERE business_phone = ${to} AND customer_phone = ${from} AND status = 'open'
        ORDER BY created_at DESC
        LIMIT 1
      `;

      if (!communications.length) return;

      const comm = communications[0];
      const history: ChatMessage[] = Array.isArray(comm.message_history) ? comm.message_history : [];

      history.push({ role: 'user', content: body });

      // Get AI reply
      const aiReply = await getAIReply(history, comm.system_prompt || '');
      
      history.push({ role: 'assistant', content: aiReply });

      // Update DB
      await db`
        UPDATE communications
        SET message_history = ${db.json(history)}
        WHERE id = ${comm.id}
      `;

      // Send Reply via Twilio
      await twilioClient.messages.create({
        body: aiReply,
        from: to,
        to: from,
      });
    } catch (err) {
      console.error('[Twilio/SMS] Background task failed:', err);
    }
  });

  // Return immediately to satisfy Twilio's fast webhook limits
  return new NextResponse('<Response/>', {
    status: 200,
    headers: { 'Content-Type': 'text/xml' }
  });
}
