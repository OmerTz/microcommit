/**
 * Stripe Error Categorization Service
 * Categorizes Stripe payment errors into user-friendly types
 */

import type {
  StripeError,
  CategorizedError,
  PaymentErrorType,
} from './paymentErrorTypes';

class StripeErrorCategorizationService {
  /**
   * Categorize Stripe error into user-friendly type with message and retry guidance
   */
  categorizeError(error: StripeError): CategorizedError {
    const errorType = this.determineErrorType(error);
    const userMessage = this.getUserMessage(errorType);
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
   * Priority: decline_code > code
   */
  private determineErrorType(error: StripeError): PaymentErrorType {
    const code = error.code?.toLowerCase();
    const declineCode = error.decline_code?.toLowerCase();

    if (declineCode) {
      const declineType = this.categorizeByDeclineCode(declineCode);
      if (declineType) return declineType;
    }

    if (code) {
      const codeType = this.categorizeByErrorCode(code);
      if (codeType) return codeType;
    }

    return 'unknown_error';
  }

  /**
   * Categorize by Stripe decline_code
   */
  private categorizeByDeclineCode(declineCode: string): PaymentErrorType | null {
    if (declineCode === 'insufficient_funds') {
      return 'insufficient_funds';
    }

    if (['expired_card', 'card_expired'].includes(declineCode)) {
      return 'expired_card';
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

    if (['authentication_required', 'approve_with_id'].includes(declineCode)) {
      return 'requires_3ds';
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

    return null;
  }

  /**
   * Categorize by Stripe error code
   */
  private categorizeByErrorCode(code: string): PaymentErrorType | null {
    if (['card_declined', 'card_decline_rate_limit_exceeded'].includes(code)) {
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
      ['authentication_required', 'payment_intent_authentication_failure'].includes(
        code
      )
    ) {
      return 'requires_3ds';
    }

    if (
      ['api_connection_error', 'api_error', 'rate_limit', 'processing_error'].includes(
        code
      )
    ) {
      return 'network_error';
    }

    return null;
  }

  /**
   * Get user-friendly error message
   */
  private getUserMessage(type: PaymentErrorType): string {
    const messages: Record<PaymentErrorType, string> = {
      insufficient_funds: "Your card doesn't have enough funds for this commitment",
      card_declined: 'Your card was declined. Please try a different payment method.',
      invalid_card_details:
        'Card details appear to be incorrect. Please check and try again.',
      expired_card: 'This card has expired. Please use a different card.',
      requires_3ds: 'Your bank requires additional authentication.',
      network_error: 'Connection issue. Please check your internet and try again.',
      unknown_error: 'Something went wrong. Please try again or contact support.',
    };

    return messages[type];
  }

  /**
   * Determine if error is retryable by the user
   */
  private isRetryable(type: PaymentErrorType): boolean {
    const retryableErrors: PaymentErrorType[] = [
      'network_error',
      'requires_3ds',
      'invalid_card_details',
      'insufficient_funds',
    ];

    return retryableErrors.includes(type);
  }

  /**
   * Get suggested action for user to resolve error
   */
  private getSuggestedAction(type: PaymentErrorType): string | undefined {
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
