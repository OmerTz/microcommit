# MicroCommit Design System

## Overview
This design system defines the visual language and design principles for the MicroCommit MVP. It ensures consistency across all screens while maintaining a modern, clean, and motivational aesthetic.

---

## Design Principles

### 1. Clean & Minimal
- Reduce visual clutter
- Focus on essential information
- White space is strategic, not wasteful
- Every element serves a clear purpose

### 2. Motivational & Positive
- Celebrate progress, not shame failures
- Use encouraging colors and language
- Achievement-focused visual feedback
- Emotional connection through design

### 3. Trust & Transparency
- Clear data presentation
- Honest visual hierarchy
- Accessible information
- Professional but friendly tone

### 4. Mobile-First
- Thumb-friendly interactions
- Optimized for one-handed use
- Clear touch targets (minimum 44x44px)
- Efficient use of screen real estate

### 5. Implementation-Ready
- Standard component patterns
- Reasonable complexity
- Clear specifications
- Build with existing tools (Expo, React Native)

---

## Color System

### Primary Palette
```
Brand Teal (Primary):
  - Teal 400: #2DD4BF (primary actions, highlights)
  - Teal 500: #14B8A6 (hover states, gradients)
  - Teal 600: #0D9488 (pressed states)
  - Teal 50:  #F0FDFA (backgrounds, subtle highlights)

Purpose: Main brand color, positive actions, on-track states
Usage: Buttons, progress indicators, success states, links
```

### Status Colors
```
Success Green:
  - Green 500: #22C55E (completed actions)
  - Green 100: #DCFCE7 (success backgrounds)

Warning Amber:
  - Amber 500: #F59E0B (at-risk states)
  - Amber 100: #FEF3C7 (warning backgrounds)

Danger Red:
  - Red 500: #EF4444 (overdue, errors)
  - Red 100: #FEE2E2 (error backgrounds)

Info Blue:
  - Blue 500: #3B82F6 (informational)
  - Blue 100: #DBEAFE (info backgrounds)
```

### Neutral Palette
```
Text Colors:
  - Gray 900: #111827 (primary text, headings)
  - Gray 700: #374151 (secondary text)
  - Gray 500: #6B7280 (tertiary text, placeholders)
  - Gray 400: #9CA3AF (disabled text, subtle labels)

Backgrounds:
  - White: #FFFFFF (cards, surfaces)
  - Gray 50: #F9FAFB (page backgrounds)
  - Gray 100: #F3F4F6 (input backgrounds, borders)
  - Gray 200: #E5E7EB (dividers, borders)
```

### Gradient Definitions
```
Primary Gradient:
  linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)
  Usage: Hero buttons, premium features, celebration states

Success Gradient:
  linear-gradient(135deg, #22C55E 0%, #16A34A 100%)
  Usage: Goal completion, achievement badges

Streak Gradient:
  linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #DC2626 100%)
  Usage: Streak counters, fire animations
```

---

## Typography

### Font Family
**Primary**: Inter (Google Fonts)
- Excellent readability on mobile screens
- Wide range of weights available
- Professional yet friendly

**Fallback**: System font (-apple-system, BlinkMacSystemFont, "Segoe UI")

### Type Scale

#### Display Text
```
Display Large:
  - Size: 32px
  - Weight: Bold (700)
  - Line Height: 40px
  - Usage: Welcome screen heading, major page titles
  - Letter Spacing: -0.5px

Display Medium:
  - Size: 24px
  - Weight: Bold (700)
  - Line Height: 32px
  - Usage: Section headings, modal titles
  - Letter Spacing: -0.3px
```

#### Body Text
```
Body Large:
  - Size: 18px
  - Weight: Medium (500)
  - Line Height: 28px
  - Usage: Important descriptions, button text

Body Regular:
  - Size: 16px
  - Weight: Regular (400)
  - Line Height: 24px
  - Usage: Default body text, form inputs

Body Small:
  - Size: 14px
  - Weight: Regular (400)
  - Line Height: 20px
  - Usage: Supporting text, captions, labels
```

#### Labels & Metadata
```
Label Large:
  - Size: 14px
  - Weight: Semibold (600)
  - Line Height: 20px
  - Usage: Form labels, card titles

Label Regular:
  - Size: 12px
  - Weight: Medium (500)
  - Line Height: 16px
  - Usage: Timestamps, badges, metadata

Label Small:
  - Size: 10px
  - Weight: Medium (500)
  - Line Height: 14px
  - Usage: Tiny labels, legal text
  - Letter Spacing: 0.5px (all caps)
```

#### Special Typography
```
Numbers (Stats):
  - Size: 28px
  - Weight: Bold (700)
  - Line Height: 36px
  - Usage: Dashboard stats, progress numbers
  - Font Feature: Tabular nums

Numbers (Small):
  - Size: 20px
  - Weight: Bold (700)
  - Line Height: 28px
  - Usage: Card stats, mini counters
```

---

## Spacing System

### Base Unit: 4px
All spacing uses multiples of 4px for consistency.

### Spacing Scale
```
Space 0:  0px
Space 1:  4px   (tight grouping)
Space 2:  8px   (related elements)
Space 3:  12px  (small gaps)
Space 4:  16px  (default padding, element spacing)
Space 5:  20px  (medium gaps)
Space 6:  24px  (section spacing)
Space 8:  32px  (large gaps)
Space 10: 40px  (major sections)
Space 12: 48px  (screen-level spacing)
Space 16: 64px  (extra large gaps)
```

### Application
```
Screen Padding:
  - Horizontal: 16px (Space 4) mobile, 24px (Space 6) tablet
  - Vertical: 20px (Space 5) top, 16px (Space 4) bottom

Card Padding:
  - Internal: 16px (Space 4) all sides
  - Between cards: 12px (Space 3) vertical

Component Spacing:
  - Icon to text: 8px (Space 2)
  - Label to input: 8px (Space 2)
  - Button group gap: 12px (Space 3)
  - Section dividers: 24px (Space 6)
```

---

## Border Radius

### Radius Scale
```
Radius None: 0px     (tables, dividers)
Radius Small: 4px    (badges, tiny chips)
Radius Medium: 8px   (inputs, small cards)
Radius Large: 12px   (buttons, goal cards)
Radius XL: 16px      (modals, large cards)
Radius 2XL: 24px     (bottom sheets, hero cards)
Radius Full: 9999px  (circular avatars, pills)
```

### Usage Guidelines
- **Buttons**: Radius Large (12px)
- **Cards**: Radius Large (12px) or XL (16px)
- **Inputs**: Radius Medium (8px)
- **Modals**: Radius XL (16px) for corners
- **Bottom Sheets**: Radius 2XL (24px) top corners only
- **Avatars**: Radius Full (circular)

---

## Shadows & Elevation

### Shadow Levels
```
Shadow None:
  box-shadow: none

Shadow Small (Elevation 1):
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
              0px 1px 2px rgba(0, 0, 0, 0.06)
  Usage: Input focus, small cards

Shadow Medium (Elevation 2):
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.07),
              0px 2px 4px rgba(0, 0, 0, 0.05)
  Usage: Goal cards, raised buttons

Shadow Large (Elevation 3):
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1),
              0px 4px 6px rgba(0, 0, 0, 0.05)
  Usage: Modals, floating action buttons

Shadow Extra Large (Elevation 4):
  box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.15),
              0px 10px 10px rgba(0, 0, 0, 0.04)
  Usage: Overlays, important dialogs
```

### Elevation Guidelines
- Use elevation sparingly
- Higher elevation = more important
- Respect platform conventions (Android uses more elevation)
- Consider performance on mobile

---

## Iconography

### Icon System: Lucide React Native
- Consistent stroke width: 2px
- Default size: 24x24px
- Sizes available: 16px, 20px, 24px, 28px, 32px

### Icon Colors
```
Default: Gray 700 (#374151)
Active: Teal 400 (#2DD4BF)
Disabled: Gray 400 (#9CA3AF)
On Dark: White (#FFFFFF)
On Color: White (#FFFFFF)
```

### Common Icons
```
Navigation:
  - Home: Home icon
  - Goals: Target icon
  - Check-in: Camera icon
  - Profile: User icon
  - Settings: Settings icon

Actions:
  - Add: Plus icon
  - Edit: Edit icon
  - Delete: Trash icon
  - Share: Share icon
  - Close: X icon

Status:
  - Success: CheckCircle icon
  - Warning: AlertTriangle icon
  - Error: XCircle icon
  - Info: Info icon
  - Help: HelpCircle icon

Progress:
  - Streak: Flame icon (or emoji 🔥)
  - Goal: Target icon
  - Calendar: Calendar icon
  - Clock: Clock icon
```

### Emoji Usage
**When to use emojis**:
- Goal category icons (visual, friendly)
- Celebration moments (confetti, party)
- Streak counters (fire emoji)
- Quick recognition (heart for charity)

**When NOT to use emojis**:
- Navigation (use consistent icon set)
- Error states (use proper icons)
- Accessibility contexts (screen readers struggle with emojis)

---

## Component Styles

### Buttons

#### Primary Button
```
Background: Teal gradient (#2DD4BF to #14B8A6)
Text: White, Bold, 18px
Height: 56px
Padding: 16px horizontal
Border Radius: 12px
Shadow: Medium elevation

States:
  - Default: Full color
  - Hover: Slightly darker gradient
  - Pressed: Scale 0.98, darker shade
  - Disabled: Gray 300 background, Gray 400 text
  - Loading: Show spinner, maintain color
```

#### Secondary Button
```
Background: Transparent
Text: Teal 400, Semibold, 16px
Height: 48px
Padding: 12px horizontal
Border: 2px solid Teal 400
Border Radius: 12px
Shadow: None

States:
  - Default: Outlined
  - Hover: Teal 50 background
  - Pressed: Teal 100 background
  - Disabled: Gray 300 border, Gray 400 text
```

#### Tertiary Button
```
Background: Transparent
Text: Teal 400, Medium, 16px
Height: 44px
Padding: 8px horizontal
Border: None
Shadow: None

States:
  - Default: Text only
  - Hover: Underline
  - Pressed: Slightly darker text
  - Disabled: Gray 400 text
```

### Input Fields

#### Text Input
```
Background: White
Border: 1px solid Gray 200
Border Radius: 8px
Height: 48px
Padding: 12px horizontal
Font: Regular, 16px
Placeholder: Gray 400

States:
  - Default: Gray border
  - Focus: Teal 400 border, shadow small
  - Error: Red 500 border, Red 100 background
  - Disabled: Gray 100 background, Gray 400 text
  - Success: Green 500 border (optional)
```

#### Textarea
```
Same as text input, but:
  - Min height: 96px
  - Padding: 12px all sides
  - Vertical resize allowed
```

### Cards

#### Goal Card
```
Background: White
Border: 1px solid Gray 200
Border Radius: 12px
Padding: 16px
Shadow: Medium elevation
Margin: 12px between cards

States:
  - Default: White background
  - Hover: Slight scale (1.02) - web only
  - Pressed: Gray 50 background
  - On Track: Left border 4px Teal 400
  - At Risk: Left border 4px Amber 500
  - Overdue: Left border 4px Red 500
```

#### Info Card / Widget
```
Background: Gray 50 or Teal 50
Border: None (optional: 1px solid matching color)
Border Radius: 12px
Padding: 16px
Shadow: Small elevation or none

Usage: Stats widgets, info panels, highlights
```

### Progress Bars

#### Linear Progress
```
Height: 8px
Border Radius: Full (pill shape)
Background: Gray 200 (track)
Fill: Teal gradient (progress)

Variants:
  - Success: Green gradient
  - Warning: Amber gradient
  - Danger: Red gradient

Animation: Smooth fill transition (0.3s ease)
```

#### Circular Progress
```
Size: 64px (small), 96px (medium), 128px (large)
Stroke Width: 8px (small), 10px (medium), 12px (large)
Background: Gray 200
Fill: Teal gradient

Usage: Goal completion percentage, loading states
```

### Badges

#### Status Badge
```
Height: 24px
Padding: 6px horizontal
Border Radius: Full (pill)
Font: Label Regular (12px, Semibold)

Colors:
  - Success: Green 100 bg, Green 700 text
  - Warning: Amber 100 bg, Amber 700 text
  - Danger: Red 100 bg, Red 700 text
  - Info: Blue 100 bg, Blue 700 text
  - Neutral: Gray 200 bg, Gray 700 text
```

#### Count Badge
```
Size: 20x20px (small), 24x24px (regular)
Border Radius: Full (circular)
Background: Red 500
Text: White, Bold, 12px
Position: Top-right corner of icon

Usage: Notification counts, pending items
```

---

## Animation & Motion

### Timing Functions
```
Ease Out (Default): cubic-bezier(0.0, 0.0, 0.2, 1)
Ease In Out: cubic-bezier(0.4, 0.0, 0.2, 1)
Bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Duration Scale
```
Fast: 150ms (micro-interactions, hovers)
Normal: 300ms (default transitions)
Slow: 500ms (complex animations)
Extra Slow: 800ms (celebration, page transitions)
```

### Common Animations

#### Button Press
```
Transform: scale(0.98)
Duration: 150ms
Timing: Ease Out
```

#### Card Hover (Web)
```
Transform: scale(1.02)
Shadow: Increase elevation
Duration: 300ms
Timing: Ease Out
```

#### Modal Enter
```
Opacity: 0 → 1
Transform: translateY(20px) → translateY(0)
Duration: 300ms
Timing: Ease Out
```

#### Success Celebration
```
Confetti animation (Lottie)
Scale pulse: 1 → 1.2 → 1
Duration: 800ms
Timing: Bounce
```

#### Progress Bar Fill
```
Width: 0% → target%
Duration: 500ms
Timing: Ease Out
```

#### Streak Fire
```
Lottie animation (flame flicker)
Continuous loop when displayed
Scale pulse on milestone
```

### Motion Guidelines
- Respect "Reduce Motion" accessibility setting
- Use spring animations for natural feel (React Native Reanimated)
- 60fps target for all animations
- Avoid animation on slow devices (detect and disable)

---

## Responsive Breakpoints

### Mobile (Primary Target)
```
Small: 320px - 374px (iPhone SE, small Android)
Medium: 375px - 414px (iPhone 12-14)
Large: 415px - 428px (iPhone 14 Pro Max)
Extra Large: 429px+ (large Android phones)
```

### Tablet
```
Small Tablet: 768px - 834px (iPad Mini)
Large Tablet: 835px - 1024px (iPad Pro)
```

### Layout Adaptations
```
Mobile:
  - Single column
  - Full-width buttons (with 16px margins)
  - Stack elements vertically
  - Thumb-friendly bottom navigation

Tablet:
  - Max content width: 600px (centered)
  - Larger font sizes (+2px)
  - More generous spacing (+8px)
  - Consider 2-column layouts for lists
```

---

## Accessibility

### WCAG AA Compliance
- Text contrast ratio: Minimum 4.5:1 (normal text), 3:1 (large text)
- Touch targets: Minimum 44x44px
- Focus indicators: 2px Teal 400 border + shadow
- Error messages: Icon + text (not color alone)

### Screen Reader Support
- Semantic HTML/React Native elements
- Proper labels for all interactive elements
- Announce dynamic changes (toasts, errors)
- Logical tab order

### Color Blindness
- Don't rely on color alone (use icons + text)
- Tested with Deuteranopia and Protanopia simulators
- High contrast mode support

### Keyboard Navigation (Web)
- Tab through all interactive elements
- Enter/Space activate buttons
- Escape closes modals
- Arrow keys for navigation

---

## Platform-Specific Considerations

### iOS
- Use native iOS design patterns where expected
- Bottom tab bar (iOS standard)
- Swipe gestures feel natural
- Haptic feedback on interactions
- SF Symbols for system icons (optional)

### Android
- Material Design influences (elevation, ripple effects)
- Bottom navigation or drawer (user preference)
- Android back button support
- Notification patterns follow Android guidelines

### Web (Progressive Web App)
- Hover states on interactive elements
- Cursor changes (pointer for clickable)
- Keyboard navigation support
- Responsive breakpoints
- Browser-safe fonts and colors

---

## Dark Mode (Post-MVP)

### Future Consideration
While not in MVP scope, design with dark mode in mind:

```
Dark Mode Colors:
  - Background: Gray 900 (#111827)
  - Surface: Gray 800 (#1F2937)
  - Text: Gray 100 (#F3F4F6)
  - Text Secondary: Gray 400 (#9CA3AF)
  - Borders: Gray 700 (#374151)
  - Primary: Teal 400 (same)
```

**Design Rule**: Use semantic color tokens (not hardcoded hex) to make dark mode easier later.

---

## Design Tokens (For Developers)

### Color Tokens
```javascript
colors: {
  primary: '#2DD4BF',
  primaryDark: '#14B8A6',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  textPrimary: '#111827',
  textSecondary: '#374151',
  textTertiary: '#6B7280',
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  border: '#E5E7EB',
}
```

### Spacing Tokens
```javascript
spacing: {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
}
```

### Typography Tokens
```javascript
typography: {
  displayLarge: { size: 32, weight: '700', lineHeight: 40 },
  displayMedium: { size: 24, weight: '700', lineHeight: 32 },
  bodyLarge: { size: 18, weight: '500', lineHeight: 28 },
  bodyRegular: { size: 16, weight: '400', lineHeight: 24 },
  bodySmall: { size: 14, weight: '400', lineHeight: 20 },
  labelLarge: { size: 14, weight: '600', lineHeight: 20 },
  labelRegular: { size: 12, weight: '500', lineHeight: 16 },
}
```

---

## Design Review Checklist

Before finalizing any screen design, verify:

- [ ] Colors match design system palette
- [ ] Typography uses defined scale
- [ ] Spacing uses 4px grid system
- [ ] Touch targets are minimum 44x44px
- [ ] Contrast ratios meet WCAG AA
- [ ] Animations have appropriate duration
- [ ] Design works on smallest target device (320px width)
- [ ] Icons are from Lucide set (or justified)
- [ ] Components follow defined patterns
- [ ] Design is implementable with current tech stack

---

## Tools & Resources

### Design Tools
- **Figma**: Primary design tool
- **Lucide Icons**: https://lucide.dev/icons/
- **Inter Font**: https://fonts.google.com/specimen/Inter
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/

### Development Libraries
- **React Native**: Core framework
- **Expo**: Development platform
- **React Native Reanimated**: Animations
- **Lucide React Native**: Icons
- **Supabase**: Backend

### Testing
- **iOS Simulator**: Primary mobile testing
- **Android Emulator**: Secondary mobile testing
- **Chrome DevTools**: Responsive web testing
- **Accessibility Inspector**: WCAG compliance

---

## Version History
- **v1.0** (2025-11-12): Initial MVP design system

---

## Notes for Developers

This design system is **intentionally MVP-scoped**:
- Simple, not comprehensive
- Standard patterns over custom components
- Easy to implement with Expo and React Native
- Focused on core screens and flows

**Deviation from system**: Allowed when justified by user experience or technical constraints, but document the reason.

**Expansion**: This system will evolve post-MVP based on user feedback and feature additions.
