# Dashboard Screen

## Overview
The Dashboard is the main hub where users see their active goals, progress stats, and quick actions. This is the home screen after authentication.

## Screen Purpose
- Show at-a-glance status of all active goals
- Enable quick check-ins
- Display overall progress and achievements
- Provide navigation to other major features
- Motivate users with stats and streaks

## Access
- **Entry Points**:
  - App launch (authenticated users)
  - Bottom tab navigation → Home icon
  - After completing any major flow (check-in, goal creation)
- **Tab Bar Position**: First tab (leftmost), "Home" or "Dashboard"

---

## Layout Sections

### 1. Header Section (Top)
**Elements**:
- **User Greeting**:
  - "Good morning, [Name]!" (time-based greeting)
  - Small profile avatar (tap to open profile)

- **Overall Stats Widget**:
  - Horizontal scroll cards showing:
    - **Active Goals**: Number with icon (🎯)
    - **Current Streaks**: Longest active streak (🔥)
    - **Success Rate**: Percentage of goals succeeded (%)
    - **Total Impact**: Amount donated to charity (❤️)
  - Each stat is tappable → Detail view

- **Notification Bell** (top right):
  - Badge count for unread notifications
  - Tap to open notifications panel

**Height**: ~100-120px
**Background**: Gradient or solid color (brand primary)
**Text Color**: White or high contrast

---

### 2. Active Goals Section (Primary Content)
**Heading**: "My Active Goals" (with count badge)

**Empty State** (if no active goals):
- Illustration (empty state graphic)
- "No active goals yet"
- "Create your first commitment to get started!"
- Large "Create Goal" CTA button
- Link: "Browse Templates"

**Goal Cards** (if active goals exist):
- Vertical list of goal cards
- Sorted by: Nearest check-in due first
- Max 3-5 goals visible before scroll

### Goal Card Design
Each card is a self-contained unit:

**Card Structure**:
```
┌─────────────────────────────────────┐
│ 🏋️ [Goal Name]                  [•••]│
│ [Charity Logo] → [Charity Name]      │
│                                      │
│ Progress: [===75%====    ] 15/20    │
│ Streak: 🔥 15 days                   │
│                                      │
│ Next Check-in: Today at 6:00 PM     │
│ [⏰ Check In Now]  [📊 View Details] │
└─────────────────────────────────────┘
```

**Card Elements**:

1. **Header Row**:
   - Goal icon (emoji or category icon)
   - Goal name (truncated if > 30 chars)
   - Menu button (•••) for actions:
     - View Details
     - Edit Goal
     - Pause Goal
     - Delete Goal

2. **Charity Info**:
   - Small charity logo (circular, 24x24px)
   - Charity name
   - Arrow icon indicating "beneficiary"

3. **Progress Indicator**:
   - Visual progress bar (color: green for on-track, amber for at-risk)
   - Text: "15 of 20 check-ins completed"
   - Percentage: 75%

4. **Streak Counter**:
   - Fire emoji (🔥) + number
   - Text: "X days" or "X check-ins in a row"
   - Color: Orange/red gradient for streak

5. **Next Check-in Info**:
   - Icon: Clock (⏰)
   - Text: "Today at 6:00 PM" or "Due in 3 hours"
   - Urgency color:
     - Green: > 12 hours away
     - Amber: 6-12 hours away
     - Red: < 6 hours or overdue

6. **Action Buttons**:
   - **Primary**: "Check In Now" (if due or overdue)
     - Full-width button if urgent (< 6 hours)
     - Color: Green if on time, red if overdue
   - **Secondary**: "View Details"
     - Outlined button or text link
   - If check-in already completed today:
     - Show green checkmark: "✅ Checked In"
     - Disable button or show "Already Done"

**Card States**:
- **On Track**: Green accent, positive messaging
- **At Risk**: Amber/yellow accent, warning messaging
- **Overdue**: Red accent, urgent call-to-action
- **Pending Review**: Yellow badge "Waiting for referee"
- **Completed**: Grayed out with success badge (if recently completed)

**Spacing**: 12-16px between cards

---

### 3. Quick Actions Section
**Heading**: "Quick Actions"

**Action Tiles** (2x2 grid or horizontal scroll):

1. **Create New Goal**:
   - Icon: Plus (+) in circle
   - Label: "New Goal"
   - Tap: Navigate to goal template selection

2. **View History**:
   - Icon: Calendar or clock
   - Label: "Goal History"
   - Tap: Navigate to completed goals list

3. **My Impact**:
   - Icon: Heart or charity icon
   - Label: "Charity Impact"
   - Tap: View donation summary and charity info

4. **Invite Friends**:
   - Icon: People or share
   - Label: "Invite Friends"
   - Tap: Open referral sharing sheet

**Tile Design**:
- Square or rounded rectangle
- Icon at top, label at bottom
- Subtle shadow or border
- Tappable with pressed state

---

### 4. Achievements / Motivational Section (Optional)
**Heading**: "Recent Achievements"

**Content**:
- Latest unlocked badge/achievement
- Motivational quote or tip
- "X days until next milestone"
- Swipeable cards if multiple achievements

**Example**:
```
┌─────────────────────────────────┐
│     🏆                          │
│  "First Goal Completed!"        │
│  Keep the momentum going!       │
│                                 │
│  Next: Complete 5 Goals         │
└─────────────────────────────────┘
```

**Dismissible**: Yes (X button in corner)
**Frequency**: Show max once per day, rotate messages

---

### 5. Community Feed (Post-MVP, Optional)
**Heading**: "Community Highlights"

**Content**:
- Recent goal completions from community (if public)
- Encouraging posts
- Leaderboard preview

**Privacy**: Only shows users who opted into public sharing

---

## Bottom Tab Navigation
**Visible Tabs**:
1. **Home / Dashboard** (current screen) - House icon
2. **Goals** - Target icon
3. **Check-In** - Camera icon (badge if pending)
4. **Community** - People icon (optional, post-MVP)
5. **Profile** - Person icon

**Current Tab Indicator**: Highlighted icon and label

---

## Interactions

### Pull-to-Refresh
- Drag down from top of screen
- Refresh active goals, stats, notifications
- Show loading spinner while refreshing

### Goal Card Tap
- Tap anywhere on card (except buttons) → Navigate to Goal Detail screen

### Swipe Actions on Goal Card (iOS/Android patterns)
- Swipe left: Quick actions menu
  - "Check In"
  - "View Details"
  - "Pause Goal"
- Swipe right: Quick encouragement (if referee assigned)

### Long Press on Goal Card
- Haptic feedback
- Show context menu (iOS) or bottom sheet (Android):
  - "Check In Now"
  - "View Details"
  - "Edit Goal"
  - "Share Progress"
  - "Delete Goal"

---

## States & Loading

### Initial Load
- Skeleton screens for goal cards (loading placeholders)
- Shimmer effect while loading
- Show stats as soon as available

### Empty State (No Active Goals)
- Friendly illustration
- Encouraging message
- Clear CTA to create first goal

### Error State (Network Failure)
- Error message: "Couldn't load your goals"
- "Try Again" button
- Show cached data if available (with indicator "Showing offline data")

### Offline Mode
- Show cached goals with timestamp: "Last updated 2 hours ago"
- Disable check-in buttons if offline
- Queue check-ins for when back online

---

## Notifications & Badges

### In-App Notifications (Top Banner)
- Check-in reminder: "Time to check in on [Goal]!"
- Referee reviewed: "[Referee] approved your check-in!"
- Goal completed: "You achieved your goal! 🎉"
- Swipe down to dismiss
- Tap to navigate to relevant screen

### Badge Indicators
- Red dot on goal card if action needed
- Number badge on "Check-In" tab if pending
- Bell icon badge count for unread notifications

---

## Visual Design

### Color Palette
- **Primary**: Teal (#2DD4BF) for on-track items
- **Warning**: Amber (#F59E0B) for at-risk items
- **Danger**: Red (#EF4444) for overdue items
- **Success**: Green (#22C55E) for completed items
- **Background**: Light gray or white (#F9FAFB)
- **Cards**: White with subtle shadow

### Typography
- **Heading**: Inter Bold, 24px
- **Goal Names**: Inter Semibold, 18px
- **Body Text**: Inter Regular, 14px
- **Stats**: Inter Bold, 20px (numbers)
- **Labels**: Inter Medium, 12px

### Icons
- Lucide React Native icon set
- 24x24px default size
- Consistent stroke weight (2px)

### Spacing
- Screen padding: 16px horizontal
- Section spacing: 24px vertical
- Card padding: 16px
- Button height: 44px minimum (for touch targets)

---

## Accessibility

### Screen Reader Support
- Proper labels for all interactive elements
- Announce goal status changes
- Describe progress visually and with text

### Touch Targets
- Minimum 44x44px for all buttons
- Adequate spacing between tappable elements
- Swipe gestures have fallback menu options

### Color Contrast
- WCAG AA compliance
- Don't rely on color alone (use icons + text)
- High contrast mode support

---

## Performance

### Loading Strategy
- Progressive loading: Show header stats first, then cards
- Lazy load images (charity logos)
- Cache goal data for instant re-opens
- Background refresh every 5 minutes if app is open

### Data Fetching
- **On Load**:
  - Active goals (limit 20)
  - User stats (cached, refresh every 30 minutes)
  - Pending check-ins count
- **Real-time Updates**:
  - Goal status changes (Supabase realtime subscriptions)
  - New notifications

---

## Analytics Events

Track dashboard interactions:
- `dashboard_viewed`
- `goal_card_tapped` (goal_id)
- `quick_action_tapped` (action_name)
- `check_in_now_tapped` (goal_id)
- `create_goal_tapped` (source: dashboard)
- `stats_widget_tapped` (stat_type)
- `pull_to_refresh_triggered`
- `dashboard_error` (error_type)

---

## Future Enhancements (Post-MVP)

### Personalization
- Customizable dashboard layout
- Reorder goal cards (drag & drop)
- Hide/show sections based on preferences
- Dark mode support

### Advanced Features
- Calendar view of all check-ins
- Weekly/monthly progress charts
- Goal suggestions based on history
- Streak recovery options (buy back missed check-ins)

### Widgets
- iOS Home Screen widget showing today's check-ins
- Android widget with quick check-in button
- Watch complications (Apple Watch, Wear OS)

---

## Design Notes for Designer

**Priority Elements**:
1. Goal cards (most important, largest, most detailed)
2. Check-in CTAs (must be prominent when due/overdue)
3. Stats widget (motivation and quick overview)

**Tone**:
- Motivating but not overwhelming
- Celebrate progress, don't shame failures
- Clear, actionable information

**Animations**:
- Smooth transitions when navigating
- Streak fire animation on milestone days
- Progress bar fills smoothly when updated
- Confetti on goal completion (if returning from completion screen)

**Mobile Considerations**:
- One-handed use friendly (important actions within thumb reach)
- Bottom sheet modals for contextual actions
- Swipe gestures feel natural and intuitive
