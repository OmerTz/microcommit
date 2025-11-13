/**
 * Payment Retry Service
 * Handles payment retry logic with same card using Stripe confirmCardPayment
 * Supports 3D Secure authentication and tracks retry attempts
 */

import { Platform } from 'react-native';
import { stripeErrorCategorizationService } from './stripeErrorCategorizationService';
import { paymentAttemptsService } from './paymentAttemptsService';
import { track } from './analytics';
import { t } from '@/constants/translations';
import type { StripeError } from './paymentErrorTypes';

/**
 * Dynamic Stripe import that prevents Metro bundler from trying to resolve
 * the 'stripe' package on web platform. Using eval() makes the require truly
 * dynamic so Metro won't attempt to bundle it.
 */
function getStripeModule(): any {
  if (Platform.OS === 'web') {
    return null;
  }
  try {
    // Use eval to prevent Metro from resolving this at build time
    return eval('require')('stripe');
  } catch (error) {
    console.warn('[PaymentRetryService] Stripe SDK not available on this platform');
    return null;
  }
}

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_TIMEOUT_MS = 10000;

export interface RetryPaymentParams {
  paymentIntentId: string;
  paymentMethodId: string;
  goalId?: string;
  userId: string;
  amount: number;
  currency?: string;
  cardLast4?: string;
  cardBrand?: string;
}

export interface RetryPaymentResult {
  success: boolean;
  outcome: 'success' | 'same_error' | 'different_error' | 'timeout' | 'max_attempts_reached';
  paymentIntentId?: string;
  errorType?: string;
  errorMessage?: string;
  rawError?: StripeError;
  requiresAction?: boolean;
  clientSecret?: string;
}

class PaymentRetryService {
  private stripe: any | null = null;
  private retryLocks: Map<string, boolean> = new Map();

  /**
   * Initialize Stripe client (lazy loading)
   */
  private getStripeClient(): any {
    if (Platform.OS === 'web') {
      throw new Error(t('payment.retry.errors.platform_not_supported'));
    }

    if (!this.stripe) {
      const StripeModule = getStripeModule();
      if (!StripeModule) {
        throw new Error(t('payment.retry.errors.stripe_sdk_unavailable'));
      }
      const apiKey = process.env.STRIPE_SECRET_KEY;
      if (!apiKey) {
        throw new Error(t('payment.retry.errors.stripe_key_not_configured'));
      }
      this.stripe = new StripeModule(apiKey, {
        apiVersion: '2024-11-20.acacia',
      });
    }
    return this.stripe;
  }

  /**
   * Check if payment intent can be retried (not over max attempts)
   */
  async canRetryPayment(goalId: string): Promise<boolean> {
    if (!goalId) {
      return true;
    }

    const attemptCount = await paymentAttemptsService.getPaymentAttemptCountForGoal(goalId);
    return attemptCount < MAX_RETRY_ATTEMPTS;
  }

  /**
   * Acquire retry lock to prevent duplicate simultaneous retries
   */
  private acquireLock(paymentIntentId: string): boolean {
    if (this.retryLocks.get(paymentIntentId)) {
      return false;
    }
    this.retryLocks.set(paymentIntentId, true);
    return true;
  }

  /**
   * Release retry lock
   */
  private releaseLock(paymentIntentId: string): void {
    this.retryLocks.delete(paymentIntentId);
  }

  /**
   * Get current attempt number for this goal
   */
  private async getAttemptNumber(goalId?: string): Promise<number> {
    if (!goalId) {
      return 1;
    }
    const count = await paymentAttemptsService.getPaymentAttemptCountForGoal(goalId);
    return count + 1;
  }

  /**
   * Retry payment with same card using Stripe confirmCardPayment
   * Handles 3D Secure authentication and timeout
   */
  async retryPayment(params: RetryPaymentParams): Promise<RetryPaymentResult> {
    const {
      paymentIntentId,
      paymentMethodId,
      goalId,
      userId,
      amount,
      currency = 'usd',
      cardLast4,
      cardBrand,
    } = params;

    const lockAcquired = this.acquireLock(paymentIntentId);
    if (!lockAcquired) {
      console.warn('[PaymentRetry] Duplicate retry attempt blocked:', paymentIntentId);
      return {
        success: false,
        outcome: 'same_error',
        errorType: 'duplicate_retry',
        errorMessage: 'payment.retry.errors.duplicate_retry',
      };
    }

    try {
      const canRetry = await this.canRetryPayment(goalId || '');
      if (!canRetry) {
        console.warn('[PaymentRetry] Max attempts reached for goal:', goalId);
        this.releaseLock(paymentIntentId);
        return {
          success: false,
          outcome: 'max_attempts_reached',
          errorType: 'max_attempts',
          errorMessage: 'payment.retry.errors.max_attempts_reached',
        };
      }

      const attemptNumber = await this.getAttemptNumber(goalId);

      track('payment_retry_started', {
        payment_intent_id: paymentIntentId,
        goal_id: goalId || 'unknown',
        attempt_number: attemptNumber,
        card_last4: cardLast4 || 'unknown',
        amount,
        currency,
      });

      console.log('[PaymentRetry] Starting retry attempt', {
        paymentIntentId,
        attemptNumber,
        goalId,
        cardLast4,
      });

      const stripe = this.getStripeClient();

      const timeoutPromise = new Promise<RetryPaymentResult>((resolve) => {
        setTimeout(() => {
          console.warn('[PaymentRetry] Retry timeout after 10 seconds');
          resolve({
            success: false,
            outcome: 'timeout',
            errorType: 'timeout',
            errorMessage: 'payment.retry.errors.timeout',
          });
        }, RETRY_TIMEOUT_MS);
      });

      const retryPromise = this.executeRetry(
        stripe,
        paymentIntentId,
        paymentMethodId,
        {
          goalId,
          userId,
          amount,
          currency,
          cardLast4,
          cardBrand,
          attemptNumber,
        }
      );

      const result = await Promise.race([retryPromise, timeoutPromise]);

      if (result.success) {
        track('payment_retry_success', {
          payment_intent_id: paymentIntentId,
          goal_id: goalId || 'unknown',
          attempt_number: attemptNumber,
          amount,
          currency,
        });
      } else {
        track('payment_retry_failed', {
          payment_intent_id: paymentIntentId,
          goal_id: goalId || 'unknown',
          attempt_number: attemptNumber,
          error_type: result.errorType || 'unknown',
          error_code: result.rawError?.code || 'unknown',
          outcome: result.outcome,
        });
      }

      this.releaseLock(paymentIntentId);
      return result;
    } catch (error) {
      console.error('[PaymentRetry] Exception during retry:', error);
      this.releaseLock(paymentIntentId);

      return {
        success: false,
        outcome: 'different_error',
        errorType: 'unknown_error',
        errorMessage: 'payment.retry.errors.unknown_error',
        rawError: {
          type: 'api_error',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }

  /**
   * Execute the actual retry using Stripe confirmCardPayment
   */
  private async executeRetry(
    stripe: any,
    paymentIntentId: string,
    paymentMethodId: string,
    context: {
      goalId?: string;
      userId: string;
      amount: number;
      currency: string;
      cardLast4?: string;
      cardBrand?: string;
      attemptNumber: number;
    }
  ): Promise<RetryPaymentResult> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      const previousError = paymentIntent.last_payment_error;

      const confirmed = await stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
      });

      if (confirmed.status === 'requires_action') {
        console.log('[PaymentRetry] 3D Secure authentication required');
        return {
          success: false,
          outcome: 'different_error',
          paymentIntentId: confirmed.id,
          requiresAction: true,
          clientSecret: confirmed.client_secret || undefined,
          errorType: 'requires_3ds',
          errorMessage: 'payment.retry.errors.requires_3ds',
        };
      }

      if (confirmed.status === 'succeeded') {
        console.log('[PaymentRetry] Payment succeeded');
        return {
          success: true,
          outcome: 'success',
          paymentIntentId: confirmed.id,
        };
      }

      const currentError = confirmed.last_payment_error;
      if (currentError) {
        const categorized = stripeErrorCategorizationService.categorizeError(
          currentError as StripeError
        );

        await paymentAttemptsService.createPaymentAttempt({
          goalId: context.goalId,
          userId: context.userId,
          stripePaymentIntentId: paymentIntentId,
          stripeError: currentError as StripeError,
          amount: context.amount,
          currency: context.currency,
          cardLast4: context.cardLast4,
          cardBrand: context.cardBrand,
        });

        const isSameError =
          previousError &&
          previousError.code === currentError.code &&
          previousError.decline_code === currentError.decline_code;

        return {
          success: false,
          outcome: isSameError ? 'same_error' : 'different_error',
          paymentIntentId: confirmed.id,
          errorType: categorized.type,
          errorMessage: categorized.userMessage,
          rawError: currentError as StripeError,
        };
      }

      return {
        success: false,
        outcome: 'different_error',
        errorType: 'unknown_error',
        errorMessage: 'payment.failed.errorMessages.unknown_error',
      };
    } catch (error) {
      console.error('[PaymentRetry] Stripe API error:', error);

      if (error && typeof error === 'object' && 'type' in error) {
        const stripeError = error as StripeError;
        const categorized = stripeErrorCategorizationService.categorizeError(stripeError);

        await paymentAttemptsService.createPaymentAttempt({
          goalId: context.goalId,
          userId: context.userId,
          stripePaymentIntentId: paymentIntentId,
          stripeError,
          amount: context.amount,
          currency: context.currency,
          cardLast4: context.cardLast4,
          cardBrand: context.cardBrand,
        });

        return {
          success: false,
          outcome: 'different_error',
          errorType: categorized.type,
          errorMessage: categorized.userMessage,
          rawError: stripeError,
        };
      }

      return {
        success: false,
        outcome: 'different_error',
        errorType: 'unknown_error',
        errorMessage: 'payment.failed.errorMessages.unknown_error',
      };
    }
  }
}

export const paymentRetryService = new PaymentRetryService();
