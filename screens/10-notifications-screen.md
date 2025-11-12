# Notifications Screen

## Overview
The Notifications Screen provides granular control over all notification types, channels (push, email, SMS), and delivery preferences. Users can customize when and how they receive reminders, updates, and social notifications.

## Screen Purpose
- Configure notification preferences by type
- Control notification channels (push, email, SMS)
- Set quiet hours and delivery schedules
- Manage notification frequency
- Enable/disable specific notification categories
- Optimize for user's daily routine

## Access
- **Entry Points**:
  - Settings Screen → "Notifications" row
  - First-time check-in prompt → "Enable notifications?"
  - OS notification prompt → Deep link to settings
  - Notification itself → Manage link
- **Exit Points**:
  - Back button → Settings Screen

---

## Layout Structure

### Header Section
**Elements**:
- Back button (to Settings)
- Title: "Notifications"
- Subtitle: "Stay on track with reminders"

---

### Master Toggle Section
**Master Control**:
```
┌─────────────────────────────────────┐
│ Enable Notifications        [Toggle]│
│ Receive reminders and updates       │
└─────────────────────────────────────┘
```
- Master toggle: Controls all notifications
- If OFF: Disable all sections below (grayed out)
- If ON: Enable granular controls

---

### Notification Type Sections

#### Section 1: Goal Reminders
**Heading**: "Goal Reminders"
**Subtitle**: "Never miss a check-in"

**Notification Items**:

1. **Check-in Reminders** (Toggle)
   - Label: "Check-in reminders"
   - Sublabel: "When it's time to check in"
   - Default: ON
   - Frequency: Based on goal schedule

2. **Pre-Check-in Alerts** (Toggle)
   - Label: "Pre-check-in alerts"
   - Sublabel: "2 hours before deadline"
   - Default: ON

3. **Overdue Alerts** (Toggle)
   - Label: "Overdue alerts"
   - Sublabel: "If you miss a check-in"
   - Default: ON
   - Color: Amber badge "Important"

4. **Streak Reminders** (Toggle)
   - Label: "Streak reminders"
   - Sublabel: "Don't break your streak!"
   - Default: ON

---

#### Section 2: Goal Updates
**Heading**: "Goal Updates"
**Subtitle**: "Track your progress"

**Notification Items**:

1. **Verification Results** (Toggle)
   - Label: "Verification results"
   - Sublabel: "AI check-in outcomes"
   - Default: ON

2. **Referee Decisions** (Toggle)
   - Label: "Referee decisions"
   - Sublabel: "When referee reviews check-in"
   - Default: ON

3. **Milestone Achievements** (Toggle)
   - Label: "Milestones"
   - Sublabel: "Celebrate progress (7 days, etc.)"
   - Default: ON

4. **Goal Completion** (Toggle)
   - Label: "Goal completion"
   - Sublabel: "When you finish a goal"
   - Default: ON

---

#### Section 3: Social & Community
**Heading**: "Social"
**Subtitle**: "Stay connected"

**Notification Items**:

1. **Referee Invites** (Toggle)
   - Label: "Referee invitations"
   - Sublabel: "When invited to review"
   - Default: ON

2. **Friend Activity** (Toggle)
   - Label: "Friend activity"
   - Sublabel: "Friend goal completions"
   - Default: OFF (post-MVP)

3. **Community Updates** (Toggle)
   - Label: "Community updates"
   - Sublabel: "New features and tips"
   - Default: OFF

---

#### Section 4: Account & Marketing
**Heading**: "Account"

**Notification Items**:

1. **Payment Alerts** (Toggle)
   - Label: "Payment alerts"
   - Sublabel: "Charges and refunds"
   - Default: ON
   - Non-optional badge: "Required"

2. **Security Alerts** (Toggle)
   - Label: "Security alerts"
   - Sublabel: "Login and account changes"
   - Default: ON
   - Non-optional badge: "Required"

3. **Product Updates** (Toggle)
   - Label: "Product updates"
   - Sublabel: "New features and improvements"
   - Default: ON

4. **Tips & Motivation** (Toggle)
   - Label: "Tips & motivation"
   - Sublabel: "Weekly tips for success"
   - Default: OFF

---

### Delivery Channels Section
**Heading**: "Delivery Channels"
**Subtitle**: "How you receive notifications"

**Channel Items**:

1. **Push Notifications** (Toggle)
   - Icon: Bell
   - Label: "Push notifications"
   - Sublabel: "On this device"
   - Default: ON
   - If OFF: Prompt to enable in OS settings

2. **Email** (Toggle)
   - Icon: Mail
   - Label: "Email"
   - Sublabel: user@example.com
   - Default: ON
   - If email not verified: Badge "Verify email"

3. **SMS** (Toggle, Post-MVP)
   - Icon: Message
   - Label: "Text messages"
   - Sublabel: "+1 (555) 123-4567"
   - Default: OFF
   - Requires phone number verification

---

### Quiet Hours Section
**Heading**: "Quiet Hours"
**Subtitle**: "Pause notifications"

**Settings**:

1. **Enable Quiet Hours** (Toggle)
   - Label: "Quiet hours"
   - Sublabel: "Don't disturb during set times"
   - Default: OFF

2. **Start Time** (Time Picker) →
   - Label: "Start"
   - Default: 10:00 PM
   - Tap: Open time picker modal

3. **End Time** (Time Picker) →
   - Label: "End"
   - Default: 8:00 AM
   - Tap: Open time picker modal

4. **Allow Urgent** (Toggle)
   - Label: "Allow urgent notifications"
   - Sublabel: "Overdue alerts and payments"
   - Default: ON

---

### Test Notification Section
**Action Button**:
```
┌─────────────────────────────────────┐
│   Send Test Notification            │
└─────────────────────────────────────┘
```
- Sends sample notification
- Helps user verify settings work
- Shows toast: "Test notification sent"

---

## Interactions

### Toggle Notifications
**Flow**:
1. User taps toggle
2. Haptic feedback (medium)
3. Update setting immediately (optimistic UI)
4. Sync to backend
5. If toggle OFF for critical notification:
   - Show warning modal: "You might miss important updates"
   - Confirm: "Turn off anyway" / "Keep on"

### Time Picker
**Flow**:
1. User taps "Start" or "End" time
2. Open time picker modal (bottom sheet)
3. User selects time (scrollable picker)
4. Tap "Done" → Update time
5. Validate: End time must be after start time

### Enable Push (If Disabled in OS)
**Flow**:
1. User toggles "Push notifications" ON
2. Check OS permission status
3. If denied:
   - Show alert: "Push notifications are disabled"
   - Message: "Go to Settings > MicroCommit > Notifications"
   - Button: "Open Settings" (deep link to OS settings)

### Send Test Notification
**Flow**:
1. User taps "Send Test Notification"
2. Send push notification immediately
3. Notification appears (if permissions granted)
4. Content: "This is a test notification from MicroCommit"
5. Toast: "Test notification sent. Check your notifications."

---

## States & Loading

### Initial Load
- Fetch user notification preferences
- Show skeleton toggles
- Populate with saved settings

### Permission Check (Push)
- On screen load: Check OS permission status
- If denied: Show banner at top:
  - "Push notifications are disabled"
  - "Enable in Settings" button

### Save State
- Auto-save on every toggle change
- Show subtle loading spinner (inline)
- Toast on error: "Failed to save. Try again."

---

## Visual Design

### Color Palette
- **Background**: Light gray (#F9FAFB)
- **Cards**: White with shadow
- **Text Primary**: Dark gray (#1F2937)
- **Text Secondary**: Medium gray (#6B7280)
- **Toggle ON**: Teal (#2DD4BF)
- **Toggle OFF**: Light gray (#D1D5DB)
- **Warning Badge**: Amber (#F59E0B)
- **Required Badge**: Red (#EF4444)

### Typography
- **Title**: Inter Bold, 28px
- **Section Headings**: Inter Semibold, 14px, uppercase
- **Labels**: Inter Medium, 16px
- **Sublabels**: Inter Regular, 14px, gray
- **Time**: Inter Semibold, 18px

### Layout
- Section padding: 16px
- Item height: 64px (taller for readability)
- Toggle size: Standard OS toggle
- Spacing: 8px between items

---

## Data Requirements

### Notification Preferences Object
```json
{
  "user_id": "uuid",
  "notifications_enabled": true,
  "channels": {
    "push": true,
    "email": true,
    "sms": false
  },
  "types": {
    "checkin_reminders": true,
    "pre_checkin_alerts": true,
    "overdue_alerts": true,
    "streak_reminders": true,
    "verification_results": true,
    "referee_decisions": true,
    "milestones": true,
    "goal_completion": true,
    "referee_invites": true,
    "friend_activity": false,
    "community_updates": false,
    "payment_alerts": true,
    "security_alerts": true,
    "product_updates": true,
    "tips": false
  },
  "quiet_hours": {
    "enabled": false,
    "start": "22:00",
    "end": "08:00",
    "allow_urgent": true
  }
}
```

### API Endpoints
- **GET /api/users/notifications**: Fetch preferences
- **PATCH /api/users/notifications**: Update preferences
- **POST /api/users/notifications/test**: Send test notification

---

## Analytics Events
- `notifications_screen_viewed`
- `notification_type_toggled` (type, enabled)
- `notification_channel_toggled` (channel, enabled)
- `quiet_hours_configured` (start, end, allow_urgent)
- `test_notification_sent`
- `os_settings_opened` (reason: enable_push)

---

## Accessibility
- Screen reader: "Notifications settings"
- Each toggle: State announced ("On" / "Off")
- Time pickers: Accessible with VoiceOver/TalkBack
- Badges: "Required" / "Important" announced

---

## Future Enhancements
- Smart delivery (ML-based optimal timing)
- Notification preview (show what notifications look like)
- Advanced scheduling (weekdays vs weekends)
- Notification history (see past notifications)
- Per-goal notification settings
- Do Not Disturb sync with OS
