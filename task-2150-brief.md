# Component Creator Brief - Task #2150
## Create Payment Failed Screen with Error Categorization

### Task Context
You are the Component Creator for Tzrif86, creating reusable components for MicroCommit product. This task requires creating a Payment Failed Screen that displays user-friendly error messages when payment processing fails during goal creation.

### Product Context
MicroCommit is a micro-commitment charity betting platform. When payment fails during goal creation, users need a clear error screen that explains what went wrong and offers solutions to retry or use different payment methods.

---

## REQUIREMENTS

### 1. Error Categorization System
The component must handle and display appropriate messages for these error types:

| Error Type | User-Friendly Message |
|-----------|----------------------|
| `insufficient_funds` | "Your card doesn't have enough funds for this commitment ($X)" |
| `card_declined` | "Your card was declined. Please try a different payment method." |
| `invalid_details` | "Card details appear to be incorrect. Please check and try again." |
| `expired_card` | "This card has expired. Please use a different card." |
| `3ds_required` | "Your bank requires additional authentication." |
| `network_error` | "Connection issue. Please check your internet and try again." |
| `unknown` | "Something went wrong. Please try again or contact support." |

### 2. Screen Layout Structure

```
┌─────────────────────────────────────────┐
│  [Back Button]                          │
│                                         │
│  ⚠️                                     │
│  Payment couldn't be processed          │
│                                         │
│  [Error-specific message here]          │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ Goal Summary Card                 │ │
│  │ • Goal name: "Go to gym 3x/week" │ │
│  │ • Commitment: $15                 │ │
│  │ • Charity: Red Cross              │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Your goal hasn't been created yet.     │
│  You can try again or use a different   │
│  payment method.                        │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │      Try Again                    │ │ (Primary)
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │   Use Different Card              │ │ (Secondary)
│  └───────────────────────────────────┘ │
│                                         │
│  Need Help?                            │ (Link)
│                                         │
│  Cancel Goal                           │ (Small link)
└─────────────────────────────────────────┘
```

### 3. Component Props Interface

```typescript
interface PaymentFailedScreenProps {
  errorType: 'insufficient_funds' | 'card_declined' | 'invalid_details' |
             'expired_card' | '3ds_required' | 'network_error' | 'unknown';
  goalDetails: {
    name: string;
    commitmentAmount: number;
    charityName: string;
  };
  onTryAgain: () => void;
  onUseDifferentCard: () => void;
  onNeedHelp: () => void;
  onCancelGoal: () => void;
}
```

### 4. Design System Requirements

**Colors (from MicroCommit Design System):**
- Primary Teal: `#2DD4BF`
- Background: `#F9FAFB` (Gray 50)
- Card background: `#FFFFFF`
- Text primary: `#111827` (Gray 900)
- Text secondary: `#374151` (Gray 700)
- Warning/Error: `#F59E0B` (Amber 500)
- Border: `#E5E7EB` (Gray 200)

**Typography (Inter Font):**
- Title: Bold 24px, Line Height 32px
- Error message: Regular 16px, Line Height 24px
- Body text: Regular 14px, Line Height 20px
- Button text: Bold 18px

**Spacing (4px grid system):**
- Screen padding: 16px horizontal, 20px vertical
- Card padding: 16px all sides
- Button height: 56px (primary), 48px (secondary)
- Element spacing: 12px-24px
- Button radius: 12px
- Card radius: 12px

**Shadows:**
```
Medium (Cards):
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.07),
              0px 2px 4px rgba(0, 0, 0, 0.05)
```

### 5. Interaction Behavior

**Button States:**
- Default: Full color/outlined
- Pressed: Scale 0.98, darker shade
- Disabled: Gray 300 background, Gray 400 text
- Loading: Show spinner, maintain color

**Navigation:**
- Back button returns to payment screen
- Try Again triggers retry with same card
- Use Different Card navigates to card entry
- Need Help opens support/help modal
- Cancel Goal shows confirmation modal

### 6. Analytics Integration

Track this event when screen loads:
```typescript
analytics.track('payment_failed', {
  goal_id: string,
  error_type: errorType,
  error_message: string,
  commitment_amount: number,
  timestamp: Date
});
```

### 7. Accessibility Requirements

- Warning icon has proper ARIA label
- All buttons have descriptive labels
- Touch targets minimum 44x44px
- High contrast text (WCAG AA)
- Screen reader announcements for error messages
- Proper focus management

### 8. Testing Requirements

**data-testid attributes needed:**
- `payment-failed-screen`
- `payment-failed-error-message`
- `payment-failed-goal-summary`
- `payment-failed-try-again-button`
- `payment-failed-different-card-button`
- `payment-failed-help-link`
- `payment-failed-cancel-link`

**E2E Test Scenarios:**
1. Display insufficient funds error
2. Display card declined error
3. Display network error
4. Try Again button navigation
5. Use Different Card button navigation
6. Cancel Goal confirmation flow
7. Help link opens support

---

## FILES TO CREATE

### 1. Screen Component
**Location:** `app/(payment)/payment-failed.tsx`

Component should:
- Be a functional React component
- Use React Native components (View, Text, TouchableOpacity, etc.)
- Import design tokens from constants
- Use translation keys from i18n
- Include TypeScript props interface
- Export as default

### 2. Translation Keys
**Location:** `constants/translations/payment.ts`

Create translation object structure:
```typescript
export const paymentTranslations = {
  payment: {
    failed: {
      title: 'Payment couldn't be processed',
      insufficient_funds: '...',
      card_declined: '...',
      // ... all error messages
      reassurance: '...',
      buttons: {
        tryAgain: 'Try Again',
        differentCard: 'Use Different Card',
        help: 'Need Help?',
        cancel: 'Cancel Goal'
      },
      goalSummary: {
        title: 'Goal Summary',
        commitment: 'Commitment',
        charity: 'Charity'
      }
    }
  }
};
```

Remember to:
- Export and add to main translations index
- Follow existing translation file patterns

### 3. Error Message Component (if needed)
**Location:** `components/payment/ErrorMessage.tsx`

Reusable component for displaying error messages with icons.

### 4. Screen Documentation
**Location:** `screens/13-payment-failed-screen.md`

Document the screen following the format of `screens/08-payment-screen.md`:
- Overview
- Screen Purpose
- Access points
- Layout Structure
- Interactions
- States & Loading
- Visual Design
- Data Requirements
- Analytics Events
- Edge Cases
- Accessibility

### 5. Unit Tests
**Location:** `__tests__/screens/payment-failed.test.tsx`

Test coverage needed:
- Component renders correctly
- All error types display correct messages
- Goal summary displays correctly
- All buttons trigger correct callbacks
- Analytics tracking fires correctly
- Accessibility attributes present

### 6. Storybook Story (Optional but Recommended)
**Location:** `components/payment/PaymentFailedScreen.stories.tsx`

Create stories for:
- Each error type
- Different goal amounts
- Long goal names
- Various charity names

---

## REFERENCE FILES

You MUST read these files before starting:

1. **Design System:**
   `/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/docs/design-specs/00-design-system.md`

2. **Payment Flow:**
   `/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/flows/05-payment-failure-retry-flow.md`

3. **Payment Screen (for consistency):**
   `/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/screens/08-payment-screen.md`

4. **Existing Auth Components (for button patterns):**
   `/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/components/auth/AuthButton.tsx`
   `/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/components/auth/AuthInput.tsx`

5. **Translation Examples:**
   `/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/constants/translations/auth.ts`
   `/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/constants/translations/common.ts`

---

## COMPLETION CRITERIA

Before marking as complete, ensure:

- [ ] Component renders all 7 error types correctly
- [ ] Goal summary displays with proper formatting
- [ ] All 4 action buttons/links work
- [ ] Follows MicroCommit design system exactly
- [ ] Mobile-responsive (tested on multiple screen sizes)
- [ ] TypeScript interfaces defined and used
- [ ] All text uses i18n (no hardcoded strings)
- [ ] data-testid attributes on all interactive elements
- [ ] Analytics tracking implemented
- [ ] Unit tests pass with >80% coverage
- [ ] E2E test file created
- [ ] Documentation file created
- [ ] Max file length <400 lines (split if needed)
- [ ] No emojis in code (use SVG icons or unicode)
- [ ] Accessibility requirements met

---

## IMPORTANT REMINDERS

1. **ONE COMPONENT ONLY**: Focus solely on the Payment Failed Screen. Do not create additional unrelated components.

2. **REUSABILITY**: Design for reuse - this component may be used in multiple payment failure scenarios.

3. **MVP APPROACH**: Core functionality first. Avoid over-engineering.

4. **DESIGN CONSISTENCY**: Follow the design system precisely. Colors, spacing, typography must match exactly.

5. **NO MOCKS IN PRODUCTION**: If you need test data, create proper fixtures, not inline mocks.

6. **TEST BEFORE SUBMIT**: Manually verify the component renders correctly before completing.

7. **FILE SPLITTING**: If any file exceeds 400 lines, split into smaller modules.

---

## WORKFLOW

1. Read all reference documents
2. Create translation file first
3. Create component with props interface
4. Test component manually
5. Create unit tests
6. Create E2E test scenarios
7. Create documentation
8. Verify all completion criteria
9. Report back to Orchestrator

---

## Questions or Issues?

If you encounter any blockers or need clarification, document them clearly and report to the Orchestrator before proceeding.

---

**Good luck, Component Creator! Build something beautiful and functional. 🚀**
