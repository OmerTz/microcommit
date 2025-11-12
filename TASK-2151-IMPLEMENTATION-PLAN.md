# Task 2151: Stripe Payment Error Categorization Service - Implementation Plan

## Overview
Implement comprehensive Stripe payment error handling service for MicroCommit, including error categorization, database tracking, webhook handling, and analytics.

## 1. Database Schema Migration

### Create Migration File: `supabase/migrations/20251112_create_payment_attempts.sql`

```sql
-- Create payment_attempts table
CREATE TABLE IF NOT EXISTS payment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  error_code TEXT NOT NULL,
  error_type TEXT NOT NULL, -- categorized error type
  error_message TEXT NOT NULL,
  raw_stripe_error JSONB NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'usd',
  card_last4 TEXT,
  card_brand TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_payment_attempts_goal_id ON payment_attempts(goal_id);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_user_id ON payment_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_stripe_payment_intent_id ON payment_attempts(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_error_type ON payment_attempts(error_type);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_created_at ON payment_attempts(created_at DESC);

-- RLS Policies
ALTER TABLE payment_attempts ENABLE ROW LEVEL SECURITY;

-- Users can view their own payment attempts
CREATE POLICY "Users can view own payment attempts"
  ON payment_attempts FOR SELECT
  USING (auth.uid() = user_id);

-- Only authenticated users can insert payment attempts (service role will do this)
CREATE POLICY "Service can insert payment attempts"
  ON payment_attempts FOR INSERT
  WITH CHECK (true);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_payment_attempts_updated_at
  BEFORE UPDATE ON payment_attempts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Update Goals Table (if needed)
Ensure goals table has `payment_failed` status:

```sql
-- Add payment_failed status to goals if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'goal_status'
  ) THEN
    CREATE TYPE goal_status AS ENUM ('draft', 'active', 'completed', 'failed', 'payment_failed');
  ELSE
    -- Add payment_failed to existing enum if needed
    ALTER TYPE goal_status ADD VALUE IF NOT EXISTS 'payment_failed';
  END IF;
END$$;
```

## 2. TypeScript Types

### Create File: `services/paymentErrorTypes.ts`

```typescript
/**
 * Stripe Payment Error Categorization Types
 */

// Categorized error types for user-friendly messaging
export type PaymentErrorType =
  | 'insufficient_funds'
  | 'card_declined'
  | 'invalid_card_details'
  | 'expired_card'
  | 'requires_3ds'
  | 'network_error'
  | 'unknown_error';

// Raw Stripe error structure
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

// Categorized error response
export interface CategorizedError {
  type: PaymentErrorType;
  userMessage: string;
  rawError: StripeError;
  retryable: boolean;
  suggestedAction?: string;
}

// Payment attempt record
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

// Webhook payload for payment_intent.payment_failed
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
```

## 3. Error Categorization Service

### Create File: `services/stripeErrorCategorizationService.ts`

```typescript
import type {
  StripeError,
  CategorizedError,
  PaymentErrorType,
} from './paymentErrorTypes';

class StripeErrorCategorizationService {
  /**
   * Categorize Stripe error into user-friendly type
   */
  categorizeError(error: StripeError): CategorizedError {
    const errorType = this.determineErrorType(error);
    const userMessage = this.getUserMessage(errorType, error);
    const retryable = this.isRetryable(errorType);
    const suggestedAction = this.getSuggestedAction(errorType);

    return {
      type: errorType,
      userMessage,
      rawError: error,
      retryable,
      suggestedAction,
    };
  }

  /**
   * Determine error type based on Stripe error code and decline_code
   */
  private determineErrorType(error: StripeError): PaymentErrorType {
    const code = error.code?.toLowerCase();
    const declineCode = error.decline_code?.toLowerCase();

    // Check decline_code first (more specific)
    if (declineCode) {
      if (declineCode === 'insufficient_funds') {
        return 'insufficient_funds';
      }
      if (
        declineCode === 'expired_card' ||
        declineCode === 'card_expired'
      ) {
        return 'expired_card';
      }
      if (
        [
          'generic_decline',
          'card_not_supported',
          'currency_not_supported',
          'duplicate_transaction',
          'fraudulent',
          'merchant_blacklist',
          'pickup_card',
          'restricted_card',
          'revocation_of_all_authorizations',
          'revocation_of_authorization',
          'security_violation',
          'stolen_card',
          'stop_payment_order',
        ].includes(declineCode)
      ) {
        return 'card_declined';
      }
      if (
        [
          'incorrect_number',
          'invalid_number',
          'incorrect_cvc',
          'invalid_cvc',
          'incorrect_zip',
          'invalid_expiry_month',
          'invalid_expiry_year',
        ].includes(declineCode)
      ) {
        return 'invalid_card_details';
      }
      if (
        declineCode === 'authentication_required' ||
        declineCode === 'approve_with_id'
      ) {
        return 'requires_3ds';
      }
    }

    // Check error code
    if (code) {
      if (
        code === 'card_declined' ||
        code === 'card_decline_rate_limit_exceeded'
      ) {
        return 'card_declined';
      }
      if (
        [
          'incorrect_number',
          'invalid_number',
          'invalid_expiry_month',
          'invalid_expiry_year',
          'invalid_cvc',
          'incorrect_cvc',
          'incorrect_zip',
          'invalid_account',
        ].includes(code)
      ) {
        return 'invalid_card_details';
      }
      if (code === 'expired_card') {
        return 'expired_card';
      }
      if (
        code === 'authentication_required' ||
        code === 'payment_intent_authentication_failure'
      ) {
        return 'requires_3ds';
      }
      if (
        [
          'api_connection_error',
          'api_error',
          'rate_limit',
          'processing_error',
        ].includes(code)
      ) {
        return 'network_error';
      }
    }

    // Default to unknown
    return 'unknown_error';
  }

  /**
   * Get user-friendly error message
   */
  private getUserMessage(
    type: PaymentErrorType,
    error: StripeError
  ): string {
    const messages: Record<PaymentErrorType, string> = {
      insufficient_funds:
        "Your card doesn't have enough funds for this commitment",
      card_declined:
        'Your card was declined. Please try a different payment method.',
      invalid_card_details:
        'Card details appear to be incorrect. Please check and try again.',
      expired_card:
        'This card has expired. Please use a different card.',
      requires_3ds: 'Your bank requires additional authentication.',
      network_error:
        'Connection issue. Please check your internet and try again.',
      unknown_error:
        'Something went wrong. Please try again or contact support.',
    };

    return messages[type];
  }

  /**
   * Determine if error is retryable
   */
  private isRetryable(type: PaymentErrorType): boolean {
    const retryableErrors: PaymentErrorType[] = [
      'network_error',
      'requires_3ds',
      'invalid_card_details',
      'insufficient_funds', // User might add funds
    ];

    return retryableErrors.includes(type);
  }

  /**
   * Get suggested action for user
   */
  private getSuggestedAction(
    type: PaymentErrorType
  ): string | undefined {
    const actions: Partial<Record<PaymentErrorType, string>> = {
      insufficient_funds: 'Add funds to your card or try a different card',
      card_declined: 'Contact your bank or try a different card',
      invalid_card_details: 'Check your card details and try again',
      expired_card: 'Use a card that has not expired',
      requires_3ds: 'Complete authentication with your bank',
      network_error: 'Check your internet connection and try again',
    };

    return actions[type];
  }
}

export const stripeErrorCategorizationService =
  new StripeErrorCategorizationService();
```

## 4. Payment Attempts Service

### Create File: `services/paymentAttemptsService.ts`

```typescript
import { supabase } from '../lib/supabase';
import type {
  PaymentAttempt,
  StripeError,
  PaymentErrorType,
} from './paymentErrorTypes';
import { stripeErrorCategorizationService } from './stripeErrorCategorizationService';
import { track } from './analytics';

class PaymentAttemptsService {
  /**
   * Create payment attempt record
   */
  async createPaymentAttempt(params: {
    goalId?: string;
    userId: string;
    stripePaymentIntentId?: string;
    stripeError: StripeError;
    amount: number;
    currency?: string;
    cardLast4?: string;
    cardBrand?: string;
  }): Promise<PaymentAttempt | null> {
    try {
      // Categorize error
      const categorized =
        stripeErrorCategorizationService.categorizeError(
          params.stripeError
        );

      // Create record
      const { data, error } = await supabase
        .from('payment_attempts')
        .insert({
          goal_id: params.goalId,
          user_id: params.userId,
          stripe_payment_intent_id: params.stripePaymentIntentId,
          error_code: params.stripeError.code || 'unknown',
          error_type: categorized.type,
          error_message: categorized.userMessage,
          raw_stripe_error: params.stripeError,
          amount: params.amount,
          currency: params.currency || 'usd',
          card_last4: params.cardLast4,
          card_brand: params.cardBrand,
        })
        .select()
        .single();

      if (error) {
        console.error('[PaymentAttempts] Error creating record:', error);
        return null;
      }

      // Track analytics
      track('payment_failed', {
        goal_id: params.goalId,
        error_code: params.stripeError.code,
        error_type: categorized.type,
        error_message: categorized.userMessage,
        amount: params.amount,
        currency: params.currency || 'usd',
        retryable: categorized.retryable,
        card_brand: params.cardBrand,
      });

      return data;
    } catch (err) {
      console.error(
        '[PaymentAttempts] Exception creating payment attempt:',
        err
      );
      return null;
    }
  }

  /**
   * Update goal status to payment_failed
   */
  async markGoalPaymentFailed(goalId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('goals')
        .update({
          status: 'payment_failed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', goalId);

      if (error) {
        console.error(
          '[PaymentAttempts] Error updating goal status:',
          error
        );
        return false;
      }

      return true;
    } catch (err) {
      console.error(
        '[PaymentAttempts] Exception updating goal status:',
        err
      );
      return false;
    }
  }

  /**
   * Get payment attempts for a goal
   */
  async getPaymentAttemptsForGoal(
    goalId: string
  ): Promise<PaymentAttempt[]> {
    try {
      const { data, error } = await supabase
        .from('payment_attempts')
        .select('*')
        .eq('goal_id', goalId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(
          '[PaymentAttempts] Error fetching attempts:',
          error
        );
        return [];
      }

      return data || [];
    } catch (err) {
      console.error(
        '[PaymentAttempts] Exception fetching attempts:',
        err
      );
      return [];
    }
  }

  /**
   * Get payment attempts for a user
   */
  async getPaymentAttemptsForUser(
    userId: string,
    limit: number = 50
  ): Promise<PaymentAttempt[]> {
    try {
      const { data, error } = await supabase
        .from('payment_attempts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error(
          '[PaymentAttempts] Error fetching user attempts:',
          error
        );
        return [];
      }

      return data || [];
    } catch (err) {
      console.error(
        '[PaymentAttempts] Exception fetching user attempts:',
        err
      );
      return [];
    }
  }
}

export const paymentAttemptsService = new PaymentAttemptsService();
```

## 5. Webhook Handler

### Create File: `api/webhooks/stripe-payment-failed+api.ts` (Expo Router API route)

```typescript
import { stripeErrorCategorizationService } from '@/services/stripeErrorCategorizationService';
import { paymentAttemptsService } from '@/services/paymentAttemptsService';
import type { PaymentFailedWebhookPayload } from '@/services/paymentErrorTypes';

// Stripe webhook signature verification (implement based on Stripe SDK)
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  // TODO: Implement Stripe signature verification
  // Use Stripe SDK's webhook.constructEvent
  return true; // Placeholder
}

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return new Response('Missing signature or secret', { status: 400 });
    }

    const body = await request.text();

    // Verify webhook signature
    const isValid = verifyWebhookSignature(body, signature, webhookSecret);
    if (!isValid) {
      return new Response('Invalid signature', { status: 401 });
    }

    const event: PaymentFailedWebhookPayload = JSON.parse(body);

    // Handle payment_intent.payment_failed event
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      const lastError = paymentIntent.last_payment_error;

      if (!lastError) {
        console.warn('[Webhook] No last_payment_error in webhook');
        return new Response('No error details', { status: 200 });
      }

      const goalId = paymentIntent.metadata?.goal_id;
      const userId = paymentIntent.metadata?.user_id;

      if (!userId) {
        console.error('[Webhook] No user_id in metadata');
        return new Response('Missing user_id', { status: 400 });
      }

      // Create payment attempt record
      await paymentAttemptsService.createPaymentAttempt({
        goalId,
        userId,
        stripePaymentIntentId: paymentIntent.id,
        stripeError: lastError,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      });

      // Update goal status if goal exists
      if (goalId) {
        await paymentAttemptsService.markGoalPaymentFailed(goalId);
      }

      // Idempotency: Webhook handled successfully
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Event not handled', { status: 200 });
  } catch (error) {
    console.error('[Webhook] Error processing webhook:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
```

## 6. Testing

### Unit Tests: `services/__tests__/stripeErrorCategorizationService.test.ts`

```typescript
import { stripeErrorCategorizationService } from '../stripeErrorCategorizationService';
import type { StripeError } from '../paymentErrorTypes';

describe('StripeErrorCategorizationService', () => {
  describe('insufficient_funds', () => {
    it('should categorize insufficient_funds decline_code', () => {
      const error: StripeError = {
        type: 'card_error',
        code: 'card_declined',
        decline_code: 'insufficient_funds',
        message: 'Insufficient funds',
      };

      const result = stripeErrorCategorizationService.categorizeError(error);

      expect(result.type).toBe('insufficient_funds');
      expect(result.retryable).toBe(true);
      expect(result.userMessage).toContain('enough funds');
    });
  });

  describe('card_declined', () => {
    it('should categorize generic_decline', () => {
      const error: StripeError = {
        type: 'card_error',
        code: 'card_declined',
        decline_code: 'generic_decline',
        message: 'Card declined',
      };

      const result = stripeErrorCategorizationService.categorizeError(error);

      expect(result.type).toBe('card_declined');
      expect(result.retryable).toBe(false);
    });

    it('should categorize fraudulent decline', () => {
      const error: StripeError = {
        type: 'card_error',
        code: 'card_declined',
        decline_code: 'fraudulent',
        message: 'Card declined',
      };

      const result = stripeErrorCategorizationService.categorizeError(error);

      expect(result.type).toBe('card_declined');
    });
  });

  describe('invalid_card_details', () => {
    it('should categorize incorrect_number', () => {
      const error: StripeError = {
        type: 'card_error',
        code: 'incorrect_number',
        message: 'Incorrect card number',
      };

      const result = stripeErrorCategorizationService.categorizeError(error);

      expect(result.type).toBe('invalid_card_details');
      expect(result.retryable).toBe(true);
    });

    it('should categorize invalid_cvc', () => {
      const error: StripeError = {
        type: 'card_error',
        code: 'invalid_cvc',
        message: 'Invalid CVC',
      };

      const result = stripeErrorCategorizationService.categorizeError(error);

      expect(result.type).toBe('invalid_card_details');
    });
  });

  describe('expired_card', () => {
    it('should categorize expired_card code', () => {
      const error: StripeError = {
        type: 'card_error',
        code: 'expired_card',
        message: 'Expired card',
      };

      const result = stripeErrorCategorizationService.categorizeError(error);

      expect(result.type).toBe('expired_card');
      expect(result.retryable).toBe(false);
    });

    it('should categorize expired_card decline_code', () => {
      const error: StripeError = {
        type: 'card_error',
        code: 'card_declined',
        decline_code: 'expired_card',
        message: 'Expired card',
      };

      const result = stripeErrorCategorizationService.categorizeError(error);

      expect(result.type).toBe('expired_card');
    });
  });

  describe('requires_3ds', () => {
    it('should categorize authentication_required', () => {
      const error: StripeError = {
        type: 'card_error',
        code: 'authentication_required',
        message: 'Authentication required',
      };

      const result = stripeErrorCategorizationService.categorizeError(error);

      expect(result.type).toBe('requires_3ds');
      expect(result.retryable).toBe(true);
    });
  });

  describe('network_error', () => {
    it('should categorize api_connection_error', () => {
      const error: StripeError = {
        type: 'api_connection_error',
        code: 'api_connection_error',
        message: 'Connection error',
      };

      const result = stripeErrorCategorizationService.categorizeError(error);

      expect(result.type).toBe('network_error');
      expect(result.retryable).toBe(true);
    });
  });

  describe('unknown_error', () => {
    it('should categorize unknown errors', () => {
      const error: StripeError = {
        type: 'unknown',
        message: 'Unknown error',
      };

      const result = stripeErrorCategorizationService.categorizeError(error);

      expect(result.type).toBe('unknown_error');
      expect(result.retryable).toBe(false);
    });
  });
});
```

### Integration Tests: `services/__tests__/paymentAttemptsService.test.ts`

```typescript
import { paymentAttemptsService } from '../paymentAttemptsService';
import type { StripeError } from '../paymentErrorTypes';
import { supabase } from '@/lib/supabase';

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe('PaymentAttemptsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPaymentAttempt', () => {
    it('should create payment attempt record', async () => {
      const mockError: StripeError = {
        type: 'card_error',
        code: 'card_declined',
        decline_code: 'insufficient_funds',
        message: 'Insufficient funds',
      };

      const mockInsert = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: {
              id: 'test-id',
              error_type: 'insufficient_funds',
            },
            error: null,
          }),
        }),
      });

      (supabase.from as jest.Mock).mockReturnValue({
        insert: mockInsert,
      });

      const result = await paymentAttemptsService.createPaymentAttempt({
        userId: 'user-123',
        goalId: 'goal-456',
        stripeError: mockError,
        amount: 5000,
      });

      expect(result).toBeTruthy();
      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({
          user_id: 'user-123',
          goal_id: 'goal-456',
          error_type: 'insufficient_funds',
          amount: 5000,
        })
      );
    });
  });

  describe('markGoalPaymentFailed', () => {
    it('should update goal status to payment_failed', async () => {
      const mockUpdate = jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({
          error: null,
        }),
      });

      (supabase.from as jest.Mock).mockReturnValue({
        update: mockUpdate,
      });

      const result = await paymentAttemptsService.markGoalPaymentFailed(
        'goal-123'
      );

      expect(result).toBe(true);
      expect(mockUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'payment_failed',
        })
      );
    });
  });
});
```

### Mock Stripe Responses: `__mocks__/stripeErrors.ts`

```typescript
import type { StripeError } from '@/services/paymentErrorTypes';

export const mockStripeErrors = {
  insufficient_funds: {
    type: 'card_error',
    code: 'card_declined',
    decline_code: 'insufficient_funds',
    message: 'Your card has insufficient funds.',
  } as StripeError,

  card_declined: {
    type: 'card_error',
    code: 'card_declined',
    decline_code: 'generic_decline',
    message: 'Your card was declined.',
  } as StripeError,

  invalid_number: {
    type: 'card_error',
    code: 'incorrect_number',
    message: 'Your card number is incorrect.',
  } as StripeError,

  expired_card: {
    type: 'card_error',
    code: 'expired_card',
    message: 'Your card has expired.',
  } as StripeError,

  requires_3ds: {
    type: 'card_error',
    code: 'authentication_required',
    message: 'Authentication required.',
  } as StripeError,

  network_error: {
    type: 'api_connection_error',
    code: 'api_connection_error',
    message: 'Network connection failed.',
  } as StripeError,

  unknown_error: {
    type: 'api_error',
    message: 'An unknown error occurred.',
  } as StripeError,
};
```

## 7. Analytics Integration

Update `services/analytics.ts` to include payment failure event:

```typescript
export const track = (eventName: string, properties?: Record<string, any>) => {
  console.log(`[ANALYTICS] ${eventName}:`, properties);

  // Special handling for payment failures
  if (eventName === 'payment_failed') {
    console.error('[ANALYTICS] Payment Failed:', {
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  // TODO: Integrate with actual analytics service (Segment, Mixpanel, etc.)
};
```

## Implementation Checklist

- [ ] Create database migration file
- [ ] Create TypeScript types file
- [ ] Implement error categorization service
- [ ] Implement payment attempts service
- [ ] Create webhook handler
- [ ] Update analytics service
- [ ] Write unit tests for error categorization
- [ ] Write integration tests for payment attempts
- [ ] Create mock Stripe errors
- [ ] Verify all tests pass
- [ ] Test manually with different error scenarios

## Success Criteria

1. All error types are correctly categorized
2. Payment attempts are logged to database
3. Goal status is updated to payment_failed
4. Webhook handles payment_intent.payment_failed events
5. Analytics events are tracked
6. All unit tests pass
7. All integration tests pass
8. Idempotency is supported (duplicate webhook calls don't create duplicate records)
9. Logging is comprehensive for debugging

## Notes

- No E2E tests required (task specifies unit and integration tests only)
- Use existing patterns from subscriptionService.ts
- Follow MicroCommit coding standards (files under 400 lines, TypeScript, clean code)
- Ensure proper error handling and logging throughout
- Support idempotency for webhook retries (Stripe sends same webhook multiple times)
