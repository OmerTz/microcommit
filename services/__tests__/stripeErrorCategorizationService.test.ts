/**
 * Unit Tests for Stripe Error Categorization Service
 * Tests all error type mappings and categorization logic
 */

import { stripeErrorCategorizationService } from '../stripeErrorCategorizationService';
import { mockStripeErrors } from '../../__mocks__/stripeErrors';
import type { StripeError } from '../paymentErrorTypes';

describe('StripeErrorCategorizationService', () => {
  describe('insufficient_funds', () => {
    it('should categorize insufficient_funds decline_code', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.insufficient_funds
      );

      expect(result.type).toBe('insufficient_funds');
      expect(result.retryable).toBe(true);
      expect(result.userMessage).toContain('enough funds');
      expect(result.suggestedAction).toContain('Add funds');
    });
  });

  describe('card_declined', () => {
    it('should categorize generic_decline', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.card_declined_generic
      );

      expect(result.type).toBe('card_declined');
      expect(result.retryable).toBe(false);
      expect(result.userMessage).toContain('declined');
    });

    it('should categorize fraudulent decline', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.card_declined_fraudulent
      );

      expect(result.type).toBe('card_declined');
      expect(result.retryable).toBe(false);
    });

    it('should categorize stolen_card decline', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.card_declined_stolen
      );

      expect(result.type).toBe('card_declined');
      expect(result.retryable).toBe(false);
    });
  });

  describe('invalid_card_details', () => {
    it('should categorize incorrect_number', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.invalid_number
      );

      expect(result.type).toBe('invalid_card_details');
      expect(result.retryable).toBe(true);
      expect(result.userMessage).toContain('incorrect');
    });

    it('should categorize invalid_cvc', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.invalid_cvc
      );

      expect(result.type).toBe('invalid_card_details');
      expect(result.retryable).toBe(true);
    });

    it('should categorize invalid_expiry', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.invalid_expiry
      );

      expect(result.type).toBe('invalid_card_details');
      expect(result.retryable).toBe(true);
    });
  });

  describe('expired_card', () => {
    it('should categorize expired_card code', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.expired_card_code
      );

      expect(result.type).toBe('expired_card');
      expect(result.retryable).toBe(false);
      expect(result.userMessage).toContain('expired');
    });

    it('should categorize expired_card decline_code', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.expired_card_decline
      );

      expect(result.type).toBe('expired_card');
      expect(result.retryable).toBe(false);
    });
  });

  describe('requires_3ds', () => {
    it('should categorize authentication_required code', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.requires_3ds_code
      );

      expect(result.type).toBe('requires_3ds');
      expect(result.retryable).toBe(true);
      expect(result.userMessage).toContain('authentication');
    });

    it('should categorize authentication_required decline_code', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.requires_3ds_decline
      );

      expect(result.type).toBe('requires_3ds');
      expect(result.retryable).toBe(true);
    });

    it('should categorize payment_intent_authentication_failure', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.authentication_failure
      );

      expect(result.type).toBe('requires_3ds');
      expect(result.retryable).toBe(true);
    });
  });

  describe('network_error', () => {
    it('should categorize api_connection_error', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.network_error_connection
      );

      expect(result.type).toBe('network_error');
      expect(result.retryable).toBe(true);
      expect(result.userMessage).toContain('Connection');
    });

    it('should categorize api_error', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.network_error_api
      );

      expect(result.type).toBe('network_error');
      expect(result.retryable).toBe(true);
    });

    it('should categorize processing_error', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.network_error_processing
      );

      expect(result.type).toBe('network_error');
      expect(result.retryable).toBe(true);
    });
  });

  describe('unknown_error', () => {
    it('should categorize errors with no code', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.unknown_error_no_code
      );

      expect(result.type).toBe('unknown_error');
      expect(result.retryable).toBe(false);
      expect(result.userMessage).toContain('wrong');
    });

    it('should categorize unrecognized error codes', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.unknown_error_unrecognized
      );

      expect(result.type).toBe('unknown_error');
      expect(result.retryable).toBe(false);
    });
  });

  describe('priority handling', () => {
    it('should prioritize decline_code over code', () => {
      const error: StripeError = {
        type: 'card_error',
        code: 'card_declined',
        decline_code: 'insufficient_funds',
        message: 'Insufficient funds',
      };

      const result = stripeErrorCategorizationService.categorizeError(error);

      expect(result.type).toBe('insufficient_funds');
    });
  });

  describe('return structure', () => {
    it('should return complete CategorizedError object', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.insufficient_funds
      );

      expect(result).toHaveProperty('type');
      expect(result).toHaveProperty('userMessage');
      expect(result).toHaveProperty('rawError');
      expect(result).toHaveProperty('retryable');
      expect(result).toHaveProperty('suggestedAction');
      expect(result.rawError).toBe(mockStripeErrors.insufficient_funds);
    });

    it('should include suggested action for retryable errors', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.insufficient_funds
      );

      expect(result.suggestedAction).toBeDefined();
      expect(typeof result.suggestedAction).toBe('string');
    });

    it('may not include suggested action for non-retryable errors', () => {
      const result = stripeErrorCategorizationService.categorizeError(
        mockStripeErrors.card_declined_generic
      );

      if (result.suggestedAction) {
        expect(typeof result.suggestedAction).toBe('string');
      }
    });
  });
});
