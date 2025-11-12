# Email Change Flow

## Goal
Allow users to securely update their email address with verification of both old and new addresses, maintaining account security and preventing unauthorized changes (99%+ security maintained).

## Entry Points
- Settings → Account → "Email Address" → Edit icon
- Profile screen → Email display → Tap to edit
- Email bounce notification → "Update email address"
- Security alert → "Verify your email"

## Flow Steps

### Step 1: Email Change Entry
**Screen**: Settings → Account
- **Elements**:
  - Account section
  - Current email displayed: "user@example.com"
  - Edit icon (✏️) or "Change" link next to email

**User Action**: Tap edit icon
**Next Screen**: Change Email Screen

### Step 2: Change Email Request
**Screen**: Change Email Address
- **Elements**:
  - "Change email address" heading
  - Security note: "We'll verify both your old and new email"

  - **Current Email** (read-only):
    - Label: "Current email"
    - Value: user@example.com (grayed out)

  - **New Email Input**:
    - Label: "New email address"
    - Placeholder: "newemail@example.com"
    - Type: email
    - Auto-focus
    - Validation: Email format, not same as current

  - **Confirm New Email**:
    - Label: "Confirm new email"
    - Must match new email
    - Live match indicator (✓ or ✗)

  - **Password Verification**:
    - Label: "Current password"
    - Type: password
    - Required for security
    - "Forgot password?" link

  - **Why We Need This** (help text):
    - "Password confirms this is really you"
    - "Prevents unauthorized email changes"

  - **Actions**:
    - "Send Verification" button (primary)
    - "Cancel" link

**Validation**:
- New email valid format
- New email ≠ current email
- Emails match
- Password correct
- New email not already used by another account

**User Action**: Enter new email and password, tap "Send Verification"
**Next Screen**: Verify Current Email (Step 3)

### Step 3: Verify Current Email
**Screen**: Verify Current Email
- **Elements**:
  - Email icon (animated)
  - "Check your current email" heading
  - Message: "We sent a verification code to [current email]"
  - Masked: "s***r@example.com"

  - **6-Digit Code Input**:
    - Auto-focus
    - Auto-submit when 6 digits entered
    - Large, spaced digits
    - Clear/backspace friendly

  - **Timer**: "Code expires in 10:00"
    - Countdown timer
    - Turns red when < 2 minutes

  - **Actions**:
    - "Didn't receive it? Resend" link
      - Cooldown: 60 seconds
      - "Resend in 45s..."
    - "Use different email" link (back to Step 2)
    - "Cancel" link

  - **Help**:
    - "Check spam folder"
    - "Code may take a few minutes"

**Technical Process**:
1. Generate 6-digit code
2. Store in database with 10-minute expiry
3. Send email to current address:
   - Subject: "MicroCommit - Verify your email change"
   - Body: "Your verification code is: [123456]"
   - "Expires in 10 minutes"
   - "Didn't request this? Someone may be trying to change your email. Secure your account now."
   - Link to reset password

**User Action**: Enter code from email
**Next Screen**: Verify New Email (Step 4)

### Step 4: Verify New Email
**Screen**: Verify New Email
- **Elements**:
  - Email icon (animated)
  - "Check your new email" heading
  - Message: "We sent a verification code to [new email]"
  - Full email shown: "newemail@example.com"

  - **6-Digit Code Input**: (same as Step 3)

  - **Timer**: "Code expires in 10:00"

  - **Actions**:
    - "Didn't receive it? Resend" link
    - "Change email address" link (back to Step 2)
    - "Cancel" link

  - **Progress Indicator**:
    - "Step 2 of 2"
    - "Almost done!"

**Technical Process**:
1. Generate different 6-digit code
2. Store with 10-minute expiry
3. Send email to NEW address:
   - Subject: "MicroCommit - Verify your new email"
   - Body: "Your verification code is: [654321]"
   - "Complete this to update your email"
   - "Didn't request this? Ignore this email."

**User Action**: Enter code from new email
**Next Screen**: Email Change Success (Step 5)

### Step 5: Email Change Success
**Screen**: Email Updated Successfully
- **Elements**:
  - Green checkmark animation
  - "Email updated! ✅" heading
  - Message: "Your email has been changed to:"
  - New email displayed: "newemail@example.com"

  - **What Changed**:
    - ✓ Login email updated
    - ✓ Notification email updated
    - ✓ All communications will go to new email
    - ✓ Confirmation sent to both addresses

  - **Security Note**:
    - "You're still logged in on all devices"
    - "Your password has NOT changed"

  - **Actions**:
    - "Done" button (primary)
    - Auto-redirect to settings after 5 seconds

**Technical Process**:
1. Update user.email in database
2. Update Supabase Auth email
3. Log security event
4. Send confirmation emails:
   - To OLD email: "Your email was changed to [new]. If not you, contact support immediately."
   - To NEW email: "Welcome! Your MicroCommit email was updated."
5. Update all notification preferences
6. Invalidate email-based verification tokens

**User Action**: Tap "Done"
**Next Screen**: Settings screen (with new email)

### Step 6: Resend Verification Code
**Entry Point**: Verify screen → "Resend" link

**Cooldown Handling**:
- 60-second cooldown between resends
- Button disabled with countdown: "Resend in 45s"
- After cooldown: "Resend code" becomes active

**Resend Scenarios**:

**6a: Resend to Current Email**
- Generate NEW code (invalidate old)
- Send to current email
- Toast: "Code resent!"
- Reset expiry timer to 10 minutes

**6b: Resend to New Email**
- Generate NEW code (invalidate old)
- Send to new email
- Toast: "Code resent to [new email]"
- Reset expiry timer

**Rate Limiting**:
- Max 3 resends per verification step
- After 3: "Too many attempts. Try again in 15 minutes."

**User Action**: Wait for new code, enter
**Next Screen**: Stay on verification screen

### Step 7: Verification Code Expired
**Scenario**: User enters code after 10-minute expiry

**Screen**: Code Expired (Modal)
- **Elements**:
  - Warning icon (⚠️)
  - "Verification code expired" heading
  - Message: "Codes expire after 10 minutes for security"

  - **Actions**:
    - "Send New Code" button (primary)
    - "Start Over" link (back to Step 2)
    - "Cancel" button

**User Action**: Send new code
**Technical**: Generate fresh code, send email, reset timer
**Next Screen**: Verification screen (with new code sent)

### Step 8: Verification Code Incorrect
**Scenario**: User enters wrong code

**Behavior**:
- Shake animation on input field
- Red border on input
- Error message: "Incorrect code. Try again."
- Show attempts: "X attempts remaining"

**After 5 Failed Attempts**:
- Lock verification for 15 minutes
- Screen: "Too Many Attempts"
- Message: "Too many incorrect codes. Try again in 15 minutes."
- Countdown timer
- "Contact Support" button

**User Action**: Re-enter correct code or wait
**Next Screen**: Stay on screen or wait period

### Step 9: Email Already in Use
**Scenario**: New email already associated with another account

**Detection**: During Step 2 validation or Step 4 verification

**Screen**: Email Unavailable (Modal)
- **Elements**:
  - Warning icon
  - "This email is already in use" heading
  - Message: "This email is linked to another MicroCommit account"

  - **Options**:
    - "Use Different Email" button (back to input)
    - "Log in to that account" link
    - "Contact Support" link (if account merge needed)

**User Action**: Choose different email
**Next Screen**: Change Email Request (Step 2)

### Step 10: Cancel During Process
**Scenario**: User cancels at any step

**Confirmation Modal**:
- "Cancel email change?" heading
- "Your email will not be changed"
- "Any verification codes will expire"
- **Actions**:
  - "Yes, Cancel" button
  - "Continue Changing Email" button

**If Confirmed**:
- Invalidate verification codes
- Clear temporary data
- Log cancellation event
- Return to settings
- Toast: "Email change cancelled"

**Next Screen**: Settings screen (email unchanged)

### Step 11: Email Change from Unverified Account
**Scenario**: User's current email was never verified

**Additional Step**: Before Step 2

**Screen**: Verify Current Email First
- **Elements**:
  - "Verify your current email first" heading
  - Message: "Before changing email, verify [current email]"
  - "Why?" explanation: "Confirms this account is really yours"

  - **Actions**:
    - "Send Verification to Current Email" button
    - "Contact Support" link (if no access to current email)
    - "Cancel" link

**Flow**:
1. Verify current email (6-digit code)
2. Once verified, proceed to Step 2 (change email)

**User Action**: Verify current email first
**Next Screen**: Change Email Request (Step 2)

### Step 12: Email Bounce Detected
**Trigger**: Email to current address bounced (undeliverable)

**Notification**: "Update your email address"
- In-app banner: "Email deliverability issue"
- Push notification: "Update your email to receive notifications"

**Screen**: Email Delivery Issue
- **Elements**:
  - Warning icon (⚠️)
  - "Email delivery problem" heading
  - Message: "We can't send emails to [email]"
  - Possible reasons:
    - Inbox full
    - Email address disabled
    - Spam filter blocking
    - Typo in email

  - **Actions**:
    - "Update Email Address" button (primary)
    - "Test Current Email" button (resend test email)
    - "Contact Support" link

**User Action**: Update email
**Next Screen**: Change Email Flow (Step 2)

## Success Criteria
- **Completion Rate**: 90%+ of started email changes complete successfully
- **Verification Speed**: 80%+ users verify within 5 minutes
- **Code Accuracy**: 95%+ enter correct code on first or second try
- **Security**: 100% of changes require both email verifications
- **User Satisfaction**: 4+ stars for email change experience

## Error Handling

### Email Delivery Failures
- **Current Email Bounce**: Can't send verification to current email
  - Alternative: SMS verification (if phone on file)
  - Or: Security questions
  - Or: Contact support with ID verification

- **New Email Bounce**: Can't send verification to new email
  - Error: "Can't send to this email address"
  - Check: "Is this email correct?"
  - Action: "Try different email"

### Password Incorrect
- **UI**: "Password is incorrect"
- **Action**: "Try again" or "Forgot password?" link
- **Limit**: 5 attempts, then 15-minute lockout

### Network Errors
- **During Submission**: "Connection lost. Try again?"
- **During Verification**: "Couldn't verify code. Check connection."
- **Retry**: Automatic retry 3 times, then manual

### Concurrent Email Changes
- **Scenario**: User starts email change on web and mobile simultaneously
- **Handling**: Only allow one active change process
- **UI**: "Email change already in progress on another device"
- **Action**: "Continue on this device" (cancels other) or "Cancel"

### Database Update Failure
- **Rare**: Email verification succeeds but DB update fails
- **Handling**: Retry update 3 times
- **If Still Fails**: Revert verification, notify support team
- **UI**: "Something went wrong. Your email was not changed. Please try again."

## Edge Cases

### Immediate Re-Change
- **Scenario**: User changes email, then immediately changes back
- **Handling**: Standard flow, no restrictions
- **Note**: Both emails re-verified

### Email Change During Active Goals
- **Scenario**: User has active goals, changes email
- **Impact**: Goal notifications sent to new email
- **UI**: Warning: "Goal reminders will be sent to your new email"
- **Confirmation**: "Continue with email change?"

### Email Change While Logged Out
- **Restriction**: Cannot change email while logged out
- **Reason**: Requires authentication
- **UI**: "Log in to change your email"

### Verification Code Intercepted
- **Security Risk**: Attacker intercepts code
- **Mitigation**:
  - Codes expire quickly (10 minutes)
  - Rate limiting on attempts
  - Both old AND new email verified
  - Notifications sent to old email

### User Has No Access to Current Email
- **Scenario**: Lost access to current email account
- **Support Path**:
  1. Contact support
  2. Provide ID verification
  3. Answer security questions
  4. Support manually updates email
- **Alternative**: Phone number verification (if on file)

### Email Provider Delay
- **Scenario**: Email takes 10+ minutes to arrive
- **Handling**:
  - Extend code expiry if needed
  - Show "Still waiting?" help text
  - "Try different email" option

### Typo in New Email
- **Scenario**: User enters wrong new email, doesn't realize
- **Protection**: Confirm new email field (must type twice)
- **Recovery**: If typo discovered, restart process with correct email

### Email Change from Third-Party Auth
- **Scenario**: User signed up with Google/Apple, no password set
- **Handling**:
  - Skip password verification step
  - Use OAuth re-authentication instead
  - "Confirm with [Google/Apple]" button

### Simultaneous Login Attempts
- **Scenario**: Someone tries to log in while email is changing
- **Handling**: Old email still valid until change complete
- **Security**: Log suspicious activity if from unusual location

### Bulk Email Sender Flagging
- **Scenario**: Verification emails flagged as spam
- **Mitigation**:
  - Use reputable email service (SendGrid, Postmark)
  - SPF, DKIM, DMARC configured
  - Low complaint rate
  - Plain text option
- **User Help**: "Check spam folder" prominent in UI

## Analytics Events
Track all email change activity:
- `email_change_started` (from_email_hash)
- `email_change_new_email_entered` (new_email_domain)
- `email_change_password_verified` (success/failure)
- `email_change_current_email_code_sent`
- `email_change_current_email_verified` (attempts, time_to_verify)
- `email_change_new_email_code_sent`
- `email_change_new_email_verified` (attempts, time_to_verify)
- `email_change_completed` (total_time, to_email_domain)
- `email_change_cancelled` (stage)
- `email_change_failed` (reason, stage)
- `email_verification_code_resent` (which_email, attempt_number)
- `email_change_already_in_use`
- `email_change_rate_limited`

## Future Enhancements (Post-MVP)
- Instant email change with 2FA: Skip verification if 2FA enabled
- Email alias support: Add multiple email addresses to one account
- Social email sync: Auto-update from Google/Apple account changes
- Email forwarding: Forward MicroCommit emails to secondary address
- Temporary email hold: Hold emails during change process
- Email change notification preference: Choose immediate or batched notifications
- Bulk email management: Change email for family/team accounts
- Email verification via link: Click link instead of entering code
- Smart email suggestions: Detect typos (e.g., "gmai.com" → "gmail.com")
- Email provider validation: Check if domain accepts email before proceeding
- Progressive email verification: Verify less aggressively for trusted users
- Email change history: Audit log of all email changes
- Revert email change: One-click revert within 24 hours
- Email security score: Show email address security rating
- Disposable email detection: Warn if using temporary email service
