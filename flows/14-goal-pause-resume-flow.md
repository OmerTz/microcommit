# Goal Pause & Resume Flow

## Goal
Allow users to temporarily pause active goals during life events (travel, illness, emergencies) while maintaining commitment integrity and preventing gaming (pause allowed max 2x per goal, 7 days each).

## Entry Points
- Goal detail screen → 3-dot menu → "Pause Goal"
- Check-in screen → "Can't check in right now?" → "Pause goal"
- Missed check-in notification → "Life got in the way?" → Pause option
- Settings → Goals → "Manage active goals" → Pause
- Support chat → "I need to pause my goal"

## Flow Steps

### Step 1: Pause Goal Entry
**Screen**: Goal Detail
- **Elements**:
  - Goal header with 3-dot menu (⋮)
  - Menu options:
    - ✏️ Edit Goal
    - ⏸️ Pause Goal
    - 🏁 End Goal Early
    - 📊 View Statistics

**User Action**: Tap "Pause Goal"
**Next Screen**: Pause Goal Screen (Step 2)

### Step 2: Request Goal Pause
**Screen**: Pause This Goal?
- **Elements**:
  - Pause icon (⏸️)
  - "Pause your goal?" heading
  - Goal name displayed

  **What Pausing Means**:
  - ⏸️ Check-ins temporarily suspended
  - ⏸️ Notifications paused
  - ⏸️ Deadline extended by pause duration
  - ⏸️ Commitment remains active (no refund)
  - ⏸️ Referees notified

  **Pause Rules** (important box):
  - "Maximum 2 pauses per goal"
  - "Maximum 7 days per pause"
  - "Total pause time: 14 days maximum"
  - Pauses used: X/2
  - Remaining pause time: Y days

  **Select Pause Duration**:
  - Radio buttons:
    - 1 day
    - 3 days
    - 5 days
    - 7 days (maximum)
    - Custom (date picker, max 7 days)

  - Calendar preview:
    - Shows current deadline
    - Shows new deadline (current + pause duration)
    - "Your goal will resume on [date]"

  **Reason for Pause** (optional but encouraged):
  - Dropdown or chips:
    - 🌍 Travel/Vacation
    - 🏥 Illness/Injury
    - 👨‍👩‍👧‍👦 Family Emergency
    - 💼 Work Overload
    - 🎓 Exams/School
    - 🏠 Moving/Life Change
    - 🔧 Equipment Issue
    - 📱 App/Technical Issue
    - 🤔 Need a Break
    - Other (text field)

  **Impact Summary**:
  - "Current deadline: [date]"
  - "New deadline: [date + pause]"
  - "Goal progress: [X/Y] check-ins (unchanged)"
  - "Streak: Preserved (won't reset)"

  **Actions**:
  - "Pause Goal" button (primary)
  - "Cancel" link

  **Help Text**:
  - "Don't need a full pause? You can adjust your check-in schedule instead"
  - Link: "Edit check-in times"

**Validation**:
- Duration selected
- Pauses remaining (can't exceed 2)
- Total pause days (can't exceed 14)
- Goal must be active (not already paused)

**User Action**: Select duration and reason, tap "Pause Goal"
**Next Screen**: Confirm Pause (Step 3)

### Step 3: Confirm Pause
**Screen**: Confirm Goal Pause
- **Elements**:
  - "Confirm goal pause" heading
  - Pause summary card:
    - Goal: [name]
    - Pause duration: X days
    - Resume date: [date]
    - Reason: [reason]
    - New end date: [extended date]

  **Important Reminders** (checklist):
  - ☑ "I understand my commitment remains active"
  - ☑ "I understand this counts as 1 of my 2 pauses"
  - ☑ "I will resume check-ins on [date]"

  **What Happens Next**:
  1. Goal paused immediately
  2. No check-ins required during pause
  3. Deadline extended by [X] days
  4. Notifications resume on [resume date]
  5. Referees notified of pause

  **Actions**:
  - "Confirm Pause" button (primary)
  - "Change Duration" button (back to Step 2)
  - "Cancel" link

**User Action**: Confirm pause
**Next Screen**: Goal Paused Success (Step 4)

### Step 4: Goal Paused Successfully
**Screen**: Goal Paused ⏸️
- **Elements**:
  - Pause icon (animated)
  - "Goal paused!" heading
  - "Take your time. We'll be here when you're ready."

  **Pause Details**:
  - Goal: [name]
  - Paused until: [resume date]
  - Days remaining: [countdown]
  - Pauses used: X/2

  **What You Can Do**:
  - ✓ Resume early if ready
  - ✓ View goal progress
  - ✓ Edit pause duration (if needed, within 24 hours)
  - ✓ Contact support if issues

  **Notifications**:
  - ✓ Referees notified
  - ✓ Check-in reminders paused
  - ✓ Resume reminder scheduled

  **Actions**:
  - "View Goal" button (go to goal detail)
  - "Done" button (return to dashboard)

**Technical Process**:
1. Update goal status: "paused"
2. Store pause record:
   - start_date: now
   - end_date: now + duration
   - reason: selected reason
   - pause_count: increment
3. Cancel scheduled check-in notifications
4. Extend goal end_date by pause duration
5. Recalculate check-in schedule (shift all future check-ins)
6. Send notification to referees
7. Schedule resume notification (for resume date)
8. Log pause event
9. Update goal progress metrics

**User Action**: View goal or return to dashboard
**Next Screen**: Goal Detail (paused state) or Dashboard

### Step 5: Goal Detail - Paused State
**Screen**: Goal Detail (Paused)
- **Elements**:
  - Yellow banner at top:
    - ⏸️ "This goal is paused"
    - "Resumes on [date]"
    - Countdown: "X days remaining"

  - Goal header:
    - Goal name
    - Status badge: "Paused" (yellow)
    - Progress: [X/Y] check-ins (unchanged)

  - Pause info card:
    - Pause reason: [reason]
    - Paused on: [date]
    - Resumes on: [date]
    - Time remaining: [countdown]
    - Pauses used: X/2

  - Timeline/Calendar:
    - Past check-ins: Green ✓
    - Paused period: Gray/hatched area
    - Future check-ins: Shifted by pause duration

  - Actions (updated):
    - "Resume Now" button (if want to end pause early)
    - "Extend Pause" button (if within limits)
    - "Edit Pause" link (change duration, within 24 hours)
    - "Cancel Goal" link (still available)

  - Disabled actions:
    - "Check In Now" (grayed out, with tooltip: "Goal is paused")
    - Notifications silenced

**User Actions**:
- Resume early → Resume Flow (Step 6)
- Extend pause → Extend Pause (Step 8)
- Wait for auto-resume

**Next Screen**: Depends on action

### Step 6: Resume Goal Early
**Entry Point**: Paused goal detail → "Resume Now" button

**Screen**: Resume Goal Early?
- **Elements**:
  - Play icon (▶️)
  - "Resume your goal early?" heading
  - "You're ahead of schedule!"

  **Pause Status**:
  - Originally paused until: [date]
  - Early resume: Today
  - Days saved: X days

  **What Happens**:
  - ✓ Goal reactivates immediately
  - ✓ Check-ins required starting tomorrow
  - ✓ Notifications resume
  - ✓ Deadline adjusted (shortened by days saved)
  - ✓ Referees notified

  **Options**:
  - "Keep Extended Deadline" (resume early but keep extra days)
  - "Shorten Deadline" (resume early and remove extra days)
  - Recommended: Keep extended deadline (easier)

  **Actions**:
  - "Resume Goal" button (primary)
  - "Cancel" link (stay paused)

**User Action**: Choose option, resume
**Next Screen**: Goal Resumed (Step 7)

### Step 7: Goal Resumed Successfully
**Screen**: Goal Resumed ▶️
- **Elements**:
  - Play icon (animated)
  - "Welcome back! 🎉" heading
  - "Your goal is active again"

  **Resume Details**:
  - Goal: [name]
  - Resumed: Today
  - Next check-in: Tomorrow at [time]
  - New end date: [date]

  **What's Changed**:
  - ✓ Check-in reminders reactivated
  - ✓ Referees notified
  - ✓ Deadline: [kept extended / shortened]
  - ✓ Progress: [X/Y] check-ins

  **Motivational Message**:
  - "You've got this!"
  - "Let's get back on track!"
  - "X days until your goal completes"

  **Actions**:
  - "View Goal" button
  - "Check In Now" button (if check-in due)
  - "Done" button

**Technical Process**:
1. Update goal status: "active"
2. Update pause end_date: now (ended early)
3. Recalculate check-in schedule
4. Optionally adjust goal end_date
5. Reactivate check-in notifications
6. Send notification to referees
7. Schedule next check-in reminder
8. Log resume event

**User Action**: Return to goal or dashboard
**Next Screen**: Goal Detail (active) or Dashboard

### Step 8: Extend Pause Duration
**Entry Point**: Paused goal detail → "Extend Pause" button

**Screen**: Extend Pause Duration
- **Elements**:
  - "Extend your pause?" heading
  - Current pause: Ends [date]

  **Extend By**:
  - Radio buttons:
    - 1 more day
    - 2 more days
    - 3 more days
    - Maximum allowed
  - Max extension shown: "Up to X more days"

  **Limits Check**:
  - Total pause used: Y days
  - Maximum total: 14 days
  - Remaining: Z days
  - Cannot exceed maximum

  **New Resume Date**:
  - Current resume date: [date]
  - New resume date: [date + extension]
  - New end date: [adjusted]

  **Actions**:
  - "Extend Pause" button (enabled if within limits)
  - "Cancel" link

**Validation**:
- Extension doesn't exceed daily limit (7 days per pause)
- Total pause time doesn't exceed 14 days per goal
- Still within same pause (can't start new pause)

**User Action**: Select extension, confirm
**Next Screen**: Pause Extended Success

**Screen**: Pause Extended
- "Pause extended!" heading
- New resume date: [date]
- "Take the extra time you need"
- "Done" button

**Technical**: Update pause end_date, adjust goal end_date
**Next Screen**: Goal detail (paused)

### Step 9: Auto-Resume (Scheduled)
**Trigger**: Pause end_date reached

**Technical Process**:
1. Background job checks paused goals
2. If end_date <= now:
   - Update goal status: "active"
   - Reactivate check-in schedule
   - Send resume notification
   - Send referee notification
   - Log auto-resume event

**Notification**: "Your goal '[name]' has resumed!"
- "Your first check-in is due [today/tomorrow] at [time]"
- Tap to view goal

**In-App**:
- Dashboard: Goal card no longer shows "Paused" badge
- Goal detail: Banner removed, back to active state
- Timeline: Pause period marked, future check-ins scheduled

**User Experience**: Seamless transition back to active

### Step 10: Pause Limits Reached
**Scenario**: User has used 2 pauses, tries to pause again

**Screen**: Cannot Pause Goal
- **Elements**:
  - Warning icon (⚠️)
  - "Cannot pause this goal" heading
  - "You've used all available pauses"

  **Pause Usage**:
  - Pauses used: 2/2
  - Pause duration used: 14/14 days
  - "No additional pauses available for this goal"

  **Alternatives**:
  - "What you can do instead:"
  - ✓ Continue with goal as-is
  - ✓ Edit goal schedule (adjust check-in times)
  - ✓ End goal early (with commitment charge)
  - ✓ Contact support (exceptional circumstances)

  **Actions**:
  - "Edit Schedule" button
  - "End Goal" button (red)
  - "Contact Support" link
  - "Cancel" button

**User Action**: Choose alternative
**Next Screen**: Depends on choice

### Step 11: Edit Pause (Within 24 Hours)
**Entry Point**: Paused goal → "Edit Pause" link (only available within 24 hours of pausing)

**Screen**: Edit Pause Duration
- **Elements**:
  - "Edit pause duration" heading
  - "Available for 24 hours after pausing"

  **Current Pause**:
  - Started: [timestamp]
  - Duration: X days
  - Ends: [date]

  **New Duration**:
  - Slider or radio buttons: 1-7 days
  - New end date shown: [date]
  - Goal end date adjusted accordingly

  **Actions**:
  - "Save Changes" button
  - "Cancel" link

**Restriction**: Only within 24 hours of initial pause
**After 24 hours**: "Edit Pause" option disappears

**User Action**: Adjust duration, save
**Next Screen**: Pause updated confirmation

### Step 12: Cancel Pause (Resume Immediately)
**Entry Point**: Paused goal → "Cancel Pause" option (different from "Resume Early")

**Screen**: Cancel Pause
- "Cancel this pause?" heading
- "This will resume your goal immediately"
- Difference from "Resume Early":
  - Resume Early: Intentional early return
  - Cancel Pause: Undo the pause (within 24 hours)

**If Within 24 Hours of Pausing**:
- "This will undo the pause as if it never happened"
- Deadline reverts to original (no extension)
- Pause count: Decremented (as if not used)

**If After 24 Hours**:
- Same as "Resume Early" (counts as pause used)

**Actions**:
- "Cancel Pause" button
- "Keep Paused" link

**User Action**: Cancel pause
**Technical**: Revert or end pause
**Next Screen**: Goal active

## Success Criteria
- **Pause Success Rate**: 95%+ of pause attempts complete successfully
- **Abuse Prevention**: <2% of users game the system with pauses
- **Resume Rate**: 90%+ of paused goals resume (not abandoned)
- **Limit Compliance**: <5% of users attempt to exceed pause limits
- **User Satisfaction**: 4+ stars for pause feature

## Error Handling

### Pause Request During Check-In Window
- **Scenario**: Check-in due today, user tries to pause
- **Warning**: "You have a check-in due today"
- **Options**:
  - "Check in first, then pause"
  - "Mark today as missed, then pause"
  - "Pause anyway" (today counts as missed)

### Pause Limit Exceeded
- **Scenario**: User tries 3rd pause or >14 total days
- **UI**: "Cannot pause - limit reached"
- **Explanation**: Show pause usage
- **Alternative**: "Contact support for exceptional cases"

### Resume Scheduling Failure
- **Rare**: Background job fails to resume goal
- **Detection**: Goal still paused after end_date
- **Handling**: Retry job, alert support
- **User Notification**: "Resume delayed - we're working on it"

### Goal Modified During Pause
- **Scenario**: User edits goal while paused
- **Handling**: Allow edits, recalculate schedule
- **Warning**: "Changes will apply when goal resumes"

### Network Error During Pause
- **UI**: "Couldn't pause goal. Try again?"
- **Action**: Retry button
- **Fallback**: Save locally, sync when online

## Edge Cases

### Multiple Goals Paused Simultaneously
- **Behavior**: Each goal paused independently
- **Limits**: Pause limits per goal (not per user)
- **UI**: Dashboard shows all paused goals with countdowns

### Pause Overlaps with Goal End Date
- **Scenario**: User pauses with only a few days left
- **Handling**: Allow pause, extend end date accordingly
- **Warning**: "This will extend your goal by X days"

### Referee Pauses Their Own Goal
- **Scenario**: Referee is referee for User A, pauses own goal
- **Impact**: None on User A's goal
- **Note**: Referee availability unaffected

### Pause During Dispute
- **Scenario**: Check-in disputed, user pauses goal
- **Handling**: Allow pause, dispute continues
- **Impact**: Dispute resolution after resume

### User Deletes Account While Paused
- **Handling**: Standard deletion flow
- **Financial**: Commitment still charged (goal counts as failed)

### Pause Duration Calculation Error
- **Rare**: End date calculated incorrectly
- **Detection**: Validation check on submission
- **Handling**: Recalculate, show corrected date
- **Alert**: Log error for investigation

### User Pauses Twice Rapidly
- **Scenario**: Pauses, resumes, pauses again immediately
- **Handling**: Allow if within limits (2 pauses total)
- **Track**: Both pauses counted separately

### Pause During Referee Review
- **Scenario**: Evidence pending referee review, user pauses
- **Handling**: Pause allowed, review continues
- **Impact**: Review result applies when goal active

### Auto-Resume Fails (Technical)
- **Detection**: Goal not resumed at scheduled time
- **Retry**: Auto-retry every hour for 24 hours
- **Notification**: "Resume delayed" message
- **Manual**: Support can manually resume

### User Forgets Goal Resumed
- **Scenario**: Goal auto-resumes, user misses check-in
- **Handling**: Standard missed check-in flow
- **Reminder**: "Your goal resumed yesterday" notification

## Analytics Events
Track all pause/resume activity:
- `goal_pause_requested` (goal_id, reason, duration)
- `goal_pause_confirmed` (goal_id, pause_count, total_pause_days)
- `goal_paused` (goal_id, duration, reason, pauses_remaining)
- `goal_pause_extended` (goal_id, extension_days, new_total)
- `goal_pause_edited` (goal_id, old_duration, new_duration, hours_since_pause)
- `goal_resume_early_requested` (goal_id, days_early)
- `goal_resumed_early` (goal_id, days_saved, kept_extended_deadline)
- `goal_auto_resumed` (goal_id, pause_duration_used)
- `goal_pause_cancelled` (goal_id, hours_since_pause)
- `goal_pause_limit_reached` (goal_id, pauses_used, total_days_used)
- `goal_pause_error` (goal_id, error_type, error_message)

## Future Enhancements (Post-MVP)
- Flex pause: Automatically pause on detected travel (calendar/location integration)
- Smart pause suggestions: AI suggests pause during holidays, busy periods
- Buddy pause: Pause multiple linked goals together
- Pause insurance: Optional add-on for unlimited pauses
- Recurring pause: Schedule pauses in advance (e.g., every Sunday)
- Partial pause: Reduce check-in frequency instead of full pause
- Pause templates: Quick pause presets (Weekend break, Vacation mode, etc.)
- Pause streaks: Track longest active period without pause
- Pause sharing: Notify friends/community (optional, social feature)
- Conditional pause: "Auto-pause if I miss 2 check-ins"
- Pause analytics: Insights on pause patterns (help user plan better)
- Goal hibernation: Long-term pause (30+ days) with different rules
- Pause scheduling: "Pause my goal starting [future date]"
- Undo pause: Full undo within 1 hour (as if never paused)
- Pause alternatives: App suggests editing schedule instead of pausing
