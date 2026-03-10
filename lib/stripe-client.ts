import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY;

if (!apiKey) {
  throw new Error('STRIPE_SECRET_KEY must be set');
}

export const stripeClient = new Stripe(apiKey, {
  apiVersion: '2026-02-25.clover' as any,
});
