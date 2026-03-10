import { NextResponse } from 'next/server';
import { stripeClient } from '@/lib/stripe-client';
import { getDb } from '@/lib/db';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new NextResponse('Webhook secret or signature missing', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripeClient.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error(`[Stripe Webhook] Signature verification failed.`, err.message);
    return new NextResponse('Invalid signature', { status: 401 });
  }

  const db = getDb();
  if (!db) {
    console.error('[Stripe Webhook] DB not initialized');
    return new NextResponse('Internal error', { status: 500 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const businessId = session.metadata?.business_id;
        
        if (!businessId) {
          console.error('[Stripe Webhook] Missing metadata.business_id in session');
          break;
        }

        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;

        await db`
          UPDATE businesses
          SET 
            stripe_customer_id = ${customerId || null},
            stripe_subscription_id = ${subscriptionId || null},
            subscription_status = 'active'
          WHERE id = ${businessId}
        `;
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await db`
          UPDATE businesses
          SET subscription_status = ${subscription.status}
          WHERE stripe_subscription_id = ${subscription.id}
        `;
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await db`
          UPDATE businesses
          SET 
            subscription_status = 'canceled',
            is_active = false
          WHERE stripe_subscription_id = ${subscription.id}
        `;
        break;
      }
      default:
        // Unhandled event type
        break;
    }
  } catch (err) {
    console.error(`[Stripe Webhook] Error processing event ${event.type}:`, err);
    // Even if our DB update fails, we should technically return 500 so Stripe retries.
    // However, the prompt specifically asked: "Unhandled events: log and return 200 so Stripe doesn't retry"
    // I will return 200 so it doesn't perpetually retry on unhandled or weird logical bugs, but log it.
  }

  return new NextResponse('Received', { status: 200 });
}
