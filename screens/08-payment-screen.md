# Payment Screen

## Overview
The Payment Screen handles the micro-commitment payment setup using Stripe. It collects payment method information to charge users if they fail their goal, with clear communication about the conditional nature of the charge.

## Screen Purpose
- Securely collect payment method (credit card)
- Authorize $X hold for potential charity donation
- Explain payment will only process if goal fails
- Build trust through transparency and security
- Complete goal creation flow
- Comply with payment regulations

## Access
- **Entry Points**:
  - Goal Creation Form → Step 4 "Create Goal & Pay" button
  - Goal Edit → Update payment method
- **Exit Points**:
  - Successful setup → Goal Confirmation Screen → Dashboard
  - Payment failed → Error state (retry or cancel)
  - Cancel → Confirmation modal → Discard goal or back to form

---

## Layout Structure

### Header Section
**Elements**:
1. **Back Button** (top left)
   - Returns to Goal Review (Step 4)
   - Preserves goal draft

2. **Title**: "Secure your commitment"
   - Font: Inter Bold, 24px
   - Color: Dark gray

3. **Subtitle**: "We'll only charge if you don't succeed"
   - Font: Inter Regular, 16px
   - Color: Medium gray
   - Emphasis on conditional charge

---

### Goal Summary Card (Top)
**Quick Reference**:
```
┌─────────────────────────────────────┐
│ Go to gym 3x per week               │
│ 30 days • 12 check-ins              │
│                                     │
│ Commitment: $15 → Red Cross         │
│ If you succeed: Full refund         │
└─────────────────────────────────────┘
```

**Elements**:
- Goal name
- Duration and check-in count
- Commitment amount and charity
- Success refund promise

---

### Payment Method Section

**Stripe Card Input**:

```
┌─────────────────────────────────────┐
│ Credit or Debit Card                │
│ ┌─────────────────────────────────┐ │
│ │ 4242 4242 4242 4242             │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌───────────┐  ┌─────────────────┐ │
│ │ MM / YY   │  │ CVC             │ │
│ └───────────┘  └─────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ZIP Code                        │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Stripe Elements Integration**:
- Use Stripe's pre-built CardElement
- Handles validation automatically
- Secure tokenization (no card data stored)
- PCI compliant

**Security Badges**:
- Stripe logo: "Powered by Stripe"
- Lock icon: "Your payment info is encrypted"
- Text: "We never store your card details"

---

### Payment Authorization Explanation

**Info Box** (light blue background):
```
┌─────────────────────────────────────┐
│ ℹ️ How it works:                    │
│                                     │
│ • We'll authorize $15 on your card │
│ • Charge happens ONLY if you fail  │
│ • If you succeed: $15 refunded     │
│ • Full transparency: Track in app  │
└─────────────────────────────────────┘
```

**Legal/Compliance Text**:
- "By adding a payment method, you authorize MicroCommit to charge $15 to your card if you don't complete your goal."
- "Funds will be donated to [Charity Name] as specified."
- Links: Terms of Service, Payment Policy

---

### Action Buttons

**Primary: "Authorize & Start Goal" Button**:
```
┌─────────────────────────────────────┐
│    Authorize $15 & Start Goal       │
└─────────────────────────────────────┘
```
- Full-width
- Height: 56px
- Background: Brand teal (#2DD4BF)
- Font: Inter Bold, 18px, white
- Disabled until card info valid
- Loading state: Spinner + "Processing..."

**Secondary: "Cancel" Link**:
- Text link below button
- "Not ready? Cancel and save draft"
- Color: Medium gray
- Tap: Confirmation modal

---

## Interactions

### Card Input
**Real-Time Validation**:
- Card number: Auto-format with spaces (4242 4242 4242 4242)
- Expiry: Auto-format (MM/YY), validate future date
- CVC: 3-4 digits, masked input
- ZIP: 5 digits (US), flexible for international
- Errors shown below field, red border on invalid

### "Authorize" Button Tap
**Flow**:
1. User taps "Authorize & Start Goal"
2. Disable button, show loading spinner
3. Stripe creates payment method token
4. Send token to backend:
   - Create Stripe Customer
   - Attach payment method
   - Create PaymentIntent with `capture_method: manual`
   - Authorize (hold) $15 on card
5. If successful:
   - Save goal to database with `status: active`
   - Navigate to Goal Confirmation Screen
   - Show success message
6. If failed:
   - Show error banner (inline)
   - Re-enable button
   - Allow retry

**Error Handling**:
- Card declined: "Your card was declined. Try another card."
- Insufficient funds: "Insufficient funds. Try another card or lower amount."
- Invalid card: "Card number is invalid."
- Network error: "Connection failed. Try again."
- Generic error: "Payment failed. Please contact support."

### Cancel Button Tap
**Confirmation Modal**:
- Title: "Cancel goal creation?"
- Message: "Your goal will be saved as a draft. You can finish it later."
- Buttons:
  - "Yes, cancel" (destructive, red)
  - "Keep going" (primary, teal)

---

## States & Loading

### Initial Load
- Show goal summary (from previous step)
- Empty card input (focus on card number)
- "Authorize" button disabled

### Processing Payment
**Loading Overlay**:
- Semi-transparent background
- Spinner (center)
- Text: "Securely processing payment..."
- "This may take a few seconds"
- Disable all interactions

### Success State
**Quick Success Feedback** (0.5s):
- Green checkmark animation
- "Payment authorized!"
- Auto-navigate to confirmation screen

### Error State
**Error Banner** (inline, top of payment section):
```
┌─────────────────────────────────────┐
│ ⚠️ Payment failed                   │
│ Your card was declined. Try another│
│ card or contact your bank.         │
│ [Retry]                             │
└─────────────────────────────────────┘
```
- Red/amber background
- Specific error message
- "Retry" button or "Try another card"
- Dismissible (X icon)

---

## Visual Design

### Color Palette
- **Primary**: Teal (#2DD4BF) for authorize button
- **Background**: White or light gray (#F9FAFB)
- **Cards**: White with shadow
- **Security**: Blue (#3B82F6) for info box
- **Error**: Red (#EF4444)
- **Success**: Green (#22C55E)

### Typography
- **Title**: Inter Bold, 24px
- **Subtitle**: Inter Regular, 16px
- **Labels**: Inter Medium, 14px
- **Input Text**: Inter Regular, 16px
- **Button**: Inter Bold, 18px
- **Legal**: Inter Regular, 12px, gray

### Input Styling (Stripe default)
- Height: 48px
- Border: 1px solid light gray
- Border radius: 8px
- Focus: Border teal
- Error: Border red
- Padding: 12px

---

## Security & Compliance

### PCI Compliance
- Use Stripe Elements (iframes isolate card data)
- Never store card numbers
- Tokenization handles sensitive data
- SSL/TLS for all communications

### Payment Authorization (Not Charge)
- Use Stripe `PaymentIntent` with `capture_method: manual`
- Authorize (hold) $15, don't capture yet
- Capture only when goal fails
- Cancel hold when goal succeeds (refund)

### User Communication
- Clear messaging: "Authorize" not "Pay"
- Explain conditional charge upfront
- Show refund promise prominently
- Transparent about when/how charge happens

---

## Data Requirements

### API Endpoints
**Backend**:
- **POST /api/payments/create-intent**:
  - Input: `{ goal_id, amount, payment_method_token }`
  - Output: `{ client_secret, payment_intent_id }`
- **POST /api/goals/activate**:
  - Input: `{ goal_id, payment_intent_id }`
  - Output: `{ goal, status: active }`

**Stripe API**:
- `stripe.createPaymentMethod()`: Tokenize card
- `stripe.confirmPaymentIntent()`: Authorize hold
- Backend handles actual Stripe API calls for security

### Goal Payment Record
```json
{
  "goal_id": "uuid",
  "payment_intent_id": "pi_xxx",
  "amount": 15,
  "currency": "usd",
  "status": "authorized",
  "charity_id": "red_cross",
  "payment_method_id": "pm_xxx",
  "created_at": "timestamp"
}
```

---

## Analytics Events
- `payment_screen_viewed` (goal_id, amount)
- `payment_method_entered` (card_brand: visa/mastercard/etc)
- `payment_authorized` (goal_id, amount, duration)
- `payment_failed` (goal_id, error_type)
- `payment_cancelled` (goal_id, stage)
- `payment_retry_attempted` (attempt_number)

---

## Edge Cases

### Payment Already Authorized
- If user navigates back and forward:
  - Check if payment already processed
  - Show: "Payment already authorized. Continue to dashboard."
  - Skip payment, go directly to confirmation

### Card Requires 3D Secure (SCA)
- Stripe handles 3DS popup automatically
- Show modal: "Additional verification required"
- User completes 3DS in bank's popup
- Return to app after verification

### Multiple Payment Methods
- Post-MVP: Allow users to save multiple cards
- Select from saved cards or add new
- Show last 4 digits: "Visa •••• 4242"

### Expired Card During Goal
- If card expires before goal ends:
  - Send notification: "Update payment method"
  - Allow update without re-authorizing
  - Grace period: 7 days to update

---

## Accessibility
- Form labels properly associated
- Error messages announced by screen reader
- Card input: Native keyboard (number pad)
- High contrast for input fields
- Touch targets: Minimum 44x44px

---

## Future Enhancements
- Apple Pay / Google Pay support
- Saved payment methods (multiple cards)
- Bank account (ACH) payment option
- International payment methods (Alipay, iDEAL, etc.)
- Payment method management screen
- Auto-retry failed authorizations
- Payment installments for large commitments
- Split payment across multiple charities
