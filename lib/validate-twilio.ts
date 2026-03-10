import { validateRequest } from 'twilio';

export function validateTwilioWebhook(request: Request, rawBody: string): boolean {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) return false;

  const signature = request.headers.get('x-twilio-signature') || '';

  // Use the canonical NEXT_PUBLIC_APP_URL to construct the exact signed URL to prevent proxy mismatches on Vercel
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
  const urlObj = new URL(request.url);
  // Ensure we don't duplicate slashes
  const path = urlObj.pathname.startsWith('/') ? urlObj.pathname : `/${urlObj.pathname}`;
  const canonicalUrl = baseUrl ? `${baseUrl.replace(/\/$/, '')}${path}` : request.url;

  const params = Object.fromEntries(new URLSearchParams(rawBody));

  return validateRequest(authToken, signature, canonicalUrl, params);
}
