# Payment Failure & Retry Flow

## Goal
Handle payment failures gracefully and guide users to successfully complete payment with minimal frustration, achieving 90%+ recovery rate within 24 hours.

## Entry Points
- Initial goal creation payment fails → Payment Error Screen
- Recurring payment fails (future feature) → Payment Update Required
- Goal modification requiring additional payment → Payment Screen
- Retry from notification → Payment Screen

## Flow Steps

### Step 1: Payment Failure Detection (Immediate)
**Technical Process**:
- Stripe payment intent fails
- Webhook receives failure notification
- Error categorized by type:
  - Insufficient funds
  - Card declined
  - Invalid card details
  - Expired card
  - Authentication required (3D Secure)
  - Network error
  - Unknown error

**Database Actions**:
- Create payment_attempts record with error details
- Update goal status to "payment_failed"
- Log failure reason and timestamp

**Next Screen**: Payment Failed Screen

### Step 2: Payment Failed Screen (Immediate)
**Screen**: Payment Failed
- **Elements**:
  - Warning icon (⚠️, not too alarming)
  - "Payment couldn't be processed" heading
  - **User-Friendly Error Message**:
    - Insufficient funds: "Your card doesn't have enough funds for this commitment ($X)"
    - Card declined: "Your card was declined. Please try a different payment method."
    - Invalid details: "Card details appear to be incorrect. Please check and try again."
    - Expired card: "This card has expired. Please use a different card."
    - 3D Secure required: "Your bank requires additional authentication."
    - Network error: "Connection issue. Please check your internet and try again."
    - Unknown: "Something went wrong. Please try again or contact support."

  - **Goal Summary** (reminder of what they're committing to):
    - Goal name
    - Commitment amount
    - Charity name

  - **Actions**:
    - "Try Again" button (primary) - same card
    - "Use Different Card" button (secondary)
    - "Need Help?" link (support chat)
    - "Cancel Goal" link (small, bottom) - with warning

  - **Reassurance Text**:
    - "Your goal hasn't been created yet. You can try again or use a different payment method."
    - "No charges have been made."

**User Actions**:
- Try again with same card → Retry Payment (Step 3a)
- Use different card → Add New Card (Step 3b)
- Cancel goal → Cancellation Confirmation (Step 5)
- Need help → Support Chat

**Next Screen**: Depends on user action

### Step 3a: Retry Payment - Same Card (5 seconds)
**Screen**: Processing Payment (Loading State)
- **Elements**:
  - Loading spinner
  - "Processing payment..."
  - Card ending: "•••• [last 4 digits]"
  - "This may take a moment"

**Technical Process**:
1. Create new Stripe payment intent
2. Attempt charge with same card
3. If 3D Secure required, launch authentication flow
4. Wait for webhook confirmation (10 second timeout)

**Outcomes**:
- **Success**: Go to Payment Success (Step 4)
- **Failure (same error)**: Show "Still not working. Try different card?" with "Use Different Card" button
- **Failure (different error)**: Back to Payment Failed Screen with new error
- **Timeout**: "Payment is taking longer than expected. Continue in background?"

**Next Screen**: Depends on outcome

### Step 3b: Add New Payment Method (30 seconds)
**Screen**: Add Payment Method
- **Elements**:
  - "Add a payment method" heading
  - Stripe payment form:
    - Card number input
    - Expiry date (MM/YY)
    - CVC code
    - Cardholder name
    - Billing ZIP code
  - "Save for future goals" checkbox (checked by default)
  - "Process Payment" button (primary)
  - "Back" link

  - **Alternative Payment Methods** (if available):
    - Apple Pay button (iOS)
    - Google Pay button (Android)
    - Bank account (ACH) - future feature

  - **Security Indicators**:
    - Lock icon + "Secured by Stripe"
    - "We never store your full card details"

**Validation**:
- Real-time card number validation (Luhn algorithm)
- Expiry date validation (not in past)
- CVC format validation
- All fields required

**User Action**: Enter card details and tap "Process Payment"
**Next Screen**: Processing Payment (Step 3a)

### Step 4: Payment Success (5 seconds)
**Screen**: Payment Successful
- **Elements**:
  - Large green checkmark animation
  - "Payment successful! ✅" heading
  - Confirmation message: "Your goal is now active!"
  - Receipt details (collapsible):
    - Amount charged: $X
    - Platform fee: $Y
    - Total: $Z
    - Payment method: Card ending •••• [last 4]
    - Date/time: [timestamp]
    - Transaction ID: [id]
  - "Email receipt sent to [email]"
  - "View My Goal" button (primary)
  - "Done" button (secondary)

**Technical Process**:
- Update goal status to "active"
- Record successful payment in payments table
- Schedule first check-in notification
- Send receipt email
- Send referee invitations (if any)
- Update user's saved payment methods

**User Action**: Tap "View My Goal" or "Done"
**Next Screen**: Goal Detail Screen or Dashboard

### Step 5: Cancel Goal (After Payment Failure)
**Screen**: Confirm Cancellation
- **Elements**:
  - Warning icon
  - "Cancel this goal?" heading
  - Message: "You're about to cancel this goal without completing payment. Are you sure?"
  - Goal summary (name, amount, charity)
  - "Your progress will not be saved."

  - **Actions**:
    - "Yes, Cancel Goal" button (destructive red)
    - "Keep Goal & Fix Payment" button (primary blue)

**If "Yes, Cancel Goal"**:
- Delete incomplete goal record
- Clear cached data
- Show toast: "Goal cancelled"
- Return to Dashboard

**If "Keep Goal & Fix Payment"**:
- Return to Payment Failed Screen (Step 2)

**Next Screen**: Dashboard or Payment Failed Screen

### Step 6: Multiple Retry Failures (After 3+ Failed Attempts)
**Screen**: Payment Help
- **Elements**:
  - "Having trouble with payment?" heading
  - Message: "We've noticed several payment attempts haven't gone through."

  - **Common Solutions** (expandable sections):
    - "Check your card balance"
    - "Contact your bank" (may be blocking charges)
    - "Try a different card"
    - "Use alternative payment method"

  - **Actions**:
    - "Try Different Card" button (primary)
    - "Contact Support" button (opens chat)
    - "Save Goal for Later" button (saves draft)
    - "Cancel Goal" link

  - **Support Availability**:
    - "Chat with us - usually responds in < 5 minutes"
    - Live chat status: "Online" (green dot) or "Away" (amber dot)

**User Actions**:
- Try different card → Add New Payment Method (Step 3b)
- Contact support → Support chat
- Save for later → Draft saved, return to Dashboard with notification "Goal saved as draft. Complete payment anytime!"
- Cancel → Cancel Goal (Step 5)

**Next Screen**: Depends on user action

### Step 7: Saved Draft Recovery (Re-entering from Dashboard)
**Entry Point**: User returns to app after saving draft

**Dashboard Indicator**:
- Banner at top: "You have an incomplete goal"
- Goal card with "Payment Required" badge
- Tap to resume

**Screen**: Resume Goal Payment
- **Elements**:
  - "Complete your goal commitment" heading
  - Goal summary (name, amount, charity, success criteria)
  - "Ready to commit?" message
  - "Complete Payment" button (primary)
  - "Edit Goal" link (modify details before paying)
  - "Delete Draft" link (small, bottom)

**User Actions**:
- Complete payment → Payment Method Screen (Step 3b)
- Edit goal → Goal Creation Flow (pre-filled)
- Delete draft → Confirmation → Goal deleted

**Next Screen**: Depends on user action

## Success Criteria
- **Recovery Rate**: 90%+ of failed payments successfully completed within 24 hours
- **Retry Success**: 60%+ succeed on first retry with different card
- **Support Contact**: <15% require support intervention
- **Draft Completion**: 70%+ of saved drafts eventually completed
- **Error Resolution Time**: Median time from failure to success < 10 minutes

## Error Handling

### Payment Processing Timeout
- **Cause**: Network latency, Stripe API slow response
- **UI**: "Payment is taking longer than expected"
- **Actions**:
  - "Continue in Background" button
  - "We'll notify you when it's done"
  - Notification when complete (success or failure)
  - If still pending after 5 minutes, send to pending review

### Webhook Failure (Payment Succeeded but Not Confirmed)
- **Technical**: Payment goes through but webhook doesn't reach server
- **UI**: User sees "Processing..." indefinitely
- **Handling**:
  - Background job polls Stripe every 30 seconds (max 10 attempts)
  - If confirmed: Update goal status, send success notification
  - If still uncertain: Mark as "payment_pending_verification"
  - Support team notified to manually verify
  - User sees: "Payment verification in progress. We'll confirm soon!"

### Card Requires 3D Secure Authentication
- **UI**: Launch Stripe 3D Secure modal
- **Steps**:
  1. Bank authentication screen (SMS code, app approval, etc.)
  2. User completes authentication
  3. Return to app
  4. Process payment
- **If Authentication Fails**:
  - Show: "Authentication failed. Try again?"
  - Option to use different card

### Payment Method Validation Errors
- **Invalid Card Number**: "Card number is invalid"
- **Invalid Expiry**: "Expiry date is invalid or in the past"
- **Invalid CVC**: "Security code must be 3-4 digits"
- **Invalid ZIP**: "ZIP code is required"
- All errors shown inline (real-time) with red text

### Stripe API Down
- **Detection**: Multiple 500 errors from Stripe
- **UI**: "Payment system temporarily unavailable"
- **Actions**:
  - "Save Goal for Later" (automatic draft save)
  - "Try Again in a Few Minutes"
  - "We'll notify you when it's working again"
- **System**: Auto-retry every 5 minutes, notify when available

## Edge Cases

### User Exits During Payment
- **Behavior**: Payment screen dismissed (back button, swipe, or app closed)
- **Handling**:
  - If payment not initiated: Save as draft, show banner on return
  - If payment in progress: Continue in background, send notification with result
  - If payment succeeded but user didn't see confirmation: Show success screen on next app open

### User Changes Card While Processing
- **Behavior**: User navigates away during "Processing..." state
- **Handling**:
  - Cancel current payment intent (if not completed)
  - Allow new payment method entry
  - Warn: "Previous payment cancelled. Ready to try again?"

### Duplicate Payment Attempts
- **Cause**: User taps "Try Again" multiple times quickly
- **Handling**:
  - Disable button after first tap
  - Show loading state
  - Prevent multiple Stripe intents for same goal
  - If multiple charges go through: Auto-refund duplicates within 1 hour

### Partial Payment (Rare)
- **Cause**: Payment held by bank, not fully processed
- **Detection**: Stripe webhook shows "requires_capture"
- **Handling**:
  - Display: "Payment pending bank approval"
  - Don't activate goal yet
  - Poll status every hour for 48 hours
  - After 48 hours: Auto-cancel if not confirmed, notify user

### Goal Modification After Payment Failure
- **Scenario**: User wants to change goal details (amount, charity) after payment fails
- **Handling**:
  - Allow editing from Payment Failed screen ("Edit Goal" link)
  - Save changes
  - Attempt payment with updated details
  - If amount decreased: Charge new amount
  - If amount increased: Charge difference (or full amount if easier)

### Refund Needed After Failed Goal
- **Scenario**: Payment succeeded, then goal creation failed (technical error)
- **Handling**:
  - Automatic refund initiated within 1 hour
  - User notified: "We couldn't create your goal. Full refund issued."
  - Email confirmation with refund details
  - Refund appears in 5-10 business days

### User Has No Payment Method Saved
- **Scenario**: First-time user, no saved cards
- **Handling**:
  - Show "Add Payment Method" directly (skip "Try Again" button)
  - After adding, process payment immediately
  - Option to save for future (checkbox)

### Bank Fraud Alert
- **Cause**: User's bank flags MicroCommit charge as suspicious
- **UI**: "Your bank may have blocked this charge"
- **Actions**:
  - "I'll contact my bank" button (saves draft)
  - "Try different card" button
  - Guidance: "Call the number on the back of your card and approve MicroCommit charges"
  - After bank approval: "Ready? Try Again" button

## Analytics Events
Track all payment failure scenarios:
- `payment_failed` (goal_id, error_code, error_message, card_type)
- `payment_retry_started` (attempt_number, same_card)
- `payment_retry_success` (attempts_before_success, time_to_success)
- `payment_retry_failed` (final_error, total_attempts)
- `payment_method_changed` (from_card_type, to_card_type)
- `payment_cancelled` (reason, attempts_made)
- `payment_draft_saved` (goal_id)
- `payment_draft_resumed` (goal_id, days_since_saved)
- `payment_support_contacted` (error_type)
- `payment_3ds_initiated`
- `payment_3ds_completed` (success, failure)
- `payment_webhook_timeout`

## Future Enhancements (Post-MVP)
- Alternative payment methods:
  - Apple Pay / Google Pay
  - PayPal
  - Bank account (ACH)
  - Buy Now Pay Later (Affirm, Klarna)
- Smart retry logic: Wait optimal time before retry (avoid rate limits)
- Payment plan option: Split commitment into smaller charges
- Card on file: Automatically try backup card if primary fails
- Proactive alerts: Warn user if card expiring soon
- Payment failure predictions: ML model to predict likely failures
- Instant refunds: Faster than standard Stripe timelines
- Virtual cards: Generate one-time use cards for privacy
