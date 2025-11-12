# Onboarding Cards Screen - Design Specification

## Overview
3-card swipeable tutorial explaining MicroCommit mechanics. Modern, visual, engaging introduction to the platform.

---

## Visual Hierarchy

```
[SKIP BUTTON] ← Top right
       ↓
[CARD ILLUSTRATION] ← Large, prominent (50% of screen)
       ↓
[HEADING] ← Bold, clear
       ↓
[DESCRIPTION] ← Concise explanation
       ↓
[PAGINATION DOTS] ← Progress indicator
       ↓
[NEXT / GET STARTED BUTTON] ← Bottom, fixed
```

---

## Color Scheme

```
Background:
  - Card 1: Teal 50 gradient
  - Card 2: Green 50 gradient
  - Card 3: Blue 50 gradient
  - Subtle gradient: Light → Lighter

Card Container:
  - Background: White
  - Border Radius: 24px (top corners only)
  - Shadow: Extra Large elevation

Illustrations:
  - Primary: Teal 400
  - Accent: Amber 400, Green 400
  - Supporting: Gray 200-400

Pagination Dots:
  - Active: Teal 400 (width 24px, pill shape)
  - Inactive: Gray 300 (8px circle)
  - Gap: 8px

Next Button:
  - Background: Teal gradient (#2DD4BF → #14B8A6)
  - Text: White, Bold

Get Started Button (Card 3):
  - Background: Green gradient (#22C55E → #16A34A)
  - Text: White, Bold
  - Larger: 60px height (vs 56px)

Skip Button:
  - Text: Gray 600
  - Background: Transparent
  - Underline on press
```

---

## Typography

```
Heading:
  - Font: Inter Bold
  - Size: 28px
  - Line Height: 36px
  - Color: Gray 900
  - Letter Spacing: -0.5px
  - Max Width: 90% of screen

Description:
  - Font: Inter Regular
  - Size: 16px
  - Line Height: 24px
  - Color: Gray 600
  - Max Width: 85% of screen
  - Text Align: Center

Next Button:
  - Font: Inter Bold
  - Size: 18px
  - Color: White

Skip Button:
  - Font: Inter Medium
  - Size: 14px
  - Color: Gray 600
```

---

## Spacing & Layout

```
Screen Padding: 20px horizontal

Skip Button:
  - Position: Top right
  - Margin: 16px from top safe area
  - Padding: 8px 12px (tappable area)

Illustration:
  - Height: 50% of screen (max 400px)
  - Width: 90% of screen (centered)
  - Margin Top: 40px
  - Margin Bottom: 32px

Heading:
  - Margin Bottom: 16px
  - Centered

Description:
  - Margin Bottom: 32px
  - Centered

Pagination Dots:
  - Margin Bottom: 24px
  - Centered

Next Button:
  - Width: 90% of screen (max 360px)
  - Height: 56px
  - Margin Bottom: 16px
  - Fixed: 80px from bottom
  - Centered

Get Started Button (Card 3):
  - Height: 60px (larger for emphasis)
  - Width: 90% of screen (max 360px)
```

---

## Card Content

```
Card 1: "Set Meaningful Goals"
  - Illustration: Person selecting goal categories
  - Colors: Teal primary, Amber accents
  - Heading: "Set Goals That Matter to You"
  - Description: "Choose from templates or create custom commitments. From fitness to learning, make it personal."

Card 2: "Commit with Charity"
  - Illustration: Money flow to charity icon
  - Colors: Green primary, Teal accents
  - Heading: "Put Your Money Where Your Goals Are"
  - Description: "Choose a charity. If you miss check-ins, they get your commitment. Stay motivated to keep it."

Card 3: "Prove Your Progress"
  - Illustration: Phone camera + AI verification icon
  - Colors: Blue primary, Green accents
  - Heading: "Quick Photo Check-Ins"
  - Description: "Snap a photo as proof. AI verifies in seconds. Build streaks, achieve goals, help causes you care about."
```

---

## Component Styling

```css
Card Container:
  - Width: 100%
  - Height: 100%
  - Border Radius: 24px 24px 0 0 (bottom sheet style)
  - Background: White
  - Box Shadow: 0 -4px 32px rgba(0, 0, 0, 0.12)
  - Padding: 32px 20px
  - Display: Flex Column
  - Align Items: Center

Illustration Container:
  - Width: 90%
  - Height: 50vh (max 400px)
  - Display: Flex
  - Align Items: Center
  - Justify Content: Center
  - Background: Transparent

Illustration (SVG/Lottie):
  - Max Width: 100%
  - Max Height: 100%
  - Object Fit: Contain

Pagination Container:
  - Display: Flex Row
  - Gap: 8px
  - Justify Content: Center

Pagination Dot:
  - Inactive:
    - Width: 8px
    - Height: 8px
    - Border Radius: Full
    - Background: #D1D5DB
  - Active:
    - Width: 24px
    - Height: 8px
    - Border Radius: Full (pill)
    - Background: #2DD4BF
    - Transition: Width 300ms ease

Next Button:
  - Width: 90%
  - Max Width: 360px
  - Height: 56px
  - Background: linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)
  - Border: None
  - Border Radius: 12px
  - Box Shadow: 0 10px 15px rgba(45, 212, 191, 0.3)
  - Pressed: Scale 0.98

Get Started Button (Card 3):
  - Height: 60px
  - Background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%)
  - Box Shadow: 0 10px 15px rgba(34, 197, 94, 0.3)
```

---

## Animations

```
Card Swipe Transition:
  - Gesture: Horizontal drag
  - Threshold: 30% of screen width
  - Animation: Slide out current, slide in next
  - Duration: 350ms
  - Easing: Ease-in-out
  - Parallax: Background shifts slightly slower

Illustration Entry:
  - Each card: Fade in + scale (0.9 → 1.0)
  - Duration: 500ms
  - Delay: 100ms (after card transition)
  - Easing: Ease-out

Pagination Dot Active:
  - Width: 8px → 24px (expand)
  - Duration: 300ms
  - Easing: Ease-out

Button Appear:
  - Fade in + slide up 20px
  - Duration: 400ms
  - Delay: 200ms (after illustration)

Skip Button:
  - Fade in: 300ms
  - Press: Underline appears (100ms)
```

---

## Interaction States

```
Swipe Gesture:
  - Touch Down: Lock vertical scroll
  - Drag: Card follows finger with resistance
  - Release:
    - If >30% screen: Complete swipe to next/previous
    - If <30% screen: Spring back to original
  - Edge: First/last card shows slight bounce

Skip Button:
  - Default: Gray 600 text
  - Hover: Gray 800 text
  - Pressed: Underline appears, navigate to dashboard

Next Button:
  - Default: Full gradient
  - Pressed: Scale 0.98, haptic light
  - Navigation: Slide to next card

Get Started Button (Card 3):
  - Default: Green gradient
  - Pressed: Scale 0.98, haptic medium
  - Navigation: Navigate to goal template selection
```

---

## Swipe Gestures

```
Swipe Right (Previous Card):
  - Available: Card 2, Card 3
  - Animation: Slide from left
  - Not Available on Card 1: Show slight bounce

Swipe Left (Next Card):
  - Available: Card 1, Card 2
  - Animation: Slide to left
  - Not Available on Card 3: Show slight bounce

Drag Resistance:
  - Edge cards: Increase resistance as drag continues
  - Middle cards: Standard friction
  - Visual: Card slightly rotates (max 5°) during drag
```

---

## Illustrations

```
Style Guidelines:
  - Modern, minimal, friendly
  - 2-3 colors max per illustration
  - Clear visual metaphors
  - No text in illustrations
  - SVG format (scalable, performant)
  - Optional: Lottie animations for micro-interactions

Card 1 Illustration:
  - Person icon + goal category icons (fitness, book, etc.)
  - Arrows indicating selection/customization
  - Teal primary color

Card 2 Illustration:
  - Money/coins flowing toward charity heart icon
  - Dotted line showing commitment flow
  - Green primary color

Card 3 Illustration:
  - Phone outline with camera
  - Checkmark or sparkle indicating AI verification
  - Progress/streak visual element
  - Blue primary color
```

---

## Responsive Breakpoints

```
Small Mobile (320-374px):
  - Illustration height: 40% of screen
  - Heading: 24px font size
  - Description: 14px font size
  - Button height: 52px

Large Mobile (415px+):
  - Illustration height: 55% of screen
  - More generous padding
  - Heading: 30px font size

Tablet (768px+):
  - Landscape: Side-by-side layout option
  - Max card width: 600px (centered)
  - Larger illustrations
```

---

## Accessibility

```
Screen Reader:
  "Onboarding. Card [N] of 3.
   [Heading]. [Description].
   Button: Next. Button: Skip."

Swipe Gestures:
  - Alternative: "Next" and "Back" buttons for non-swipe navigation
  - Show on first use if accessibility settings detected

Focus Indicators:
  - Standard 2px Teal border
  - Shadow for emphasis

Reduced Motion:
  - Disable swipe animations
  - Simple crossfade between cards
  - Respect OS settings

Touch Targets:
  - Next button: 56px height (full width)
  - Skip button: 44x44px minimum
  - Dots: For decoration, not interactive
```

---

## Performance

```
Optimization:
  - Preload all 3 cards on screen mount
  - Cache illustrations (SVG or Lottie)
  - Lazy load heavy assets if needed
  - 60fps target for swipe animations

Illustration Format:
  - Primary: SVG (lightweight, scalable)
  - Alternative: Lottie (if animated micro-interactions)
  - Fallback: PNG with 2x/3x resolutions
```

---

## Navigation Flow

```
Entry Points:
  - From Welcome Screen (first time users)
  - From Authentication Screen (after sign up)

Exit Points:
  - Skip button → Dashboard (if returning user) or Goal Template Selection (new user)
  - Get Started button (Card 3) → Goal Template Selection
  - Back button → Authentication Screen (first card only)

First-Time Only:
  - Track completion in local storage
  - Don't show again on subsequent logins
  - Optional: "Show Tutorial" in Settings
```

---

## Design Review Notes

**Key Decisions**:
- 3 cards (not more - keep it short)
- Swipeable (modern, intuitive)
- Skip option (respect user's time)
- Visual-first (illustrations > text)
- Green "Get Started" on final card (success-oriented)

**Implementation Priority**:
1. Core swipe functionality
2. Illustrations (can use placeholders initially)
3. Animations
4. Accessibility features

**Future Enhancements**:
- Video tutorials (optional)
- Interactive demos
- Personalized onboarding based on goal type

**Version**: 1.0 (MVP)
**Date**: 2025-11-12
