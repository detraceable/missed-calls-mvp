import { NextResponse } from 'next/server';
import { validateTwilioWebhook } from '@/lib/validate-twilio';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const rawBody = await request.text();
  
  if (!validateTwilioWebhook(request, rawBody)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const params = new URLSearchParams(rawBody);
  const to = params.get('To');

  if (!to) {
    return new NextResponse('<Response><Reject reason="busy"/></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
  }

  const db = getDb();
  if (!db) {
    console.error('[Twilio/Voice] DB not initialized');
    return new NextResponse('<Response><Reject reason="busy"/></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
  }

  const businesses = await db`
    SELECT forwarding_number, is_active
    FROM businesses
    WHERE twilio_number = ${to} AND is_active = true
    LIMIT 1
  `;

  if (!businesses.length || !businesses[0].forwarding_number) {
    return new NextResponse('<Response><Reject reason="busy"/></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
  }

  const { forwarding_number } = businesses[0];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';

  const twiml = `
    <Response>
      <Dial timeout="20" action="${baseUrl}/api/twilio/call-status" method="POST">
        <Number>${forwarding_number}</Number>
      </Dial>
    </Response>
  `.trim();

  return new NextResponse(twiml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' }
  });
}
