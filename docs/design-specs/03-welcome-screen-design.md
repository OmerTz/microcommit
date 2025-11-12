# Welcome Screen - Design Specification

## Overview
First impression screen that must quickly communicate value and provide clear paths to get started. Clean, modern, trustworthy aesthetic.

---

## Visual Hierarchy

```
[LOGO & BRANDING] ← Top 25%, centered
       ↓
[VALUE PROP / SOCIAL PROOF] ← Middle 40%, engaging
       ↓
[GET STARTED CTA] ← Bottom 35%, prominent
[SIGN IN LINK]
[LEGAL FOOTER]
```

---

## Color Scheme

```
Background:
  - Primary: White (#FFFFFF)
  - Alternative: Subtle gradient (White → Teal 50)

Logo:
  - Teal gradient (#2DD4BF → #14B8A6)
  - Drop shadow: 0 4px 12px rgba(45, 212, 191, 0.2)

Social Proof Card:
  - Background: White with 90% opacity (glass effect)
  - Border: 1px solid rgba(255, 255, 255, 0.2)
  - Shadow: 0 8px 32px rgba(0, 0, 0, 0.1)
  - Backdrop Filter: Blur(10px) - optional

Get Started Button:
  - Background: Teal gradient (#2DD4BF → #14B8A6)
  - Shadow: Large elevation (0 10px 25px rgba(45, 212, 191, 0.3))

Sign In Link:
  - "Already have an account?": Gray 600
  - "Sign In": Teal 500, underlined
```

---

## Typography

```
App Name:
  - Font: Inter Bold
  - Size: 32px
  - Line Height: 40px
  - Color: Gray 900
  - Letter Spacing: -0.8px

Tagline:
  - Font: Inter Medium
  - Size: 18px
  - Line Height: 28px
  - Color: Gray 600

Social Proof Stats:
  - Numbers: Inter Bold, 24px, Gray 900
  - Labels: Inter Semibold, 14px, Gray 700
  - Icons: 24px inline

Get Started Button:
  - Font: Inter Bold
  - Size: 18px
  - Line Height: 24px
  - Color: White
  - Letter Spacing: 0.3px

Sign In Link:
  - Font: Inter Medium
  - Size: 14px
  - Line Height: 20px

Legal Text:
  - Font: Inter Regular
  - Size: 12px
  - Line Height: 16px
  - Color: Gray 400
```

---

## Spacing & Layout

```
Screen Padding: 24px horizontal
Top Margin: 60px from safe area

Logo:
  - Size: 100x100px
  - Margin Bottom: 8px

App Name:
  - Margin Bottom: 4px

Tagline:
  - Margin Bottom: 48px

Hero Illustration (optional):
  - Size: 240x240px
  - Margin Bottom: 32px

Social Proof Card:
  - Width: 90% of screen (centered)
  - Padding: 16px
  - Border Radius: 12px
  - Gap between stats: 12px vertical

Get Started Button:
  - Width: 90% of screen (max 360px)
  - Height: 56px
  - Margin Top: Auto (pushes to bottom)
  - Margin Bottom: 16px
  - Fixed: 120px from bottom

Sign In Link:
  - Margin Bottom: 16px

Legal Footer:
  - Position: 24px from bottom safe area
  - Max Width: 80% of screen (centered)
```

---

## Component Styling

```css
Social Proof Card:
  - Display: Flex Column
  - Background: rgba(255, 255, 255, 0.9)
  - Border: 1px solid rgba(45, 212, 191, 0.15)
  - Border Radius: 12px
  - Padding: 16px
  - Box Shadow: 0 8px 32px rgba(0, 0, 0, 0.08)
  - Backdrop Filter: blur(10px)

Stat Row:
  - Display: Flex Row
  - Align Items: Center
  - Gap: 12px
  - Padding: 8px 0

Stat Icon:
  - Size: 24px
  - Color: Teal 500
  - Flex Shrink: 0

Stat Text:
  - Font: Inter Semibold
  - Size: 16px
  - Color: Gray 800
  - Numbers: Inter Bold

Get Started Button:
  - Width: 90%
  - Max Width: 360px
  - Height: 56px
  - Background: linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)
  - Border: None
  - Border Radius: 12px
  - Box Shadow: 0 10px 25px rgba(45, 212, 191, 0.3)
  - Transform: Pressed state scale(0.98)
  - Transition: 150ms ease-out
```

---

## Animations

```
App Launch Sequence (1.5s total):
  1. Logo: Scale in (0.5→1.2→1.0) + Fade (0→1) [0-500ms]
  2. App Name: Fade in + Slide up 10px [300-700ms]
  3. Tagline: Fade in + Slide up 10px [500-900ms]
  4. Social Proof: Slide up 20px + Fade in [700-1200ms]
  5. Buttons: Fade in [1000-1500ms]

Stats Count-Up:
  - Animate numbers from 0 to target
  - Duration: 1000ms
  - Easing: Ease-out
  - Trigger: When card visible

Button Interactions:
  - Hover (web): Brightness 110%, scale 1.02
  - Pressed: Scale 0.98, haptic light
  - Release: Spring back to 1.0
```

---

## Responsive Breakpoints

```
Small Mobile (320-374px):
  - Logo: 80px
  - App Name: 28px
  - Social Proof width: 95%
  - Button height: 52px

Large Mobile (415px+):
  - Logo: 120px
  - Social Proof: More generous padding (20px)
  - Stats: Slightly larger fonts (+1px)

Tablet (768px+):
  - Max content width: 500px (centered)
  - Logo: 140px
  - App Name: 36px
  - All elements centered in container
```

---

## Accessibility

```
Screen Reader:
  "Welcome to MicroCommit. Achieve your goals. Help charity.
   Ten thousand goals achieved. Fifty thousand dollars donated to charity.
   Button: Get Started."

Focus Order:
  1. Get Started button
  2. Sign In link
  3. Terms link
  4. Privacy link

Touch Targets:
  - Get Started: 56px height (full width)
  - Sign In: 44px minimum tappable area
  - Legal links: 44px minimum vertical spacing
```

---

## Design Review Notes

**Key Decisions**:
- Gradient logo for modern feel
- Glass morphism social proof card (cutting-edge aesthetic)
- Large, prominent "Get Started" CTA
- Clean, minimal layout (no clutter)
- Friendly but professional tone

**Version**: 1.0 (MVP)
**Date**: 2025-11-12
