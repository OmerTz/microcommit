# Check-In Screen

## Overview
The Check-In Screen is where users submit evidence of goal progress. This is the most frequently used screen in the app and must be fast, simple, and encouraging.

## Screen Purpose
- Capture evidence of goal completion (photo, upload, or manual)
- Provide clear guidance on what makes good evidence
- Submit evidence for AI verification
- Display verification results with transparency
- Maintain user motivation throughout the process

## Access
- **Entry Points**:
  - Dashboard → "Check In Now" button on goal card
  - Push notification → Tap reminder notification
  - Bottom tab → Camera/Check-in tab (shows pending check-ins)
  - Goal detail screen → "Submit Evidence" button
- **Direct Intent**: Can be opened directly from notification with goal_id

---

## Layout Structure

### Top Section: Context Header
**Elements**:

1. **Back Button** (top left):
   - Arrow icon
   - Returns to previous screen (dashboard or goal detail)

2. **Goal Context Card** (below header):
   - Compact version of goal info
   - Goal name with icon
   - Current streak: "🔥 12 days"
   - Progress: "12 of 30 check-ins"
   - Today's date: "Check-in for March 15, 2024"
   - Collapsible: Tap to expand/collapse for more space

3. **Success Criteria Reminder** (collapsible):
   - Toggle: "Remind me what counts" (collapsed by default)
   - When expanded:
     - Full success criteria text
     - Example evidence (if available)
     - Tips: "Make sure [X] is visible in photo"

**Height**: 120-180px (collapsed), up to 300px (expanded)
**Background**: White card with shadow or border

---

### Middle Section: Evidence Submission (Primary Focus)

#### Default View (Before Evidence Selected)
**Large Evidence Type Selector Buttons** (vertical stack):

1. **Take Photo Button**:
   ```
   ┌─────────────────────────────────┐
   │         📷                      │
   │   Take Photo Now                │
   │   Show gym selfie, equipment    │
   └─────────────────────────────────┘
   ```
   - Icon: Camera (large, 48x48px)
   - Primary text: "Take Photo Now"
   - Secondary text: Context-specific hint based on goal type
   - Full-width button, tall (80-100px height)
   - Color: Primary brand color

2. **Upload Photo Button**:
   ```
   ┌─────────────────────────────────┐
   │         🖼️                       │
   │   Choose from Library           │
   │   Select a photo from today     │
   └─────────────────────────────────┘
   ```
   - Icon: Image gallery
   - Secondary button (less prominent than "Take Photo")
   - Height: 80px

3. **Manual Confirmation** (if goal allows):
   ```
   ┌─────────────────────────────────┐
   │         ✅                       │
   │   I Completed This              │
   │   No photo required             │
   └─────────────────────────────────┘
   ```
   - Icon: Checkmark
   - Tertiary styling (outline or ghost button)
   - Note: "May require referee verification"
   - Height: 60px

**Spacing**: 16px between buttons
**Total Height**: ~250-300px

#### Camera View (After "Take Photo")
**Full-Screen Native Camera Interface**:

- **Camera Controls**:
  - Capture button (center bottom, large, circular)
  - Flash toggle (top left)
  - Switch camera (front/back, top right)
  - Cancel button (X icon, top left corner)

- **Guidance Overlay** (semi-transparent, first time only):
  - Outline or hint showing ideal framing
  - Example: For gym selfie, show person + equipment outline
  - Dismiss: "Got it" button or auto-hide after 3 seconds

- **Captured Photo Preview**:
  - Full-screen photo display
  - "Use This Photo" button (bottom center, green)
  - "Retake" button (bottom left)
  - Optional: Basic editing (crop, rotate - minimal)

**Interactions**:
- Tap capture → Shows preview
- Confirm → Return to check-in screen with photo
- Retake → Back to camera view
- Cancel → Back to evidence type selection

#### Photo Selected View
**Preview of Selected Evidence**:

```
┌─────────────────────────────────────┐
│                                     │
│      [Photo Preview Thumbnail]      │
│           (300x200px)               │
│                                     │
│   [Change Photo] [Edit]             │
└─────────────────────────────────────┘
```

- Photo thumbnail (square or 3:2 ratio, centered)
- Tap photo → Full-screen view
- "Change Photo" button (outline)
- "Edit" option (crop/rotate)

---

### Optional Context Section (Below Evidence)
**Add a Note (Optional)**:

- Text field: "Add a note... (optional)"
- Placeholder: "Ran 3 miles today!" or "Completed 30 minutes"
- Character limit: 100
- Helps referee/AI if evidence is unclear
- Expandable: Starts as single line, expands to 3 lines when typing

**Height**: 44px (collapsed), up to 100px (expanded)

---

### Bottom Section: Submit Actions

**Primary Submit Button**:
```
┌─────────────────────────────────────┐
│      Submit Evidence               │
│      (AI verifying in seconds)     │
└─────────────────────────────────────┘
```

- Full-width, fixed to bottom (or pinned when scrolling)
- Height: 56px (larger for emphasis)
- Color: Green (success color)
- Text: "Submit Evidence"
- Subtext: "AI verifying in seconds" or "Quick verification"
- Disabled state: Gray, "Select evidence first"
- Loading state: Spinner + "Submitting..."

**Secondary Actions** (small links below button):
- "I missed this check-in" (text link, left aligned)
  - Opens confirmation modal
  - "Are you sure? This will break your streak"
  - "Yes, I missed it" / "No, go back"
- "Remind me later" (text link, right aligned)
  - Snoozes notification for 2 hours
  - Only available if check-in not yet overdue

**Bottom Padding**: 16px (above safe area on iPhone)

---

## States & Flows

### State 1: Loading / Verification in Progress
**After Submit Button Pressed**:

**Screen Content**:
```
┌─────────────────────────────────────┐
│         [Animated Spinner]          │
│                                     │
│   Analyzing Your Evidence...        │
│                                     │
│   [Photo Thumbnail]                 │
│                                     │
│   Checking if photo matches goal    │
│   criteria...                       │
│                                     │
│   This usually takes 5-10 seconds   │
└─────────────────────────────────────┘
```

- Centered layout
- Animated spinner (brand-colored)
- Photo thumbnail (for context)
- Progress text (rotating messages):
  - "Analyzing your evidence..."
  - "Checking if photo matches goal criteria..."
  - "Almost there..."
  - "Verifying..."
- Estimated time: "Usually 5-10 seconds"

**If timeout (> 15 seconds)**:
- "This is taking longer than usual..."
- "Continue in background?" button
- On tap: Navigate away, notification when done

**Technical**:
- Upload photo to Supabase Storage
- Call Edge Function for AI verification
- OpenAI Vision API analyzes photo
- Store result in database

### State 2a: Verification Success (Auto-Approved)
**Full-Screen Success Feedback**:

```
┌─────────────────────────────────────┐
│                                     │
│         ✅ (Animated)                │
│                                     │
│         Verified!                   │
│      Great work! Keep it up!        │
│                                     │
│     Streak: 🔥 13 days              │
│     Progress: 13 of 30              │
│                                     │
│  [AI Confidence: 95% ▼]             │
│  (Collapsible reasoning)            │
│                                     │
│         [Done] [Share]              │
└─────────────────────────────────────┘
```

**Elements**:
- Large green checkmark (animated: scale + fade in)
- "Verified!" heading (large, bold)
- Congratulatory subtext
- Updated streak and progress (animated counters)
- Haptic feedback (success vibration pattern)

- **AI Transparency Section** (collapsible):
  - "AI Confidence: 95%" with expand icon
  - When expanded:
    - "Why this passed:"
    - AI reasoning text: "Detected gym equipment and person in workout attire"
    - Confidence score visualization (progress bar)

- **Action Buttons**:
  - "Done" (primary, returns to dashboard)
  - "Share Success" (secondary, opens share sheet)

**Auto-Dismiss**: Return to dashboard after 5 seconds if no interaction

**Celebration** (for milestones):
- Confetti animation (7 days, 30 days, etc.)
- Achievement badge popup: "7 Day Streak! 🔥"
- Additional haptic feedback

### State 2b: Verification Uncertain (Needs Referee)
**Pending Review Screen**:

```
┌─────────────────────────────────────┐
│         ⚠️ (Amber icon)              │
│                                     │
│       Needs Review                  │
│  AI couldn't verify automatically   │
│                                     │
│   [Photo Thumbnail]                 │
│                                     │
│  Your referee will take a look!     │
│  Usually reviewed within 24 hours   │
│                                     │
│  AI Confidence: 62%                 │
│  Reason: Image quality is low       │
│                                     │
│  [Add More Context]                 │
│  [Submit Different Photo]           │
│  [Contact Referee]                  │
│                                     │
│         [Done]                      │
└─────────────────────────────────────┘
```

**Elements**:
- Amber/yellow icon (not red - not failure yet)
- "Needs Review" heading (neutral tone)
- Explanation: Not AI's fault, just needs human verification
- Photo thumbnail (tap to view full-size)
- "Waiting for [Referee Name]" status
- Expected review time: "Usually within 24 hours"

- **AI Transparency**:
  - Always shown (not collapsible)
  - Confidence score: 45-69%
  - Specific reason: "Image quality is low" or "Could not clearly identify [criteria]"

- **Action Options**:
  - "Add More Context" button
    - Opens text field: "Explain what's in the photo"
    - Helps referee understand
  - "Submit Different Photo" button
    - Restarts check-in flow
    - Current evidence saved as fallback
  - "Contact Referee" link
    - Opens message: "Hey, can you review my check-in?"
    - Sends nudge notification to referee

- **Primary Action**: "Done" (returns to dashboard with "Pending Review" badge)

**Notification Sent**:
- Push notification to referee(s)
- Email backup after 1 hour

### State 2c: Verification Rejected (AI Denial)
**Rejection Screen**:

```
┌─────────────────────────────────────┐
│         ❌ (Red icon)                │
│                                     │
│       Not Verified                  │
│  This doesn't match your goal       │
│                                     │
│   [Photo Thumbnail]                 │
│                                     │
│  Why this didn't pass:              │
│  "No gym equipment visible"         │
│  AI Confidence: 89%                 │
│                                     │
│  Time remaining: 6 hours            │
│                                     │
│  [Submit Different Evidence]        │
│  [Request Manual Review]            │
│  [I Missed This Check-in]           │
│                                     │
│         [Learn More]                │
└─────────────────────────────────────┘
```

**Elements**:
- Red X icon (clear rejection)
- "Not Verified" heading
- Non-judgmental explanation
- Photo thumbnail (for context)

- **AI Reasoning** (always shown):
  - "Why this didn't pass:"
  - Specific reason from AI
  - Confidence score: 70-100%
  - Helpful, not accusatory

- **Urgency Indicator**:
  - Time remaining until deadline
  - Color-coded: Green (>12h), Amber (6-12h), Red (<6h)
  - "You still have time to submit better evidence!"

- **Action Options**:
  - "Submit Different Evidence" (primary button, green)
    - Restarts check-in flow
    - Tips shown based on rejection reason
  - "Request Manual Review" (secondary button)
    - Sends to referee or support
    - Text field: "Why I think this should count"
    - For edge cases or disputes
  - "I Missed This Check-in" (tertiary, text link)
    - Accept the missed check-in
    - Confirmation modal before proceeding

- **Help Link**: "Learn More" or "Tips for Better Evidence"
  - Opens help article with photo examples
  - Goal-specific tips

**Supportive Tone**: Not blaming user, just explaining issue and providing clear next steps

---

## Edge Cases & Error States

### Network Error During Upload
**Error Screen**:
- "Upload Failed"
- "Check your internet connection"
- "Don't worry, your photo is saved"
- Buttons:
  - "Retry Upload" (primary)
  - "Save for Later" (secondary)
    - Queues for background upload when online

### Camera Permission Denied
**Permission Request Screen**:
- Icon: Camera with X
- "Camera Access Needed"
- "To submit photo evidence, allow camera access in Settings"
- Buttons:
  - "Open Settings" (deep link to app settings)
  - "Upload from Library Instead" (alternative path)

### Photo Too Large or Corrupt
**Error Message**:
- "Photo couldn't be processed"
- "Try a different photo or take a new one"
- "Retry" button

### AI Verification Timeout
**Fallback**:
- "Verification taking longer than expected"
- Automatically send to referee review
- "Continuing in background..."
- Notification when verification completes

### Already Checked In Today
**Blocked Screen**:
- "Already Checked In! ✅"
- Show previous check-in:
  - Photo and timestamp
  - Verification status
- "Come back tomorrow for your next check-in"
- "View Progress" button

### Check-In After Deadline (Late)
**Warning Banner** (top of screen):
- Amber background
- "This check-in was due yesterday"
- "It will be marked as late"
- Can still submit, but flagged as late
- 3 late check-ins = 1 missed check-in

---

## Visual Design

### Layout
- **Mobile-First**: Single column, vertical scroll
- **Safe Areas**: Respect notch and home indicator on iPhone
- **Thumb-Friendly**: Primary action at bottom (easy to reach)

### Colors
- **Primary Action**: Green (#22C55E) for submit button
- **Evidence Buttons**: Brand teal (#2DD4BF)
- **Success**: Green with checkmark
- **Warning**: Amber (#F59E0B) with caution icon
- **Error**: Red (#EF4444) with X icon
- **Background**: White or light gray (#F9FAFB)

### Typography
- **Headings**: Inter Bold, 24px
- **Body**: Inter Regular, 16px
- **Hints**: Inter Regular, 14px (gray)
- **Button Text**: Inter Semibold, 16px

### Spacing
- Screen padding: 16px horizontal
- Section spacing: 24px vertical
- Button spacing: 12px between stacked buttons

### Animation
- Checkmark: Scale in + fade (300ms)
- Confetti: Particle animation for milestones
- Progress bar: Smooth fill animation
- Photo upload: Fade in thumbnail after upload

---

## Accessibility

### Screen Reader
- "Check-in screen for [Goal Name]"
- Announce photo capture: "Photo captured, review it or retake"
- Announce verification result with reasoning

### Touch Targets
- All buttons minimum 44x44px
- Large camera capture button (80x80px)
- Adequate spacing between action buttons

### Visual Accessibility
- High contrast text
- Icons + text labels (not icon-only)
- Color-blind friendly: Use icons to convey status, not just color

---

## Performance

### Optimization
- Pre-load camera on screen enter (reduce wait time)
- Compress photos before upload (max 2MB, 1920px width)
- Show instant feedback while uploading in background
- Cache verification results (don't re-verify same photo)

### Loading Times
- Camera open: < 500ms
- Photo upload: 2-5 seconds (show progress)
- AI verification: 5-15 seconds (show spinner)
- Total time: Target < 30 seconds from open to verified

---

## Analytics Events

Track check-in interactions:
- `checkin_screen_opened` (goal_id, trigger_source)
- `evidence_type_selected` (photo/upload/manual)
- `camera_opened`
- `photo_captured`
- `photo_uploaded` (file_size, upload_time)
- `note_added` (note_length)
- `evidence_submitted` (evidence_type, has_note)
- `ai_verification_result` (verdict, confidence, processing_time)
- `checkin_success_viewed` (celebration_shown)
- `checkin_rejected_viewed` (rejection_reason)
- `different_evidence_submitted` (retry_count)
- `manual_review_requested`
- `missed_checkin_acknowledged`
- `checkin_error` (error_type)

---

## Future Enhancements (Post-MVP)

### Advanced Features
- Video evidence (short 10-second clips)
- Voice note evidence (for journaling goals)
- Multiple photos (before/after comparison)
- Geolocation verification (e.g., "At gym location")
- Wearable data sync (Apple Health, Fitbit for activity goals)

### AI Improvements
- Learn from referee corrections
- Fine-tuned models for specific goal types
- Confidence score improvements over time
- Batch verification (multiple check-ins at once)

### UX Enhancements
- AR guides for photo composition
- Photo filters/editing within app
- Evidence templates (pose guides)
- Quick check-in widget (iOS Home Screen)
- Smart reminders based on behavior patterns

---

## Design Notes for Designer

**Most Important**:
1. Make evidence submission as fast as possible
2. Clear visual hierarchy: Evidence > Submit > Secondary actions
3. Celebratory success state (confetti, animation, positive feedback)
4. Transparent AI reasoning (build trust)

**Tone**:
- Encouraging and supportive
- Never judgmental or negative
- Clear guidance, not confusing
- Fast and responsive (no lag feels)

**Mobile Optimization**:
- Large touch targets for camera and submit
- Bottom-pinned submit button (thumb reach)
- Minimal scrolling required
- Works one-handed when possible
