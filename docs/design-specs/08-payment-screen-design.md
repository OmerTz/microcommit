# Payment Screen - Design Specification

## Overview
Secure Stripe payment method collection with authorization hold. Clear explanation of conditional charge to build trust.

---

## Visual Hierarchy

```
[SECURITY BADGE] ← Top, trust indicator
       ↓
[COMMITMENT SUMMARY] ← Context card
       ↓
[PAYMENT EXPLANATION] ← How it works
       ↓
[STRIPE PAYMENT FORM] ← Primary focus
       ↓
[AUTHORIZATION BUTTON] ← Large, secure CTA
[SECURITY FOOTER]
```

---

## Color Scheme

```
Background: Gray 50

Security Badge:
  - Background: Green 50
  - Border: 1px solid Green 200
  - Icon: Shield (Green 600)
  - Text: Green 800

Commitment Summary Card:
  - Background: White
  - Border: 1px solid Gray 200
  - Amount: Teal 600, Bold
  - Charity logo: Circular

Explanation Card:
  - Background: Blue 50
  - Border: 1px solid Blue 200
  - Icon: Info (Blue 600)
  - Text: Blue 900

Stripe Payment Elements:
  - Background: White
  - Border: Gray 300 (default), Teal 400 (focus)
  - Text: Gray 900
  - Error: Red 500 border

Authorization Button:
  - Background: Green gradient (#22C55E → #16A34A)
  - Text: White, Bold
  - Icon: Lock (White, 20px)
  - Shadow: Large elevation

Security Footer:
  - Background: Transparent
  - Icon: Lock (Gray 500)
  - Text: Gray 500
```

---

## Typography

```
Security Badge Text:
  - Font: Inter Semibold
  - Size: 12px
  - Color: Green 800

Heading:
  - Font: Inter Bold
  - Size: 24px
  - Color: Gray 900

Commitment Amount:
  - Font: Inter Bold
  - Size: 32px
  - Color: Teal 600

Explanation Text:
  - Font: Inter Regular
  - Size: 14px
  - Line Height: 20px
  - Color: Blue 900

Input Label:
  - Font: Inter Semibold
  - Size: 14px
  - Color: Gray 700

Button Text:
  - Font: Inter Bold
  - Size: 18px
  - Color: White

Security Footer:
  - Font: Inter Regular
  - Size: 12px
  - Color: Gray 500
```

---

## Spacing & Layout

```
Screen Padding: 16px horizontal

Security Badge:
  - Padding: 8px 12px
  - Border Radius: 8px
  - Margin: 16px auto (centered)
  - Width: Fit content

Commitment Summary:
  - Padding: 20px
  - Border Radius: 12px
  - Margin: 16px 0

Amount Display:
  - Margin: 12px 0

Explanation Card:
  - Padding: 16px
  - Border Radius: 12px
  - Margin: 20px 0

Stripe Payment Form:
  - Margin: 24px 0
  - Gap: 16px between elements

Card Element:
  - Height: 48px
  - Padding: 12px 16px
  - Border Radius: 8px

Authorization Button:
  - Height: 60px (larger for security emphasis)
  - Margin: 32px 0 20px
  - Width: Full

Security Footer:
  - Padding: 12px
  - Margin Top: Auto
  - Text Align: Center
```

---

## Component Styling

```css
Security Badge:
  - Display: Flex Row
  - Align Items: Center
  - Gap: 8px
  - Background: #DCFCE7
  - Border: 1px solid #86EFAC
  - Border Radius: 8px
  - Padding: 8px 12px

Commitment Summary:
  - Background: White
  - Border: 1px solid #E5E7EB
  - Border Radius: 12px
  - Padding: 20px
  - Box Shadow: Small elevation

Amount Row:
  - Display: Flex Row
  - Align Items: Baseline
  - Gap: 4px

Dollar Sign:
  - Font: Inter Bold, 24px
  - Color: #0D9488

Amount:
  - Font: Inter Bold, 32px
  - Color: #0D9488

Goal Name:
  - Font: Inter Semibold, 16px
  - Color: #111827
  - Margin Bottom: 8px

Charity Row:
  - Display: Flex Row
  - Align Items: Center
  - Gap: 12px

Charity Logo:
  - Size: 32px
  - Border Radius: Full
  - Border: 1px solid #E5E7EB

Explanation Card:
  - Background: #DBEAFE
  - Border: 1px solid #93C5FD
  - Border Radius: 12px
  - Padding: 16px
  - Display: Flex Column
  - Gap: 12px

Explanation Item:
  - Display: Flex Row
  - Gap: 12px
  - Font: Inter Regular, 14px

Bullet:
  - Width: 6px
  - Height: 6px
  - Border Radius: Full
  - Background: #3B82F6
  - Flex Shrink: 0
  - Margin Top: 7px

Stripe Card Element:
  - Height: 48px
  - Background: White
  - Border: 1px solid #D1D5DB
  - Border Radius: 8px
  - Padding: 12px 16px
  - Font: Inter Regular, 16px
  - Focus: Border #2DD4BF

Authorization Button:
  - Width: 100%
  - Height: 60px
  - Background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%)
  - Border: None
  - Border Radius: 12px
  - Box Shadow: 0 10px 20px rgba(34, 197, 94, 0.3)
  - Display: Flex Row
  - Align Items: Center
  - Justify Content: Center
  - Gap: 8px
  - Pressed: Scale 0.98
```

---

## Explanation Content

```
"How It Works:"
  • Your card is authorized for [amount] but not charged now
  • You'll only be charged if you miss check-ins
  • Successfully complete your goal? We release the hold
  • 100% secure with Stripe encryption

Format:
  - Bullet points (not numbered)
  - Concise (< 15 words each)
  - Positive framing
  - Security emphasis
```

---

## Animations

```
Screen Enter:
  - Cards stagger in: Fade + slide up
  - Delay: 100ms between cards
  - Duration: 300ms each

Button Press:
  - Scale: 1.0 → 0.98
  - Duration: 100ms

Processing State:
  - Button: Show spinner
  - Opacity: 0.8
  - Text: "Authorizing..."

Success:
  - Checkmark animation (500ms)
  - Green flash overlay (200ms)
  - Haptic: Success pattern

Error:
  - Shake animation (400ms)
  - Border flash red
  - Haptic: Error pattern
```

---

## Stripe Integration

```
Stripe Elements:
  - Card Number input
  - Expiry input
  - CVC input
  - Postal Code input (optional)

Styling:
  - Match app design system
  - Teal focus color
  - Gray placeholders
  - Red error states

Security:
  - PCI compliant (Stripe handles)
  - Never touch raw card data
  - Secure tokenization
  - 3D Secure support
```

---

## Validation & Errors

```
Card Validation:
  - Real-time Stripe validation
  - Invalid card: "Card number invalid"
  - Expired card: "Card expired"
  - CVC invalid: "Security code invalid"

Authorization Errors:
  - Declined: "Card declined. Try another card."
  - Insufficient funds: "Insufficient funds for authorization."
  - Network error: "Connection error. Try again."
  - Generic: "Payment authorization failed. Contact support."

Error Display:
  - Banner below button
  - Red 100 background
  - Red 800 text
  - Error icon
  - "Try Again" button inline
```

---

## Accessibility

```
Security Badge:
  "Secure payment. Your information is encrypted."

Commitment Summary:
  "Commitment amount: [amount] for [goal name].
   Beneficiary: [charity name]."

Explanation:
  "How it works. [Read bullet points]."

Payment Form:
  "Payment information. Required.
   Card number. Expiration date. Security code."

Authorization Button:
  "Authorize payment hold. Secure."

Security Footer:
  "Powered by Stripe. All transactions encrypted."
```

---

## Design Review Notes

**Key Decisions**:
- Green button (not teal - security/trust)
- Authorization vs. Charge language (clarity)
- Explanation card (transparency)
- Multiple security indicators (trust)
- Larger button (60px - emphasis)

**Version**: 1.0 (MVP)
**Date**: 2025-11-12
