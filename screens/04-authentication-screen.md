# Authentication Screen

## Overview
The Authentication Screen handles both sign-up and sign-in flows in a unified interface. It provides multiple authentication methods (social and email) with a focus on speed and security while maintaining user trust.

## Screen Purpose
- Enable new users to create accounts quickly
- Allow returning users to sign in seamlessly
- Support multiple authentication providers
- Ensure secure, compliant authentication
- Minimize friction in the onboarding process

## Access
- **Entry Points**:
  - Welcome Screen → "Get Started" button (signup mode)
  - Welcome Screen → "Sign In" link (login mode)
  - Deep link from email verification
  - Session expired prompt
  - Logout → Re-authentication
- **Exit Points**:
  - Successful signup → Onboarding Cards Screen
  - Successful login → Dashboard Screen (if onboarding complete)
  - Successful login → Resume onboarding (if incomplete)

---

## Layout Structure

### Mode: Sign Up (Default from "Get Started")

#### Header Section
**Elements**:

1. **Back Button** (top left):
   - Arrow icon (←)
   - Returns to Welcome Screen
   - Color: Dark gray (#374151)

2. **Page Title**:
   - "Create your account"
   - Font: Inter Bold, 28px
   - Color: Dark gray (#1F2937)
   - Left-aligned (24px from left edge)

3. **Subtitle**:
   - "Join thousands achieving their goals"
   - Font: Inter Regular, 16px
   - Color: Medium gray (#6B7280)
   - Positioned below title (8px spacing)

**Height**: ~100-120px

---

#### Social Authentication Section (Primary)

**Container**: Vertical stack of social auth buttons

**Button 1: Continue with Google**
```
┌─────────────────────────────────────┐
│  [G] Continue with Google           │
└─────────────────────────────────────┘
```
- Google logo icon (left side, 24x24px)
- Full-width button (90% of screen)
- Height: 52px
- Background: White
- Border: 1px solid light gray (#E5E7EB)
- Text: Inter Semibold, 16px, dark gray
- Tap state: Light gray background

**Button 2: Continue with Apple**
```
┌─────────────────────────────────────┐
│  [] Continue with Apple             │
└─────────────────────────────────────┘
```
- Apple logo icon (left side, 24x24px)
- Style: Match Google button
- iOS: Use Sign in with Apple native button
- Android: Custom styled button

**Button 3: Continue with Email**
```
┌─────────────────────────────────────┐
│  ✉️ Continue with Email              │
└─────────────────────────────────────┘
```
- Email icon (left side, 24x24px)
- Style: Match social buttons
- Lower priority (tertiary)

**Spacing**: 12px between buttons
**Total Height**: ~200px

---

#### Divider Section
**"OR" Divider**:
- Horizontal line with "OR" text in center
- Line color: Light gray (#E5E7EB)
- Text: Inter Medium, 14px, medium gray
- Only shown if email option is separate

---

#### Alternative Auth Section (If Email Expanded)
**Email/Password Form** (conditionally shown):

When "Continue with Email" is tapped, expand inline form:

1. **Email Input**:
   ```
   ┌─────────────────────────────────────┐
   │ Email address                       │
   │ you@example.com                     │
   └─────────────────────────────────────┘
   ```
   - Label: "Email address" (above field)
   - Placeholder: "you@example.com"
   - Input type: Email keyboard
   - Validation: Real-time (check format)
   - Error: "Please enter a valid email"

2. **Password Input** (Sign Up):
   ```
   ┌─────────────────────────────────────┐
   │ Password                            │
   │ •••••••• [👁️]                       │
   └─────────────────────────────────────┘
   ```
   - Label: "Password" (above field)
   - Input type: Secure text entry
   - Show/hide toggle (eye icon, right side)
   - Password strength indicator (below field)
   - Minimum: 8 characters

3. **Password Requirements** (Sign Up only):
   - "At least 8 characters"
   - Checkmarks appear as requirements are met
   - Font: Inter Regular, 12px, gray

**Submit Button**:
```
┌─────────────────────────────────────┐
│       Create Account                │
└─────────────────────────────────────┘
```
- Full-width, 52px height
- Background: Brand teal (#2DD4BF)
- Text: "Create Account" (signup) or "Sign In" (login)
- Font: Inter Bold, 16px, white
- Disabled until form valid

---

### Mode: Sign In (From "Sign In" Link)

**Layout Changes**:
1. **Title**: "Welcome back"
2. **Subtitle**: "Sign in to continue"
3. **Social Buttons**: Same (Google, Apple, Email)
4. **Email Form** (if email selected):
   - Email input
   - Password input (no strength indicator)
   - "Forgot password?" link (right-aligned)
   - Submit button: "Sign In"

---

### Footer Section

#### Mode Toggle
**Switch Between Sign Up and Sign In**:

- Sign Up mode: "Already have an account? **Sign In**"
- Sign In mode: "Don't have an account? **Sign Up**"
- Font: Inter Regular, 14px
- Tappable portion underlined
- Centered at bottom (16px from safe area)

#### Legal Text
**Terms and Privacy** (Sign Up only):
- "By signing up, you agree to our Terms of Service and Privacy Policy"
- Font: Inter Regular, 12px, light gray
- Links tappable
- Positioned below mode toggle (8px spacing)

---

## Interactions

### Social Auth Button Tap (Google/Apple)
**Flow**:
1. User taps "Continue with Google/Apple"
2. Haptic feedback (light)
3. Show loading spinner overlay on screen
4. Open native OAuth flow (popup/browser)
5. User authorizes app
6. Return to app with token
7. Create/authenticate user in Supabase
8. Navigate to next screen (onboarding or dashboard)

**Loading State**:
- Full-screen semi-transparent overlay
- Spinner with "Connecting..." text
- Prevents multiple taps

**Error Handling**:
- User cancels: Return to auth screen, no error
- Auth fails: Show error banner at top
- Network error: "Connection failed. Try again."

### Email Auth Button Tap
**Flow**:
1. User taps "Continue with Email"
2. Smooth expand animation (200ms)
3. Show email/password form inline
4. Focus on email input (keyboard appears)
5. Button changes to "Create Account" or "Sign In"

**Collapse**:
- Tap back button or tap social auth button
- Smooth collapse animation

### Form Submission (Email/Password)
**Validation Sequence**:
1. Check email format (real-time)
2. Check password requirements (signup only)
3. Enable submit button when valid
4. On submit: Show loading spinner on button
5. Call Supabase Auth API
6. Handle success/error

**Success (Sign Up)**:
1. Account created in Supabase
2. Send verification email (optional)
3. Navigate to onboarding cards
4. Show success toast: "Welcome! Let's get started"

**Success (Sign In)**:
1. Session established
2. Check onboarding status
3. Navigate to dashboard or resume onboarding
4. No toast (seamless transition)

**Error States**:
- Email already exists: "This email is already registered. Sign in instead?"
- Wrong password: "Incorrect email or password"
- Weak password: "Password must be at least 8 characters"
- Network error: "Connection failed. Try again."

### "Forgot Password" Link
1. Tap link
2. Navigate to password reset flow (separate screen or modal)
3. Enter email → Send reset link

### Mode Toggle Tap
1. Tap "Sign In" or "Sign Up" link
2. Smooth transition (fade content)
3. Update title, subtitle, button text
4. Preserve email input (if partially filled)

---

## States & Loading

### Initial Load
- Show signup mode by default (from "Get Started")
- Show login mode if from "Sign In" link
- Pre-fill email if passed via deep link

### Loading State (OAuth in Progress)
**Full-screen overlay**:
- Semi-transparent dark background (rgba(0,0,0,0.5))
- Centered spinner (brand teal)
- Text: "Connecting to [Provider]..."
- Prevent all interactions

### Loading State (Email Submit)
**Button loading**:
- Button remains enabled but shows spinner
- Text changes to "Creating account..." or "Signing in..."
- Disable form inputs

### Error State
**Error Banner** (top of screen, below header):
```
┌─────────────────────────────────────┐
│ ⚠️  Authentication failed           │
│ [Error message here]                │
│ [X]                                 │
└─────────────────────────────────────┘
```
- Red/amber background
- Icon: Warning
- Message: Specific error text
- Dismissible: X button or auto-dismiss after 5s

### Network Offline
**Banner**:
- "You're offline. Connect to continue."
- Disable all auth buttons
- Show retry when back online

---

## Visual Design

### Color Palette
- **Primary**: Teal (#2DD4BF) for submit button
- **Borders**: Light gray (#E5E7EB)
- **Background**: White (#FFFFFF)
- **Text Primary**: Dark gray (#1F2937)
- **Text Secondary**: Medium gray (#6B7280)
- **Error**: Red (#EF4444)
- **Success**: Green (#22C55E)

### Typography
- **Title**: Inter Bold, 28px
- **Subtitle**: Inter Regular, 16px
- **Button Text**: Inter Semibold, 16px
- **Input Labels**: Inter Medium, 14px
- **Input Text**: Inter Regular, 16px
- **Helper Text**: Inter Regular, 12px

### Input Field Styling
- Height: 48px
- Border: 1px solid light gray
- Border radius: 8px
- Focus state: Border changes to brand teal
- Error state: Border changes to red
- Background: White
- Padding: 12px horizontal

### Button Styling
- Height: 52px
- Border radius: 12px
- Shadow: Subtle (0px 1px 3px rgba(0,0,0,0.1))
- Active state: Scale down to 0.98

---

## Accessibility

### Screen Reader Support
- Title: "Create your account" or "Welcome back"
- Buttons: "Continue with Google. Opens Google sign in"
- Inputs: Proper labels and hints
- Errors: Announced immediately

### Touch Targets
- All buttons minimum 44x44px (52px height meets this)
- Input fields: 48px height
- Links: Minimum 44px tappable area

### Keyboard Navigation
- Tab through inputs and buttons
- Enter key submits form
- Escape key dismisses error banner

---

## Security Considerations

### Password Requirements
- Minimum 8 characters
- At least one letter and one number (optional, recommended)
- No maximum length
- Never store plaintext
- Use Supabase Auth encryption

### OAuth Security
- Use PKCE flow for mobile
- Verify redirect URIs
- Handle state parameter
- Secure token storage (Supabase handles)

### Session Management
- Store session tokens securely (Keychain/Keystore)
- Auto-refresh tokens before expiry
- Logout clears all tokens

---

## Data Requirements

### API Endpoints
- **Supabase Auth**:
  - `supabase.auth.signInWithOAuth({ provider: 'google' })`
  - `supabase.auth.signInWithOAuth({ provider: 'apple' })`
  - `supabase.auth.signUp({ email, password })`
  - `supabase.auth.signInWithPassword({ email, password })`
  - `supabase.auth.resetPasswordForEmail({ email })`

### User Profile Creation
- After successful auth, create user profile record:
  - `user_id` (from Supabase Auth)
  - `email`
  - `display_name` (from OAuth or prompt later)
  - `created_at`
  - `onboarding_completed` (false initially)

---

## Analytics Events

Track authentication interactions:
- `auth_screen_viewed` (mode: signup/login)
- `auth_method_selected` (provider: google/apple/email)
- `auth_form_submitted` (provider)
- `auth_success` (provider, duration)
- `auth_error` (provider, error_type)
- `auth_mode_toggled` (from: signup/login, to: login/signup)
- `forgot_password_tapped`
- `auth_cancelled` (provider, stage)

---

## Edge Cases

### Email Already Verified
- If user signs up but email already exists
- Show: "This email is already registered. Sign in instead?"
- Auto-toggle to login mode

### Email Not Verified (If Verification Required)
- After signup, show: "Check your email to verify"
- Resend verification link option
- Allow access to app even if not verified (verify later)

### Session Expired
- Show login screen with message: "Your session expired. Please sign in again."
- Pre-fill email if available
- After login, return to previous screen

### Social Auth Fails (User Denies)
- User cancels OAuth: Silently return to auth screen
- No error shown (user chose to cancel)

### Multiple Accounts (Same Email, Different Providers)
- User signs up with Google, later tries email with same address
- Supabase handles: Link accounts or show error
- Show: "This email is linked to Google. Sign in with Google."

---

## Future Enhancements (Post-MVP)

### Advanced Features
- Biometric authentication (Face ID, Touch ID)
- Magic link (passwordless email login)
- SMS/Phone number authentication
- Two-factor authentication (2FA)
- Passkey support

### Social Features
- Referral code input during signup
- "Sign up with referral code" field
- Pre-fill referral if from deep link

### Improved UX
- Remember me checkbox (keep signed in)
- Auto-fill email from device clipboard
- Detect email domain for corporate accounts
- Progressive profiling (collect more info later)

---

## Design Notes for Designer

**Priority Elements**:
1. Social auth buttons (fastest, most used)
2. Email form (fallback for users without social accounts)
3. Mode toggle (easy to switch between signup/login)

**Tone**:
- Trustworthy and secure
- Fast and frictionless
- Clear and simple (no jargon)

**Inspiration**:
- Notion's clean, minimal auth screen
- Stripe's professional OAuth flow
- Calm's welcoming sign-up experience

**Mobile-First**:
- Large, thumb-friendly buttons
- Minimal scrolling
- Keyboard avoidance (inputs scroll into view)

**Trust Signals**:
- Display security badges (optional)
- Mention "Powered by Supabase" for credibility
- Clear privacy messaging
