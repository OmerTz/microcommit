# Referee Experience Flow

## Goal
Enable friends/family to effectively support users' goals through evidence verification, encouragement, and accountability with minimal friction.

## What is a Referee?

A referee is a trusted person invited by a goal creator to:
- Verify evidence when AI is uncertain
- Provide accountability and encouragement
- Receive updates on friend's progress
- Challenge suspicious submissions

## Entry Points
- Email invitation → Sign up & verify evidence
- Push notification → Review pending evidence
- App dashboard (if user is also creating goals) → Referee tab
- Direct link from goal creator

---

## Flow 1: Referee Invitation

### Step 1: Goal Creator Invites Referee
**From**: Goal creation flow, Step 7 (Add Accountability)

**Invitation Sent**:
- Email to referee
- SMS backup if phone provided
- In-app notification if already a user

### Step 2: Referee Receives Invitation
**Email Content**:
- Subject: "[Friend Name] wants you to be their accountability referee"
- Body:
  - "[Friend] is committing to [Goal Name]"
  - "They've pledged $[Amount] to charity if they don't succeed"
  - "Will you help keep them accountable?"
  - "What you'll do:"
    - Get progress updates
    - Verify evidence when needed (takes < 1 minute)
    - Send encouragement
  - CTA button: "I'll Be Their Referee"
  - Decline link: "Not right now"

**User Action**: Tap "I'll Be Their Referee"
**Next Screen**: Accept Referee Role

### Step 3: Accept Referee Role
**Screen**: Become a Referee

**If Referee is Not a User**:
- "Welcome! [Friend] wants your support"
- Brief explanation of platform
- Quick sign-up:
  - Name (text input)
  - Email (pre-filled if invited via email)
  - Password or "Continue with Google/Apple"
- "Agree to be [Friend]'s referee" checkbox
- "Accept & Create Account" button

**If Referee is Already a User**:
- "New Referee Request"
- "[Friend] wants you to be their referee for [Goal]"
- Goal summary card
- "Accept" button
- "Decline" button

**User Action**: Accept
**Next Screen**: Referee Dashboard / Goal Overview

### Step 4: Confirmation
**Screen**: You're Now a Referee!
- Success message: "You're officially [Friend]'s referee!"
- Goal summary:
  - Goal name and description
  - Duration and frequency
  - Current status: "Starting [Date]"
- What to expect:
  - "We'll notify you when [Friend] needs verification"
  - "You can send encouragement anytime"
  - "Goal starts [Date]"
- "View Referee Dashboard" button
- "Send Encouragement Now" button

**Notification to Goal Creator**:
- "[Referee] accepted! They're now keeping you accountable."

---

## Flow 2: Evidence Verification Request

### Step 1: User Submits Uncertain Evidence
**From**: Daily check-in flow → AI marks evidence as "uncertain"

**Trigger**:
- AI confidence score < 70%
- Manual check-in (always requires referee)
- User requests manual review

### Step 2: Referee Notification
**Push Notification**:
- "[Friend] needs your help!"
- "Verify their check-in for [Goal Name]"
- Tap to review

**Email Notification** (if push not delivered in 1 hour):
- Subject: "[Friend] submitted evidence for your review"
- Brief context, link to review

**User Action**: Tap notification
**Next Screen**: Evidence Review Screen

### Step 3: Evidence Review Screen
**Screen**: Review Evidence
- **Elements**:
  - **Header**:
    - "[Friend]'s Check-In"
    - Goal name
    - Date: "Check-in for [Date]"
    - Time submitted: "30 minutes ago"

  - **Goal Context**:
    - Success criteria reminder
    - "Goal: [Description]"
    - "Success means: [Criteria]"

  - **Submitted Evidence**:
    - Full-screen image viewer
    - Pinch to zoom
    - Multiple photos if submitted (swipe between)
    - Optional text note from user

  - **AI Analysis** (if available):
    - "AI's Take:" collapsible section
    - "Unsure because: [Reason]"
    - Confidence score: 45%
    - Specific concerns: "Could not clearly identify gym equipment"

  - **History Context** (helpful):
    - "Recent check-ins:" thumbnail gallery
    - Shows what previous successful evidence looked like
    - Pattern recognition: "This looks different from usual"

  - **Decision Buttons**:
    - "✅ Approve" (large, green button)
    - "❌ Reject" (medium, red button)
    - "💬 Need More Info" (small, gray button)

  - **Optional Message**:
    - Text field: "Add a comment (optional)"
    - Encourage or provide feedback
    - Character limit: 200

- **Quick Approval Tip**:
  - "First time reviewing? Just ask yourself: Does this match the goal criteria?"

**User Actions**:
1. Review evidence
2. Add optional comment
3. Tap Approve, Reject, or Need More Info

### Step 4a: Approve Evidence
**Action**: Tap "✅ Approve"

**Confirmation Modal**:
- "Approve this check-in?"
- Quick summary
- "This will count toward [Friend]'s goal success"
- "Confirm" button

**After Approval**:
- Success message: "Evidence Approved! ✅"
- "[Friend] has been notified"
- Updated streak count shown
- "Send Encouragement" button (optional)
- Auto-return to referee dashboard after 3 seconds

**Notification to Goal Creator**:
- Push: "[Referee] approved your check-in! ✅"
- Update check-in status to approved
- Update streak and progress

**Analytics**: `referee_approved_evidence`

### Step 4b: Reject Evidence
**Action**: Tap "❌ Reject"

**Confirmation Modal**:
- "Reject this check-in?"
- "This means [Friend] will need to submit different evidence"
- Required: "Why doesn't this meet the criteria?" (text field)
  - Placeholder: "e.g., Gym equipment not visible"
- "Confirm Rejection" button

**After Rejection**:
- Message: "Evidence Rejected"
- "[Friend] will be asked to submit new evidence"
- Optional: "Send supportive message?" toggle
  - Pre-filled: "Hey! Can you submit a clearer photo showing [criteria]? You've got this!"
- "Done" button

**Notification to Goal Creator**:
- Push: "[Referee] needs more evidence for your check-in"
- Shows referee's reasoning
- Option to submit different evidence or add context

**Analytics**: `referee_rejected_evidence`

### Step 4c: Need More Info
**Action**: Tap "💬 Need More Info"

**Screen**: Request Clarification
- "Ask [Friend] for More Context"
- Text field: "What do you need to know?"
  - Placeholder: "Can you explain what I'm seeing in this photo?"
  - Character limit: 200
- "Send Request" button

**After Sending**:
- "Request Sent!"
- "[Friend] will provide more details"
- "You'll be notified when they respond"
- Auto-return to dashboard

**Notification to Goal Creator**:
- "[Referee] has a question about your check-in"
- Shows referee's question
- Text field to respond
- Option to submit additional evidence

**Follow-Up**:
- Creator responds → Referee gets notification
- Referee returns to review screen with new context
- Make final decision (Approve or Reject)

**Analytics**: `referee_requested_info`

---

## Flow 3: Sending Encouragement

### Entry Point 1: Proactive Encouragement
**From**: Referee Dashboard → View goal → "Send Encouragement" button

### Entry Point 2: Milestone Triggers
**System Notification**:
- "[Friend] is on a 7-day streak! 🔥"
- "Send them encouragement?"
- Tap to open encouragement screen

### Encouragement Screen
**Screen**: Send Encouragement
- **Elements**:
  - Header: "Cheer on [Friend]!"
  - Context:
    - Current streak: "7 days 🔥"
    - Progress: "10 of 30 check-ins"
    - Recent check-ins: thumbnail gallery

  - **Quick Templates** (one-tap send):
    - "Keep it up! You're doing great! 🎉"
    - "Proud of you! 7 days in a row! 🔥"
    - "You've got this! Stay strong! 💪"
    - "Halfway there! Don't give up! ⭐"

  - **Custom Message**:
    - Text field: "Write your own..."
    - Character limit: 200
    - Emoji picker

  - "Send Message" button

**User Action**: Select template or write message, tap Send

**After Sending**:
- "Message Sent! 💌"
- "[Friend] will receive your encouragement"
- Auto-close after 2 seconds

**Notification to Goal Creator**:
- Push: "[Referee] sent you a message!"
- In-app: Message appears in goal detail screen
- Encouragement badge/icon shown on goal card

**Analytics**: `referee_sent_encouragement`

---

## Flow 4: Referee Dashboard

### Screen: Referee Dashboard
**Screen**: My Referee Duties
- **Elements**:
  - **Header**:
    - "People Counting on You" or "Your Referee Duties"
    - Stats widget:
      - "X people you're supporting"
      - "Y verifications this week"
      - "Z encouragements sent"

  - **Active Goals Section**:
    - Card per person/goal you're refereeing:
      - Friend's name and goal name
      - Progress: "12 of 30 check-ins" with progress bar
      - Current streak: "🔥 12 days"
      - Status badge:
        - "Needs Review" (red, priority)
        - "Waiting for Check-in" (gray)
        - "On Track" (green)
      - Last activity: "Checked in 2 hours ago"
      - Quick actions:
        - "Review Evidence" (if pending)
        - "Send Encouragement"
        - "View Progress"

  - **Pending Reviews** (priority section if any):
    - Highlighted cards for evidence waiting for review
    - Timer: "Waiting 4 hours"
    - "Review Now" button

  - **Completed Goals**:
    - Archive of goals you helped with
    - Success/failure indicator
    - "View Details" link

  - **Settings**:
    - Notification preferences
    - Decline future referee requests
    - Help: "What makes a good referee?"

**User Actions**:
- Tap goal card → Goal detail (referee view)
- Tap "Review Evidence" → Evidence review screen
- Tap "Send Encouragement" → Encouragement screen

---

## Flow 5: Goal Progress Monitoring (Referee View)

### Screen: Goal Detail (Referee Perspective)
**Screen**: [Friend]'s Goal Progress
- **Elements**:
  - **Goal Header**:
    - Friend's name and avatar
    - Goal name
    - Duration: "Day 15 of 30"
    - Success rate: "93% (14 of 15 check-ins)"

  - **Streak Timeline**:
    - Calendar view
    - Green dots: Successful check-ins
    - Yellow dots: Pending review (your action needed)
    - Red dots: Missed check-ins
    - Gray: Future check-ins

  - **Recent Evidence Gallery**:
    - Thumbnails of recent submissions
    - Tap to view full-size
    - Your verification status shown (checkmark or pending)

  - **Progress Stats**:
    - Completion rate graph
    - Best streak: "14 days"
    - Missed check-ins: "1"
    - Referee reviews: "3 of 3 approved by you"

  - **Your Impact**:
    - "You've helped [Friend] stay on track"
    - Times you approved evidence: 3
    - Encouragements sent: 5
    - "Thank you for being supportive!"

  - **Actions**:
    - "Send Encouragement" button
    - "View All Evidence" link
    - "Report Concern" link (if suspecting fraud)

**User Action**: Monitor progress, send encouragement as needed

---

## Edge Cases

### Referee Doesn't Respond to Review Request
**Trigger**: Evidence pending review for 24+ hours

**Actions**:
1. Send reminder notification: "Don't forget to review [Friend]'s check-in!"
2. After 48 hours: Auto-approve with note "Auto-approved (referee unavailable)"
3. Inform goal creator: "Auto-approved after 48 hours"
4. Track referee response rate, suggest different referee if consistently unresponsive

### Referee Rejects Everything (Too Strict)
**Detection**: Referee rejects >80% of submissions

**Actions**:
1. Show tip: "Remember: Support your friend's progress. Be fair but encouraging."
2. Allow goal creator to see rejection rate
3. Option: Remove referee or add second referee for tie-break

### Referee Approves Everything (Too Lenient)
**Detection**: Referee approves obvious mismatches

**Actions**:
1. Random spot-checks by AI or support team
2. If fraud detected: Warning to referee and user
3. Educational tip: "Good referees help by being honest"

### Referee Wants to Quit Mid-Goal
**Flow**:
1. "Stop Being Referee" option in settings
2. Confirmation: "Are you sure? [Friend] is counting on you"
3. If confirmed:
   - Notify goal creator: "[Referee] is no longer available"
   - Option: Add new referee
   - Fallback: AI-only verification for remainder of goal

### Multiple Referees Disagree
**Scenario**: 2+ referees, conflicting verdicts

**Resolution**:
- Majority rules (2 of 3 approve = approved)
- Tie-breaker: AI confidence score
- Ultimate fallback: Support team review

---

## Success Metrics

### Referee Engagement
- **Acceptance Rate**: 70%+ of invitations accepted
- **Response Time**: 90%+ of reviews completed within 24 hours
- **Approval Rate**: 60-80% (balanced, not too strict or lenient)
- **Encouragement Rate**: 30%+ send at least 1 encouragement per goal

### Referee Experience
- **Satisfaction**: 4+ stars for referee experience
- **Time per Review**: Avg < 2 minutes
- **Repeat Refereeing**: 50%+ agree to referee again

### Impact on Goals
- **Success Rate with Referee**: 60%+ (vs. 45% without)
- **User Feedback**: "My referee helped me succeed" 80%+ agree

---

## Analytics Events
Track referee actions:
- `referee_invited` (inviter_id, goal_id)
- `referee_accepted` (referee_id, goal_id, acceptance_time)
- `referee_declined` (referee_id, decline_reason)
- `evidence_review_started` (referee_id, evidence_id)
- `referee_approved_evidence` (time_to_approve)
- `referee_rejected_evidence` (rejection_reason)
- `referee_requested_info`
- `referee_sent_encouragement` (message_type: template/custom)
- `referee_viewed_progress` (goal_id)
- `referee_quit` (quit_reason)
- `referee_unresponsive_auto_approve`

---

## Future Enhancements (Post-MVP)
- Referee leaderboard (most supportive)
- Achievement badges for referees ("Supportive Friend", "10 Goals Helped")
- Referee-creator chat for ongoing conversation
- Video evidence review
- Batch review: Approve multiple check-ins at once
- AI learning from referee decisions (improve model)
- Referee credits: Earn free premium features by being supportive
- Public referee profiles (build reputation)
- Professional referee option (hire someone for accountability)
