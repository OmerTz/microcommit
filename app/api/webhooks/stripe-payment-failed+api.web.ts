/**
 * Stripe Payment Failed Webhook Handler (Web Platform)
 * API routes are server-side only and not supported on web client
 */

export async function POST() {
  return new Response(
    JSON.stringify({ error: 'API routes not supported on web client' }),
    {
      status: 501,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
