# Dispute & Appeal Flow

## Goal
Provide fair resolution process for disputed check-ins, rejected evidence, or goal failures, maintaining platform integrity while giving users recourse (90%+ of disputes resolved within 48 hours).

## Entry Points
- Check-in rejected by AI → "Dispute this decision" button
- Check-in rejected by referee → "Appeal decision" button
- Goal failed → "I believe I succeeded" → Dispute option
- Notification: "Check-in rejected" → "Dispute" action
- Goal detail → "Disputed check-ins" section → Review status

## Flow Steps

### Step 1: Dispute Entry Point
**Scenario**: Check-in was rejected (by AI or referee)

**Screen**: Check-In Rejected
- **Elements**:
  - Red X icon
  - "Check-in rejected" heading
  - Rejection reason displayed:
    - AI: "No gym equipment visible in photo"
    - Referee: "Evidence doesn't meet goal criteria"
  - Submitted evidence shown (photo or details)

  - **Actions**:
    - "Submit Different Evidence" button (re-submit)
    - "Dispute This Decision" button (starts dispute)
    - "Accept Decision" button (mark as missed)

**User Action**: Tap "Dispute This Decision"
**Next Screen**: Dispute Type Selection (Step 2)

### Step 2: Select Dispute Type
**Screen**: Dispute This Decision
- **Elements**:
  - "Dispute check-in rejection" heading
  - "Help us understand your concern"

  **Dispute Type** (radio buttons):

  - 📷 **Evidence Misunderstood**
    - "The AI/referee misinterpreted my evidence"
    - Example: "Evidence was valid but not recognized"

  - ✅ **I Met the Criteria**
    - "I completed the goal as defined"
    - Example: "My success criteria was met"

  - ⚖️ **Criteria Were Unclear**
    - "The goal criteria were ambiguous"
    - Example: "Requirements weren't specific enough"

  - 🛠️ **Technical Issue**
    - "There was a technical problem"
    - Example: "Photo didn't upload correctly"

  - 🤖 **AI Error**
    - "The AI made a mistake"
    - Example: "AI failed to recognize valid evidence"

  - 👤 **Referee Bias**
    - "The referee was unfair or biased"
    - Example: "Referee has personal conflict"

  - 📋 **Other**
    - Text field appears for custom explanation

  **Actions**:
    - "Continue" button (enabled when type selected)
    - "Cancel" link

**User Action**: Select dispute type, continue
**Next Screen**: Provide Dispute Details (Step 3)

### Step 3: Provide Dispute Details
**Screen**: Explain Your Dispute
- **Elements**:
  - "Explain your dispute" heading
  - Dispute type shown: "[Selected Type]"

  **Original Evidence Review**:
  - "What was submitted" section
  - Thumbnail of original photo (tap to enlarge)
  - Or text description if manual check-in
  - Submission timestamp
  - Rejection reason (from AI/referee)

  **Your Explanation**:
  - Text area: "Why do you believe this check-in should be approved?"
  - Placeholder: "Explain in detail why you believe your evidence is valid..."
  - Character limit: 500 characters
  - Character counter shown
  - Required field

  **Additional Evidence** (optional):
  - "Add supporting evidence" section
  - Upload additional photo(s)
    - "Add Photo" button
    - Max 3 additional photos
    - Each photo can be captioned
  - Or: Attach screenshot/document
  - Or: Add context (date/time/location details)

  **Reference Success Criteria**:
  - Reminder section: "Your goal criteria"
  - Shows goal success criteria
  - Checkbox: "I believe I met these criteria"

  **Actions**:
  - "Submit Dispute" button (primary)
  - "Cancel" button (secondary)
  - "Save Draft" link (save and continue later)

**Validation**:
- Explanation required (min 20 characters)
- At least one form of evidence (original + explanation minimum)

**User Action**: Provide explanation, submit dispute
**Next Screen**: Dispute Submitted (Step 4)

### Step 4: Dispute Submitted Confirmation
**Screen**: Dispute Submitted
- **Elements**:
  - Clock icon (⏳)
  - "Dispute submitted" heading
  - "We're reviewing your dispute"

  **What Happens Next**:
  - Timeline visualization:
    1. ✓ Dispute submitted (now)
    2. ⏳ Review in progress (24-48 hours)
    3. ⏱️ Decision made (notify you)

  **Who Reviews**:
  - Depends on dispute type:
    - AI Errors: Technical review team
    - Referee Bias: Different referee + support
    - Evidence Misunderstood: Senior referee panel
    - Technical Issues: Support team
    - Other: Appropriate reviewer assigned

  **Dispute Details**:
  - Dispute ID: #12345
  - Submitted: [timestamp]
  - Status: Under Review
  - Expected resolution: Within 48 hours

  **While You Wait**:
  - "Your goal remains active"
  - "This check-in is marked as 'disputed'"
  - "You can continue other check-ins"
  - "We'll notify you of the decision"

  **Actions**:
    - "View Dispute Status" button (go to dispute detail)
    - "Done" button (return to dashboard)
    - "Contact Support" link (if urgent)

**Technical Process**:
1. Create dispute record in database
2. Assign dispute ID
3. Update check-in status: "disputed"
4. Assign to appropriate reviewer queue
5. Send notification to review team
6. Log dispute event
7. Schedule auto-escalation (if not resolved in 72 hours)

**User Action**: Tap "Done"
**Next Screen**: Dashboard (with dispute indicator on goal)

### Step 5: Dispute Review (Internal Process)
**Reviewer Flow** (internal, shown for transparency):

**Reviewer Dashboard**:
- Queue of pending disputes
- Sorted by priority: Urgent → Normal → Low
- Dispute card shows:
  - Dispute ID
  - User name (anonymized if bias concern)
  - Dispute type
  - Time submitted
  - Goal context

**Reviewer Review Screen**:
- Original evidence (photo/details)
- AI rejection reason (if applicable)
- Referee rejection reason (if applicable)
- User's dispute explanation
- Additional evidence provided
- Goal success criteria
- User's check-in history (success rate)

**Reviewer Actions**:
- **Approve Check-In**: User was right, evidence valid
- **Uphold Rejection**: Original decision correct
- **Request More Info**: Need additional evidence
- **Escalate**: Complex case, needs senior review

**Decision Rationale**:
- Reviewer must provide explanation (required)
- Reference specific evidence
- Cite policy or criteria

**Review Time Limits**:
- Standard disputes: 48 hours
- Urgent disputes (goal ending soon): 12 hours
- Escalated disputes: 72 hours
- Auto-escalate if not reviewed in time

### Step 6: Dispute Decision - Approved
**Screen**: Dispute Resolved - Check-In Approved ✅
- **Elements**:
  - Green checkmark animation
  - "Dispute approved!" heading
  - "Your check-in has been approved"

  **Decision Summary**:
  - Original rejection overturned
  - Check-in now marked as successful
  - Streak updated (if applicable)
  - Progress updated

  **Reviewer Explanation**:
  - "Why this was approved:"
  - Reviewer's reasoning (e.g., "Evidence clearly shows gym equipment. AI misidentified the background.")
  - Policy or criteria cited

  **Impact on Goal**:
  - ✓ Check-in count: +1
  - ✓ Streak restored (if broken)
  - ✓ Progress recalculated
  - ✓ Success rate updated

  **Apology** (if applicable):
  - "We're sorry for the initial rejection"
  - "We're improving our AI to prevent this"
  - Or: "We're addressing referee training"

  **Actions**:
    - "View Updated Progress" button
    - "Done" button
    - Feedback: "Was this resolution fair?" (👍/👎)

**Technical Process**:
1. Update check-in status: "approved_via_dispute"
2. Update goal progress
3. Recalculate streak
4. Send notification
5. Log resolution
6. If AI error: Flag for AI training dataset
7. If referee error: Flag for referee review

**User Action**: View progress or close
**Next Screen**: Goal Detail (updated progress)

### Step 7: Dispute Decision - Upheld (Rejected)
**Screen**: Dispute Resolved - Decision Upheld ❌
- **Elements**:
  - Amber warning icon
  - "Dispute reviewed" heading
  - "Original decision upheld"

  **Decision Summary**:
  - Rejection remains
  - Check-in still marked as failed
  - Dispute closed

  **Reviewer Explanation**:
  - "Why the rejection stands:"
  - Detailed reasoning (e.g., "Evidence does not show [specific criteria]. Success criteria requires [X], but photo shows [Y].")
  - Policy or criteria cited
  - Specific examples of what was missing

  **What This Means**:
  - ❌ Check-in remains missed
  - ❌ Streak not restored
  - ❌ Progress unchanged

  **Next Steps**:
  - "What you can do:"
  - ✓ Submit new evidence for this check-in (if still within deadline)
  - ✓ Accept and move forward
  - ✓ Appeal to senior review (if you still disagree)

  **Actions**:
    - "Submit New Evidence" button
    - "Accept Decision" button
    - "Appeal Decision" button (escalate)
    - Feedback: "Was this resolution fair?" (👍/👎)

**User Action**: Choose next action
**Next Screen**: Depends on action

### Step 8: Request for Additional Information
**Scenario**: Reviewer needs more context

**Notification**: "Action needed on your dispute"

**Screen**: Provide More Information
- **Elements**:
  - Info icon
  - "More information needed" heading
  - "The reviewer needs additional details"

  **Reviewer's Request**:
  - Specific question displayed
  - Example: "Can you provide a closer photo of the gym equipment?"
  - Or: "What time was this photo taken? The submission says 8 PM but photo appears to be daytime."

  **Provide Response**:
  - Text area for explanation
  - Upload additional photo(s)
  - Add context (date/time/location)

  **Deadline**:
  - "Respond within 24 hours"
  - Countdown timer shown
  - "If no response, dispute will be closed"

  **Actions**:
    - "Submit Response" button
    - "Cancel Dispute" button
    - "Contact Support" link

**User Action**: Provide information, submit
**Next Screen**: Waiting for review (back to Step 4 status)

### Step 9: Appeal to Senior Review
**Entry Point**: Dispute rejected → "Appeal Decision"

**Screen**: Appeal This Decision
- **Elements**:
  - "Appeal to senior review" heading
  - "Escalate your dispute to a senior reviewer"

  **Warning**:
  - "Appeals are for significant disagreements only"
  - "Frivolous appeals may result in reduced appeal privileges"

  **Why You're Appealing**:
  - Text area: "Explain why you believe the decision was wrong"
  - Min 50 characters
  - "Be specific and cite your goal criteria"

  **Appeals Remaining**:
  - "You have X appeals remaining this month"
  - Limit: 3 appeals per month per user
  - "Appeals reset on [date]"

  **Actions**:
    - "Submit Appeal" button
    - "Accept Decision Instead" button
    - "Cancel" link

**User Action**: Explain and submit appeal
**Technical Process**:
1. Create appeal record
2. Assign to senior reviewer queue
3. Flag as high priority
4. Notify senior review team
5. Log appeal event
6. Decrement user's appeal count

**Next Screen**: Appeal Submitted (similar to Step 4)

### Step 10: Appeal Decision (Final)
**Screen**: Appeal Decision - Final

**If Approved**:
- Same as Step 6 (Check-in approved)
- Additional: "Senior review approved your appeal"
- "This decision is final"

**If Still Rejected**:
- "Appeal reviewed - Decision stands"
- Senior reviewer's detailed explanation
- "This is the final decision"
- "No further appeals available for this check-in"
- **Actions**:
  - "Accept Decision" button (only option)
  - Contact support (for exceptional circumstances)

**Final Decision**:
- No further appeals allowed
- Decision is binding
- Case closed

**User Action**: Accept decision
**Next Screen**: Goal detail

### Step 11: Dispute Status Tracking
**Entry Point**: Dashboard → Goal card → "Disputed check-in" badge

**Screen**: Dispute Status
- **Elements**:
  - "Dispute status" heading
  - Dispute ID: #12345

  **Timeline**:
  - Visual progress bar or timeline
  - Milestones:
    - ✓ Submitted: [date/time]
    - ⏳ Under Review: In progress
    - ⏱️ Decision: Pending

  **Details**:
  - Dispute type: [Type]
  - Submitted: [timestamp]
  - Reviewer assigned: Yes/No
  - Expected resolution: [date/time]
  - Time elapsed: X hours

  **Your Submission**:
  - Collapsible section showing:
    - Original evidence
    - Your explanation
    - Additional evidence

  **Actions**:
    - "Add More Info" button (if reviewer requested)
    - "Cancel Dispute" button
    - "Contact Support" link
    - Refresh button (check for updates)

**User Action**: Monitor status
**Next Screen**: Stay on screen or return to dashboard

### Step 12: Dispute Timeout
**Scenario**: Dispute not resolved within SLA (72 hours)

**Auto-Escalation**:
- Automatically escalate to senior review
- Notification sent to support team
- User notified of delay

**Screen**: Dispute Taking Longer Than Expected
- **Elements**:
  - "We're still reviewing your dispute"
  - "This is taking longer than usual"
  - "Your dispute has been escalated"
  - "Expected resolution: Within 24 hours"

  **What We're Doing**:
  - "Assigned to senior reviewer"
  - "We're ensuring a thorough review"

  **Apology**:
  - "We apologize for the delay"
  - "Thank you for your patience"

  **Actions**:
    - "Contact Support" button (if urgent)
    - "Continue Waiting" (default)

**User Action**: Wait or contact support
**Next Screen**: Updated when decision made

## Success Criteria
- **Resolution Time**: 90%+ of disputes resolved within 48 hours
- **Approval Rate**: 30-40% of disputes approved (balanced)
- **Appeal Rate**: <10% of disputes escalate to appeal
- **User Satisfaction**: 80%+ rate resolution as fair (post-dispute survey)
- **Repeat Disputes**: <5% of users have >3 disputes per month

## Error Handling

### Dispute Submission Failure
- **Cause**: Network error, database timeout
- **UI**: "Couldn't submit dispute. Try again?"
- **Action**: "Retry" button, data preserved
- **Fallback**: "Save Draft" option (submit later)

### Evidence Upload Failure
- **Cause**: Large file, network issue
- **UI**: "Photo upload failed"
- **Action**: "Try again" or "Compress photo"
- **Fallback**: Can submit without additional photos

### Reviewer Assignment Failure
- **Rare**: No reviewers available
- **Handling**: Auto-assign to support queue
- **UI**: "Dispute submitted, review in progress"
- **Alert**: Dev team if persistent

### Duplicate Dispute Attempts
- **Detection**: User submits multiple disputes for same check-in
- **Handling**: Block duplicate submission
- **UI**: "Dispute already submitted for this check-in"
- **Action**: "View existing dispute" link

## Edge Cases

### Dispute After Goal Ended
- **Scenario**: User disputes check-in after goal failed
- **Handling**: Still allow dispute (fair process)
- **Impact**: If approved, may change goal outcome
  - Goal marked as "succeeded via dispute"
  - Refund processed if appropriate

### Multiple Disputed Check-Ins
- **Scenario**: User disputes multiple check-ins at once
- **Handling**: Each dispute processed separately
- **UI**: List of all disputes in "Dispute Status" screen
- **Priority**: Based on goal deadline proximity

### Referee Is No Longer Available
- **Scenario**: Referee deleted account, can't respond
- **Handling**: Auto-escalate to platform reviewer
- **UI**: "Referee unavailable, escalated to platform review"

### Dispute During Goal End
- **Scenario**: Goal ends while dispute pending
- **Handling**: Hold goal result until dispute resolved
- **UI**: "Goal result pending dispute resolution"
- **Payment**: Hold payment until resolved

### User Disputes Every Check-In
- **Pattern Detection**: >50% of check-ins disputed
- **Action**: Flag for review, possible abuse
- **Handling**: Support team investigates
- **Potential**: Reduced appeal privileges or account review

### Referee Disputes User's Approval
- **Rare**: Referee thinks check-in was incorrectly approved
- **Handling**: Referee can flag for review
- **Process**: Similar dispute flow, but referee-initiated
- **User Notified**: "Your check-in is under review"

### Evidence Deleted Before Review
- **Scenario**: Original photo deleted/corrupted
- **Handling**: Flag technical issue
- **Resolution**: Based on user explanation + history
- **Fallback**: Support manual review

### Dispute After Account Deletion Scheduled
- **Scenario**: User scheduled deletion, then disputes
- **Handling**: Pause deletion until dispute resolved
- **UI**: "Account deletion paused pending dispute"

## Analytics Events
Track all dispute activity:
- `dispute_started` (dispute_type, rejection_source: ai/referee)
- `dispute_type_selected` (dispute_type)
- `dispute_details_provided` (has_additional_evidence, explanation_length)
- `dispute_submitted` (goal_id, check_in_id, dispute_type)
- `dispute_additional_info_requested` (reviewer_id)
- `dispute_additional_info_provided` (response_time)
- `dispute_resolved` (outcome: approved/rejected, resolution_time)
- `dispute_approved` (original_rejecter: ai/referee, approval_reason)
- `dispute_rejected` (rejection_reason, appeal_available)
- `dispute_appealed` (appeal_reason, appeals_remaining)
- `appeal_resolved` (outcome, final: true)
- `dispute_feedback_provided` (fair: yes/no, resolution_type)
- `dispute_cancelled` (stage, reason)
- `dispute_timeout` (time_to_escalation)

## Future Enhancements (Post-MVP)
- AI-assisted dispute triage: ML categorizes disputes for faster routing
- Community jury: Peer review for certain disputes
- Dispute mediation: Real-time chat with reviewer
- Video evidence: Allow video uploads for disputes
- Automated partial credit: "Check-in partially completed" verdicts
- Dispute history: Show user's past disputes and outcomes
- Referee dispute training: Improve referee accuracy
- Dispute prediction: Warn users before submitting likely valid evidence
- Smart appeals: AI suggests whether appeal likely to succeed
- Dispute templates: Pre-filled explanations for common scenarios
- Expedited review: Premium feature for faster resolution
- Dispute insurance: Optional add-on for guaranteed review time
- Public dispute log: Anonymized cases for transparency (optional)
- Dispute analytics: Personal stats on disputes (for self-reflection)
- Preventative coaching: Help users avoid disputes with better evidence
