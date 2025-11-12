# Goal Editing Flow

## Goal
Allow users to modify active goals within permitted boundaries while maintaining commitment integrity and preventing gaming, with clear transparency about what can and cannot be changed.

## Entry Points
- Goal detail screen → "Edit Goal" button (3-dot menu)
- Dashboard goal card → Long press → "Edit" option
- Notification: "Struggling with your goal? Consider adjusting it"
- Support chat → "Edit goal" link

## Flow Steps

### Step 1: Edit Goal Entry (From Goal Detail)
**Screen**: Goal Detail
- **Elements**:
  - Goal header with 3-dot menu (top right)
  - Menu options:
    - ✏️ Edit Goal
    - 📊 View Progress
    - 🔔 Notification Settings
    - ⏸️ Pause Goal
    - ❌ End Goal Early

**User Action**: Tap "Edit Goal"
**Next Screen**: Edit Goal Screen

### Step 2: Edit Goal Screen (Main)
**Screen**: Edit Goal
- **Elements**:
  - "Edit your goal" heading
  - Warning banner: "Some changes have restrictions to maintain commitment integrity"

  - **Editable Fields** (organized in sections):

  **✏️ Goal Details** (Always Editable)
  - Goal Name (text input)
    - Current: [goal name]
    - Max 60 characters
    - Validation: Min 5 characters

  - Goal Description / Success Criteria (text area)
    - Current: [criteria]
    - Max 200 characters
    - Validation: Min 10 characters

  - Evidence Type (toggle)
    - Current: Photo / Manual Confirm
    - Can switch between types
    - Warning if switching to manual: "Manual check-ins require referee approval"

  **📅 Timing Settings** (Conditional Editability)
  - Frequency (dropdown)
    - Current: [frequency]
    - Can change if <25% through goal
    - If >25%: Locked with info icon "Cannot change frequency mid-goal"

  - Check-in Time (time picker)
    - Current: [time]
    - Always editable
    - Changes apply starting next day

  - Duration / End Date (date picker)
    - Current: [end date]
    - Can extend (no limit)
    - Can shorten if <50% through goal
    - If >50%: Can only extend, not shorten

  **👥 Accountability** (Always Editable)
  - Referees (list)
    - Current referees shown
    - Can add new referees (up to 3 total)
    - Can remove referees (with confirmation)
    - Cannot remove all referees if goal requires referee

  - Privacy Settings (radio buttons)
    - Current: [Private/Referees/Public]
    - Can change anytime
    - Warning if going from Public → Private: "Previous posts remain visible"

  **🔔 Notifications** (Always Editable)
  - Reminder Settings (toggles)
    - Daily reminder time
    - Deadline warnings
    - Streak milestones
    - Referee notifications

  **❌ Restricted Fields** (Not Editable - Shown with Lock Icon)
  - Commitment Amount: $X (locked)
    - Info: "Cannot change amount after commitment"
    - Workaround shown: "Create new goal for different amount"

  - Charity: [Charity Name] (locked)
    - Info: "Cannot change charity after commitment"
    - Workaround: "You can select different charity for future goals"

  - Start Date: [Date] (locked)
    - Info: "Goal already started"

  - Goal Type: [Type] (locked)
    - Info: "Cannot change goal type after creation"

- **Actions**:
  - "Save Changes" button (primary) - enabled when changes made
  - "Cancel" button (secondary)
  - "Need help?" link (support chat)

**Validation Rules**:
- At least one field must change to save
- All validations must pass
- Show inline errors for invalid fields

**User Action**: Make changes and tap "Save Changes"
**Next Screen**: Confirm Changes (Step 3)

### Step 3: Confirm Changes
**Screen**: Review Changes
- **Elements**:
  - "Review your changes" heading
  - **Changes Summary** (side-by-side comparison):
    - Before → After for each changed field
    - Example:
      - "Goal Name: 'Gym 3x/week' → 'Gym 4x/week'"
      - "Frequency: 3x/week → 4x/week"
      - "End Date: Jan 31 → Feb 15"

  - **Impact Warning** (if applicable):
    - Frequency increased: "This will make your goal harder. Are you sure?"
    - Duration extended: "Your commitment period is now longer"
    - Referee removed: "You'll lose accountability from [Name]"
    - Privacy changed: "Your progress visibility will change"

  - **Checkbox** (if critical change):
    - "I understand this change and want to proceed"

  - **Actions**:
    - "Confirm Changes" button (primary)
    - "Go Back" button (secondary)

**User Action**: Review and confirm
**Next Screen**: Processing Changes (Step 4)

### Step 4: Apply Changes
**Screen**: Saving Changes (Loading State)
- **Elements**:
  - Loading spinner
  - "Updating your goal..."
  - Brief message: "This will just take a moment"

**Technical Process**:
1. Validate changes one more time (server-side)
2. Update goal record in database
3. Create goal_history record (audit trail)
4. Recalculate progress metrics
5. Update check-in schedule (if timing changed)
6. Notify referees (if referee changes)
7. Update notifications (if notification settings changed)
8. Clear cached data
9. Trigger analytics events

**Outcomes**:
- **Success**: Go to Success Screen (Step 5)
- **Failure**: Show error, return to Edit Screen with error message
- **Timeout**: "Saving is taking longer than expected. Continue in background?"

**Next Screen**: Changes Saved Success

### Step 5: Changes Saved Success
**Screen**: Changes Saved
- **Elements**:
  - Green checkmark animation
  - "Changes saved! ✅" heading
  - Summary of what changed
  - Motivational message:
    - If made harder: "Challenge accepted! We believe in you! 💪"
    - If made easier: "Smart adjustment! Set yourself up for success!"
    - If timing changed: "Your new schedule starts tomorrow"

  - **Next Steps** (if applicable):
    - "Notify your referees" (if referee changes)
    - "Update your calendar" (if timing changed)

  - **Actions**:
    - "View Updated Goal" button (primary)
    - "Done" button (secondary)

**Notifications Sent** (if applicable):
- To referees: "[User] updated their goal [Goal Name]"
- To user: Confirmation email with changes summary

**User Action**: Tap "View Updated Goal" or "Done"
**Next Screen**: Goal Detail Screen (updated) or Dashboard

### Step 6: Restricted Edit Attempt
**Scenario**: User tries to edit locked field (amount, charity, etc.)

**Screen**: Edit Goal (with modal)
**Modal Elements**:
- Warning icon
- "This field cannot be changed" heading
- Explanation:
  - Amount: "Commitment amounts cannot be changed after goal creation to maintain integrity"
  - Charity: "Charity selection is locked after commitment"
  - Start Date: "Goal has already started"
- **Workaround Options**:
  - "Create a new goal with these changes" button
  - "Keep current goal" button
  - "Learn more" link (help article)

**User Actions**:
- Create new goal → Goal Creation Flow (pre-filled)
- Keep current → Dismiss modal, stay on Edit screen
- Learn more → Help article (in-app browser)

**Next Screen**: Depends on action

### Step 7: Bulk Edit Multiple Settings
**Scenario**: User wants to change multiple things at once

**Screen**: Edit Goal (with multiple changes)
- **UI Enhancement**:
  - "X changes made" counter at bottom
  - "Review All Changes" button (if 3+ changes)
  - Collapsible sections to manage complexity

**Flow**: Same as Steps 2-5, but confirmation screen shows all changes together

### Step 8: Undo Recent Changes
**Scenario**: User wants to revert changes made recently

**Entry Point**:
- Within 24 hours of change
- Goal detail screen → "Recent changes" banner with "Undo" link

**Screen**: Undo Changes
- **Elements**:
  - "Undo recent changes?" heading
  - Changes made:
    - Timestamp: "Changed 2 hours ago"
    - List of changes
  - "Undo All Changes" button
  - "Keep Changes" button

**If "Undo All Changes"**:
- Revert to previous state
- Update database
- Show: "Changes undone. Goal restored to previous state."

**Limitation**: Can only undo most recent edit (not chain of edits)

## Success Criteria
- **Edit Completion Rate**: 95%+ of started edits are saved successfully
- **Edit Time**: Median time to complete edit < 2 minutes
- **Invalid Edit Attempts**: <5% of edit attempts involve restricted fields
- **User Satisfaction**: 4+ stars for editing experience
- **Referee Notification**: 100% of referee changes trigger notifications

## Error Handling

### Validation Errors
- **Field Too Short**: "Goal name must be at least 5 characters"
- **Field Too Long**: "Goal name cannot exceed 60 characters"
- **Invalid Date**: "End date must be in the future"
- **Invalid Time**: "Check-in time must be valid time"
- **Restricted Change**: "This field cannot be changed" (modal explanation)
- All errors shown inline in red with helpful messages

### Save Failures
- **Network Error**:
  - Message: "Couldn't save changes. Check your connection."
  - Actions: "Retry" button, "Save for Later" (local cache)

- **Conflict Error** (goal changed by another device):
  - Message: "This goal was updated from another device"
  - Actions: "Reload & Try Again" button, "Discard My Changes" button

- **Database Error**:
  - Message: "Something went wrong. Please try again."
  - Actions: "Retry" button, "Contact Support" link
  - Technical: Alert dev team, log error details

### Referee Notification Failure
- **Scenario**: Changes saved but referee not notified
- **Handling**:
  - Save changes anyway (don't block)
  - Retry notification in background (3 attempts)
  - If still fails: Log error, send to admin queue
  - User sees success (transparent failure)

## Edge Cases

### Edit During Active Check-In Window
- **Scenario**: User tries to edit while check-in is due today
- **Warning**: "You have a check-in due today. Changes will apply starting tomorrow."
- **Actions**: Allow edit, but timing changes don't affect today's check-in

### Edit After Missing Check-Ins
- **Scenario**: User missed check-ins, wants to make goal easier
- **Warning**: "You've missed X check-ins. Adjusting the goal won't affect past progress."
- **Allow**: Yes, can still edit
- **Restriction**: Cannot shorten duration to retroactively pass goal

### Edit with Pending Referee Reviews
- **Scenario**: User has evidence pending referee review
- **Warning**: "You have pending reviews. Changes won't affect evidence already submitted."
- **Allow**: Yes, can edit
- **Note**: Referee reviews continue with old criteria

### Edit After Dispute
- **Scenario**: User is disputing a rejected check-in
- **Restriction**: Cannot edit goal while dispute is active
- **Message**: "Resolve your dispute before editing. Contact support for help."
- **Actions**: "View Dispute" button, "Contact Support" link

### Edit with Active Streak
- **Scenario**: User has 15-day streak, changes frequency
- **Handling**:
  - Streak preserved (don't reset)
  - New frequency applies going forward
  - Message: "Your streak will continue with new requirements"

### Edit Near Goal End
- **Scenario**: Goal ends in 2 days, user tries to extend
- **Allow**: Yes, can extend
- **Warning**: "Extending your goal means committing longer"
- **Payment**: No additional charge (amount already locked in)

### Multiple Concurrent Edits (Web + Mobile)
- **Detection**: Edit session started on mobile while web has unsaved changes
- **Handling**:
  - Last save wins
  - Show warning on second device: "Another device is editing this goal"
  - Option: "Take Control" (override) or "Cancel My Changes"

### Edit Scheduled Goal (Not Started Yet)
- **Scenario**: Goal starts tomorrow, user wants to edit today
- **Allow**: Full editing (all fields including amount, charity)
- **Exception**: More permissive rules since not yet started
- **Warning**: "Goal starts tomorrow. Changes will apply at start."

### Partial Edit Abandonment
- **Scenario**: User makes changes but exits without saving
- **Handling**:
  - Show confirmation modal: "You have unsaved changes. Discard?"
  - Actions: "Save Changes", "Discard", "Keep Editing"
  - If discard: Lose changes, return to Goal Detail

## Analytics Events
Track all editing actions:
- `goal_edit_started` (goal_id, entry_point)
- `goal_field_changed` (field_name, old_value, new_value)
- `goal_restricted_edit_attempted` (field_name, user_action)
- `goal_edit_confirmed` (fields_changed, change_types)
- `goal_edit_saved` (success, failure, fields_changed, time_spent)
- `goal_edit_cancelled` (stage, changes_made)
- `goal_edit_undone` (time_since_edit)
- `referee_change_notification_sent` (referee_count_change)
- `goal_edit_error` (error_type, error_message)

## Future Enhancements (Post-MVP)
- AI-powered edit suggestions: "Your goal seems too ambitious. Try reducing frequency?"
- Scheduled edits: "Apply this change starting next week"
- Conditional edits: "If I miss 2 check-ins, automatically reduce frequency"
- Edit history viewer: See all past changes to goal
- Template creation: "Save this goal configuration as a template"
- Batch edit: Change settings across multiple goals at once
- Collaborative editing: Referee can suggest changes
- Smart recommendations: ML model suggests optimal adjustments
- Version control: Roll back to any previous version
- Edit presets: "Make this easier" / "Make this harder" one-tap buttons
