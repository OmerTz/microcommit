# Goal Creation Form Screen - Design Specification

## Overview
Multi-step form (4 steps) for defining goal details. Clean, progressive disclosure design with clear navigation and validation.

---

## Visual Hierarchy

```
[PROGRESS INDICATOR] ← Top, fixed
       ↓
[STEP CONTENT] ← Primary focus, scrollable
       ↓
[NEXT / BACK BUTTONS] ← Bottom, fixed
```

---

## Color Scheme

```
Progress Indicator:
  - Track: Gray 200
  - Fill: Teal gradient (#2DD4BF → #14B8A6)
  - Text: Gray 700 (step labels)

Form Inputs:
  - Background: White
  - Border: Gray 300 (default), Teal 400 (focus), Red 500 (error)
  - Text: Gray 900
  - Placeholder: Gray 400

Selection Cards (Templates/Charities):
  - Background: White
  - Border: Gray 200 (default), Teal 400 (selected - 2px)
  - Checkmark: Teal 400 background, White icon

Next Button:
  - Background: Teal gradient
  - Text: White, Bold
  - Disabled: Gray 300

Back Button:
  - Background: Transparent
  - Border: 1px solid Gray 300
  - Text: Gray 700

Skip Option (Step 4):
  - Text: Gray 600
  - Underline on press
```

---

## Typography

```
Progress Step Label:
  - Font: Inter Medium
  - Size: 12px
  - Color: Gray 500 (inactive), Teal 500 (active/completed)

Step Heading:
  - Font: Inter Bold
  - Size: 24px
  - Line Height: 32px
  - Color: Gray 900

Step Description:
  - Font: Inter Regular
  - Size: 16px
  - Line Height: 24px
  - Color: Gray 600

Input Label:
  - Font: Inter Semibold
  - Size: 14px
  - Color: Gray 700

Input Text:
  - Font: Inter Regular
  - Size: 16px
  - Color: Gray 900

Helper Text:
  - Font: Inter Regular
  - Size: 14px
  - Color: Gray 500

Error Text:
  - Font: Inter Medium
  - Size: 12px
  - Color: Red 600

Button Text:
  - Font: Inter Bold
  - Size: 16px
  - Color: White (primary), Gray 700 (secondary)
```

---

## Spacing & Layout

```
Screen Padding: 16px horizontal

Progress Indicator:
  - Height: 60px
  - Padding: 16px vertical
  - Margin Bottom: 20px
  - Fixed to top

Progress Bar:
  - Height: 4px
  - Border Radius: Full
  - Width: Full (minus 32px padding)

Step Labels:
  - Margin Top: 8px
  - Display: Flex Row, Space Between

Form Content Area:
  - Padding: 0 16px
  - Scroll: Vertical (when needed)
  - Padding Bottom: 120px (space for buttons)

Step Heading:
  - Margin Bottom: 8px

Step Description:
  - Margin Bottom: 32px

Input Group:
  - Margin Bottom: 24px

Input Label:
  - Margin Bottom: 8px

Input Field:
  - Height: 48px
  - Padding: 12px 16px
  - Border Radius: 8px

Textarea:
  - Min Height: 96px
  - Padding: 12px 16px

Helper Text:
  - Margin Top: 4px

Selection Cards:
  - Height: Auto
  - Padding: 16px
  - Margin Bottom: 12px
  - Border Radius: 12px

Button Container:
  - Height: 80px
  - Fixed to bottom
  - Padding: 16px
  - Background: White (with top border/shadow)
  - Display: Flex Row
  - Gap: 12px

Back Button:
  - Width: 30% (min 80px)
  - Height: 52px

Next Button:
  - Flex: 1
  - Height: 52px
```

---

## Step Content

```
Step 1: Goal Details
  - Goal name input (required, max 60 chars)
  - Goal description textarea (optional, max 200 chars)
  - Category selector (dropdown or cards)
  - Success criteria textarea (required, max 300 chars)

Step 2: Commitment Settings
  - Commitment amount selector ($5, $10, $25, $50, $100, Custom)
  - Duration: Start date + End date pickers
  - Check-in frequency (Daily, 3x/week, 5x/week, Weekly)
  - Total check-ins: Calculated and displayed

Step 3: Charity Selection
  - Search bar
  - Charity cards (logo, name, category, impact)
  - Selected indicator (checkmark)
  - "Learn More" link for each charity

Step 4: Accountability (Optional)
  - Add referee option
  - Email/phone input
  - Relationship dropdown
  - Personal message textarea
  - "Skip for now" option
```

---

## Component Styling

```css
Progress Indicator:
  - Position: Fixed
  - Top: Safe area
  - Left: 0
  - Right: 0
  - Z-Index: 10
  - Background: White
  - Border Bottom: 1px solid Gray 200
  - Padding: 16px

Progress Bar Container:
  - Height: 4px
  - Background: #E5E7EB
  - Border Radius: Full
  - Overflow: Hidden

Progress Bar Fill:
  - Height: 100%
  - Background: linear-gradient(90deg, #2DD4BF 0%, #14B8A6 100%)
  - Width: [calculated]%
  - Transition: Width 400ms ease-out

Step Label:
  - Font: Inter Medium, 12px
  - Color: #6B7280 (inactive)
  - Active: #2DD4BF
  - Completed: #2DD4BF with checkmark icon

Input Field:
  - Width: 100%
  - Height: 48px
  - Background: White
  - Border: 1px solid #D1D5DB
  - Border Radius: 8px
  - Padding: 12px 16px
  - Font: Inter Regular, 16px
  - Focus: Border #2DD4BF, shadow small
  - Error: Border #EF4444, background #FEE2E2

Character Counter:
  - Position: Below input, right-aligned
  - Font: Inter Regular, 12px
  - Color: #9CA3AF
  - Format: "[count] / [max]"
  - Red when over limit

Amount Selector Cards:
  - Display: Grid (3 columns)
  - Gap: 12px
  - Card Height: 64px
  - Border: 2px solid Gray 200
  - Selected: Border Teal 400
  - Pressed: Scale 0.98

Amount Card:
  - Display: Flex Column
  - Align Items: Center
  - Justify Content: Center
  - Background: White
  - Border: 2px solid #E5E7EB
  - Border Radius: 12px
  - Selected: Border #2DD4BF

Charity Card:
  - Display: Flex Row
  - Gap: 12px
  - Background: White
  - Border: 1px solid #E5E7EB
  - Border Radius: 12px
  - Padding: 16px
  - Selected: Border 2px solid #2DD4BF

Charity Logo:
  - Size: 48px × 48px
  - Border Radius: 8px
  - Border: 1px solid Gray 200

Next Button:
  - Width: 100%
  - Height: 52px
  - Background: linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)
  - Border: None
  - Border Radius: 12px
  - Disabled: Background #D1D5DB, cursor not-allowed

Back Button:
  - Height: 52px
  - Background: Transparent
  - Border: 1px solid #D1D5DB
  - Border Radius: 12px
  - Color: #374151
```

---

## Animations

```
Step Transition:
  - Outgoing: Slide left + fade out (300ms)
  - Incoming: Slide right + fade in (300ms)
  - Easing: Ease-in-out

Progress Bar Fill:
  - Animate width to new percentage
  - Duration: 400ms
  - Easing: Ease-out

Input Focus:
  - Border color transition (200ms)
  - Shadow fade in (150ms)

Selection Card:
  - Pressed: Scale 0.98 (100ms)
  - Selected: Border pulse (300ms)

Button Interactions:
  - Pressed: Scale 0.98 (100ms)
  - Loading: Spinner fade in (200ms)
```

---

## Validation

```
Step 1:
  - Goal name: Required, 1-60 characters
  - Success criteria: Required, 10-300 characters
  - Real-time character count

Step 2:
  - Commitment amount: Required, $5-$500
  - End date: Must be > start date
  - Check-in frequency: Required selection
  - Minimum duration: 7 days

Step 3:
  - Charity selection: Required
  - Must select exactly one charity

Step 4:
  - Email: Valid email format (if provided)
  - Phone: Valid phone format (if provided)
  - At least one contact method if adding referee

Error Display:
  - Inline below field
  - Red text with error icon
  - Prevent "Next" until fixed
```

---

## Responsive Breakpoints

```
Small Mobile (320-374px):
  - Amount selector: 2 columns (cards smaller)
  - Reduce padding: 12px
  - Button height: 48px

Large Mobile (415px+):
  - Charity cards: Slightly larger
  - More generous spacing

Tablet (768px+):
  - Max content width: 600px (centered)
  - Amount selector: 4 columns
  - Larger input fields
```

---

## Accessibility

```
Progress Indicator:
  "Step [N] of 4. [Step name]. [Percentage]% complete."

Form Fields:
  - Labels associated with inputs
  - Error messages announced
  - Required fields indicated (aria-required)

Navigation:
  - Back button: "Go back to previous step"
  - Next button: "Continue to [next step name]"
  - Skip button: "Skip this step and finish"

Keyboard:
  - Tab through all inputs
  - Enter to submit/continue
  - Escape to go back

Touch Targets:
  - All buttons: 48px minimum
  - Selection cards: Full height tappable
```

---

## Design Review Notes

**Key Decisions**:
- 4 steps (not too long, not rushed)
- Fixed progress indicator (always visible)
- Step 4 optional (reduce friction)
- Inline validation (immediate feedback)
- Commitment amount as cards (visual, scannable)

**Version**: 1.0 (MVP)
**Date**: 2025-11-12
