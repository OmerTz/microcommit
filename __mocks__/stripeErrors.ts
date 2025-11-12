/**
 * Mock Stripe Error Responses
 * For testing payment error categorization
 */

import type { StripeError } from '@/services/paymentErrorTypes';

export const mockStripeErrors = {
  insufficient_funds: {
    type: 'card_error',
    code: 'card_declined',
    decline_code: 'insufficient_funds',
    message: 'Your card has insufficient funds.',
  } as StripeError,

  card_declined_generic: {
    type: 'card_error',
    code: 'card_declined',
    decline_code: 'generic_decline',
    message: 'Your card was declined.',
  } as StripeError,

  card_declined_fraudulent: {
    type: 'card_error',
    code: 'card_declined',
    decline_code: 'fraudulent',
    message: 'Your card was declined due to suspected fraud.',
  } as StripeError,

  card_declined_stolen: {
    type: 'card_error',
    code: 'card_declined',
    decline_code: 'stolen_card',
    message: 'Your card has been reported stolen.',
  } as StripeError,

  invalid_number: {
    type: 'card_error',
    code: 'incorrect_number',
    message: 'Your card number is incorrect.',
  } as StripeError,

  invalid_cvc: {
    type: 'card_error',
    code: 'invalid_cvc',
    message: 'Your card security code is invalid.',
  } as StripeError,

  invalid_expiry: {
    type: 'card_error',
    code: 'invalid_expiry_year',
    message: 'Your card expiration year is invalid.',
  } as StripeError,

  expired_card_code: {
    type: 'card_error',
    code: 'expired_card',
    message: 'Your card has expired.',
  } as StripeError,

  expired_card_decline: {
    type: 'card_error',
    code: 'card_declined',
    decline_code: 'expired_card',
    message: 'Your card has expired.',
  } as StripeError,

  requires_3ds_code: {
    type: 'card_error',
    code: 'authentication_required',
    message: 'Your card requires authentication.',
  } as StripeError,

  requires_3ds_decline: {
    type: 'card_error',
    code: 'card_declined',
    decline_code: 'authentication_required',
    message: 'Authentication is required for this card.',
  } as StripeError,

  authentication_failure: {
    type: 'card_error',
    code: 'payment_intent_authentication_failure',
    message: 'Authentication failed.',
  } as StripeError,

  network_error_connection: {
    type: 'api_connection_error',
    code: 'api_connection_error',
    message: 'Network connection failed.',
  } as StripeError,

  network_error_api: {
    type: 'api_error',
    code: 'api_error',
    message: 'An error occurred with our payment processor.',
  } as StripeError,

  network_error_processing: {
    type: 'api_error',
    code: 'processing_error',
    message: 'An error occurred while processing your payment.',
  } as StripeError,

  unknown_error_no_code: {
    type: 'api_error',
    message: 'An unknown error occurred.',
  } as StripeError,

  unknown_error_unrecognized: {
    type: 'card_error',
    code: 'unrecognized_code',
    message: 'An error occurred.',
  } as StripeError,
};

export type MockErrorKey = keyof typeof mockStripeErrors;
