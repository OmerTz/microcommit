# Check-In Screen - Design Specification

## Overview
The Check-In Screen must be fast, simple, and encouraging. This is the most frequently used screen in the app, requiring clear visual hierarchy and immediate feedback for evidence submission.

---

## Visual Hierarchy

### Priority Layout
```
[GOAL CONTEXT] ← Compact, collapsible
     ↓
[EVIDENCE TYPE SELECTION] ← Primary focus, largest
     ↓
[OPTIONAL NOTE] ← Secondary
     ↓
[SUBMIT BUTTON] ← Fixed bottom, prominent
```

---

## Color Scheme

### Evidence Selection State
```
Take Photo Button:
  - Background: Teal gradient (#2DD4BF → #14B8A6)
  - Icon: Camera (White, 48px)
  - Text: White, Semibold
  - Border Radius: 16px
  - Shadow: Large elevation

Upload Photo Button:
  - Background: White
  - Border: 2px solid Teal 400
  - Icon: Image (Teal 400, 40px)
  - Text: Teal 500, Medium
  - Border Radius: 12px
  - Shadow: Small elevation

Manual Confirmation Button:
  - Background: Gray 50
  - Border: 1px solid Gray 300
  - Icon: CheckCircle (Gray 500, 32px)
  - Text: Gray 700, Regular
  - Border Radius: 12px
```

### Submit Button
```
Default (Evidence Selected):
  - Background: Green gradient (#22C55E → #16A34A)
  - Text: White, Bold, 18px
  - Subtext: White 80% opacity, Regular, 14px
  - Height: 56px
  - Border Radius: 12px
  - Shadow: Medium elevation
  - Fixed to bottom

Disabled (No Evidence):
  - Background: Gray 300
  - Text: Gray 500
  - No shadow
  - Opacity: 0.6

Loading:
  - Background: Green gradient (maintained)
  - Spinner: White, 24px
  - Text: "Submitting..."
```

### Success State
```
Background: Success gradient overlay
  - Start: rgba(34, 197, 94, 0.05)
  - End: rgba(34, 197, 94, 0.1)

Checkmark Icon:
  - Size: 96px
  - Color: Green 500
  - Animation: Scale in + rotate (500ms)

Streak Counter:
  - Background: Amber gradient
  - Fire icon: Animated (flicker)
  - Text: White, Bold

AI Confidence Badge:
  - Background: Green 100
  - Border: 1px solid Green 300
  - Text: Green 700, Semibold
  - Icon: Sparkles (AI indicator)
```

### Warning State (Needs Review)
```
Background: Amber 50

Warning Icon:
  - Size: 80px
  - Color: Amber 500
  - Icon: AlertTriangle

Status Card:
  - Background: White
  - Border: 2px solid Amber 300
  - Border Radius: 12px
  - Padding: 16px

AI Transparency:
  - Background: Amber 50
  - Border: 1px solid Amber 200
  - Text: Amber 900
  - Icon: Info (Amber 500)
```

### Error State (Rejected)
```
Background: Red 50

Rejection Icon:
  - Size: 80px
  - Color: Red 500
  - Icon: XCircle

Reason Card:
  - Background: White
  - Border: 2px solid Red 300
  - Border Radius: 12px
  - Padding: 16px

Time Remaining:
  - Color urgency-coded:
    - Green 600 (>12h remaining)
    - Amber 600 (6-12h)
    - Red 600 (<6h)
  - Icon: Clock
  - Bold numbers
```

---

## Typography

### Goal Context Header
```
Goal Name:
  - Font: Inter Semibold
  - Size: 16px
  - Line Height: 24px
  - Color: Gray 900
  - Max Lines: 1 (truncate)

Streak & Progress:
  - Font: Inter Medium
  - Size: 14px
  - Line Height: 20px
  - Color: Gray 600
  - Icons: 16px inline

Date Label:
  - Font: Inter Regular
  - Size: 12px
  - Line Height: 16px
  - Color: Gray 500
```

### Evidence Selection Buttons
```
Primary Text:
  - Font: Inter Semibold
  - Size: 18px
  - Line Height: 24px
  - Color: White (take photo) or Teal 500 (upload)

Hint Text:
  - Font: Inter Regular
  - Size: 14px
  - Line Height: 20px
  - Color: White 80% opacity or Gray 600
  - Max Lines: 1
```

### Verification Result Screens
```
Status Heading:
  - Font: Inter Bold
  - Size: 28px
  - Line Height: 36px
  - Color: Green 900 (success), Amber 900 (warning), Red 900 (error)
  - Letter Spacing: -0.5px

Subtext:
  - Font: Inter Regular
  - Size: 16px
  - Line Height: 24px
  - Color: Gray 700

AI Reasoning:
  - Font: Inter Regular
  - Size: 14px
  - Line Height: 20px
  - Color: Gray 600

Confidence Score:
  - Font: Inter Bold
  - Size: 20px
  - Line Height: 28px
  - Color: Matches status (Green/Amber/Red 700)
  - Tabular Nums: Enabled
```

### Submit Button
```
Primary Text:
  - Font: Inter Bold
  - Size: 18px
  - Line Height: 24px
  - Color: White
  - Letter Spacing: 0.3px

Subtext:
  - Font: Inter Medium
  - Size: 14px
  - Line Height: 20px
  - Color: White 80% opacity
```

---

## Spacing & Layout

### Screen Padding
```
Horizontal: 16px (all sides)
Top: Safe area + 8px
Bottom: 16px + safe area
```

### Goal Context Card
```
Height: 100px (collapsed), up to 240px (expanded)
Padding: 16px
Margin Bottom: 20px
Border Radius: 12px
Background: White
Border: 1px solid Gray 200
Shadow: Small elevation
```

### Evidence Selection Buttons
```
Take Photo Button:
  - Height: 100px
  - Padding: 20px
  - Icon size: 48px
  - Icon to text gap: 12px
  - Margin Bottom: 12px

Upload Photo Button:
  - Height: 80px
  - Padding: 16px
  - Icon size: 40px
  - Icon to text gap: 10px
  - Margin Bottom: 12px

Manual Button:
  - Height: 64px
  - Padding: 12px
  - Icon size: 32px
  - Icon to text gap: 8px
```

### Photo Preview
```
Thumbnail:
  - Size: 320x240px (4:3 ratio)
  - Border Radius: 12px
  - Border: 2px solid Gray 200
  - Margin: 20px vertical
  - Centered

Action Buttons (below thumbnail):
  - Height: 44px
  - Gap: 12px
  - Margin Top: 16px
```

### Optional Note Field
```
Height: 48px (collapsed), up to 120px (expanded)
Padding: 12px
Border: 1px solid Gray 300
Border Radius: 8px
Margin: 20px vertical
Font: Inter Regular, 16px
Placeholder: Gray 400
```

### Submit Button
```
Height: 56px
Padding: 16px horizontal
Border Radius: 12px
Fixed: 16px from bottom (above safe area)
Width: Full (minus 32px total horizontal padding)
Shadow: Large elevation
```

### Verification Result Layout
```
Icon: 96px × 96px
  - Centered
  - Margin Top: 40px
  - Margin Bottom: 24px

Heading:
  - Margin Bottom: 12px

Subtext:
  - Margin Bottom: 24px

Streak/Progress Card:
  - Padding: 16px
  - Border Radius: 12px
  - Margin Bottom: 20px

AI Transparency Section:
  - Padding: 16px
  - Border Radius: 12px
  - Margin Bottom: 24px

Action Buttons:
  - First button: Margin Top 32px
  - Gap between buttons: 12px
```

---

## Component Styling

### Evidence Selection Button
```css
Take Photo Button (Primary):
  - Display: Flex Column
  - Align Items: Center
  - Justify Content: Center
  - Background: linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)
  - Height: 100px
  - Border Radius: 16px
  - Padding: 20px
  - Box Shadow: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)
  - Pressed: Scale 0.98, darker gradient
  - Transition: 150ms ease-out

Upload Button (Secondary):
  - Background: White
  - Border: 2px solid #2DD4BF
  - Height: 80px
  - Border Radius: 12px
  - Padding: 16px
  - Box Shadow: 0 1px 3px rgba(0,0,0,0.1)
  - Pressed: Background #F0FDFA

Manual Button (Tertiary):
  - Background: #F9FAFB
  - Border: 1px solid #D1D5DB
  - Height: 64px
  - Border Radius: 12px
  - Padding: 12px
  - Pressed: Background #F3F4F6
```

### Photo Preview Component
```css
Container:
  - Display: Flex Column
  - Align Items: Center
  - Padding: 20px vertical

Thumbnail:
  - Width: 320px
  - Height: 240px
  - Border Radius: 12px
  - Border: 2px solid #E5E7EB
  - Object Fit: Cover
  - Background: #F9FAFB (loading placeholder)

Thumbnail Tap Overlay:
  - Position: Absolute
  - Background: rgba(0,0,0,0.4)
  - Icon: Maximize (White, 32px, centered)
  - Opacity: 0 (default), 1 (hover)
  - Transition: 200ms

Action Button Row:
  - Display: Flex Row
  - Gap: 12px
  - Margin Top: 16px
```

### Submit Button (Bottom Fixed)
```css
Container:
  - Position: Fixed
  - Bottom: 16px (plus safe area)
  - Left: 16px
  - Right: 16px
  - Z-Index: 10

Button:
  - Width: 100%
  - Height: 56px
  - Background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%)
  - Border: None
  - Border Radius: 12px
  - Box Shadow: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)
  - Display: Flex Column
  - Align Items: Center
  - Justify Content: Center
  - Pressed: Scale 0.98, transform translateY(1px)

Button Text:
  - Color: White
  - Font: Inter Bold, 18px
  - Margin Bottom: 2px

Button Subtext:
  - Color: rgba(255,255,255,0.8)
  - Font: Inter Medium, 14px
```

### Success Result Card
```css
Container:
  - Display: Flex Column
  - Align Items: Center
  - Padding: 32px
  - Animation: Fade in + slide up (500ms)

Checkmark Icon:
  - Width: 96px
  - Height: 96px
  - Color: #22C55E
  - Animation: Scale in (0 → 1.2 → 1) + rotate 360° (500ms)
  - Animation Timing: Bounce

Heading:
  - Font: Inter Bold, 28px
  - Color: #16A34A
  - Margin Top: 24px
  - Animation: Fade in with delay (300ms)

Streak Card:
  - Background: linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #DC2626 100%)
  - Padding: 16px
  - Border Radius: 12px
  - Display: Flex Row
  - Align Items: Center
  - Justify Content: Center
  - Gap: 8px
  - Margin: 24px 0

Streak Fire Icon:
  - Width: 32px
  - Height: 32px
  - Animation: Flicker (Lottie) or pulse

Streak Text:
  - Color: White
  - Font: Inter Bold, 20px

AI Confidence Badge:
  - Background: #DCFCE7
  - Border: 1px solid #86EFAC
  - Padding: 8px 12px
  - Border Radius: 8px
  - Display: Flex Row
  - Align Items: Center
  - Gap: 6px

Badge Icon:
  - Sparkles icon (AI indicator)
  - Size: 16px
  - Color: #16A34A

Badge Text:
  - Color: #15803D
  - Font: Inter Semibold, 14px
```

### Warning/Error Result Cards
```css
Warning Container (Needs Review):
  - Background: #FFFBEB
  - Border: 2px solid #FCD34D
  - Padding: 24px
  - Border Radius: 16px
  - Margin: 20px 0

Error Container (Rejected):
  - Background: #FEF2F2
  - Border: 2px solid #FCA5A5
  - Padding: 24px
  - Border Radius: 16px
  - Margin: 20px 0

Icon (Warning/Error):
  - Size: 80px
  - Color: #F59E0B (warning) or #EF4444 (error)
  - Margin Bottom: 20px

AI Reasoning Section:
  - Background: White
  - Border: 1px solid #E5E7EB
  - Padding: 16px
  - Border Radius: 12px
  - Margin: 16px 0

Reasoning Label:
  - Font: Inter Semibold, 12px
  - Color: #6B7280
  - Text Transform: Uppercase
  - Letter Spacing: 0.5px
  - Margin Bottom: 8px

Reasoning Text:
  - Font: Inter Regular, 14px
  - Color: #374151
  - Line Height: 20px

Confidence Score:
  - Font: Inter Bold, 18px
  - Color: Matches status color
  - Display: Inline with icon
```

---

## Interaction States

### Button Press Effects
```
Take Photo Button:
  - Touch Down: Scale 0.98, haptic light
  - Touch Up: Scale 1.0, transition 150ms
  - Background: Slightly darker gradient

Submit Button:
  - Touch Down: Scale 0.98, transform translateY(1px)
  - Touch Up: Scale 1.0, translateY(0)
  - Haptic: Medium impact
```

### Camera Capture
```
Capture Button:
  - Default: White circle, 80px, border 4px White
  - Pressed: Scale 0.9, duration 100ms
  - Captured: Flash effect (white overlay 200ms)
  - Haptic: Heavy impact on capture

Preview Controls:
  - Use This Photo: Green button, scale animation
  - Retake: Outline button, standard press
```

### Photo Upload Progress
```
Progress Indicator:
  - Circular progress: Teal 400
  - Size: 48px
  - Stroke Width: 4px
  - Background: Gray 200
  - Percentage: Center text, Bold, 16px

Upload Complete:
  - Checkmark animation
  - Fade out progress (300ms)
  - Show thumbnail with fade in (300ms)
```

### AI Verification Loading
```
Spinner:
  - Size: 64px
  - Color: Teal 400
  - Style: Circular progress (indeterminate)
  - Rotation: Continuous

Status Messages:
  - Fade in/out rotation (2s intervals)
  - Font: Inter Regular, 16px
  - Color: Gray 600

Timeout State:
  - Message changes to warning tone
  - Action button appears (slide up 300ms)
```

---

## Animations & Transitions

### Success Celebration
```
Confetti Animation (Milestones):
  - Trigger: 7, 30, 100, 365 day streaks
  - Particles: 50-100 colored shapes
  - Duration: 3 seconds
  - Easing: Ease-out with gravity
  - Colors: Teal, Green, Amber, Blue

Checkmark Animation:
  - Initial: Scale 0, Opacity 0, Rotate 0deg
  - Final: Scale 1, Opacity 1, Rotate 360deg
  - Keyframes:
    - 0%: Scale 0
    - 60%: Scale 1.2 (overshoot)
    - 100%: Scale 1
  - Duration: 500ms
  - Timing: cubic-bezier(0.68, -0.55, 0.265, 1.55)

Streak Counter Update:
  - Count up animation (number increments)
  - Duration: 800ms
  - Easing: Ease-out
  - Fire icon: Pulse animation
```

### Photo Transition
```
Thumbnail Appear:
  - Opacity: 0 → 1 (300ms)
  - Transform: Scale 0.9 → 1.0
  - Easing: Ease-out

Full Screen Preview:
  - Slide up from bottom (400ms)
  - Background: Black fade in
  - Photo: Scale to fit screen
```

### Error Shake
```
Rejection Feedback:
  - Shake animation (horizontal)
  - Keyframes: 0px → -4px → 4px → -4px → 4px → 0px
  - Duration: 400ms
  - Haptic: Error vibration pattern
```

---

## Responsive Breakpoints

### Small Mobile (320px - 374px)
```
Evidence Buttons:
  - Height: 80px (take photo), 64px (upload), 56px (manual)
  - Icon size: -8px
  - Font size: -1px

Photo Thumbnail:
  - Width: 280px
  - Height: 210px

Submit Button:
  - Height: 52px
  - Font size: 16px (from 18px)
```

### Large Mobile (415px+)
```
Photo Thumbnail:
  - Width: 360px
  - Height: 270px

Evidence Buttons:
  - Slightly larger icons (+4px)
  - More generous padding (+4px)
```

---

## Accessibility

### Screen Reader Announcements
```
Evidence Selection:
  "Take photo of your evidence. Button."
  "Upload photo from library. Button."
  "Manual confirmation, I completed this. Button."

Camera Capture:
  "Photo captured. Use this photo or retake."

Verification Success:
  "Verified! Great work! Your streak is now [N] days. Progress: [X] of [Y] check-ins completed."

Verification Rejected:
  "Evidence not verified. Reason: [AI reasoning]. [Time remaining] until deadline. Options: Submit different evidence, Request manual review."
```

### Focus Indicators
```
All Interactive Elements:
  - Border: 2px solid Teal 400
  - Outline: None
  - Shadow: 0 0 0 4px rgba(45, 212, 191, 0.2)
  - Transition: 100ms

Tab Order:
  1. Back button
  2. Goal context (if expandable)
  3. Evidence selection buttons
  4. Photo actions (if photo selected)
  5. Note field (if present)
  6. Submit button
  7. Secondary actions
```

### Touch Targets
```
Evidence Selection Buttons: 80-100px height (full width)
Submit Button: 56px height (full width)
Camera Capture: 80x80px circular button
Preview Actions: 44px minimum height
Menu/Close Buttons: 44x44px minimum
```

---

## Performance Considerations

### Camera Optimization
```
Preload: Initialize camera on screen mount (background)
Capture: Compress to max 1920px width, JPEG 85% quality
Upload: Show immediate local preview while uploading
Background: Queue upload if network fails
```

### Image Processing
```
Thumbnail Generation:
  - Client-side resize to 320x240px
  - Display thumbnail immediately
  - Upload full resolution in background

Photo Compression:
  - Max file size: 2MB
  - Max dimensions: 1920x1920px
  - Format: JPEG (quality 85%)
  - Strip EXIF data (privacy)
```

### AI Verification
```
Timeout: 15 seconds max
Fallback: Automatic referee review if timeout
Retry: Allow one retry before fallback
Cache: Store results (don't re-verify same photo)
```

---

## Design Review Notes

**Approved by**: [Designer Name]
**Date**: 2025-11-12
**Version**: 1.0 (MVP)

**Key Design Decisions**:
- Green submit button (success-oriented, encouraging)
- Large evidence buttons (fast, thumb-friendly)
- Transparent AI reasoning (builds trust)
- Celebration animations for milestones (motivation)
- Fixed bottom submit button (always accessible)

**Implementation Priority**:
1. Core flow (photo → submit → verify)
2. Success state with animations
3. Error handling and retry flows
4. Camera optimizations

**Future Enhancements**:
- Video evidence support
- AR photo guides
- Advanced editing tools
- Multi-photo submissions
