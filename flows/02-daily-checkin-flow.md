# Daily Check-In Flow

## Goal
Enable users to quickly submit evidence of goal progress and receive instant AI verification feedback in under 60 seconds.

## Entry Points
- Push notification tap → Check-in screen for specific goal
- Dashboard → Tap "Check In Now" on goal card
- Goal detail screen → "Submit Evidence" button
- App badge (shows pending check-ins) → Dashboard → Check-in

## Flow Steps

### Step 1: Check-In Trigger (0 seconds)
**Notification Example**:
- "Time to check in! 💪"
- "Did you [goal name] today?"
- Tap to submit evidence

**Dashboard Indicator**:
- Goal card shows "Check-in Due" badge
- Timer: "X hours remaining"
- Red/amber color if deadline approaching

**User Action**: Tap notification or check-in button
**Next Screen**: Check-In Screen

### Step 2: Evidence Submission Screen (30 seconds)
**Screen**: Submit Evidence
- **Elements**:
  - **Header**:
    - Goal name (e.g., "Go to gym 3x per week")
    - Current streak: "🔥 5 day streak"
    - Check-in date: "Check-in for [Date]"

  - **Evidence Type Selector** (tabs or buttons):
    - 📷 Photo (camera)
    - 🖼️ Upload (photo library)
    - ✅ Manual Confirm (for non-visual goals)

  - **Primary Action Button**:
    - For Photo: Large "Take Photo" button (camera icon)
    - For Upload: "Choose from Library" button
    - For Manual: "I completed this!" button

  - **Additional Context** (optional):
    - Text field: "Add a note..." (e.g., "Did 30 minutes on treadmill")
    - Character limit: 100
    - Placeholder shows success criteria reminder

  - **Help Text**:
    - Tips based on goal type
    - Example: "Make sure gym equipment is visible in photo"
    - Link: "What makes good evidence?"

  - **Secondary Actions**:
    - "I missed this one" link (mark as failed check-in)
    - "Remind me later" (snooze for 2 hours)

### Photo Evidence Path

#### Step 2a: Take Photo (15 seconds)
**Screen**: Camera Interface
- **Elements**:
  - Native camera view (full screen)
  - Capture button (center bottom)
  - Switch camera (front/back)
  - Flash toggle
  - Cancel button (top left)

- **Guidance Overlay** (optional, first time):
  - Semi-transparent hints: "Include yourself and [goal-specific item]"
  - Example for gym: Outline showing person + equipment

- **User Action**: Take photo, review, confirm or retake
- **Next Screen**: Photo Preview

#### Step 2b: Photo Preview (10 seconds)
**Screen**: Confirm Photo
- **Elements**:
  - Full-screen photo preview
  - "Use This Photo" button (primary)
  - "Retake" button (secondary)
  - Edit options (crop, rotate - minimal)

- **User Action**: Confirm or retake
- **Next Screen**: AI Verification (loading)

### Upload Evidence Path

#### Step 2c: Choose from Library (20 seconds)
**Screen**: Photo Library Picker
- **Elements**:
  - Native photo library interface
  - Multi-select disabled (single photo only)
  - Cancel button

- **Filters** (optional):
  - Recent photos
  - Photos from today
  - Favorites

- **User Action**: Select photo
- **Next Screen**: Photo Preview (same as Step 2b)

### Manual Confirmation Path

#### Step 2d: Manual Confirm (10 seconds)
**Screen**: Manual Check-In Confirmation
- **Elements**:
  - Heading: "Confirm your check-in"
  - Reminder of success criteria
  - "Did you complete [goal name] today?" (large text)
  - Text field: "Add a note (optional)"
  - "Yes, I completed this!" button (primary)
  - "No, I missed this" button (secondary)

- **Note**: Manual confirmations always flagged for referee review (if referee exists)

- **User Action**: Confirm completion
- **Next Screen**: Pending Referee Review (if referee) or Success

### Step 3: AI Verification (5-15 seconds)
**Screen**: Analyzing Evidence (Loading State)
- **Elements**:
  - Animated loading indicator (spinning or progress bar)
  - Goal name
  - Submitted photo (thumbnail)
  - Status text: "Analyzing your evidence..."
  - Progress messages (rotating):
    - "Checking if photo matches your goal..."
    - "Almost there..."
    - "Verifying..."

- **Technical Process**:
  1. Upload photo to Supabase Storage
  2. Call Edge Function `verify-evidence`
  3. Edge Function calls OpenAI Vision API with:
     - Photo URL
     - Goal success criteria
     - Prompt: "Analyze if this image shows evidence of [criteria]. Provide confidence score and reasoning."
  4. Receive response: verdict (pass/fail/uncertain), confidence (0-100), reasoning text
  5. Store verification result in `evidence` table
  6. Update `check_ins` record with result

- **Timeout Handling** (if > 15 seconds):
  - Show: "This is taking longer than usual..."
  - Option: "Continue in background" (notification when ready)

- **Next Screen**: Depends on AI verdict

### Step 4a: Success - AI Approved (5 seconds)
**Screen**: Check-In Approved
- **Elements**:
  - Large green checkmark animation
  - "Verified! ✅" heading
  - Congratulatory message:
    - "Great work! Keep it up!"
    - Or: "You're on a roll! 🔥 [streak count] days"
  - Updated streak counter (animated increment)
  - Progress indicator: "[X] of [Y] check-ins completed"
  - Timeline/calendar showing green checkmark for today

  - **AI Reasoning** (collapsible):
    - "Why this passed:" toggle
    - Shows AI reasoning: "Detected gym equipment and person in workout attire. Confidence: 95%"

  - **Actions**:
    - "Done" button (returns to dashboard)
    - "View Progress" link (goes to goal detail)
    - "Share Success" link (social sharing)

- **Celebration**:
  - Haptic feedback (success vibration)
  - Confetti animation (if milestone: 7 days, 30 days, etc.)
  - Achievement badge notification (if earned)

- **Auto-dismiss**: Return to dashboard after 5 seconds if no action

**User Action**: Tap Done or wait for auto-dismiss
**Next Screen**: Dashboard

### Step 4b: Uncertain - Needs Referee Review (10 seconds)
**Screen**: Pending Referee Approval
- **Elements**:
  - Yellow/amber exclamation icon
  - "Needs Review" heading
  - Message: "Our AI couldn't verify this automatically. Your referee will take a look!"
  - **AI Reasoning**:
    - "Why uncertain:" (always shown)
    - "Image quality is low" or "Could not clearly identify [criteria]"
    - Confidence score: 45-69%

  - Submitted photo (thumbnail, tap to enlarge)
  - "Waiting for [Referee Name]" status
  - Expected time: "Usually reviewed within 24 hours"

  - **Actions**:
    - "Add More Context" button (add text explanation)
    - "Submit Another Photo" button (replace evidence)
    - "Contact Referee" link (send message/nudge)
    - "Done" button

- **Notification Sent**:
  - Push notification to referee(s)
  - Email backup if push not delivered

- **User Action**: Tap Done or add context
- **Next Screen**: Dashboard (with "Pending Review" badge on goal)

### Step 4c: Rejected - AI Denial (10 seconds)
**Screen**: Check-In Denied
- **Elements**:
  - Red X icon
  - "Not Verified" heading
  - Message: "This evidence doesn't match your goal criteria."
  - **AI Reasoning**:
    - "Why this didn't pass:"
    - Specific reason: "No gym equipment visible" or "Photo appears to be from a different day"
    - Confidence score: 70-100% confident in rejection

  - Submitted photo (thumbnail)

  - **Options**:
    - "Submit Different Evidence" button (primary - restart flow)
    - "Request Manual Review" button (flag for referee or support)
    - "I missed this check-in" button (accept failure)
    - "Learn More" link (tips for better evidence)

  - **Consequence Warning**:
    - "Reminder: If you don't submit valid evidence by [deadline], this check-in will be marked as missed."
    - Timer: "X hours remaining"

- **User Actions**:
  - Submit different evidence → Back to Step 2
  - Request review → Referee notification sent
  - Accept missed check-in → Mark as failed

**Next Screen**: Depends on action taken

### Step 4d: Referee Review Complete (Notification)
**Trigger**: Referee approves or rejects evidence

**Notification**:
- "[Referee Name] reviewed your check-in"
- "Approved! ✅" or "Needs more evidence ⚠️"
- Tap to see details

**In-App**:
- Update goal card badge: "Approved" (green) or "Rejected" (red)
- Update streak if approved
- If rejected, show message and options (same as Step 4c)

### Step 5: Missed Check-In (User Acknowledges)
**Screen**: Acknowledge Missed Check-In
- **Elements**:
  - Sad/supportive icon (not judgmental)
  - "It happens to everyone" heading
  - Message: "You missed this check-in. Don't give up!"
  - Impact summary:
    - "Streak reset: Was [X] days"
    - "Progress: [Y] of [Z] check-ins completed"
    - "Still on track to succeed: [%] completion rate"

  - **Encouragement**:
    - Motivational quote or tip
    - "Get back on track with your next check-in tomorrow!"

  - **Actions**:
    - "View My Progress" button
    - "Adjust My Goal" link (if struggling)
    - "Talk to Support" link

- **Technical**:
  - Mark check-in as missed
  - Reset streak counter
  - Recalculate success probability
  - Update goal status (still active unless too many misses)

**Next Screen**: Dashboard or Goal Detail

## Success Criteria
- **Submission Time**: 90%+ of check-ins submitted within 60 seconds
- **AI Approval Rate**: 80%+ of photo evidence auto-approved (high confidence)
- **Referee Review Time**: 90%+ reviewed within 24 hours
- **User Satisfaction**: 4+ stars for check-in experience
- **Evidence Resubmission**: <10% of users need to resubmit evidence

## Error Handling

### Photo Upload Fails
- **Causes**: Network issue, file too large, storage error
- **UI**: "Upload failed. Try again?"
- **Actions**:
  - "Retry Upload" button
  - "Use Different Photo" button
  - Automatically retry in background (3 attempts)
  - If still fails: "Save Locally" option (sync when online)

### AI Verification Timeout
- **Causes**: API timeout, rate limit, service down
- **UI**: "Verification taking longer than expected"
- **Actions**:
  - "Continue in Background" (check-in queued)
  - Notification when verification complete
  - Fallback: Auto-send to referee review

### Camera Permission Denied
- **UI**: "Camera access needed to submit photo evidence"
- **Actions**:
  - "Open Settings" button (deep link to app settings)
  - "Upload from Library Instead" button (alternative path)

### No Referee Available for Review
- **UI**: "No referee assigned for this goal"
- **Actions**:
  - "Invite a Referee" button
  - "Use AI Best Guess" (accept uncertain verdict)
  - "Contact Support" for manual review

## Edge Cases

### Late Check-In (After Deadline)
- Still allow submission up to 24 hours late
- Show warning: "This check-in was due yesterday"
- Mark as late in progress tracker (orange dot instead of green)
- 3 late check-ins = 1 missed check-in

### Multiple Check-Ins Same Day
- If goal is "X times per week" (not daily):
  - Allow multiple check-ins in one day
  - Show: "Check-in 1 of 3 for this week"
- If goal is "daily":
  - Only one check-in per day allowed
  - Show: "Already checked in today! ✅"

### Check-In Before Due Time
- Allow early check-ins (within reason)
- Example: Goal is "daily at 9 PM", user checks in at 3 PM
  - Allow if within 6 hours of due time
  - Prevent gaming: No check-ins more than 12 hours early

### Goal Completed Early
- If all required check-ins completed before goal end date:
  - Show celebration screen
  - Trigger goal completion flow
  - Option: "End Goal Now" or "Keep Going"

### Traveling / Time Zone Changes
- Detect time zone change
- Adjust check-in times automatically
- Notify user: "Check-in time updated for your new timezone"

## Analytics Events
Track all check-in actions:
- `checkin_started` (goal_id, trigger_source)
- `evidence_type_selected` (photo, upload, manual)
- `photo_captured` (camera_used, photo_size)
- `photo_uploaded` (upload_time, file_size)
- `ai_verification_started` (goal_id, evidence_type)
- `ai_verification_completed` (verdict, confidence, reasoning, processing_time)
- `checkin_approved` (approval_source: ai, referee, manual)
- `checkin_rejected` (rejection_reason, confidence)
- `checkin_pending_review` (referee_notified)
- `checkin_missed_acknowledged`
- `checkin_resubmitted` (reason)
- `checkin_error` (error_type, error_message)

## Future Enhancements (Post-MVP)
- Voice note evidence (for journaling goals)
- Video evidence (short clips)
- Geolocation verification (e.g., at gym location)
- Wearable data sync (Apple Health, Fitbit)
- Batch check-ins (multiple goals at once)
- Smart reminders based on user behavior patterns
- Evidence templates (pose guides for photos)
- Offline mode with background sync
- AR overlays for photo guidance
