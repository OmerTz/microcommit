# Authentication Screen - Design Specification

## Overview
Unified sign-up and sign-in screen with clean, trustworthy design. Emphasizes easy social auth while maintaining email/password option.

---

## Visual Hierarchy

```
[HEADER - Logo & Mode Toggle] ← Top
       ↓
[SOCIAL AUTH BUTTONS] ← Primary, most prominent
       ↓
[DIVIDER "OR"]
       ↓
[EMAIL/PASSWORD FORM] ← Secondary
       ↓
[SUBMIT BUTTON] ← Large, clear
[HELPER LINKS]
```

---

## Color Scheme

```
Background: White or Teal 50 (subtle)

Social Auth Buttons:
  - Google: White background, #4285F4 border, #4285F4 text
  - Apple: Black background (#000000), White text
  - Height: 52px each
  - Icons: Brand colors (full color Google, White Apple)

Email/Password Inputs:
  - Background: White
  - Border: Gray 200 (default), Teal 400 (focus)
  - Text: Gray 900
  - Placeholder: Gray 400
  - Error: Red 500 border, Red 100 background

Submit Button:
  - Background: Teal gradient (#2DD4BF → #14B8A6)
  - Text: White, Bold
  - Height: 56px
  - Shadow: Large elevation

Links:
  - Forgot Password: Teal 500
  - Switch Mode: Gray 600 + Teal 500 highlight
```

---

## Typography

```
Mode Toggle (Sign Up / Sign In):
  - Font: Inter Semibold
  - Size: 16px
  - Active: Teal 500, underline (2px)
  - Inactive: Gray 500
  - Gap: 24px between options

Social Button Text:
  - Font: Inter Semibold
  - Size: 16px
  - Google: #4285F4
  - Apple: White

Input Labels:
  - Font: Inter Medium
  - Size: 14px
  - Color: Gray 700

Input Text:
  - Font: Inter Regular
  - Size: 16px
  - Color: Gray 900

Input Placeholder:
  - Font: Inter Regular
  - Size: 16px
  - Color: Gray 400

Error Messages:
  - Font: Inter Medium
  - Size: 12px
  - Color: Red 600

Submit Button:
  - Font: Inter Bold
  - Size: 18px
  - Color: White

Helper Links:
  - Font: Inter Medium
  - Size: 14px
  - Color: Gray 600 (regular), Teal 500 (clickable)
```

---

## Spacing & Layout

```
Screen Padding: 24px horizontal
Top Padding: 40px from safe area

Logo:
  - Size: 80px × 80px
  - Centered
  - Margin Bottom: 16px

Mode Toggle:
  - Margin Bottom: 32px
  - Centered

Social Buttons:
  - Height: 52px each
  - Gap: 12px vertical
  - Margin Bottom: 24px

Divider:
  - Margin: 24px vertical
  - Line width: 1px, Gray 300

Form Inputs:
  - Height: 48px
  - Gap: 16px vertical
  - Label to input: 8px

Checkbox (Remember Me):
  - Margin: 12px vertical

Submit Button:
  - Height: 56px
  - Margin Top: 24px
  - Margin Bottom: 20px

Helper Links:
  - Margin: 16px vertical between links
```

---

## Component Styling

```css
Social Auth Button:
  - Width: 100%
  - Height: 52px
  - Border Radius: 12px
  - Border: 2px solid [brand color]
  - Display: Flex Row
  - Align Items: Center
  - Justify Content: Center
  - Gap: 12px (icon to text)
  - Box Shadow: Small elevation
  - Pressed: Scale 0.98, border darker

Google Button:
  - Background: White
  - Border: #4285F4
  - Text: #4285F4

Apple Button:
  - Background: #000000
  - Border: #000000
  - Text: White

Input Field:
  - Width: 100%
  - Height: 48px
  - Padding: 12px 16px
  - Border: 1px solid #E5E7EB
  - Border Radius: 8px
  - Font: Inter Regular, 16px
  - Focus: Border #2DD4BF, shadow small
  - Error: Border #EF4444, background #FEE2E2

Checkbox (Remember Me):
  - Size: 20px × 20px
  - Border: 2px solid Gray 300
  - Checked: Background Teal 400, checkmark White
  - Border Radius: 4px

Submit Button:
  - Width: 100%
  - Height: 56px
  - Background: linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)
  - Border: None
  - Border Radius: 12px
  - Box Shadow: 0 10px 15px rgba(45, 212, 191, 0.3)
  - Disabled: Gray 300 background, Gray 500 text
  - Loading: Spinner (White, 24px) centered
```

---

## Animations

```
Input Focus:
  - Border color transition: 200ms ease
  - Shadow fade in: 150ms

Button Press:
  - Scale: 1.0 → 0.98
  - Duration: 100ms
  - Easing: Ease-out

Form Submission:
  - Button: Show spinner, fade out text
  - Success: Green checkmark animation (300ms)
  - Error: Shake animation (400ms)

Mode Switch (Sign Up ↔ Sign In):
  - Crossfade: 300ms
  - Slide: Optional subtle vertical movement
```

---

## Interaction States

```
Social Button:
  - Default: Standard styling
  - Hover (web): Brightness 105%
  - Pressed: Scale 0.98
  - Loading: Spinner replaces icon

Input Field:
  - Default: Gray border
  - Focus: Teal border + shadow
  - Filled: Maintain focus indicator if active
  - Error: Red border + background + error message below
  - Disabled: Gray 100 background, cursor not-allowed

Submit Button:
  - Default: Full color
  - Hover: Slightly darker
  - Pressed: Scale 0.98
  - Loading: Spinner, maintain color
  - Disabled: Gray, opacity 0.6
```

---

## Form Validation

```
Email Validation:
  - Format: Standard email regex
  - Error: "Please enter a valid email"
  - Show: On blur or submit
  - Icon: X icon (Red 500) in input

Password Validation (Sign Up):
  - Minimum 8 characters
  - Requirements shown below input:
    ✓ At least 8 characters (Green when met)
    ✓ One uppercase letter
    ✓ One number
  - Real-time validation as user types

Password Strength Meter (Sign Up):
  - Bar below password input
  - Colors: Red (weak) → Amber (medium) → Green (strong)
  - Height: 4px
  - Animated fill

Confirm Password (Sign Up only):
  - Real-time match check
  - Error: "Passwords don't match"
  - Icon: Checkmark (Green) or X (Red)
```

---

## Error States

```
Invalid Credentials:
  - Banner: Red 100 background, Red 800 text
  - Message: "Email or password incorrect"
  - Position: Below mode toggle, above social buttons
  - Dismissible: X button or auto-dismiss after 5s

Network Error:
  - Banner: Amber 100 background
  - Message: "Connection error. Try again."
  - Retry button: Inline

Account Exists (Sign Up):
  - Banner: Blue 100 background
  - Message: "Account exists. Sign in instead?"
  - Action: "Sign In" link (switch mode)

Email Not Verified:
  - Banner: Amber 100 background
  - Message: "Please verify your email first"
  - Action: "Resend verification" button
```

---

## Responsive Breakpoints

```
Small Mobile (320-374px):
  - Logo: 64px
  - Social buttons: Height 48px
  - Submit button: Height 52px
  - Reduce horizontal padding: 16px

Large Mobile (415px+):
  - Maintain standard sizing
  - Slightly larger logo (88px)

Tablet (768px+):
  - Max form width: 400px (centered)
  - Larger spacing between elements
  - Consider 2-column layout for social buttons
```

---

## Accessibility

```
Screen Reader:
  "Authentication screen. Sign up or sign in.
   Button: Continue with Google.
   Button: Continue with Apple.
   Text field: Email.
   Secure text field: Password.
   Button: Sign up or Sign in."

Focus Order:
  1. Mode toggle (Sign Up / Sign In)
  2. Google button
  3. Apple button
  4. Email field
  5. Password field
  6. Confirm password (if sign up)
  7. Remember me checkbox
  8. Submit button
  9. Forgot password link
  10. Switch mode link

Touch Targets:
  - Social buttons: 52px height (full width)
  - Input fields: 48px height
  - Submit button: 56px height
  - Links: 44px minimum tappable area
```

---

## Security & Privacy

```
Password Field:
  - Secure entry (hidden characters)
  - "Show/Hide" toggle icon (Eye icon, Gray 500)
  - Position: Right side of input
  - Size: 24px, tappable area 44x44px

Remember Me:
  - Checkbox: "Keep me signed in"
  - Default: Unchecked
  - Warning: "Only use on your personal device"

OAuth Scopes (Social Auth):
  - Google: Email, profile, basic info
  - Apple: Email, name
  - Clear disclosure: "We'll only access your email"

Data Security Note:
  - Small text below form
  - "Your data is encrypted and secure"
  - Icon: Shield or Lock (Gray 400, 16px)
```

---

## Design Review Notes

**Key Decisions**:
- Social auth prioritized (easier, faster)
- Clean, trustworthy design (no dark patterns)
- Inline validation (immediate feedback)
- Unified screen (less navigation)
- Clear error messaging (helpful, not scary)

**Version**: 1.0 (MVP)
**Date**: 2025-11-12
