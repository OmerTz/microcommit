/**
 * Stripe Payment Error Categorization Types
 * Defines types for handling and categorizing Stripe payment errors
 */

export type PaymentErrorType =
  | 'insufficient_funds'
  | 'card_declined'
  | 'invalid_card_details'
  | 'expired_card'
  | 'requires_3ds'
  | 'network_error'
  | 'unknown_error';

export interface StripeError {
  type: string;
  code?: string;
  decline_code?: string;
  message: string;
  param?: string;
  charge?: string;
  payment_intent?: {
    id: string;
    status: string;
  };
}

export interface CategorizedError {
  type: PaymentErrorType;
  userMessage: string;
  rawError: StripeError;
  retryable: boolean;
  suggestedAction?: string;
}

export interface PaymentAttempt {
  id: string;
  goal_id?: string;
  user_id: string;
  stripe_payment_intent_id?: string;
  error_code: string;
  error_type: PaymentErrorType;
  error_message: string;
  raw_stripe_error: StripeError;
  amount: number;
  currency: string;
  card_last4?: string;
  card_brand?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentFailedWebhookPayload {
  id: string;
  object: 'event';
  type: 'payment_intent.payment_failed';
  data: {
    object: {
      id: string;
      amount: number;
      currency: string;
      customer?: string;
      metadata?: {
        goal_id?: string;
        user_id?: string;
      };
      last_payment_error?: StripeError;
      status: string;
    };
  };
}
