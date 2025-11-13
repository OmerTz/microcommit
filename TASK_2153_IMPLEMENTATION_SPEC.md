# Task 2153: Add New Payment Method Screen Implementation Specification

## Overview
Create a secure payment method collection screen using Stripe Elements (@stripe/stripe-react-native) with real-time validation and alternative payment methods.

## Files to Create

### 1. Payment Translations Update
**File**: `constants/translations/payment.ts`

Add new translations under `payment.addPaymentMethod`:

```typescript
addPaymentMethod: {
  title: 'Add Payment Method',
  subtitle: 'Secure payment with Stripe',

  fields: {
    cardNumber: 'Card Number',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiry: 'Expiry',
    expiryPlaceholder: 'MM/YY',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    cardholderName: 'Cardholder Name',
    cardholderNamePlaceholder: 'John Doe',
    billingZip: 'Billing ZIP',
    billingZipPlaceholder: '12345',
    saveForFuture: 'Save for future goals',
  },

  errors: {
    cardNumberRequired: 'Card number is required',
    cardNumberInvalid: 'Invalid card number (Luhn check failed)',
    expiryRequired: 'Expiry date is required',
    expiryInvalid: 'Invalid expiry date format (use MM/YY)',
    expiryPast: 'Card has expired',
    cvcRequired: 'CVC is required',
    cvcInvalid: 'Invalid CVC format',
    cardholderNameRequired: 'Cardholder name is required',
    cardholderNameTooShort: 'Name must be at least 2 characters',
    billingZipRequired: 'Billing ZIP is required',
    billingZipInvalid: 'Invalid ZIP code format',
    tokenizationFailed: 'Failed to process card details',
    stripeSdkUnavailable: 'Payment system unavailable',
  },

  security: {
    securedByStripe: 'Secured by Stripe',
    neverStoreDetails: 'We never store your full card details',
  },

  buttons: {
    processPayment: 'Process Payment',
    back: 'Back',
    useApplePay: 'Pay with Apple Pay',
    useGooglePay: 'Pay with Google Pay',
  },

  alternativePayments: {
    orPayWith: 'Or pay with',
  },

  processing: {
    title: 'Processing payment...',
    subtitle: 'This may take a moment',
  },

  success: {
    title: 'Payment method added!',
    subtitle: 'Your payment method is ready to use',
  },
}
```

### 2. Styles File
**File**: `app/(payment)/add-payment-method.styles.ts`

Create responsive styles following the payment-failed pattern:
- Mobile-first approach
- Teal primary color (#2DD4BF)
- Gray scale for text and backgrounds
- Proper touch targets (44x44px minimum)
- Card-style input containers with proper spacing
- Security badge styling
- Button styles (primary and back link)
- Animation support for React Native Reanimated

Key style components:
- `container`: Full screen with Gray 50 background
- `scrollContent`: Padded scroll area
- `header`: Back button section
- `titleContainer`: Title and subtitle
- `formContainer`: Input fields section
- `inputGroup`: Individual input with label and error
- `cardFieldContainer`: Stripe CardField wrapper
- `checkboxContainer`: Save for future checkbox
- `securityBadge`: Lock icon + Stripe badge
- `alternativePaymentsContainer`: Apple/Google Pay buttons
- `primaryButton`: Process Payment CTA
- `backLink`: Text link for back navigation

### 3. Handlers File
**File**: `app/(payment)/add-payment-method.handlers.ts`

Implement business logic:

```typescript
import { Alert, Platform } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import * as analytics from '@/services/analytics';
import { t } from '@/constants/translations';

// Luhn algorithm for card number validation
export function validateCardNumberLuhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// Expiry validation (MM/YY format, not in past)
export function validateExpiry(expiry: string): {
  valid: boolean;
  error?: string;
} {
  const parts = expiry.split('/');
  if (parts.length !== 2) {
    return { valid: false, error: t('payment.addPaymentMethod.errors.expiryInvalid') };
  }

  const month = parseInt(parts[0], 10);
  const year = parseInt(parts[1], 10) + 2000; // YY to YYYY

  if (month < 1 || month > 12) {
    return { valid: false, error: t('payment.addPaymentMethod.errors.expiryInvalid') };
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { valid: false, error: t('payment.addPaymentMethod.errors.expiryPast') };
  }

  return { valid: true };
}

// CVC validation (3-4 digits)
export function validateCVC(cvc: string): boolean {
  const digits = cvc.replace(/\D/g, '');
  return digits.length === 3 || digits.length === 4;
}

// ZIP validation (5 digits)
export function validateBillingZip(zip: string): boolean {
  return /^\d{5}$/.test(zip);
}

// Cardholder name validation
export function validateCardholderName(name: string): {
  valid: boolean;
  error?: string;
} {
  if (!name.trim()) {
    return { valid: false, error: t('payment.addPaymentMethod.errors.cardholderNameRequired') };
  }

  if (name.trim().length < 2) {
    return { valid: false, error: t('payment.addPaymentMethod.errors.cardholderNameTooShort') };
  }

  return { valid: true };
}

// Process payment handler
export async function handleProcessPayment({
  cardDetails,
  cardholderName,
  billingZip,
  saveForFuture,
  onSuccess,
  onError,
}: {
  cardDetails: any; // Stripe CardField details
  cardholderName: string;
  billingZip: string;
  saveForFuture: boolean;
  onSuccess: (paymentMethod: any) => void;
  onError: (error: string) => void;
}): Promise<void> {
  try {
    analytics.track('payment_method_add_started', {
      save_for_future: saveForFuture,
      platform: Platform.OS,
    });

    // Validate cardholder name
    const nameValidation = validateCardholderName(cardholderName);
    if (!nameValidation.valid) {
      onError(nameValidation.error!);
      return;
    }

    // Validate billing ZIP
    if (!validateBillingZip(billingZip)) {
      onError(t('payment.addPaymentMethod.errors.billingZipInvalid'));
      return;
    }

    // Create payment method token using Stripe SDK
    // This will be implemented in the component using useStripe()

    analytics.track('payment_method_changed', {
      save_for_future: saveForFuture,
      success: true,
    });

    onSuccess({ cardholderName, billingZip, saveForFuture });
  } catch (error) {
    console.error('[ADD_PAYMENT_METHOD] Error:', error);
    analytics.track('payment_method_add_failed', {
      error: error instanceof Error ? error.message : 'unknown',
    });
    onError(t('payment.addPaymentMethod.errors.tokenizationFailed'));
  }
}

// Apple Pay availability check
export function isApplePayAvailable(): boolean {
  return Platform.OS === 'ios';
}

// Google Pay availability check
export function isGooglePayAvailable(): boolean {
  return Platform.OS === 'android';
}
```

### 4. Main Screen Component
**File**: `app/(payment)/add-payment-method.tsx`

Implement using:
- @stripe/stripe-react-native CardField component
- Real-time validation on blur and submit
- Inline error display (red text below fields)
- Proper keyboard types (numeric for card/CVC/ZIP, default for name)
- Loading states during tokenization
- Navigation to payment-failed on error
- Analytics tracking

Key sections:
1. Header with back button
2. Lock icon + "Secured by Stripe" badge
3. Form with:
   - CardField (Stripe component for card number, expiry, CVC)
   - Cardholder name TextInput
   - Billing ZIP TextInput
   - "Save for future goals" checkbox (default checked)
   - Inline validation errors
4. Alternative payment buttons (Apple Pay / Google Pay)
5. "Process Payment" primary button
6. "Back" link
7. Security disclaimer text

### 5. Web E2E Test
**File**: `web-e2e/screen-14-add-payment-method.test.js`

Follow ONE BIG TEST rule, test all scenarios:
1. Screen loads with all elements visible
2. Validate card number field (invalid input shows error)
3. Validate expiry field (past date shows error)
4. Validate CVC field (invalid format shows error)
5. Validate cardholder name (empty shows error)
6. Validate billing ZIP (invalid format shows error)
7. "Save for future" checkbox is checked by default
8. "Save for future" checkbox can be toggled
9. Security badges display ("Secured by Stripe", lock icon)
10. Apple Pay button shows on iOS (mock platform check)
11. Google Pay button shows on Android (mock platform check)
12. Process Payment button is enabled when all fields valid
13. Process Payment button shows loading state
14. Back link navigates to previous screen
15. Successful submission navigates forward
16. Failed submission shows inline errors
17. Test goBack/goForward navigation
18. Capture screenshots at each state

Use data-testid selectors:
- `add-payment-method-screen`
- `add-payment-method-back-button`
- `add-payment-method-card-field`
- `add-payment-method-cardholder-name`
- `add-payment-method-billing-zip`
- `add-payment-method-save-checkbox`
- `add-payment-method-apple-pay-button`
- `add-payment-method-google-pay-button`
- `add-payment-method-process-button`
- `add-payment-method-back-link`
- `add-payment-method-security-badge`
- `add-payment-method-error-{fieldName}`

Screenshot directory: `web-e2e/screenshots/screen-14/`

### 6. Mobile E2E Test
**File**: `mobile-e2e/screen-14-add-payment-method.test.js`

Similar to web test but for Release build:
- Use Detox matchers
- Test on real device keyboard behaviors
- Test Apple Pay on iOS simulator
- Screenshot directory: `mobile-e2e/screenshots/screen-14/`

### 7. Screen Documentation
**File**: `screens/14-add-payment-method-screen.md`

Follow the structure from `screens/13-payment-failed-screen.md`:
- Overview
- Screen Purpose
- Access (entry/exit points)
- Layout Structure (all UI sections)
- Interactions (button taps, field changes)
- States & Loading
- Visual Design (colors, typography, spacing, shadows, animations)
- Data Requirements
- Analytics Events
- Edge Cases
- Accessibility
- Error Handling
- Future Enhancements
- Testing Scenarios
- Dependencies
- Notes for Developers
- Version History

## Technical Requirements

### Stripe Integration
- Use `@stripe/stripe-react-native` CardField component
- Initialize with test publishable key from env
- Handle tokenization before sending to backend
- Never send raw card data to server
- PCI-compliant card handling

### Validation Rules
1. **Card Number**: Luhn algorithm validation
2. **Expiry**: MM/YY format, not in past
3. **CVC**: 3-4 digits
4. **Cardholder Name**: Min 2 characters, not empty
5. **Billing ZIP**: 5 digits (US format)

### Analytics Events
- `payment_method_add_started`: When screen loads
- `payment_method_changed`: On successful add
- `payment_method_add_failed`: On error
- `payment_method_back_tapped`: Back navigation

### Error Handling
- Show inline errors in red below each field
- Clear errors on field focus
- Validate on blur and submit
- Show friendly error messages (use i18n)

### Mobile Responsiveness
- Proper keyboard types:
  - Card number/CVC/ZIP: `numeric`
  - Cardholder name: `default`
- Auto-focus next field on valid input
- Dismiss keyboard on submit
- Safe area insets for iOS

## Implementation Order
1. Add translations to payment.ts
2. Create styles file
3. Create handlers file
4. Create main screen component
5. Create web E2E test
6. Create mobile E2E test
7. Create screen documentation

## Critical Rules
- NO hardcoded strings (use i18n)
- NO unit tests (only E2E)
- Use data-testid for web tests
- Follow ONE BIG TEST rule (single test file per screen)
- Mobile tests work with Release build
- Follow patterns from payment-failed.tsx
- All validation must be real-time (on blur)
- Security badges must be prominent

## Testing Checklist
- [ ] All translations present and used
- [ ] All data-testid attributes present
- [ ] Luhn validation works correctly
- [ ] Expiry validation prevents past dates
- [ ] CVC format validated
- [ ] Cardholder name min 2 chars
- [ ] Billing ZIP 5 digits
- [ ] "Save for future" checked by default
- [ ] Apple Pay shown on iOS
- [ ] Google Pay shown on Android
- [ ] Process Payment shows loading
- [ ] Back link navigates correctly
- [ ] Security badges visible
- [ ] Inline errors display in red
- [ ] Web E2E test passes
- [ ] Mobile E2E test passes
- [ ] Screenshots generated
- [ ] Documentation complete

## Notes
- This is a critical revenue flow screen
- Security and trust indicators are essential
- Error messages must be user-friendly
- Never expose technical details
- Analytics tracking is mandatory
- Follow existing payment-failed patterns
