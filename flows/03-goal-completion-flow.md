# Goal Completion Flow

## Goal
Celebrate user success or provide supportive guidance on failure, handle fund distribution, and encourage continued engagement.

## Entry Points
- Final check-in approved → Automatic goal completion
- Goal end date reached → System evaluates completion
- Manual completion (if all check-ins done early)
- Background job checks goal statuses daily

## Flow Types

### Success Path: Goal Achieved
### Failure Path: Goal Not Achieved
### Partial Success: Close But Not Quite

---

## Success Path: Goal Achieved

### Trigger Conditions
- All required check-ins completed and approved
- Success rate >= goal threshold (usually 100% for MVP)
- Goal end date reached or last check-in submitted

### Step 1: Success Detection (System)
**Technical Process**:
1. Background job or edge function checks active goals
2. Identifies goals meeting success criteria
3. Marks goal status as "completed_success"
4. Queues success notification
5. Initiates refund process

**Timing**: Within 1 hour of final check-in or goal end date

### Step 2: Success Notification (Immediate)
**Push Notification**:
- "🎉 Congratulations! You achieved your goal!"
- "Goal: [Goal Name]"
- "Tap to celebrate and get your refund"

**Email Notification** (backup):
- Subject: "You did it! [Goal Name] completed"
- Body: Success summary, refund info, encourage next goal

**User Action**: Tap notification
**Next Screen**: Success Celebration Screen

### Step 3: Success Celebration Screen (15 seconds)
**Screen**: Goal Achieved
- **Elements**:
  - **Celebration Animation**:
    - Confetti explosion
    - Trophy or badge animation
    - Success sound effect (optional, respects mute settings)

  - **Heading**: "You Did It! 🎉"
  - **Goal Summary**:
    - Goal name
    - Duration: "30 days"
    - Check-ins: "30 of 30 completed"
    - Success rate: "100%"
    - Streak: "Best streak: 30 days 🔥"

  - **Achievement Badge** (if earned):
    - "First Goal Completed" badge
    - Or milestone badges: "10 Goals", "30 Day Streak", etc.
    - Animated unlock sequence

  - **Refund Information**:
    - "Your commitment refunded!" heading
    - Amount: "$15.00"
    - Processing time: "Refund processed in 3-5 business days"
    - Payment method: "Back to •••• 1234"
    - Small text: "Platform fee ($0.45) covers our costs"

  - **Impact Message**:
    - "Your success means more than just personal achievement"
    - "You challenged yourself and proved you can do it!"

  - **Social Sharing**:
    - "Share Your Success" button
    - Options: Social media, message to referees, community post
    - Pre-filled message: "I achieved my goal with @MicroCommit! 🎉 [Goal name] for 30 days!"

  - **Next Actions**:
    - "Create Another Goal" button (primary CTA)
    - "View My History" link
    - "Done" button

  - **Referee Thank You** (if referees exist):
    - "Thanks to [Referee Names] for keeping you accountable!"
    - "Send Thank You Message" button

- **Haptic Feedback**: Strong success vibration pattern

**User Actions**:
- Share success → Social sharing sheet
- Create another goal → Goal template selection
- View history → Profile/history screen
- Auto-dismiss after 30 seconds if no action

**Next Screen**: Dashboard (with updated stats) or Goal Creation

### Step 4: Refund Processing (System)
**Technical Process**:
1. Stripe API: Release funds from escrow
2. Deduct platform fee (3% of commitment)
3. Process refund to original payment method
4. Record transaction in `payments` table
5. Send refund confirmation email

**Timing**: Immediate initiation, 3-5 days to user's account

**Confirmation Email**:
- Subject: "Refund Processed - [Goal Name]"
- Amount refunded: $X
- Transaction ID
- Expected arrival date
- Summary of goal achievement

---

## Failure Path: Goal Not Achieved

### Trigger Conditions
- Missed check-ins exceed failure threshold (e.g., >3 missed for 30-day goal)
- Success rate < goal threshold at end date
- User manually abandons goal (with confirmation)

### Step 1: Failure Detection (System)
**Technical Process**:
1. Background job identifies failed goals
2. Marks goal status as "completed_failed"
3. Queues donation notification
4. Initiates charity distribution process
5. Generates donation receipt

**Timing**: Within 1 hour of goal end date or failure threshold

### Step 2: Failure Notification (Supportive)
**Push Notification**:
- "Your [Goal Name] period ended"
- "Don't be discouraged - your commitment helps charity! ❤️"
- "Tap to see your impact"

**Email Notification**:
- Subject: "Your commitment supports [Charity Name]"
- Body: Supportive message, donation details, encourage trying again

**User Action**: Tap notification
**Next Screen**: Charitable Impact Screen

### Step 3: Charitable Impact Screen (15 seconds)
**Screen**: Thank You for Your Commitment
- **Elements**:
  - **Header**: "You Made an Impact" (not "You Failed")
  - Warm, supportive visual (heart, charity logo)

  - **Goal Summary**:
    - Goal name
    - Check-ins completed: "22 of 30" (not emphasizing failure)
    - Success rate: "73%"
    - "That's still progress!" encouragement

  - **Donation Information**:
    - "Your Commitment Donated" heading
    - Charity logo and name
    - Amount: "$15.00 donated to [Charity Name]"
    - Impact example: "This could provide 3 meals to families in need"
    - Link to charity website: "Learn more about [Charity]"

  - **Tax Receipt**:
    - "Tax-deductible donation receipt emailed"
    - "View Receipt" button (opens PDF)
    - Transaction ID for records

  - **Supportive Message**:
    - "Progress is not always linear"
    - "You completed 73% of your goal - that's something to be proud of!"
    - "Many successful people needed multiple attempts"
    - "Ready to try again?"

  - **Insights** (what went wrong):
    - "You struggled most with [day/time]"
    - "Consider: Set reminders earlier" or "Start with a smaller goal"
    - "Talk to your referee about what happened"

  - **Next Actions**:
    - "Try This Goal Again" button (primary - pre-fills same goal)
    - "Create New Goal" button
    - "View My History" link
    - "I Need a Break" link (optional pause)

- **NO Negative Visuals**: No red X, no "failure" language, no shaming

**User Actions**:
- Try again → Pre-fills similar goal with same charity
- New goal → Goal template selection
- View history → Profile screen
- Take a break → Survey about why, then dashboard

**Next Screen**: Goal Creation or Dashboard

### Step 4: Charity Distribution (System)
**Technical Process**:
1. Stripe API: Transfer funds from escrow to charity
2. Deduct payment processing fees
3. Transfer remaining amount to charity's Stripe account
4. Record donation in `donations` table
5. Generate tax receipt (PDF)
6. Notify charity of donation
7. Send receipt to user

**Timing**: Funds distributed within 7 days per compliance requirements

**Receipt Email**:
- Subject: "Donation Receipt - [Charity Name]"
- 501(c)(3) tax-deductible receipt
- Donation amount and date
- Charity EIN and details
- Thank you message from charity

---

## Partial Success Path: Close But Not Quite

### Trigger Conditions
- Success rate between 70-99% (configurable)
- Most check-ins completed but not all
- Goal period ended

### Step: Partial Success Screen (Hybrid)
**Screen**: Almost There!
- **Elements**:
  - Visual: Half trophy or progress bar at 85%
  - "So Close!" heading
  - Accomplishment recognition:
    - "You completed 27 of 30 check-ins!"
    - "That's 90% - amazing effort!"

  - **Two-Part Outcome**:
    - Left side: "Your Progress" (celebrate what was done)
    - Right side: "Your Impact" (donation details)

  - **Donation** (smaller amount or split):
    - For 70-99%: Full donation still goes to charity (per rules)
    - Show: "$15 donated to [Charity]"
    - Tax receipt still issued

  - **Special Badge**:
    - "Close Call" or "Strong Effort" achievement
    - Recognizes high completion rate

  - **Insights**:
    - "You were so close! What happened in the last week?"
    - Suggestions for next attempt
    - "Try the same goal with adjusted schedule?"

  - **Next Actions**:
    - "Try Again with Adjustments" (primary)
    - "Create Different Goal"
    - "View My History"

**Tone**: Encouraging, not discouraging. Celebrate the progress made.

---

## Edge Cases

### Goal Completed Early (Before End Date)
**Scenario**: User completes all check-ins with days remaining

**Flow**:
1. Show "Early Completion!" notification
2. Option 1: "End Goal Now" → Trigger success flow immediately
3. Option 2: "Keep Going" → Goal remains active, extra check-ins are bonus
4. If "Keep Going": New badge "Overachiever" if bonus check-ins maintained

### User Disputes Outcome
**Scenario**: User believes they succeeded but system marked failed

**Flow**:
1. "Dispute Outcome" link on failure screen
2. Dispute form:
   - "Why do you think this should be marked successful?"
   - Upload additional evidence
   - Submit for manual review
3. Support team reviews within 48 hours
4. If overturned: Refund processed, goal updated
5. If upheld: Explain reasoning, donation stands

### Referee Challenges Completion
**Scenario**: Referee notices user cheated or gamed the system

**Flow**:
1. Referee can "Flag Goal for Review" from referee dashboard
2. Support reviews evidence and check-ins
3. If fraud confirmed:
   - Mark goal as failed regardless of check-ins
   - Warning to user about terms violation
   - Repeat violations: Account suspension
4. If legitimate:
   - Success stands, thank referee for diligence

### Payment Processing Fails
**Scenario**: Refund or donation processing encounters error

**Refund Failure**:
- Retry automatically (3 attempts over 3 days)
- If still failing: Email user to update payment method
- Manual processing by support team
- Funds never lost (held in escrow until resolved)

**Donation Failure**:
- Retry with charity's backup account
- If charity account issue: Hold funds, contact charity
- Worst case: Offer user choice of different charity or refund

### Goal Abandoned Mid-Way
**Scenario**: User hasn't checked in for 7+ days, goal still active

**Warning Flow**:
1. Day 3 missed: Reminder notification
2. Day 5 missed: Supportive message + referee notification
3. Day 7 missed: "Are you still doing this goal?" prompt
   - "Yes, I'm back!" → Resume normally
   - "No, cancel this goal" → Trigger failure flow
   - No response: Auto-cancel after 14 days, trigger failure

### Charity No Longer Accepts Donations
**Scenario**: Charity has closed or is under investigation

**Flow**:
1. System detects charity status change
2. For active goals: Notify user to select new charity
3. For completed goals: If donation not yet sent:
   - Offer user choice of alternative charity
   - Same impact category preferred
4. If donation already sent: No action needed

---

## Success Metrics

### Goal Completion
- **Success Rate**: Track % of goals that succeed (target 50%+)
- **Attempt Rate**: % of users who try again after failure (target 40%+)
- **Donation Volume**: Total donated per month

### User Engagement
- **Time on Success Screen**: Avg 15-20 seconds (ensure users see celebration)
- **Social Sharing Rate**: 20%+ share successes
- **Next Goal Creation**: 40%+ create another goal within 7 days

### Financial
- **Refund Success Rate**: 99%+ refunds processed without issues
- **Donation Distribution**: 100% of donations sent within 7 days
- **Payment Disputes**: <1% of transactions

### Sentiment
- **User Satisfaction**: 4.5+ stars for goal completion experience
- **Failure Messaging**: Survey "Did you feel supported?" 80%+ yes

---

## Analytics Events
Track all completion events:
- `goal_completed` (goal_id, success/failure, success_rate, total_checkins)
- `goal_success_notification_sent`
- `goal_success_screen_viewed` (time_spent)
- `achievement_unlocked` (badge_type)
- `refund_initiated` (amount, payment_method)
- `refund_completed` (processing_time)
- `goal_failure_notification_sent`
- `charitable_impact_screen_viewed`
- `donation_initiated` (charity_id, amount)
- `donation_completed` (processing_time)
- `tax_receipt_generated`
- `next_goal_created_after_completion` (time_between_goals)
- `goal_shared` (platform: twitter, instagram, etc)
- `goal_abandoned` (abandonment_reason)
- `goal_disputed` (dispute_outcome)

---

## Future Enhancements (Post-MVP)
- Partial refunds for high completion rates (90%+)
- Rollover partial funds to next goal
- Charity match campaigns (partner charity doubles impact)
- Milestone celebrations (every 5 goals, etc.)
- Annual impact reports (total donated per user)
- Community leaderboards for most impactful
- Goal streaks across multiple goals
- Personalized goal recommendations based on past success
- Auto-goal creation: "Want to try this again next month?"
