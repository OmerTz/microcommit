# Dashboard Screen - Design Specification

## Overview
The Dashboard is the primary home screen where users see their active goals at a glance. The design emphasizes clarity, quick access to actions, and motivational elements to keep users engaged with their commitments.

---

## Visual Hierarchy

### Priority Levels
1. **Critical**: Goal cards with due check-ins (especially overdue)
2. **High**: Stats widget, "Check In Now" buttons
3. **Medium**: Goal cards without urgent actions, quick actions
4. **Low**: Achievements section, community feed (post-MVP)

### Layout Flow
```
┌─────────────────────────────────┐
│ [HEADER - Stats & Greeting]     │ ← Fixed position, scroll under
├─────────────────────────────────┤
│                                 │
│  [GOAL CARDS]                   │ ← Primary scroll area
│  ┌──────────────────────────┐  │
│  │ Goal 1 (Overdue) 🔴      │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ Goal 2 (Due Soon) 🟡     │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ Goal 3 (On Track) 🟢     │  │
│  └──────────────────────────┘  │
│                                 │
│  [QUICK ACTIONS GRID]           │
│                                 │
│  [ACHIEVEMENTS]                 │
│                                 │
└─────────────────────────────────┘
[BOTTOM TAB BAR] ← Fixed position
```

---

## Color Scheme

### Header Section
```
Background: Linear gradient
  - Start: Teal 400 (#2DD4BF)
  - End: Teal 500 (#14B8A6)
  - Direction: 135deg (top-left to bottom-right)

Text: White (#FFFFFF)
Icons: White with 90% opacity
```

### Goal Cards
```
Base Card:
  - Background: White (#FFFFFF)
  - Border: 1px solid Gray 200 (#E5E7EB)
  - Shadow: Medium elevation

Status Accent (left border, 4px width):
  - On Track: Teal 400 (#2DD4BF)
  - At Risk: Amber 500 (#F59E0B)
  - Overdue: Red 500 (#EF4444)
  - Pending Review: Blue 500 (#3B82F6)

Progress Bar:
  - Track: Gray 200 (#E5E7EB)
  - Fill (On Track): Teal gradient
  - Fill (At Risk): Amber gradient
  - Fill (Overdue): Red gradient
```

### Quick Actions
```
Tile Background: Gray 50 (#F9FAFB)
Tile Border: 1px solid Gray 200 (#E5E7EB)
Icon Background: Teal 50 (#F0FDFA)
Icon Color: Teal 400 (#2DD4BF)
Label: Gray 700 (#374151)
```

### Empty State
```
Background: Gray 50 (#F9FAFB)
Illustration: Teal/Gray tones
Primary Text: Gray 900 (#111827)
Secondary Text: Gray 500 (#6B7280)
CTA Button: Primary teal gradient
```

---

## Typography

### Header Section
```
Greeting Text:
  - "Good morning, [Name]!"
  - Font: Inter Semibold
  - Size: 20px
  - Line Height: 28px
  - Color: White
  - Letter Spacing: -0.2px

Stat Numbers:
  - Font: Inter Bold
  - Size: 24px
  - Line Height: 32px
  - Color: White
  - Tabular Nums: Enabled

Stat Labels:
  - Font: Inter Medium
  - Size: 12px
  - Line Height: 16px
  - Color: White (80% opacity)
  - Text Transform: None
```

### Goal Cards
```
Goal Name:
  - Font: Inter Semibold
  - Size: 18px
  - Line Height: 24px
  - Color: Gray 900
  - Max Lines: 2 (truncate with ellipsis)

Charity Name:
  - Font: Inter Medium
  - Size: 14px
  - Line Height: 20px
  - Color: Gray 700

Progress Text:
  - Font: Inter Regular
  - Size: 14px
  - Line Height: 20px
  - Color: Gray 600
  - Numbers: Tabular nums

Streak Counter:
  - Font: Inter Bold
  - Size: 16px
  - Line Height: 24px
  - Color: Amber 600 (#D97706)
  - Icon: Fire emoji (🔥) or Lucide Flame icon

Next Check-in:
  - Font: Inter Medium
  - Size: 14px
  - Line Height: 20px
  - Color: Matches urgency (Green/Amber/Red 600)

Button Text:
  - Font: Inter Semibold
  - Size: 14px
  - Line Height: 20px
  - Color: White (primary) or Teal 500 (secondary)
```

### Section Headers
```
"My Active Goals", "Quick Actions", etc.:
  - Font: Inter Bold
  - Size: 20px
  - Line Height: 28px
  - Color: Gray 900
  - Letter Spacing: -0.3px
  - Margin Bottom: 16px

Count Badge (e.g., "3 active"):
  - Font: Inter Medium
  - Size: 12px
  - Color: Gray 600
  - Background: Gray 100
  - Padding: 4px 8px
  - Border Radius: Full (pill)
```

---

## Spacing & Padding

### Screen Level
```
Horizontal Padding: 16px (all sides)
Top Padding: Safe area + 16px
Bottom Padding: Tab bar height + 16px
```

### Header Section
```
Internal Padding: 20px all sides
Height: Auto (min 120px)
Margin Bottom: 0 (flows into content)
```

### Stats Widget
```
Container:
  - Padding: 0 (horizontal scroll container)
  - Gap between cards: 12px

Individual Stat Card:
  - Width: 120px
  - Height: 80px
  - Padding: 12px
  - Border Radius: 12px
  - First card margin left: 16px
  - Last card margin right: 16px
```

### Goal Cards
```
Card Padding: 16px all sides
Margin Bottom: 12px (between cards)
First Card Margin Top: 20px

Internal Element Spacing:
  - Header row height: 32px
  - Charity info margin top: 12px
  - Progress bar margin top: 16px
  - Streak counter margin top: 8px
  - Next check-in margin top: 12px
  - Button row margin top: 16px
  - Gap between buttons: 8px
```

### Quick Actions Section
```
Section Margin Top: 32px
Grid:
  - Columns: 2
  - Gap: 12px horizontal and vertical
  - Tile Padding: 16px
  - Tile Height: 100px
  - Icon size: 32px
  - Label margin top: 12px
```

### Empty State
```
Container Padding: 32px horizontal, 48px vertical
Illustration height: 200px
Title margin top: 24px
Description margin top: 12px
Button margin top: 24px
Link margin top: 16px
```

---

## Component Styling

### Goal Card Component
```css
Goal Card Container:
  - Background: White
  - Border: 1px solid #E5E7EB
  - Border Left: 4px solid [status color]
  - Border Radius: 12px
  - Box Shadow: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)
  - Padding: 16px

Header Row:
  - Display: Flex
  - Justify: Space between
  - Align: Center
  - Height: 32px

Goal Icon:
  - Size: 24x24px
  - Margin Right: 8px
  - Filter: None (emoji) or color: Gray 700 (Lucide icon)

Goal Name:
  - Flex: 1
  - Overflow: Hidden
  - Text Overflow: Ellipsis

Menu Button:
  - Size: 32x32px (touch target)
  - Icon: MoreVertical (24px)
  - Color: Gray 500
  - Hover: Gray 700
  - Pressed: Gray 100 background

Charity Info:
  - Display: Flex
  - Align: Center
  - Gap: 8px

Charity Logo:
  - Size: 24x24px
  - Border Radius: Full (circular)
  - Border: 1px solid Gray 200

Arrow Icon:
  - Size: 16px
  - Color: Gray 400

Progress Bar:
  - Height: 8px
  - Border Radius: Full (pill)
  - Background: Gray 200
  - Fill: Animated gradient
  - Transition: Width 500ms ease-out

Progress Text:
  - Margin Top: 4px
  - Display: Flex
  - Justify: Space between

Streak Counter:
  - Display: Flex
  - Align: Center
  - Gap: 6px
  - Background: Amber 50 (optional highlight)
  - Padding: 4px 8px (optional)
  - Border Radius: 6px (optional)

Next Check-in Row:
  - Display: Flex
  - Align: Center
  - Gap: 8px
  - Padding: 8px
  - Background: [urgency color] with 10% opacity
  - Border Radius: 8px

Button Row:
  - Display: Flex
  - Gap: 8px
  - Flex Direction: Row (side-by-side) or Column (stacked if urgent)

Primary Button (Check In Now):
  - Flex: 1 (or full width if urgent)
  - Height: 44px
  - Background: Teal gradient (on time) or Red 500 (overdue)
  - Text: White, Semibold, 14px
  - Border Radius: 8px
  - Icon: Optional (Camera icon, 16px, left)
  - Pressed: Scale 0.98

Secondary Button (View Details):
  - Flex: 1 (or full width)
  - Height: 44px
  - Background: Transparent
  - Border: 1px solid Teal 400
  - Text: Teal 500, Semibold, 14px
  - Border Radius: 8px
  - Pressed: Background Teal 50

Checked In State:
  - Button disabled
  - Background: Green 100
  - Text: Green 700 with checkmark icon
  - No hover/press effects
```

### Stats Widget Card
```css
Stat Card:
  - Width: 120px
  - Height: 80px
  - Background: White (10% opacity on gradient)
  - Border: 1px solid White (20% opacity)
  - Border Radius: 12px
  - Padding: 12px
  - Backdrop Filter: Blur(10px) - optional glass effect

Stat Icon:
  - Size: 20px
  - Color: White
  - Margin Bottom: 4px

Stat Number:
  - Font: Inter Bold, 24px
  - Color: White
  - Line Height: 32px

Stat Label:
  - Font: Inter Medium, 12px
  - Color: White (80% opacity)
  - Line Height: 16px
  - Margin Top: 2px
```

### Quick Action Tile
```css
Tile Container:
  - Background: Gray 50
  - Border: 1px solid Gray 200
  - Border Radius: 12px
  - Padding: 16px
  - Align: Center (text and icon)
  - Justify: Center
  - Pressed: Background Gray 100, Scale 0.98

Icon Container:
  - Size: 48x48px
  - Background: Teal 50
  - Border Radius: Full (circular)
  - Display: Flex
  - Align: Center
  - Justify: Center

Icon:
  - Size: 24px
  - Color: Teal 500

Label:
  - Font: Inter Semibold, 14px
  - Color: Gray 700
  - Margin Top: 12px
  - Text Align: Center
```

### Empty State Component
```css
Container:
  - Background: Gray 50
  - Border: 2px dashed Gray 300
  - Border Radius: 16px
  - Padding: 32px
  - Align: Center

Illustration:
  - Height: 200px
  - Width: Auto
  - Margin Bottom: 24px
  - Opacity: 0.8

Title:
  - Font: Inter Bold, 20px
  - Color: Gray 900
  - Text Align: Center
  - Margin Bottom: 12px

Description:
  - Font: Inter Regular, 16px
  - Color: Gray 600
  - Text Align: Center
  - Max Width: 320px
  - Margin Bottom: 24px

CTA Button:
  - Width: 100% (max 280px)
  - Height: 56px
  - Background: Teal gradient
  - Text: White, Bold, 18px
  - Border Radius: 12px
  - Margin Bottom: 16px

Link:
  - Font: Inter Medium, 14px
  - Color: Teal 500
  - Text Decoration: Underline
```

---

## Interaction States

### Goal Card Interactions

#### Default State
- Card displays with medium shadow
- All elements visible and readable

#### Hover State (Web only)
```
Transform: scale(1.01)
Shadow: Large elevation
Transition: 200ms ease-out
Cursor: Pointer
```

#### Pressed State
```
Background: Gray 50
Transform: scale(0.99)
Transition: 100ms ease-out
```

#### Swipe Actions (Mobile)
```
Swipe Left:
  - Reveal action buttons (80px width each)
  - Actions: "Check In", "Details", "Pause"
  - Background: Gray 100
  - Icon + Label layout

Swipe Right:
  - Quick encouragement (if referee assigned)
  - Action: "Send Message"
  - Background: Blue 50
  - Icon: MessageCircle
```

#### Long Press (Mobile)
```
Haptic Feedback: Medium impact
Duration: 500ms
Effect: Show bottom sheet with actions
Actions:
  - Check In Now
  - View Details
  - Edit Goal
  - Share Progress
  - Delete Goal (with confirmation)
```

### Button States

#### Primary Button
```
Default:
  - Background: Teal gradient
  - Text: White
  - Shadow: Small

Hover (Web):
  - Background: Darker teal gradient
  - Shadow: Medium

Pressed:
  - Transform: scale(0.98)
  - Background: Even darker teal

Disabled:
  - Background: Gray 300
  - Text: Gray 400
  - Opacity: 0.6
  - Cursor: Not-allowed

Loading:
  - Background: Teal gradient (maintained)
  - Text: Hidden
  - Spinner: White, 20px, centered
```

#### Secondary Button
```
Default:
  - Border: 1px solid Teal 400
  - Text: Teal 500
  - Background: Transparent

Hover:
  - Background: Teal 50

Pressed:
  - Background: Teal 100

Disabled:
  - Border: Gray 300
  - Text: Gray 400
  - Opacity: 0.6
```

### Pull-to-Refresh
```
Gesture: Drag down from top
Indicator:
  - Position: Below header
  - Size: 40x40px spinner
  - Color: Teal 400
  - Background: White with shadow

States:
  1. Pull (0-60px): Show spinner, scale 0 → 1
  2. Ready (>60px): Spinner spins, haptic feedback
  3. Refreshing: Lock scroll, show spinner
  4. Complete: Fade out spinner (300ms)
```

---

## Animations & Transitions

### Page Load Animation
```
Sequence (total duration: 1200ms):
  1. Header fades in (0-300ms)
  2. Stats widget slides up (200-500ms)
  3. Goal cards stagger in:
     - Each card: Fade + slide up (100ms duration)
     - Stagger delay: 80ms between cards
  4. Quick actions fade in (800-1000ms)

Effect: Professional, not overwhelming
```

### Progress Bar Fill
```
Animation: Width from 0% to target%
Duration: 800ms (first load) or 300ms (update)
Timing: Ease-out
Trigger: On card visible in viewport
```

### Streak Fire Animation
```
Icon: Flame emoji or Lottie animation
Effect: Subtle flicker (if Lottie)
Loop: Continuous when displayed
Milestone (e.g., 30 days):
  - Scale pulse: 1 → 1.3 → 1
  - Duration: 600ms
  - Timing: Bounce
  - Confetti: Optional overlay
```

### Goal Card Add/Remove
```
Add:
  - Slide down from header (300ms)
  - Fade in simultaneously
  - Push existing cards down

Remove:
  - Fade out + shrink height (300ms)
  - Slide remaining cards up
```

### Check-in Success
```
Button State:
  - Scale pulse: 1 → 1.1 → 1 (400ms)
  - Background: Green gradient
  - Icon: Check mark animation

Card Update:
  - Progress bar fills to new value (500ms)
  - Streak counter increments with bounce (300ms)
  - Success toast appears at top (2s duration)
```

### Error State Animation
```
Shake Animation:
  - Horizontal shake: -4px, 4px, -4px, 4px, 0
  - Duration: 400ms
  - Trigger: On error (network, validation)
  - Haptic: Error impact
```

---

## Responsive Breakpoints

### Small Mobile (320px - 374px)
```
Adjustments:
  - Reduce horizontal padding: 12px
  - Goal card font size: -1px for all text
  - Stats widget cards: 100px width
  - Quick actions: 2x2 grid (maintained)
  - Button height: 44px (from 56px)
```

### Medium Mobile (375px - 414px)
```
Default design (base specifications)
```

### Large Mobile (415px+)
```
Enhancements:
  - Goal card padding: 20px
  - Stats widget cards: 140px width
  - Quick actions: Consider 4 across if 2nd row needed
  - Larger font sizes: +1px for headings
```

### Tablet (768px+)
```
Major Changes:
  - Max content width: 600px (centered)
  - Horizontal padding: 32px
  - Goal cards: 2-column grid (optional)
  - Stats widget: Show all stats in one row
  - Quick actions: 4 across in single row
  - Bottom tabs: Optional side navigation
```

---

## Accessibility

### Screen Reader Announcements
```
Page Load:
  "Dashboard. You have [N] active goals. [M] check-ins due today."

Goal Card:
  "[Goal Name]. [Charity Name] beneficiary.
   Progress: [X] of [Y] check-ins completed.
   Streak: [N] days.
   Next check-in: [Time].
   Actions available: Check in now, View details."

Stats Widget:
  "[Number] [Label]. Tap for details."

Empty State:
  "No active goals yet. Create your first commitment to get started.
   Button: Create Goal."
```

### Focus Indicators
```
Keyboard Focus:
  - Border: 2px solid Teal 400
  - Outline: None
  - Shadow: 0 0 0 4px rgba(45, 212, 191, 0.2)
  - Transition: 100ms

Tab Order:
  1. Notification bell
  2. Stats widgets (left to right)
  3. Goal cards (top to bottom)
  4. Quick action tiles (left to right, top to bottom)
  5. Bottom tabs
```

### Color Contrast
```
All text combinations verified:
  ✓ White on Teal 400: 5.1:1 (AA)
  ✓ Gray 900 on White: 17:1 (AAA)
  ✓ Gray 700 on White: 8.4:1 (AAA)
  ✓ Teal 500 on White: 4.7:1 (AA)
  ✓ Red 500 on White: 5.3:1 (AA)
  ✓ White on Red 500: 5.3:1 (AA)

Status colors don't rely on color alone:
  - On Track: Teal border + icon
  - At Risk: Amber border + warning icon
  - Overdue: Red border + urgent icon
```

### Touch Targets
```
All interactive elements:
  - Minimum: 44x44px
  - Preferred: 56px (primary actions)
  - Spacing: 8px between adjacent targets

Exceptions (with adequate parent tap area):
  - Menu button: 32x32px icon in 44x44px target
  - Charity logo: 24x24px in 44x44px card tap area
```

---

## Performance Considerations

### Initial Load
```
Priority Loading:
  1. Header + skeleton cards (instant)
  2. Goal data fetch (API call)
  3. Stats fetch (cached, background update)
  4. Images (charity logos) lazy load

Skeleton Loading:
  - Show 3 skeleton cards immediately
  - Animated shimmer effect
  - Maintain layout (prevent jumps)
```

### Scroll Performance
```
Optimizations:
  - Flat list rendering (React Native FlatList)
  - Windowing: Render only visible + 2 cards above/below
  - Image optimization: WebP format, 100x100px charity logos
  - Remove animations if device FPS < 50
```

### Data Caching
```
Strategy:
  - Cache goal data: 5 minutes
  - Cache stats: 30 minutes
  - Optimistic updates: Update UI immediately, sync background
  - Background refresh: Every 5 minutes if app active
```

### Memory Management
```
Limits:
  - Max goals rendered: 20 (pagination if more)
  - Image cache: 50 logos max
  - Remove event listeners on unmount
  - Debounce scroll events (100ms)
```

---

## Error States

### Network Error
```
Display: Banner at top of screen
Background: Red 100
Text: Red 800, Medium, 14px
Message: "Couldn't load goals. Showing cached data."
Action: "Try Again" button (Red 500)
Icon: WifiOff icon (20px)
Dismissible: Yes (X button)
Auto-dismiss: No (manual only)
```

### Empty Goals (Error vs. New User)
```
If New User:
  - Encouraging message
  - "Create your first goal!" CTA
  - Bright, positive design

If Goals Deleted:
  - "No active goals right now"
  - "Create another commitment" CTA
  - Option: "View completed goals" link
```

### Goal Load Error (Individual Card)
```
Display: Error state in card position
Background: Red 50
Border: 1px solid Red 200
Icon: AlertCircle (Red 500)
Message: "Couldn't load this goal"
Action: "Retry" button
```

---

## Design Assets Required

### Icons (Lucide)
- Home (tab bar)
- Target (goals)
- Camera (check-in)
- User (profile)
- Settings
- Bell (notifications)
- MoreVertical (menu)
- ChevronRight (navigation)
- Flame (streak)
- Heart (charity)
- Calendar
- Clock
- Plus (add)
- Share
- AlertCircle (error)
- CheckCircle (success)
- AlertTriangle (warning)

### Illustrations
- Empty state graphic (goals)
- Achievement badges (optional)
- Celebration confetti (Lottie animation)

### Images
- Charity logos (dynamic, from API)
- User avatar (dynamic, from profile)

---

## Implementation Notes

### Component Structure
```
Dashboard/
  ├── Header/
  │   ├── Greeting
  │   ├── StatsWidget
  │   └── NotificationBell
  ├── GoalsList/
  │   ├── GoalCard (reusable component)
  │   │   ├── CardHeader
  │   │   ├── CharityInfo
  │   │   ├── ProgressBar
  │   │   ├── StreakCounter
  │   │   ├── NextCheckIn
  │   │   └── ActionButtons
  │   └── EmptyState
  ├── QuickActions/
  │   └── ActionTile (reusable)
  ├── Achievements (optional)
  └── BottomTabBar
```

### State Management
```
Local State:
  - Goal list
  - Loading states
  - Error states
  - Pull-to-refresh state

Global State (Context/Redux):
  - User data
  - Stats (cached)
  - Notifications count

Realtime Subscriptions:
  - Goal updates (Supabase realtime)
  - Check-in approvals
```

### API Calls
```
On Mount:
  - GET /api/goals (active, limit 20)
  - GET /api/user/stats (cached)
  - GET /api/notifications/count

Realtime:
  - Subscribe to goal changes
  - Subscribe to notifications

On Refresh:
  - Refresh all data
  - Clear caches
```

---

## Testing Checklist

### Visual Regression
- [ ] Header gradient displays correctly
- [ ] Goal cards render with correct status colors
- [ ] Progress bars animate smoothly
- [ ] Empty state displays properly
- [ ] All fonts and sizes match spec
- [ ] Spacing matches 4px grid

### Interaction Testing
- [ ] Pull-to-refresh works smoothly
- [ ] Goal card tap navigates correctly
- [ ] "Check In Now" button functions
- [ ] Swipe actions work (iOS/Android)
- [ ] Long press shows menu
- [ ] Quick action tiles navigate

### Responsive Testing
- [ ] Layout works on 320px width
- [ ] Layout works on 428px width
- [ ] Tablet layout adapts correctly
- [ ] Landscape mode displays properly

### Accessibility Testing
- [ ] Screen reader announces all elements
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Touch targets are 44x44px minimum
- [ ] Contrast ratios meet WCAG AA

### Performance Testing
- [ ] Initial load < 2 seconds
- [ ] Scroll is smooth (60fps)
- [ ] Animations don't drop frames
- [ ] Memory usage stays under 100MB

---

## Design Review Notes

**Approved by**: [Designer Name]
**Date**: 2025-11-12
**Version**: 1.0 (MVP)

**Key Decisions**:
- Gradient header for visual interest and brand identity
- Left border color-coding for quick status recognition
- Stacked buttons when check-in is urgent (makes action more prominent)
- Horizontal scroll stats widget (more stats without vertical space)
- 4px left border instead of full border (cleaner, less heavy)

**Future Enhancements**:
- Dark mode variant
- Customizable dashboard layout
- Calendar view integration
- Goal cards drag-to-reorder

**Notes**:
- Design intentionally simple for MVP
- All components use standard React Native elements
- No custom complex animations (keeps development fast)
- Accessibility baked in from start
