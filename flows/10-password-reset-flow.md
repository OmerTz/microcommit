# Password Reset Flow

## Goal
Enable users to securely reset forgotten passwords in under 3 minutes with 95%+ success rate, maintaining account security while minimizing friction.

## Entry Points
- Login screen → "Forgot Password?" link
- Settings → Security → "Change Password" (for logged-in users)
- Failed login attempts (3+) → "Reset Password?" suggestion
- Account locked notification → "Reset Password" button
- Email alert: "Suspicious activity" → "Secure your account"

## Flow Steps

### Step 1: Password Reset Entry (Not Logged In)
**Screen**: Login
- **Elements**:
  - Email/password form
  - "Forgot Password?" link (below password field)
  - Alternative: "Having trouble logging in?" link

**User Action**: Tap "Forgot Password?"
**Next Screen**: Request Password Reset

### Step 2: Request Password Reset
**Screen**: Reset Your Password
- **Elements**:
  - "Reset your password" heading
  - Subtitle: "We'll send you a reset link"

  - **Email Input**:
    - Label: "Email address"
    - Placeholder: "you@example.com"
    - Auto-focus, auto-complete
    - Validation: Must be valid email format

  - **Security Check** (optional, if suspicious activity):
    - Simple CAPTCHA or "I'm not a robot"
    - Prevents automated attacks

  - **Actions**:
    - "Send Reset Link" button (primary)
    - "Back to Login" link

  - **Help Text**:
    - "Don't have access to email? Contact support"
    - Support link

**Validation**:
- Email required
- Email format valid
- CAPTCHA completed (if shown)

**User Action**: Enter email, tap "Send Reset Link"
**Next Screen**: Check Your Email

### Step 3: Check Your Email (Confirmation)
**Screen**: Check Your Email
- **Elements**:
  - Email icon (large, animated)
  - "Check your email" heading
  - Message: "We sent a password reset link to [email]"
  - Masked email: "s***r@example.com"

  - **Instructions**:
    - "Click the link in the email to reset your password"
    - "The link expires in 1 hour"

  - **Actions**:
    - "Open Email App" button (deep link to mail app)
    - "Didn't receive it? Resend" link
      - Cooldown: 60 seconds between resends
      - Shows countdown: "Resend in 45 seconds"
    - "Try different email" link (go back to Step 2)
    - "Back to Login" link

  - **Help Section** (expandable):
    - "Check your spam folder"
    - "Make sure [email] is correct"
    - "Wait a few minutes for delivery"
    - "Still can't find it? Contact support"

**Technical Process**:
1. Validate email exists in database
2. Generate secure reset token (UUID)
3. Store token with expiry (1 hour) in database
4. Send email via Supabase Auth
5. Email contains:
   - Reset link: `app.microcommit.com/reset-password?token=xyz`
   - Expiry time: "This link expires in 1 hour"
   - Security note: "Didn't request this? Ignore this email."
   - Support link

**User Action**: Check email, click reset link
**Next Screen**: Email link → Reset Password Form (Step 4)

### Step 4: Email Received & Link Clicked
**Trigger**: User clicks link in email

**Platform Routing**:
- **Mobile App Installed**: Deep link opens app → Reset Password screen
- **Mobile No App**: Opens web browser → Web version of reset screen → Prompt to download app
- **Desktop**: Opens web browser → Reset Password screen

**Screen**: Set New Password
- **Elements**:
  - "Set new password" heading
  - Email shown: "For [email]"

  - **New Password Input**:
    - Label: "New password"
    - Type: password (with show/hide toggle)
    - Password strength indicator:
      - Weak (red) | Fair (yellow) | Good (green) | Strong (dark green)

  - **Confirm Password Input**:
    - Label: "Confirm new password"
    - Type: password (with show/hide toggle)
    - Live match indicator (✓ or ✗)

  - **Password Requirements** (checklist):
    - ✓ At least 8 characters
    - ✓ Contains uppercase letter
    - ✓ Contains lowercase letter
    - ✓ Contains number
    - ✓ Contains special character
    - ✗ Not a commonly used password
    - All items turn green ✓ when met

  - **Actions**:
    - "Reset Password" button (primary)
      - Disabled until all requirements met
    - "Cancel" link (returns to login)

  - **Security Note**:
    - "This will log you out of all devices"
    - "You'll need to log in again with your new password"

**Validation**:
- Passwords match
- All requirements met
- Token still valid (not expired)
- New password different from old password

**User Action**: Enter new password, tap "Reset Password"
**Next Screen**: Password Reset Success (Step 5)

### Step 5: Password Reset Success
**Screen**: Password Reset Successful
- **Elements**:
  - Green checkmark animation
  - "Password reset! ✅" heading
  - "Your password has been successfully updated"

  - **Security Actions Taken**:
    - ✓ All sessions logged out
    - ✓ Password changed
    - ✓ Security email sent
    - ✓ Active devices notified

  - **Actions**:
    - "Log In Now" button (primary)
    - Auto-redirect to login after 5 seconds
    - Countdown shown: "Redirecting in 5..."

  - **Security Tip** (optional):
    - "Consider enabling two-factor authentication"
    - "Secure your account >" link

**Technical Process**:
1. Hash new password (bcrypt)
2. Update user record
3. Invalidate all active sessions (except current if logged in)
4. Invalidate reset token
5. Send confirmation email:
   - "Your password was changed"
   - "If this wasn't you, contact support immediately"
   - Support link
6. Log security event
7. Trigger analytics event

**User Action**: Tap "Log In Now" or wait for redirect
**Next Screen**: Login Screen

### Step 6: Resend Reset Email
**Entry Point**: Check Your Email screen → "Resend" link

**Scenario**: User didn't receive email

**Validation**:
- 60-second cooldown between resends
- Max 3 resends per hour
- Email still valid in system

**Screen**: Same as Step 3, with updated message
- "Email resent! Check your inbox."
- Toast notification: "Reset link sent again"
- "Sent X minutes ago" indicator

**Technical**: Generate new token, send new email
**Next Screen**: Stay on Check Your Email screen

### Step 7: Expired Reset Link
**Scenario**: User clicks link after 1 hour expiry

**Screen**: Link Expired
- **Elements**:
  - Warning icon (⚠️, amber)
  - "This link has expired" heading
  - Message: "Password reset links expire after 1 hour for security"

  - **Actions**:
    - "Request New Link" button (primary)
    - "Back to Login" link

  - **Info**:
    - "Your account is still secure"
    - "Request a new link to reset your password"

**User Action**: Request new link
**Next Screen**: Request Password Reset (Step 2, email pre-filled)

### Step 8: Invalid Reset Token
**Scenario**: Link tampered with or already used

**Screen**: Invalid Link
- **Elements**:
  - Error icon (❌, red)
  - "This link is invalid" heading
  - Possible reasons:
    - Link already used
    - Link format is incorrect
    - Password already reset

  - **Actions**:
    - "Request New Link" button
    - "Contact Support" link (if suspicious)
    - "Back to Login" link

**User Action**: Request new link or contact support
**Next Screen**: Request Password Reset (Step 2)

### Step 9: Password Reset from Settings (Logged In)
**Entry Point**: Settings → Security → "Change Password"

**Screen**: Change Password
- **Elements**:
  - "Change password" heading

  - **Current Password**:
    - Label: "Current password"
    - Type: password (with show/hide)
    - Required for verification

  - **New Password**:
    - Same as Step 4 (requirements, strength indicator)

  - **Confirm New Password**:
    - Must match new password

  - **Actions**:
    - "Change Password" button
    - "Forgot current password?" link
      - Triggers email reset flow
    - "Cancel" link

**Validation**:
- Current password correct
- New password meets requirements
- Passwords match
- New ≠ current password

**User Action**: Enter passwords, tap "Change Password"

**Technical Process**:
1. Verify current password
2. Hash new password
3. Update user record
4. Log out all other sessions (keep current)
5. Send confirmation email
6. Log security event

**Next Screen**: Success (Step 10)

### Step 10: Password Changed Success (Logged In)
**Screen**: Password Changed (Modal or Screen)
- **Elements**:
  - Green checkmark
  - "Password changed! ✅" heading
  - "Your password has been updated"

  - **Actions Taken**:
    - ✓ Password updated
    - ✓ Other devices logged out
    - ✓ Confirmation email sent

  - **Actions**:
    - "Done" button (return to settings)

**User Action**: Tap Done
**Next Screen**: Settings screen

### Step 11: Multiple Failed Reset Attempts
**Scenario**: User requests reset 5+ times in 1 hour

**Throttling Trigger**: Suspicious activity detected

**Screen**: Too Many Attempts
- **Elements**:
  - Warning icon
  - "Too many reset attempts" heading
  - Message: "For security, password resets are temporarily limited"
  - "You can try again in 30 minutes"
  - Countdown timer: "Retry in 28:45"

  - **Actions**:
    - "Contact Support" button
    - Explain situation to support team
    - "Back to Login" link

**Technical**: Rate limiting, log suspicious activity
**Next Screen**: Wait or contact support

### Step 12: Account Locked (Automated Security)
**Scenario**: Multiple failed login attempts triggered account lock

**Screen**: Account Locked
- **Elements**:
  - Lock icon (🔒, red)
  - "Account temporarily locked" heading
  - Message: "Your account was locked after multiple failed login attempts"
  - "This is a security measure to protect your account"

  - **Unlock Options**:
    - "Reset Password" button (primary)
      - Forces password reset to unlock
    - "Verify It's You" button
      - Email verification code
    - "Contact Support" link

  - **Info**:
    - "Account unlocks automatically in 1 hour"
    - "Or reset password now to unlock immediately"

**User Action**: Choose unlock method
**Next Screen**: Depends on choice (reset flow or verification flow)

## Success Criteria
- **Completion Rate**: 95%+ of reset requests successfully complete
- **Time to Reset**: Median time < 3 minutes
- **Email Delivery**: 98%+ of reset emails delivered
- **Link Click Rate**: 80%+ of users click link in email
- **User Satisfaction**: 4+ stars for reset experience

## Error Handling

### Email Not Found
- **Scenario**: User enters email not in system
- **Security**: Don't reveal account existence
- **UI**: Show same "Check Your Email" message
- **No Email Sent**: Silently skip email
- **Alternative**: Suggest "Sign Up" after 3 attempts

### Email Delivery Failure
- **Detection**: Email bounce, spam filter
- **UI**: "Email may not have been delivered"
- **Suggestion**: "Try a different email address"
- **Logging**: Alert dev team if widespread

### Password Too Similar to Old
- **Validation**: Compare new password to recent passwords (last 3)
- **UI**: "Password too similar to a recent password"
- **Suggestion**: "Choose a different password"

### Network Error During Reset
- **Scenario**: Connection lost while submitting
- **UI**: "Connection lost. Try again?"
- **Action**: "Retry" button
- **Data**: Token still valid, allow retry

### Multiple Simultaneous Reset Requests
- **Scenario**: User clicks "Resend" multiple times quickly
- **Handling**: Only send one email, ignore duplicates
- **UI**: "Email already sent. Check your inbox."

### Browser Doesn't Support Web Crypto
- **Rare Edge Case**: Very old browsers
- **Fallback**: Server-side password hashing
- **UI**: No change for user

## Edge Cases

### User Has Multiple Accounts with Same Email
- **Scenario**: Email used in multiple accounts (shouldn't happen)
- **Handling**: Send reset for primary account only
- **UI**: "If you have multiple accounts, contact support"

### Reset While Already Logged In
- **Scenario**: User clicks email link while logged in
- **UI**: "You're already logged in"
- **Options**:
  - "Change password anyway" → Force re-auth
  - "Cancel" → Stay logged in

### Reset Link Clicked Multiple Times
- **Scenario**: User clicks link, then clicks again later
- **First Click**: Works normally
- **Subsequent Clicks**: "Link already used" error
- **Action**: "Request new link" option

### Password Reset During Active Session
- **Scenario**: User resets password while using app on another device
- **Behavior**: Other device logged out immediately
- **Notification**: "You were logged out because your password changed"

### Token Database Cleanup Failure
- **Scenario**: Expired tokens not cleaned up (DB issue)
- **Impact**: None (validation checks expiry anyway)
- **Handling**: Background job retry, alert if persistent

### User Changes Email Then Resets Password
- **Scenario**: Reset link sent to old email after email change
- **Handling**: Only send to current email address
- **Validation**: Check email matches current account email

### Password Reset Immediately After Signup
- **Scenario**: User signs up, forgets password, resets immediately
- **Handling**: Standard reset flow
- **Note**: Consider onboarding flow issue (why forget so soon?)

### Reset Request from Suspicious Location
- **Detection**: IP from different country than usual
- **Enhancement**: Add extra verification step
- **Email**: Include location info, "Wasn't you? Secure account" link

### Mobile Deep Link Fails
- **Scenario**: App installed but deep link doesn't work
- **Fallback**: Open web version
- **UI**: "Prefer to use app? Copy this code: [code]" → Manual entry option

### Password Meets Requirements But Still Weak
- **Detection**: Password in common password list (e.g., "Password123!")
- **Warning**: "This password is commonly used and not secure"
- **Recommendation**: "Try a unique password" with suggestions

## Analytics Events
Track all password reset activity:
- `password_reset_requested` (email, entry_point)
- `password_reset_email_sent` (email_hash)
- `password_reset_email_opened` (from email tracking pixel)
- `password_reset_link_clicked` (token_age, platform)
- `password_reset_completed` (success, time_to_complete)
- `password_reset_failed` (reason: expired, invalid, requirements_not_met)
- `password_reset_cancelled` (stage)
- `password_reset_resent` (attempt_number)
- `password_reset_expired` (time_since_sent)
- `password_changed_from_settings`
- `account_locked` (reason)
- `rate_limit_triggered` (attempts)

## Future Enhancements (Post-MVP)
- Magic link login: Passwordless login via email
- SMS password reset: Reset via text message
- Security questions: Additional verification method
- Trusted device recognition: Skip extra steps on known devices
- Biometric password reset: Use Face ID/Touch ID to reset
- Social account recovery: Reset via Google/Apple account
- Password manager integration: Suggest password managers
- Breach detection: Alert if password found in data breach
- Password history: Prevent reusing any password from last 10
- Scheduled password changes: Remind to change password periodically
- Password strength scoring: Advanced entropy calculation
- Multi-factor reset: Require 2FA to reset password (if 2FA enabled)
- Account recovery codes: One-time codes for emergency access
- Recovery contact: Designate trusted contact for account recovery
- Progressive security: Stricter rules for high-value accounts
