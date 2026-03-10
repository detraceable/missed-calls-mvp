import { NextResponse } from 'next/server';
import { validateTwilioWebhook } from '@/lib/validate-twilio';
import { getDb } from '@/lib/db';
import { twilioClient } from '@/lib/twilio-client';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const rawBody = await request.text();
  
  if (!validateTwilioWebhook(request, rawBody)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const params = new URLSearchParams(rawBody);
  const to = params.get('To') || '';
  const from = params.get('From') || '';
  // DialCallStatus is the status of the forwarded call attempts
  const dialCallStatus = params.get('DialCallStatus');

  const actionStates = ['no-answer', 'busy', 'canceled', 'failed'];
  
  if (!dialCallStatus || !actionStates.includes(dialCallStatus)) {
    return new NextResponse('<Response/>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
  }

  const db = getDb();
  if (!db) {
    return new NextResponse('<Response/>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
  }

  const businesses = await db`
    SELECT id, is_active, subscription_status, default_system_prompt
    FROM businesses
    WHERE twilio_number = ${to}
    LIMIT 1
  `;

  if (!businesses.length) {
    return new NextResponse('<Response/>', { status: 200, headers: { 'Content-Type': 'text/xml' } });
  }

  const business = businesses[0];
  if (!business.is_active || !['active', 'trialing'].includes(business.subscription_status)) {
    return new NextResponse('<Response/>', { status: 200, headers: { 'Content-Type': 'text/xml' } });
  }

  const firstMessageText = 'Hey! Sorry we missed your call. How can we help?';
  const initialHistory = [{ role: 'assistant', content: firstMessageText }];

  await db`
    INSERT INTO communications (
      business_id, business_phone, customer_phone, status, trigger_source, system_prompt, message_history
    ) VALUES (
      ${business.id},
      ${to},
      ${from},
      'open',
      'missed_call',
      ${business.default_system_prompt},
      ${db.json(initialHistory)}
    )
  `;

  try {
    await twilioClient.messages.create({
      body: firstMessageText,
      from: to,
      to: from,
    });
  } catch (err) {
    console.error('[Twilio/Call-Status] Failed to send first SMS:', err);
  }

  return new NextResponse('<Response/>', {
    status: 200,
    headers: { 'Content-Type': 'text/xml' }
  });
}
