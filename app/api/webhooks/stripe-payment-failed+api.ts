/**
 * Stripe Webhook Handler for payment_intent.payment_failed events
 * Handles payment failures and creates payment attempt records
 */

import Stripe from 'stripe';
import { paymentAttemptsService } from '@/services/paymentAttemptsService';
import type { PaymentFailedWebhookPayload } from '@/services/paymentErrorTypes';

/**
 * Verify Stripe webhook signature using Stripe SDK
 * Returns the parsed event if valid, null if invalid
 */
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Stripe.Event | null {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('[Webhook] Missing STRIPE_SECRET_KEY');
    return null;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-11-20.acacia',
  });

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, secret);
    return event;
  } catch (err) {
    console.error('[Webhook] Signature verification failed:', err);
    return null;
  }
}

/**
 * Handle POST requests from Stripe webhooks
 */
export async function POST(request: Request) {
  try {
    const signature = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature) {
      console.warn('[Webhook] Missing Stripe signature');
      return new Response(JSON.stringify({ error: 'Missing signature' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!webhookSecret) {
      console.error('[Webhook] Missing webhook secret configuration');
      return new Response(
        JSON.stringify({ error: 'Webhook configuration error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const body = await request.text();

    const event = verifyWebhookSignature(body, signature, webhookSecret);
    if (!event) {
      console.warn('[Webhook] Invalid signature or verification failed');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (event.type !== 'payment_intent.payment_failed') {
      return new Response(
        JSON.stringify({ received: true, note: 'Event not handled' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const paymentIntent = event.data.object;
    const lastError = paymentIntent.last_payment_error;

    if (!lastError) {
      console.warn('[Webhook] Payment failed but no error details provided');
      return new Response(
        JSON.stringify({ received: true, warning: 'No error details' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const goalId = paymentIntent.metadata?.goal_id;
    const userId = paymentIntent.metadata?.user_id;

    if (!userId) {
      console.error(
        '[Webhook] No user_id in metadata',
        paymentIntent.metadata
      );
      return new Response(
        JSON.stringify({ error: 'Missing user_id in metadata' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('[Webhook] Processing payment failure:', {
      paymentIntentId: paymentIntent.id,
      goalId,
      userId,
      errorCode: lastError.code,
      errorType: lastError.type,
    });

    const attempt = await paymentAttemptsService.createPaymentAttempt({
      goalId,
      userId,
      stripePaymentIntentId: paymentIntent.id,
      stripeError: lastError,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

    if (!attempt) {
      console.error('[Webhook] Failed to create payment attempt record');
    }

    if (goalId) {
      const updated = await paymentAttemptsService.markGoalPaymentFailed(
        goalId
      );
      if (!updated) {
        console.error('[Webhook] Failed to update goal status');
      }
    }

    return new Response(
      JSON.stringify({
        received: true,
        payment_intent_id: paymentIntent.id,
        attempt_recorded: !!attempt,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('[Webhook] Exception processing webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
