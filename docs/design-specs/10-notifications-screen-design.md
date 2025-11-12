# Notifications Screen - Design Specification

## Overview
Granular notification preferences by type, channel, and timing. Clean toggle-based interface with clear explanations.

---

## Visual Hierarchy

```
[HEADER] ← Title and description
       ↓
[NOTIFICATION TYPES] ← Grouped toggles
       ↓
[QUIET HOURS] ← Time settings
       ↓
[CHANNELS] ← Push, Email, SMS toggles
```

---

## Color Scheme

```
Background: Gray 50

Section Cards:
  - Background: White
  - Border: 1px solid Gray 200
  - Border Radius: 12px

Toggle Switches:
  - Off: Gray 300 track, White thumb
  - On: Teal 400 track, White thumb

Quiet Hours Card:
  - Background: Purple 50
  - Border: 1px solid Purple 200
  - Icon: Moon (Purple 600)

Channel Icons:
  - Push: Bell (Teal 500)
  - Email: Mail (Blue 500)
  - SMS: MessageSquare (Green 500)
```

---

## Typography

```
Screen Title:
  - Font: Inter Bold
  - Size: 28px
  - Color: Gray 900

Description:
  - Font: Inter Regular
  - Size: 16px
  - Color: Gray 600

Section Header:
  - Font: Inter Bold
  - Size: 18px
  - Color: Gray 900

Notification Type Label:
  - Font: Inter Medium
  - Size: 16px
  - Color: Gray 900

Notification Type Description:
  - Font: Inter Regular
  - Size: 14px
  - Color: Gray 600

Time Picker Label:
  - Font: Inter Semibold
  - Size: 14px
  - Color: Gray 700
```

---

## Spacing & Layout

```
Screen Padding: 16px horizontal

Header:
  - Padding: 24px 16px
  - Margin Bottom: 20px

Section Card:
  - Margin Bottom: 16px
  - Padding: 20px
  - Border Radius: 12px

Notification Item:
  - Padding: 16px 0
  - Border Bottom: 1px solid Gray 200 (except last)

Toggle Row:
  - Display: Flex Row
  - Align Items: Center
  - Min Height: 60px

Label Column:
  - Flex: 1
  - Padding Right: 12px

Toggle Switch:
  - Width: 48px
  - Height: 28px
  - Margin Left: Auto

Quiet Hours:
  - Padding: 20px
  - Border Radius: 12px
  - Margin: 0 16px 16px

Time Pickers:
  - Display: Flex Row
  - Gap: 16px
  - Margin Top: 16px
```

---

## Notification Types

```
Check-In Reminders:
  - Label: "Check-In Reminders"
  - Description: "Daily reminders when check-ins are due"
  - Default: On

Referee Updates:
  - Label: "Referee Responses"
  - Description: "When referees review your check-ins"
  - Default: On

Goal Milestones:
  - Label: "Milestones & Achievements"
  - Description: "Celebrate streaks and completed goals"
  - Default: On

Charity Updates:
  - Label: "Charity Impact"
  - Description: "Monthly updates on your contributions"
  - Default: On

Marketing:
  - Label: "Tips & Inspiration"
  - Description: "Weekly goal-setting tips (optional)"
  - Default: Off

Product Updates:
  - Label: "Product News"
  - Description: "New features and improvements"
  - Default: Off
```

---

## Component Styling

```css
Section Card:
  - Background: White
  - Border: 1px solid #E5E7EB
  - Border Radius: 12px
  - Padding: 20px
  - Box Shadow: Small elevation

Section Header:
  - Font: Inter Bold, 18px
  - Color: #111827
  - Margin Bottom: 16px

Notification Item:
  - Display: Flex Row
  - Align Items: Center
  - Padding: 16px 0
  - Border Bottom: 1px solid #E5E7EB
  - Last Child: Border None

Label Column:
  - Flex: 1

Item Label:
  - Font: Inter Medium, 16px
  - Color: #111827
  - Margin Bottom: 4px

Item Description:
  - Font: Inter Regular, 14px
  - Color: #6B7280
  - Line Height: 20px

Toggle Switch:
  - Width: 48px
  - Height: 28px
  - Border Radius: Full
  - Off: Background #D1D5DB
  - On: Background #2DD4BF
  - Thumb: 24px, White, shadow small
  - Transition: 200ms ease

Quiet Hours Card:
  - Background: #FAF5FF
  - Border: 1px solid #E9D5FF
  - Border Radius: 12px
  - Padding: 20px

Quiet Hours Header:
  - Display: Flex Row
  - Align Items: Center
  - Gap: 8px
  - Margin Bottom: 12px

Moon Icon:
  - Size: 24px
  - Color: #9333EA

Time Picker Row:
  - Display: Flex Row
  - Gap: 16px
  - Margin Top: 16px

Time Picker:
  - Flex: 1
  - Display: Flex Column

Time Picker Button:
  - Height: 48px
  - Background: White
  - Border: 1px solid #D1D5DB
  - Border Radius: 8px
  - Display: Flex Row
  - Align Items: Center
  - Justify Content: Space Between
  - Padding: 0 12px
  - Font: Inter Semibold, 16px
  - Color: #2DD4BF
```

---

## Animations

```
Toggle Switch:
  - Background transition: 200ms ease
  - Thumb slide: 200ms ease-out
  - Haptic feedback on toggle

Time Picker Modal:
  - Slide up from bottom (300ms)
  - Backdrop fade in (200ms)

Section Expand (future):
  - Height animation: 300ms ease-in-out
```

---

## Interaction States

```
Notification Toggle:
  - Tap anywhere on row: Toggle switch
  - Tap on switch: Toggle switch
  - Haptic: Light impact
  - Update: Instant (optimistic UI)

Quiet Hours Toggle:
  - Master toggle: Enable/disable feature
  - When off: Time pickers disabled (grayed out)

Time Picker:
  - Tap: Open native time picker modal
  - Select time: Update display
  - Format: 12-hour (AM/PM) or 24-hour (locale)

Channel Toggles:
  - Independent settings
  - Push: System permission check
  - Email: Always available
  - SMS: Optional (phone number required)
```

---

## Quiet Hours

```
Feature:
  - Mute notifications during specified hours
  - Default: Off
  - Time range: Start → End (e.g., 10 PM - 7 AM)

UI:
  - Master toggle at top
  - Two time pickers: "From" and "To"
  - Visual: Moon icon + Purple theme
  - Disabled state: Pickers grayed out

Behavior:
  - Check-in reminders: Delayed until after quiet hours
  - Urgent notifications: Still delivered (goal deadline < 1 hour)
  - Applies to all channels
```

---

## Notification Channels

```
Section:
  - Header: "Delivery Channels"
  - Description: "Choose how you receive notifications"

Push Notifications:
  - Icon: Bell (Teal)
  - Label: "Push Notifications"
  - Description: "In-app and device notifications"
  - Permission: Check OS settings
  - If denied: "Enable in Settings" button

Email:
  - Icon: Mail (Blue)
  - Label: "Email Notifications"
  - Description: "Sent to [user@example.com]"
  - Always available

SMS (Optional MVP):
  - Icon: MessageSquare (Green)
  - Label: "Text Messages"
  - Description: "Sent to [phone number]"
  - Requires phone number verification
```

---

## System Permission Handling

```
Push Notifications Denied:
  - Warning banner: Amber background
  - Message: "Push notifications are disabled"
  - Button: "Enable in Settings"
  - Action: Deep link to iOS/Android settings

Permission Request:
  - Trigger: On first toggle attempt
  - Modal: Native OS permission dialog
  - If denied: Show warning + settings link
  - If granted: Enable toggle

Background:
  - Check permission status on screen load
  - Update UI accordingly
  - Show inline status indicator
```

---

## Responsive Breakpoints

```
Small Mobile (320-374px):
  - Reduce padding: 16px → 12px
  - Time pickers: Stack vertically

Large Mobile (415px+):
  - Standard layout
  - Time pickers: Side by side

Tablet (768px+):
  - Max content width: 600px (centered)
  - 2-column layout for channels
```

---

## Accessibility

```
Screen Reader:
  "Notification settings.
   Section: [section name].
   [Notification type]. [Description]. Switch. [On/Off]."

Toggle:
  "[Label]. Switch. Currently [on/off]. Tap to toggle."

Time Picker:
  "[Label]. Time picker. Currently [time]. Tap to change."

Keyboard Navigation:
  - Tab through all toggles and pickers
  - Space to toggle switches
  - Enter to open time pickers

Touch Targets:
  - Toggle rows: Full height (min 60px)
  - Time pickers: 48px height
```

---

## Data Persistence

```
Settings Saved:
  - Immediately on toggle
  - Optimistic UI update
  - Background sync to backend
  - Toast: "Notification settings saved"

Sync:
  - On change: Update Supabase
  - On load: Fetch user preferences
  - Conflict resolution: Server wins
```

---

## Design Review Notes

**Key Decisions**:
- Master toggles (simple, clear)
- Quiet hours (user control)
- Channel flexibility (preference)
- Inline descriptions (clarity)
- Instant updates (responsive feel)

**Version**: 1.0 (MVP)
**Date**: 2025-11-12
