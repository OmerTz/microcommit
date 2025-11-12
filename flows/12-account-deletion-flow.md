# Account Deletion Flow

## Goal
Allow users to permanently delete their account with clear understanding of consequences, proper data handling (GDPR compliance), and recovery options within a grace period (30 days).

## Entry Points
- Settings → Account → "Delete Account" (red text, bottom)
- Support chat → "I want to delete my account" → Guided flow
- Email link → "Delete my account" (if requested via support)
- Inactivity prompt → "Delete inactive account?" (after 6+ months)

## Flow Steps

### Step 1: Delete Account Entry
**Screen**: Settings → Account
- **Elements**:
  - Account settings section
  - At bottom, separated from other options:
    - "Delete Account" link (red text)
    - Small text: "Permanently delete your account and all data"

**User Action**: Tap "Delete Account"
**Next Screen**: Account Deletion Warning (Step 2)

### Step 2: Account Deletion Warning
**Screen**: Delete Your Account
- **Elements**:
  - Warning icon (⚠️, large, red)
  - "Delete your account?" heading (red text)
  - Critical warning message:
    - "This action is permanent and cannot be undone"
    - "All your data will be deleted"

  **What Will Be Lost** (red-bordered box):
  - ❌ All goal data and history
  - ❌ Check-in records and evidence photos
  - ❌ Progress and achievements
  - ❌ Saved payment methods
  - ❌ Referee relationships
  - ❌ Account settings and preferences
  - ❌ Profile information

  **Active Goals Warning** (if applicable):
  - 🚨 "You have X active goals"
  - Red banner: "Deletion will cancel these goals"
  - Goal list with status:
    - Goal name
    - Days remaining
    - Commitment amount
    - Current progress

  **Financial Impact** (if active goals):
  - "Your commitment ($X total) will be charged and donated to the selected charities"
  - Breakdown per goal:
    - Goal 1: $15 → Red Cross
    - Goal 2: $20 → WWF
  - "No refunds will be issued for active goals"

  **Pending Refunds** (if applicable):
  - ⚠️ "You have $X in pending refunds"
  - "Refunds in progress will be cancelled"
  - Option: "Wait for refunds before deleting"

  **Actions**:
  - "Continue to Delete" button (red, bottom)
  - "Cancel" button (gray, prominent)
  - "Export My Data First" link (download data before deleting)

  **Alternative Options** (help box):
  - "Just want to take a break? Pause your account instead"
  - "Having issues? Contact support"
  - Links to these alternatives

**User Action**: Review warnings, tap "Continue to Delete"
**Next Screen**: Feedback & Confirmation (Step 3)

### Step 3: Exit Feedback & Reason
**Screen**: Why Are You Leaving?
- **Elements**:
  - "We're sorry to see you go" heading
  - "Help us improve by sharing why" (optional)

  **Reason Selection** (radio buttons):
  - ❌ No longer need the app
  - ❌ Too expensive
  - ❌ Goals too hard to maintain
  - ❌ Not enough features
  - ❌ Technical issues/bugs
  - ❌ Privacy concerns
  - ❌ Switching to another app
  - ❌ Too many notifications
  - ❌ Other (text field appears)

  **Additional Feedback** (optional):
  - Text area: "Anything else you'd like to share?"
  - Placeholder: "Your feedback helps us improve..."
  - Max 500 characters

  **Save or Delete Options** (if feedback given):
  - "Your feedback is valuable. Are you sure you want to delete?"
  - Checkbox: "I understand my feedback will be saved anonymously"

  **Actions**:
  - "Continue to Delete" button (red)
  - "Cancel" button
  - "Skip" link (skip feedback)

**User Action**: Optionally provide feedback, continue
**Next Screen**: Identity Verification (Step 4)

### Step 4: Identity Verification
**Screen**: Verify It's You
- **Elements**:
  - "Verify your identity" heading
  - Security message: "Confirm this is really you before deleting"

  **Verification Method** (tabs or options):

  **Option 1: Password Verification**
  - Label: "Enter your password"
  - Input: password field
  - "Forgot password?" link
  - Most common method

  **Option 2: Email Verification**
  - Button: "Send verification code to [email]"
  - 6-digit code input (after code sent)
  - "Resend code" link

  **Option 3: OAuth Re-authentication** (if signed up with Google/Apple)
  - Button: "Confirm with [Google/Apple]"
  - Launches OAuth flow
  - Returns with verification token

  **Security Note**:
  - "This ensures no one else can delete your account"
  - Lock icon displayed

  **Actions**:
  - "Verify & Continue" button (enabled after verification)
  - "Cancel" button

**Validation**:
- Password correct OR code valid OR OAuth successful
- Must verify to proceed

**User Action**: Complete verification
**Next Screen**: Final Confirmation (Step 5)

### Step 5: Final Confirmation
**Screen**: Final Confirmation
- **Elements**:
  - Red warning box (very prominent)
  - "Last chance to cancel" heading
  - "This action is PERMANENT and CANNOT be undone"

  **Deletion Summary**:
  - "Your account will be scheduled for deletion"
  - "30-day grace period: You can cancel deletion within 30 days"
  - "After 30 days: All data permanently deleted"

  **What Happens Next**:
  1. ✓ Account immediately deactivated (can't log in)
  2. ✓ Active goals cancelled, commitments charged
  3. ✓ Referee notifications sent
  4. ✓ Scheduled for permanent deletion in 30 days
  5. ✓ Confirmation email sent with recovery link

  **Type to Confirm**:
  - "Type 'DELETE' to confirm" (large text input)
  - Must type exactly "DELETE" (case-sensitive)
  - Input turns red when correct

  **Final Checkboxes** (all required):
  - ☑ "I understand my account will be deleted permanently"
  - ☑ "I understand my active goals will be cancelled and charged"
  - ☑ "I understand this cannot be undone after 30 days"

  **Actions**:
  - "Delete My Account" button (red, large)
    - Only enabled when "DELETE" typed and all boxes checked
  - "Cancel Deletion" button (green, prominent)

**User Action**: Type "DELETE", check boxes, confirm
**Next Screen**: Account Deleted (Step 6)

### Step 6: Account Deleted Confirmation
**Screen**: Account Deletion Scheduled
- **Elements**:
  - Sad icon (not too emotional, professional)
  - "Your account is scheduled for deletion" heading

  **What Happened**:
  - ✓ Account deactivated immediately
  - ✓ Active goals cancelled
  - ✓ Commitments charged: $X donated to charities
  - ✓ All sessions logged out
  - ✓ Scheduled for permanent deletion: [Date, 30 days from now]

  **30-Day Grace Period**:
  - "Changed your mind? You have 30 days to cancel deletion"
  - "Check your email for the recovery link"
  - "After [date], deletion is permanent"

  **What You Can Still Do**:
  - "Download your data within 30 days"
  - Link: "Download Data Now" (generates export)

  **Actions**:
  - "Close" button (logs out, returns to welcome screen)
  - Email sent with recovery link

**Technical Process**:
1. Set account status: "deletion_scheduled"
2. Set deletion_date: current_date + 30 days
3. Cancel all active goals (trigger goal failure flow)
4. Process all pending charges (commitments → charities)
5. Invalidate all sessions (log out all devices)
6. Send deletion confirmation email with recovery link
7. Notify all referees (goals cancelled)
8. Schedule background job for permanent deletion (30 days)
9. Log deletion event with reason/feedback
10. Clear cached data

**User Action**: Close app
**Next Screen**: Logged out → Welcome/Login screen

### Step 7: Recovery Email & Grace Period
**Email Sent**:
- **Subject**: "MicroCommit - Account Deletion Scheduled"
- **Body**:
  - "Your account is scheduled for deletion on [date]"
  - "Changed your mind? Cancel deletion:" [Recovery Link Button]
  - "What was deleted:"
    - Active goals cancelled
    - $X donated to charities
  - "What you can still do:"
    - Download your data
    - Cancel deletion (until [date])
  - "After [date]: Permanent deletion, no recovery possible"
  - Support contact info

**Recovery Link**: `app.microcommit.com/cancel-deletion?token=xyz`
- Token valid for 30 days
- One-time use

**Subsequent Emails**:
- **Day 7**: "3 weeks left to cancel deletion"
- **Day 14**: "2 weeks left to cancel deletion"
- **Day 21**: "1 week left to cancel deletion"
- **Day 27**: "3 days left - Last chance to cancel"
- **Day 30**: "Account permanently deleted" (after deletion)

### Step 8: Cancel Deletion (Recovery Flow)
**Entry Point**: User clicks recovery link in email

**Screen**: Cancel Account Deletion
- **Elements**:
  - Welcome back icon (😊)
  - "Welcome back!" heading
  - "Cancel your account deletion?"

  **Account Status**:
  - "Your account is scheduled for deletion on [date]"
  - "Days remaining: X days"

  **What Will Be Restored**:
  - ✓ Account access
  - ✓ Profile and settings
  - ✓ Historical goal data
  - ✗ Active goals (already cancelled, can't be restored)
  - ✗ Commitments (already donated, can't be refunded)

  **Verification**:
  - "Verify it's you" section
  - Password input OR email code
  - (Same verification as deletion flow)

  **Actions**:
  - "Cancel Deletion & Restore Account" button (green, primary)
  - "Continue with Deletion" link (keeps deletion scheduled)

**User Action**: Verify and cancel deletion
**Technical Process**:
1. Verify recovery token (valid, not expired)
2. Verify user identity (password/code)
3. Update account status: "active"
4. Clear deletion_date
5. Re-enable account access
6. Cancel scheduled deletion job
7. Send confirmation email
8. Log recovery event

**Next Screen**: Account Restored Success

### Step 9: Account Restored Success
**Screen**: Welcome Back!
- **Elements**:
  - Celebration icon (🎉)
  - "Welcome back!" heading
  - "Your account has been restored"

  **What Was Restored**:
  - ✓ Account access
  - ✓ Profile and data
  - ✓ Settings and preferences
  - ✓ Historical goal records

  **What Cannot Be Restored**:
  - ✗ Active goals (already cancelled)
  - ✗ Commitments (already donated)
  - ℹ️ "You can create new goals anytime"

  **Actions**:
  - "Go to Dashboard" button (primary)
  - "Create New Goal" button (secondary)

**User Action**: Return to dashboard
**Next Screen**: Dashboard (empty of active goals if all cancelled)

### Step 10: Permanent Deletion (After 30 Days)
**Trigger**: Background job runs on deletion_date

**Technical Process**:
1. Verify 30 days elapsed
2. Check account status still "deletion_scheduled"
3. Perform permanent deletion:
   - **Hard Delete**:
     - User record (anonymize required fields for legal compliance)
     - Profile data
     - Saved payment methods (securely)
     - Session tokens
     - Notification preferences
   - **Anonymize** (keep for analytics, GDPR-compliant):
     - Goal records (remove user link)
     - Check-in data (aggregate only)
     - Payment records (required for accounting)
   - **Permanently Delete**:
     - Evidence photos (Supabase Storage)
     - Referee relationships
     - Personal messages
4. Send final confirmation email:
   - "Your account has been permanently deleted"
   - "We're sorry to see you go"
   - "Thank you for using MicroCommit"
   - Support contact (in case of accidental deletion)
5. Log deletion completion
6. Remove from email lists
7. Update analytics (anonymously track churn)

**Email Sent**:
- **Subject**: "MicroCommit - Account Permanently Deleted"
- **Body**:
  - "Your account has been permanently deleted"
  - "All your data has been removed"
  - "If this was a mistake, contact support immediately" (with case ID)
  - "We'd love to see you again someday"
  - Sign-up link (if they want to return)

### Step 11: Attempt to Login After Deletion
**Scenario**: User tries to log in after account deleted

**Screen**: Account Not Found
- **Elements**:
  - Info icon
  - "Account not found" heading
  - "This account has been deleted"

  **Timeline Check**:
  - If <30 days: "Your account is scheduled for deletion. Cancel deletion?"
    - "Recover Account" button
  - If >30 days: "Your account was permanently deleted and cannot be recovered"

  **Actions**:
  - "Create New Account" button (if permanent)
  - "Recover Account" button (if grace period)
  - "Contact Support" link

**User Action**: Create new account or recover
**Next Screen**: Sign-up or recovery flow

## Success Criteria
- **Completion Rate**: 100% of deletion attempts complete successfully (no technical failures)
- **Recovery Rate**: 10-20% of deletions cancelled within grace period (healthy range)
- **Feedback Rate**: 60%+ provide exit reason
- **Data Deletion Compliance**: 100% GDPR-compliant deletion
- **Support Tickets**: <5% require support intervention

## Error Handling

### Deletion with Active Payments Processing
- **Scenario**: Payment in progress when deletion attempted
- **Handling**: Block deletion until payment resolves
- **UI**: "Payment in progress. Try again in a few minutes."
- **Wait Time**: Max 10 minutes, then allow deletion

### Deletion with Pending Disputes
- **Scenario**: User has open dispute on rejected check-in
- **Restriction**: Cannot delete with active dispute
- **UI**: "Resolve your dispute before deleting account"
- **Action**: Link to dispute resolution
- **Override**: Support can force-delete if needed

### Recovery Link Expired
- **Scenario**: User clicks recovery link after 30 days
- **UI**: "Recovery link has expired"
- **Message**: "Your account was permanently deleted"
- **Action**: "Create new account" or contact support

### Network Error During Deletion
- **Scenario**: Connection lost during deletion process
- **Handling**: Transaction rollback, retry
- **UI**: "Connection lost. Deletion not completed. Try again?"
- **Safety**: Ensure atomic operation (all or nothing)

### Email Delivery Failure (Recovery Email)
- **Scenario**: Recovery email bounces
- **Handling**:
  - Retry 3 times
  - If still fails: Flag for support review
  - Extend grace period by 7 days (account for email issues)
- **User Impact**: Can still recover via support contact

## Edge Cases

### Deletion While Logged In on Multiple Devices
- **Behavior**: All devices logged out immediately
- **Notification**: "Account deleted" toast on other devices
- **Recovery**: Can still use recovery link from any device

### Referee of Active Goals
- **Scenario**: User is referee for other users' goals
- **Handling**:
  - Remove as referee from all goals
  - Notify goal owners: "Your referee [Name] is no longer available"
  - Suggest: "Invite a new referee"
- **Impact**: No goal disruption (goals continue)

### Deletion During Check-In Window
- **Scenario**: User deletes account, check-in due today
- **Handling**: Goal cancelled, check-in marked as missed
- **Commitment**: Charged as goal failure

### Immediate Re-Registration
- **Scenario**: User deletes account, immediately signs up with same email
- **Restriction**: Email remains reserved for 30 days
- **UI**: "This email is associated with a deleted account"
- **Option**: "Use different email" or "Wait X days"
- **Override**: Can cancel deletion to restore account

### Deletion by Someone Else
- **Scenario**: Attacker tries to delete account
- **Protection**:
  - Requires password/verification
  - Email notification to account owner
  - 30-day grace period (time to recover)
  - Support can investigate suspicious deletions

### Batch Deletion Request
- **Scenario**: User requests multiple account deletions (testing)
- **Detection**: Rate limiting
- **Handling**: Flag for support review
- **UI**: "Contact support for bulk deletion"

### GDPR Right to Deletion (Immediate)
- **Scenario**: User requests immediate deletion (GDPR right)
- **Process**: Same flow, but skip 30-day grace period
- **Entry Point**: "Delete immediately (GDPR)" option
- **Verification**: Requires stronger verification
- **No Recovery**: Permanent immediately

### Account Deletion with Referral Credits
- **Scenario**: User has unused referral credits/balance
- **Handling**:
  - Show warning: "You have $X in credits"
  - Option: "Use credits" or "Forfeit credits"
  - Credits forfeited on deletion (no refund)

### Deletion from Banned Account
- **Scenario**: Account banned for ToS violation
- **Restriction**: User cannot delete (admin control)
- **UI**: "Contact support regarding your account"
- **Reason**: Preserve evidence for legal/fraud investigation

### Partial Deletion Failure
- **Scenario**: Some data deleted, some fails
- **Handling**: Transaction rollback, all-or-nothing
- **Retry**: Auto-retry failed steps
- **Alert**: Dev team if persistent failure
- **User**: Show "Deletion failed, try again" error

## Analytics Events
Track all deletion activity:
- `account_deletion_started` (entry_point)
- `account_deletion_warning_viewed` (active_goals_count, pending_amount)
- `account_deletion_feedback_provided` (reason, has_text_feedback)
- `account_deletion_verification_started` (method)
- `account_deletion_verification_completed` (success/failure)
- `account_deletion_confirmed` (time_to_delete, feedback_reason)
- `account_deletion_scheduled` (deletion_date, goals_cancelled, amount_charged)
- `account_deletion_cancelled` (days_before_permanent, entry_point)
- `account_deletion_recovered` (days_since_scheduled)
- `account_deletion_permanent` (days_as_user, total_goals, total_donated)
- `account_deletion_failed` (reason, stage)

## Future Enhancements (Post-MVP)
- Account pause: Temporary deactivation without deletion
- Partial deletion: Delete specific data, keep account
- Data portability: Export in standardized format (JSON, CSV)
- Anonymous mode: Anonymize account, keep using app
- Account transfer: Transfer goals to another user
- Scheduled deletion: "Delete my account on [future date]"
- Deletion insurance: Accidental deletion protection (extra verification)
- Exit interview: Optional call with support to discuss issues
- Win-back offer: Special offer to retain user
- Alumni program: Stay connected after deletion
- Deletion analytics dashboard: Why users leave (internal tool)
- Automated win-back: Email campaigns for recovered accounts
- GDPR compliance dashboard: Track deletion requests
- Support-assisted deletion: For complex cases
- Bulk account management: For enterprise/family plans
