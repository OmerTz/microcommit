/**
 * Add Payment Method Screen Handlers
 * Business logic for payment method validation and processing
 */

import { Platform } from 'react-native';
import { t } from '@/constants/translations';

/**
 * Validates card number using Luhn algorithm
 * @param cardNumber - Card number string (with or without spaces/dashes)
 * @returns boolean indicating if card number is valid
 */
export function validateCardNumberLuhn(cardNumber: string): boolean {
  // Remove all non-digit characters
  const digits = cardNumber.replace(/\D/g, '');

  // Must be between 13-19 digits (standard card lengths)
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  // Luhn algorithm implementation
  let sum = 0;
  let isEven = false;

  // Loop through digits from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validates card expiry date (MM/YY format)
 * @param expiry - Expiry string in MM/YY format
 * @returns boolean indicating if expiry is valid and not in the past
 */
export function validateExpiry(expiry: string): boolean {
  // Remove spaces and slashes
  const cleaned = expiry.replace(/[\s/]/g, '');

  // Must be 4 digits
  if (cleaned.length !== 4 || !/^\d{4}$/.test(cleaned)) {
    return false;
  }

  const month = parseInt(cleaned.substring(0, 2), 10);
  const year = parseInt(cleaned.substring(2, 4), 10);

  // Validate month range
  if (month < 1 || month > 12) {
    return false;
  }

  // Check if expiry is in the past
  const now = new Date();
  const currentYear = now.getFullYear() % 100; // Get last 2 digits
  const currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed

  if (year < currentYear) {
    return false;
  }

  if (year === currentYear && month < currentMonth) {
    return false;
  }

  return true;
}

/**
 * Validates CVC code
 * @param cvc - CVC string
 * @returns boolean indicating if CVC is valid (3-4 digits)
 */
export function validateCVC(cvc: string): boolean {
  const cleaned = cvc.trim();
  return /^\d{3,4}$/.test(cleaned);
}

/**
 * Validates billing ZIP code (US format)
 * @param zip - ZIP code string
 * @returns boolean indicating if ZIP is valid (5 digits)
 */
export function validateBillingZip(zip: string): boolean {
  const cleaned = zip.trim();
  return /^\d{5}$/.test(cleaned);
}

/**
 * Validates cardholder name
 * @param name - Cardholder name string
 * @returns object with valid boolean and optional error message
 */
export function validateCardholderName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return {
      valid: false,
      error: t('payment.addPaymentMethod.errors.cardholderNameInvalid'),
    };
  }

  return { valid: true };
}

/**
 * Checks if Apple Pay is available on this device
 * @returns boolean indicating if Apple Pay is supported
 */
export function isApplePayAvailable(): boolean {
  return Platform.OS === 'ios';
}

/**
 * Checks if Google Pay is available on this device
 * @returns boolean indicating if Google Pay is supported
 */
export function isGooglePayAvailable(): boolean {
  return Platform.OS === 'android';
}
