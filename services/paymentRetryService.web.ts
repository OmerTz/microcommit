/**
 * Payment Retry Service (Web Platform)
 * Web platform does not support payment retry functionality
 * This is a stub implementation that throws appropriate errors
 */

import { t } from '@/constants/translations';
import type { StripeError } from './paymentErrorTypes';

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
  /**
   * Check if payment intent can be retried
   * Always returns false on web
   */
  async canRetryPayment(_goalId: string): Promise<boolean> {
    return false;
  }

  /**
   * Retry payment - not supported on web
   */
  async retryPayment(_params: RetryPaymentParams): Promise<RetryPaymentResult> {
    console.warn('[PaymentRetry] Payment retry not supported on web platform');

    return {
      success: false,
      outcome: 'different_error',
      errorType: 'platform_not_supported',
      errorMessage: t('payment.retry.errors.platform_not_supported'),
    };
  }
}

export const paymentRetryService = new PaymentRetryService();
