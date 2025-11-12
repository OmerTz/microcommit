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
   * Get translation key for user-friendly error message
   * Returns i18n key that should be resolved on the frontend
   */
  private getUserMessage(type: PaymentErrorType): string {
    const translationKeys: Record<PaymentErrorType, string> = {
      insufficient_funds: 'payment.failed.errorMessages.insufficient_funds',
      card_declined: 'payment.failed.errorMessages.card_declined',
      invalid_card_details: 'payment.failed.errorMessages.invalid_card_details',
      expired_card: 'payment.failed.errorMessages.expired_card',
      requires_3ds: 'payment.failed.errorMessages.requires_3ds',
      network_error: 'payment.failed.errorMessages.network_error',
      unknown_error: 'payment.failed.errorMessages.unknown_error',
    };

    return translationKeys[type];
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
   * Get translation key for suggested action to resolve error
   * Returns i18n key that should be resolved on the frontend
   */
  private getSuggestedAction(type: PaymentErrorType): string | undefined {
    const translationKeys: Partial<Record<PaymentErrorType, string>> = {
      insufficient_funds: 'payment.failed.suggestedActions.insufficient_funds',
      card_declined: 'payment.failed.suggestedActions.card_declined',
      invalid_card_details: 'payment.failed.suggestedActions.invalid_card_details',
      expired_card: 'payment.failed.suggestedActions.expired_card',
      requires_3ds: 'payment.failed.suggestedActions.requires_3ds',
      network_error: 'payment.failed.suggestedActions.network_error',
    };

    return translationKeys[type];
  }
}

export const stripeErrorCategorizationService =
  new StripeErrorCategorizationService();
