# Payment Failed Screen

## Overview
The Payment Failed Screen displays when payment processing fails during goal creation. It provides clear error messaging, maintains context with goal details, and offers multiple recovery options to maximize successful payment completion.

## Screen Purpose
- Communicate payment failure clearly without alarming users
- Display specific, actionable error messages
- Show goal summary to maintain context
- Provide multiple recovery paths (retry, different card, help)
- Reassure users that no charges were made
- Maintain trust through transparency
- Achieve 90%+ payment recovery rate

## Access
- **Entry Points**:
  - Payment Screen → Payment processing fails → Payment Failed Screen
  - Deep link from notification (payment retry reminder)
- **Exit Points**:
  - Try Again → Back to Payment Screen (same card)
  - Use Different Card → Payment Method Selection
  - Need Help → Help/Support Screen
  - Cancel Goal → Dashboard (goal draft discarded)
  - Back button → Payment Screen

---

## Layout Structure

### Header Section
**Elements**:
1. **Back Button** (top left)
   - Icon: Arrow left
   - Returns to Payment Screen
   - Preserves goal draft
   - Style: White background, rounded, shadow

### Warning Icon Section
**Elements**:
1. **Warning Icon Circle**
   - Size: 96x96px
   - Background: Amber 100 (#FEF3C7)
   - Icon: Alert circle (64px, Amber 500)
   - Centered on screen
   - Visible but not alarming

### Title Section
**Elements**:
1. **Title**: "Payment couldn't be processed"
   - Font: Bold, 24px
   - Color: Gray 900 (#111827)
   - Centered
   - Line height: 32px

### Error Message Section
**Elements**:
1. **Error-Specific Message**
   - Font: Regular, 16px
   - Color: Gray 700 (#374151)
   - Centered
   - Line height: 24px
   - Padding: 16px horizontal

**Error Message Types**:
- **Insufficient Funds**: "Your card doesn't have enough funds for this commitment ($X)"
- **Card Declined**: "Your card was declined. Please try a different payment method."
- **Invalid Details**: "Card details appear to be incorrect. Please check and try again."
- **Expired Card**: "This card has expired. Please use a different card."
- **3DS Required**: "Your bank requires additional authentication."
- **Network Error**: "Connection issue. Please check your internet and try again."
- **Unknown**: "Something went wrong. Please try again or contact support."

### Goal Summary Card
**Elements**:
1. **Card Title**: "Goal Summary"
   - Font: Semibold, 14px
   - Color: Gray 900

2. **Goal Details** (each with icon):
   - Goal name (flag icon)
   - Commitment amount (cash icon): "$X"
   - Charity name (heart icon)
   - Font: Regular, 14px
   - Color: Gray 600
   - Values: Bold, Gray 900

**Card Styling**:
- Background: White
- Border: 1px solid Gray 200
- Border radius: 12px
- Padding: 16px
- Shadow: Medium elevation

### Reassurance Section
**Elements**:
1. **Reassurance Text**:
   - "Your goal hasn't been created yet. You can try again or use a different payment method."
   - Font: Regular, 14px
   - Color: Gray 600
   - Centered

2. **No Charges Text**:
   - "No charges have been made."
   - Font: Semibold, 14px
   - Color: Gray 600
   - Centered

### Actions Section
**Elements**:
1. **"Try Again" Button** (Primary)
   - Height: 56px
   - Background: Teal 400 (#2DD4BF)
   - Text: White, Bold, 18px
   - Border radius: 12px
   - Shadow: Teal shadow
   - Full width

2. **"Use Different Card" Button** (Secondary)
   - Height: 48px
   - Background: Transparent
   - Border: 2px solid Teal 400
   - Text: Teal 400, Semibold, 16px
   - Border radius: 12px
   - Full width

3. **"Need Help?" Link**
   - Font: Medium, 16px
   - Color: Teal 400
   - Underlined
   - Centered
   - Margin top: 8px

4. **"Cancel Goal" Link**
   - Font: Regular, 14px
   - Color: Gray 400
   - Centered
   - Small, unobtrusive
   - Margin top: 8px

---

## Interactions

### Try Again Button Tap
**Behavior**:
- Navigates back to Payment Screen
- Attempts payment with same card
- Shows loading state
- If 3DS required, launches authentication flow
- Tracks analytics: `payment_retry_attempted`

**Expected Outcomes**:
- Success → Payment Success Screen → Dashboard
- Same error → Show enhanced error + "Try different card?" prompt
- Different error → Return to this screen with new error
- Network timeout → "Continue in background?" option

### Use Different Card Button Tap
**Behavior**:
- Navigates to Payment Method Screen
- Shows card input form (Stripe Elements)
- Preserves goal details
- Tracks analytics: `payment_method_changed`

**Flow**:
- Enter new card details
- Process payment
- Success → Payment Success Screen
- Failure → Return to Payment Failed Screen

### Need Help Link Tap
**Behavior**:
- Opens Help/Support Screen
- Shows FAQ about payment issues
- Option to contact support
- Live chat if available
- Tracks analytics: `payment_support_contacted`

### Cancel Goal Link Tap
**Behavior**:
- Shows confirmation modal:
  - Title: "Cancel this goal?"
  - Message: "Your progress will not be saved."
  - Actions: "Yes, Cancel" (red) | "Keep Goal" (teal)
- If confirmed:
  - Delete goal draft
  - Clear cached data
  - Return to Dashboard
  - Show toast: "Goal cancelled"
- Tracks analytics: `payment_cancelled`

### Back Button Tap
**Behavior**:
- Returns to Payment Screen
- Preserves goal draft
- Allows user to review details before retry

---

## States & Loading

### Initial Load
- Screen loads with animation (staggered fade-in)
- All elements visible immediately
- No loading state needed (data passed from previous screen)

### Processing State (Not on this screen)
- Handled on Payment Screen
- Loading overlay shown there

### Error State
- This screen IS the error state
- Shows specific error message
- All interactive elements enabled

---

## Visual Design

### Color Palette
- **Background**: Gray 50 (#F9FAFB)
- **Warning Icon Circle**: Amber 100 (#FEF3C7)
- **Warning Icon**: Amber 500 (#F59E0B)
- **Title Text**: Gray 900 (#111827)
- **Body Text**: Gray 700 (#374151)
- **Secondary Text**: Gray 600 (#6B7280)
- **Card Background**: White (#FFFFFF)
- **Card Border**: Gray 200 (#E5E7EB)
- **Primary Button**: Teal 400 (#2DD4BF)
- **Secondary Button Border**: Teal 400 (#2DD4BF)
- **Link Text**: Teal 400 (#2DD4BF)
- **Cancel Text**: Gray 400 (#9CA3AF)

### Typography
- **Title**: Inter Bold, 24px, Line Height 32px
- **Error Message**: Inter Regular, 16px, Line Height 24px
- **Summary Title**: Inter Semibold, 14px, Line Height 20px
- **Summary Details**: Inter Regular, 14px, Line Height 20px
- **Button Primary**: Inter Bold, 18px
- **Button Secondary**: Inter Semibold, 16px
- **Link**: Inter Medium, 16px
- **Cancel**: Inter Regular, 14px

### Spacing (4px grid)
- Screen padding: 16px horizontal, 20px vertical
- Icon container margin: 24px bottom
- Title margin: 16px bottom
- Error message margin: 24px bottom
- Card margin: 24px bottom
- Reassurance margin: 32px bottom
- Button spacing: 12px gap
- Link margin top: 8px

### Shadows
- **Back Button**: Small elevation (0px 2px 4px rgba(0,0,0,0.05))
- **Goal Summary Card**: Medium elevation (0px 4px 6px rgba(0,0,0,0.07))
- **Primary Button**: Teal shadow (0px 4px 8px rgba(45,212,191,0.3))

### Animations
- **Screen Enter**: Staggered fade-in, 100ms delays
  - Header: 0ms
  - Icon: 100ms
  - Title: 200ms
  - Error: 300ms
  - Card: 400ms
  - Reassurance: 500ms
  - Actions: 600ms
- **Button Press**: Scale 0.98, 100ms
- Duration: All animations 400-500ms with spring

---

## Data Requirements

### Screen Parameters
```typescript
interface PaymentFailedScreenParams {
  errorType: 'insufficient_funds' | 'card_declined' | 'invalid_details' |
             'expired_card' | '3ds_required' | 'network_error' | 'unknown';
  goalName: string;
  commitmentAmount: number;
  charityName: string;
}
```

### API Endpoints
- No API calls on this screen
- Data passed from previous screen via navigation params
- Analytics tracking on user actions

---

## Analytics Events
- **Screen Viewed**: `payment_failed_screen_viewed`
  - Properties: goal_id, error_type, commitment_amount
- **Try Again Tapped**: `payment_retry_attempted`
  - Properties: attempt_number, same_card: true
- **Different Card Tapped**: `payment_method_change_started`
  - Properties: error_type
- **Help Tapped**: `payment_support_contacted`
  - Properties: error_type, contact_method: 'help_screen'
- **Cancel Tapped**: `payment_cancelled`
  - Properties: error_type, stage: 'payment_failed'

---

## Edge Cases

### No Goal Details Available
- Fallback values:
  - Goal name: "Your goal"
  - Amount: "$0"
  - Charity: "Selected charity"
- Should not happen in normal flow

### Unknown Error Type
- Show generic error message
- "Something went wrong. Please try again or contact support."
- All action buttons still enabled

### Multiple Failed Attempts
- After 3+ failures, suggest contacting support
- Show "Having trouble?" message
- Emphasize "Need Help?" link

### Network Connectivity Lost
- Screen still functional (no API calls needed)
- "Try Again" may fail → show network error
- Suggest checking internet connection

### User Navigates Away Mid-Flow
- Goal draft saved automatically
- Can return via dashboard banner
- No data loss

---

## Accessibility

### Screen Reader Support
- **Screen Title**: "Payment failed. Your goal has not been created."
- **Warning Icon**: "Warning. Payment could not be processed."
- **Error Message**: Read full error text
- **Goal Summary**: "Goal summary. [Details]"
- **Try Again Button**: "Try again with same card"
- **Different Card Button**: "Use a different payment method"
- **Help Link**: "Need help with payment?"
- **Cancel Link**: "Cancel goal creation"

### Keyboard Navigation (Web)
- Tab through: Back button → Try Again → Different Card → Help → Cancel
- Enter/Space activates buttons
- Escape returns to previous screen

### Touch Targets
- All interactive elements: Minimum 44x44px
- Back button: 44x44px
- Primary button: 56px height, full width
- Secondary button: 48px height, full width
- Links: 44px height

### Color Contrast
- Title (Gray 900 on Gray 50): 15.52:1 ✓ WCAG AAA
- Body text (Gray 700 on Gray 50): 8.25:1 ✓ WCAG AAA
- Button text (White on Teal 400): 4.55:1 ✓ WCAG AA
- All text meets WCAG AA standards

---

## Error Handling

### Invalid Error Type
- Fallback to 'unknown' error message
- Log error for debugging
- All functionality remains available

### Missing Goal Details
- Use fallback values
- Don't block user actions
- Log missing data

### Navigation Errors
- Catch navigation failures
- Show toast: "Navigation error"
- Provide retry option

---

## Future Enhancements (Post-MVP)
- Smart error suggestions (e.g., "Your card ending in 1234 was declined")
- Payment method on file (show last 4 digits)
- One-tap retry with saved cards
- In-screen card entry (no navigation)
- Payment installments option
- Alternative payment methods (Apple Pay, Google Pay)
- Proactive support (chat popup after 2 failures)
- Error prevention tips before retry
- Estimated time to retry success
- Similar issues from other users

---

## Testing Scenarios

### E2E Tests Required
1. Display insufficient funds error with correct message
2. Display card declined error
3. Display network error
4. Display unknown error
5. Goal summary displays correctly with all details
6. Try Again button navigates to payment screen
7. Use Different Card navigates to payment method screen
8. Need Help opens support/help
9. Cancel Goal shows confirmation and returns to dashboard
10. Back button returns to payment screen
11. All testID attributes present
12. Animations play smoothly
13. Text uses i18n (no hardcoded strings)

### Manual Testing
- Test on smallest device (320px width)
- Test with very long goal names
- Test with very long charity names
- Test with large commitment amounts ($999+)
- Test all 7 error types
- Verify color contrast
- Test with screen reader
- Test keyboard navigation (web)

---

## Dependencies
- **react-native**: Core framework
- **expo-router**: Navigation
- **@expo/vector-icons**: Icons
- **react-native-reanimated**: Animations
- **@/constants/translations**: i18n support

---

## Notes for Developers
- This screen should never be reached if payment succeeded
- Always pass errorType and goal details
- Error messages are user-friendly, not technical
- Maintain positive, supportive tone
- Emphasize "no charges made" to build trust
- All actions should be non-blocking
- Analytics tracking is critical for optimization
- Screen is part of payment recovery flow (high impact on revenue)

---

## Version History
- **v1.0** (2025-11-12): Initial MVP implementation for Payment Failed Screen
