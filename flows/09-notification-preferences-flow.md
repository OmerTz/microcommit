# Notification Preferences Flow

## Goal
Give users granular control over notification timing, frequency, and delivery methods while maintaining engagement and preventing missed check-ins (95%+ of users find notification settings helpful).

## Entry Points
- Settings → Notifications
- Push notification → Long press → "Manage" → Settings
- Onboarding → Step 7: Add Accountability → Reminders toggle
- After first missed check-in → "Adjust reminder timing?"
- Profile → Notification center → Settings icon

## Flow Steps

### Step 1: Notification Settings Entry
**Entry Points**:
- Settings menu → "Notifications" row
- Push notification actions → "Manage Notifications"
- Onboarding reminder setup

**User Action**: Tap "Notifications"
**Next Screen**: Notification Settings Overview

### Step 2: Notification Settings Overview
**Screen**: Notification Settings
- **Elements**:
  - "Notifications" heading
  - Back button

  **Master Controls** (top section):
  - 🔔 Push Notifications (master toggle)
    - If OFF: All push options grayed out
    - If ON: Individual controls enabled
    - Platform status indicator:
      - ✅ "Push notifications enabled"
      - ⚠️ "Push notifications disabled in device settings" → "Open Settings" button

  - 📧 Email Notifications (master toggle)
    - If OFF: Email options grayed out
    - Email address shown: user@example.com

  - 📲 SMS Notifications (master toggle)
    - Requires phone verification
    - If not verified: "Add phone number" link
    - If verified: Phone shown (***) ***-1234

  **Quick Presets** (section):
  - Preset buttons (tap to apply):
    - 🔕 "Minimal" - Only critical alerts
    - ⚖️ "Balanced" - Recommended settings (default)
    - 🔔 "All" - Every notification type
    - 🎯 "Custom" - Current if user customized

  **Notification Types** (expandable sections):

  **1. Goal Reminders** ⏰
  - Enabled toggle (ON by default)
  - Frequency: Daily / Before each check-in
  - Timing: [time picker] - Default 8:00 AM
  - "Customize per goal >" link
  - Delivery: Push + Email (checkboxes)

  **2. Deadline Warnings** ⚠️
  - Enabled toggle (ON by default)
  - Timing options (multi-select):
    - ✅ 24 hours before
    - ✅ 6 hours before
    - ✅ 1 hour before
    - ❌ Final reminder (15 min before)
  - Escalation: "Send more reminders as deadline approaches" toggle
  - Delivery: Push + Email + SMS (if verified)

  **3. Streak & Achievements** 🏆
  - Enabled toggle (ON by default)
  - Frequency: All milestones / Major only (7, 30, 100 days)
  - Celebration level:
    - Simple (text only)
    - Standard (text + animation)
    - Epic (full celebration with confetti)
  - Delivery: Push only

  **4. Referee Interactions** 👥
  - Enabled toggle (ON by default)
  - Sub-types (individual toggles):
    - ✅ New referee request
    - ✅ Referee approved evidence
    - ✅ Referee rejected evidence
    - ✅ Referee comment
    - ❌ Referee availability changes
  - Delivery: Push + Email

  **5. Payment & Financial** 💳
  - Enabled toggle (ON, required - cannot disable)
  - Sub-types:
    - ✅ Payment successful (locked)
    - ✅ Payment failed (locked)
    - ✅ Refund processed (locked)
    - ❌ Payment reminder
  - Delivery: Push + Email (both required)

  **6. Goal Lifecycle** 🎯
  - Enabled toggle (ON by default)
  - Sub-types:
    - ✅ Goal started
    - ✅ Goal completed (success)
    - ✅ Goal failed
    - ❌ Goal approaching end
    - ❌ Suggested goal adjustment
  - Delivery: Push + Email

  **7. Social & Community** 🌐
  - Enabled toggle (OFF by default)
  - Sub-types:
    - ❌ Friend joined MicroCommit
    - ❌ Someone liked your achievement
    - ❌ Featured in community highlight
    - ❌ New challenges available
  - Delivery: Push only

  **8. Product Updates** 📢
  - Enabled toggle (OFF by default)
  - Sub-types:
    - ❌ New features
    - ❌ Important announcements
    - ❌ Tips & best practices
    - ❌ Weekly digest email
  - Frequency: Immediate / Weekly digest
  - Delivery: Email only

  **Quiet Hours** (section):
  - 🌙 Enable Quiet Hours (toggle)
  - Start time: [time picker] - Default 10:00 PM
  - End time: [time picker] - Default 8:00 AM
  - Days: All days / Weekdays only / Weekends only / Custom
  - Exceptions (checkboxes):
    - ✅ Critical alerts (payment, urgent deadlines)
    - ❌ Referee requests
    - ❌ Achievement celebrations
  - "Notifications will queue during quiet hours and deliver after end time"

  **Actions** (bottom):
  - "Test Notification" button (sends sample)
  - "Reset to Default" link
  - "Open System Settings" link (iOS/Android settings)

**User Actions**:
- Toggle notification types
- Adjust timing and frequency
- Set quiet hours
- Test notifications

**Next Screen**: Stay on screen (settings save automatically)

### Step 3: Per-Goal Notification Customization
**Entry Point**: Goal detail → Settings icon → "Notification Settings"

**Screen**: [Goal Name] Notifications
- **Elements**:
  - "[Goal name] notification settings" heading
  - "Override default settings for this goal"
  - Use Default Settings (toggle)
    - If ON: All below options grayed out
    - If OFF: Custom settings enabled

  **Custom Settings** (when toggle OFF):
  - **Check-in Reminders**:
    - Time: [time picker] - Different from default
    - Days before: 0 (day of) / 1 day before / 2 days before
    - Reminder frequency:
      - Single reminder at set time
      - Every 2 hours until checked in
      - Every hour starting 6 hours before deadline

  - **Deadline Warnings**:
    - Same options as global settings
    - Can be more or less aggressive

  - **Referee Notifications**:
    - Enable/disable specifically for this goal

  **Actions**:
  - "Save Custom Settings" button
  - "Revert to Default" link

**User Action**: Customize per goal
**Technical**: Save goal-specific overrides in goal_settings table
**Next Screen**: Return to goal detail

### Step 4: Notification Delivery Testing
**Entry Point**: Notification Settings → "Test Notification" button

**Screen**: Test Notification (Modal)
- **Elements**:
  - "Test notification" heading
  - "Select notification type to test:"
  - Radio buttons:
    - 🔔 Check-in reminder
    - ⚠️ Deadline warning
    - 🏆 Streak achievement
    - 👥 Referee notification
    - 💳 Payment update
  - "Send Test" button

**User Action**: Select type and send
**Technical**:
1. Send test notification via push/email based on settings
2. Use placeholder data (mock goal/referee)
3. Label notification: "Test Notification - MicroCommit"

**Result**:
- Toast: "Test notification sent! Check your device."
- Notification appears within 5 seconds
- If doesn't appear: "Didn't receive it? Check device settings."

**Next Screen**: Dismiss modal, stay on settings

### Step 5: Notification Schedule Management
**Entry Point**: Notification Settings → "Customize Schedule" (advanced)

**Screen**: Notification Schedule
- **Elements**:
  - "Notification schedule" heading
  - Weekly calendar view (7 days)

  **For Each Day**:
  - Day name (Mon, Tue, etc.)
  - Enabled toggle per day
  - Time range picker (start - end)
  - "Add time slot" button (allow multiple slots per day)

  **Presets**:
  - "Weekdays Only" button
  - "Weekends Only" button
  - "All Week" button
  - "Custom" (current state if customized)

  **Example Use Cases** (help text):
  - "Only remind me Mon-Fri during work hours"
  - "Different times for weekdays vs weekends"
  - "No reminders on Sundays"

  **Actions**:
  - "Save Schedule" button
  - "Reset to Simple" link (back to single time)

**User Action**: Configure custom schedule
**Technical**: Store schedule in user_preferences JSON field
**Next Screen**: Return to notification settings

### Step 6: SMS Verification (for SMS Notifications)
**Entry Point**: Notification Settings → SMS toggle → "Add phone number"

**Screen**: Add Phone Number
- **Elements**:
  - "Add your phone number" heading
  - Country code picker (dropdown)
  - Phone number input (formatted)
  - "Why we need this" info:
    - "For critical deadline reminders"
    - "Never used for marketing"
    - "SMS rates may apply"
  - "Send Verification Code" button

**User Action**: Enter phone, tap send
**Technical**: Send SMS via Twilio
**Next Screen**: Verify Phone

**Screen**: Verify Phone Number
- **Elements**:
  - "Enter verification code" heading
  - "Code sent to (***) ***-1234"
  - 6-digit code input (auto-focuses, auto-submits)
  - "Didn't receive it? Resend" link (30-second cooldown)
  - "Change number" link

**User Action**: Enter code
**Technical**: Verify code, link phone to account
**Next Screen**: Success → Return to notification settings

### Step 7: Notification Channel Management (Android)
**Entry Point**: Notification Settings → "Manage Channels" (Android only)

**Screen**: Notification Channels
- **Elements**:
  - "Notification channels" heading
  - Explanation: "Android allows fine-tuned control per channel"

  **Channels** (list):
  Each channel shows:
  - Channel name (e.g., "Goal Reminders")
  - Importance: Urgent / High / Medium / Low
  - Sound: [sound name] or Silent
  - Vibration: On / Off
  - "Customize in System Settings" button

  **Channels**:
  1. Goal Reminders (High)
  2. Deadline Warnings (Urgent)
  3. Achievements (Medium)
  4. Referee (High)
  5. Payments (Urgent)
  6. Social (Low)
  7. Updates (Low)

  **Actions**:
  - Each channel: "System Settings" button (deep link)
  - "Why channels?" help link

**User Action**: Manage channels via Android settings
**Technical**: Deep link to Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS
**Next Screen**: Android system settings (external)

### Step 8: Notification History & Troubleshooting
**Entry Point**: Settings → Notifications → "Notification History" link

**Screen**: Notification History
- **Elements**:
  - "Recent notifications" heading
  - Filter: All / Delivered / Failed
  - Date range: Last 7 days

  **Notification Log** (list):
  Each entry shows:
  - Timestamp: "Today, 8:00 AM"
  - Type: Check-in Reminder
  - Status:
    - ✅ Delivered (green)
    - ❌ Failed (red)
    - ⏸️ Queued (yellow)
    - 🚫 Blocked by user (gray)
  - Message preview: "Time to check in on..."
  - Tap to expand: Full details

  **If Failed**:
  - Reason: "Push token invalid", "Network error", "User disabled"
  - Action: "Fix" button (goes to relevant settings)

  **Actions**:
  - "Retry Failed" button (if any failures)
  - "Clear History" link

**User Action**: Review history, fix issues
**Next Screen**: Stay on screen or go to fix setting

### Step 9: Preset Selection & Application
**Entry Point**: Notification Settings → Preset buttons

**Screen**: Confirmation Modal (when preset selected)
- **Elements**:
  - "[Preset Name] notification settings" heading
  - "This will change:"
  - Change summary (list of what changes):
    - "Enable: Goal reminders, Deadline warnings, Payments"
    - "Disable: Social, Product updates, Community"
    - "Timing: Daily at 8:00 AM"
  - "Apply Preset" button
  - "Cancel" button

**User Action**: Apply preset
**Technical**: Bulk update notification preferences
**Result**: Toast: "Notification settings updated"
**Next Screen**: Return to notification settings (updated)

## Success Criteria
- **Settings Accessibility**: 95%+ users can adjust notifications within 1 minute
- **Quiet Hours Usage**: 40%+ of users enable quiet hours
- **SMS Verification Rate**: 80%+ successfully verify phone (if attempted)
- **Notification Effectiveness**: 90%+ of check-in reminders delivered successfully
- **User Satisfaction**: 4+ stars for notification control

## Error Handling

### Push Notification Permission Denied
- **Detection**: System permission not granted
- **UI**: Warning banner: "Push notifications disabled in device settings"
- **Actions**:
  - "Open Settings" button (deep link)
  - Help: "How to enable notifications" guide
  - Fallback: "Use email/SMS instead?"

### SMS Verification Failure
- **Invalid Number**: "This phone number format is invalid"
- **Code Mismatch**: "Code is incorrect. Try again. (X attempts left)"
- **Too Many Attempts**: "Too many attempts. Try again in 15 minutes."
- **Network Error**: "Couldn't send SMS. Check your connection."

### Notification Delivery Failure
- **Push Token Invalid**: Refresh token silently, retry
- **Email Bounce**: Mark email as invalid, prompt user to update
- **SMS Failure**: Log error, don't retry (SMS costs money)
- **Rate Limited**: Queue for later, don't spam user

### Quiet Hours Conflict
- **Scenario**: All check-in times fall within quiet hours
- **Warning**: "Your quiet hours overlap with check-in times"
- **Suggestion**: "Adjust quiet hours or enable critical exceptions"
- **Override**: Allow critical reminders during quiet hours

### Time Zone Changes
- **Detection**: Device time zone changes (traveling)
- **Handling**: Auto-adjust notification times to maintain local consistency
- **Notification**: "Your check-in time adjusted for new timezone"
- **Option**: "Keep original timezone" vs "Use new timezone"

## Edge Cases

### All Notifications Disabled
- **Warning**: "Disabling all notifications may cause you to miss check-ins"
- **Confirmation**: "Are you sure you want to disable all notifications?"
- **Impact**: Show success rate drop prediction
- **Exception**: Payment notifications cannot be disabled (required)

### Notification During App Active Use
- **Behavior**: Suppress push, show in-app alert instead
- **Example**: Check-in reminder while user is already checking in
- **UI**: Subtle banner at top, not intrusive

### Multiple Goals with Different Reminder Times
- **Bundling**: Group notifications if within 15 minutes
- **Example**: "Time to check in on 3 goals!" (tap to see list)
- **Individual**: If times spread out, send separately

### Notification Sent But Goal Already Completed
- **Prevention**: Check goal status before sending
- **If Sent**: User taps notification → "Already checked in! ✅"
- **Avoid**: Don't send duplicate or irrelevant notifications

### User Snoozes Notification
- **Action**: "Remind me in [15 min / 1 hour / 2 hours]"
- **Behavior**: Queue notification for later
- **Limit**: Max 3 snoozes per notification
- **After Limit**: "This is your final reminder"

### Referee Added During Quiet Hours
- **Scenario**: Someone invites user as referee at 11 PM
- **Handling**:
  - If quiet hours active: Queue notification
  - Deliver at quiet hours end time
  - Or if "Critical exceptions" enabled: Send immediately

### Notification Overload
- **Detection**: >10 notifications sent in 1 hour
- **Throttling**: Bundle remaining notifications
- **Summary**: "You have 5 pending notifications" (grouped)
- **User Control**: "Too many notifications? Adjust settings"

### Device Switched
- **Scenario**: User switches from iOS to Android
- **Handling**: Push token updated automatically on login
- **Notification Channels**: Android channels created on first notification
- **Settings Sync**: Preferences carry over from cloud

### Notification Permission Revoked Mid-Use
- **Detection**: System returns permission denied
- **UI**: Show banner next time app opened
- **Message**: "Notifications are disabled. Re-enable to stay on track."
- **Action**: Deep link to settings

### Future-Scheduled Notification Becomes Invalid
- **Example**: Goal canceled, but reminder already scheduled
- **Prevention**: Cancel scheduled notifications on goal status change
- **Cleanup**: Background job removes stale scheduled notifications

## Analytics Events
Track all notification preference interactions:
- `notification_settings_viewed` (entry_point)
- `notification_toggle_changed` (notification_type, enabled/disabled)
- `notification_timing_changed` (notification_type, old_time, new_time)
- `quiet_hours_enabled` (start_time, end_time)
- `notification_preset_applied` (preset_name)
- `notification_tested` (notification_type)
- `sms_verification_started`
- `sms_verification_completed` (success/failure)
- `notification_delivered` (notification_type, delivery_method, success/failure)
- `notification_interaction` (notification_type, action: opened, dismissed, snoozed)
- `notification_permission_denied` (platform)
- `notification_error` (error_type, error_message)

## Future Enhancements (Post-MVP)
- AI-powered optimal timing: ML suggests best reminder times based on check-in behavior
- Smart escalation: Auto-increase reminder frequency if user misses check-ins
- Contextual notifications: Different messages based on user state (struggling vs thriving)
- Location-based reminders: "You're near the gym. Time to check in!"
- Wearable notifications: Apple Watch, Fitbit notifications
- Voice notifications: Alexa/Google Home reminders
- Calendar integration: Sync check-in times with Google Calendar
- Notification themes: Motivational vs neutral tone
- Friend notification sharing: "Notify me when [friend] checks in"
- Adaptive frequency: Reduce frequency after consistent success
- Rich notifications: Interactive buttons (Check in now, Snooze, View goal)
- Notification insights: "You check in most at 9 AM on Tuesdays"
- Custom notification sounds: Upload or choose custom sounds
- Notification forwarding: Forward critical alerts to emergency contact
- Do Not Disturb integration: Respect system DND settings
