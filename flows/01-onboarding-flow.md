# Onboarding Flow

## Goal
Convert new users from app download to creating their first goal with commitment in under 5 minutes.

## Entry Points
- App store download → Launch app
- Web URL → Landing page
- Referral link → Pre-filled first goal

## Flow Steps

### Step 1: Welcome Screen (5 seconds)
**Screen**: Welcome / Landing
- **Elements**:
  - App logo and name "MicroCommit"
  - Tagline: "Achieve your goals. Help charity."
  - Social proof: "10,000+ goals achieved • $50K donated"
  - CTA: "Get Started" (primary button)
  - "Already have an account? Sign In" (text link)

- **User Action**: Tap "Get Started"
- **Next Screen**: Authentication

### Step 2: Authentication (30 seconds)
**Screen**: Sign Up / Sign In
- **Elements**:
  - "Create your account" heading
  - Sign up options:
    - Continue with Google (button)
    - Continue with Apple (button)
    - Continue with Email (button)
  - Terms and Privacy Policy (small text with links)

- **User Actions**:
  - Select authentication method
  - Complete authentication flow
  - Accept terms (implicit with sign-up)

- **Technical**:
  - Supabase Auth integration
  - Create user profile record
  - Generate user ID

- **Next Screen**: Concept Explanation

### Step 3: Concept Explanation (30 seconds)
**Screen**: How It Works (3 cards, swipeable)

**Card 1: Set Your Goal**
- Illustration: Person thinking with goal bubble
- Text: "Choose a goal you want to achieve. Pick something meaningful and specific."
- Example: "Go to the gym 3x per week"

**Card 2: Make a Commitment**
- Illustration: Hand placing money with charity icon
- Text: "Commit a small amount ($5-$100) to charity if you don't succeed."
- Example: "$15 to Red Cross"

**Card 3: Prove Your Progress**
- Illustration: Phone camera taking gym selfie
- Text: "Submit evidence (photos or check-ins). AI verifies you're on track!"
- Example: Gym selfie with green checkmark

- **Navigation**:
  - Dots indicator (showing 1 of 3, 2 of 3, 3 of 3)
  - Swipe left/right to navigate
  - "Skip" link (top right)
  - "Next" button (bottom)

- **User Actions**:
  - Swipe through cards or tap Next
  - Or tap Skip to go directly to goal creation

- **Next Screen**: Goal Template Selection

### Step 4: Choose Goal Template (30 seconds)
**Screen**: Goal Templates
- **Elements**:
  - Heading: "What do you want to achieve?"
  - Template Categories (cards with icons):
    - 🏋️ Fitness (e.g., "Gym 3x per week")
    - 📚 Learning (e.g., "Study 1 hour daily")
    - 💼 Productivity (e.g., "No phone before 9am")
    - 🧘 Wellness (e.g., "Meditate daily")
    - 🎨 Creativity (e.g., "Draw/write daily")
    - ✨ Custom (e.g., "Build your own")

- **Template Details** (tap to expand):
  - Popular examples
  - Suggested commitment amount
  - Evidence type (photo, manual confirm)

- **User Action**: Select template or Custom
- **Next Screen**: Goal Definition

### Step 5: Define Your Goal (60 seconds)
**Screen**: Goal Creation Form
- **Elements**:
  - "Define your goal" heading
  - **Goal Name** (text input):
    - Placeholder: "e.g., Go to gym 3x per week"
    - Max 60 characters

  - **Success Criteria** (text area):
    - Placeholder: "What counts as success? Be specific..."
    - Example: "Take a gym selfie showing equipment"
    - Max 200 characters

  - **Frequency** (selection):
    - Daily
    - Weekly
    - X times per week (number picker: 2-6)
    - Monthly

  - **Duration** (selection):
    - 1 week
    - 2 weeks
    - 1 month
    - Custom (date picker)

  - Progress indicator: "Step 1 of 4"
  - "Continue" button (bottom, enabled when required fields filled)

- **Validation**:
  - Goal name required (min 5 characters)
  - Success criteria required (min 10 characters)
  - Frequency and duration selected

- **User Action**: Fill form and tap Continue
- **Next Screen**: Set Commitment

### Step 6: Set Commitment Amount (45 seconds)
**Screen**: Commitment & Charity Selection
- **Elements**:
  - "Make your commitment" heading

  - **Amount Slider**:
    - Range: $5 to $100
    - Default: $15
    - Large number display above slider
    - Subtitle: "This goes to charity if you don't succeed"

  - **Charity Selection** (dropdown or modal):
    - "Choose a charity" selector
    - Charity cards with:
      - Logo
      - Name
      - One-line description
      - Example impact: "$15 could provide 3 meals"
    - Initial list: 5-10 curated charities

  - **Impact Preview**:
    - "If you succeed: Money refunded"
    - "If you don't succeed: $X donated to [Charity]"

  - Progress indicator: "Step 2 of 4"
  - "Continue" button

- **User Action**: Set amount, select charity, tap Continue
- **Next Screen**: Add Accountability (Optional)

### Step 7: Add Accountability (30 seconds, Optional)
**Screen**: Referee & Privacy Settings
- **Elements**:
  - "Add accountability?" heading
  - Subtitle: "Optional but highly recommended"

  - **Invite Referees** (optional):
    - "Invite up to 3 friends to keep you accountable"
    - Text input fields for email/phone
    - Or: "Import from contacts" button
    - Each referee shows: name/email, remove button

  - **Privacy Level** (radio buttons):
    - 🔒 Private (just you)
    - 👥 Referees Only (selected by default if referees added)
    - 🌍 Public (share with community)

  - **Reminders** (toggle):
    - "Daily reminder at [time picker]" (default 8:00 AM)
    - "Deadline warning 24 hours before"

  - Progress indicator: "Step 3 of 4"
  - "Skip" link (top right)
  - "Continue" button

- **User Action**: Add referees (optional), set privacy, enable reminders, tap Continue
- **Next Screen**: Review & Payment

### Step 8: Review & Payment (60 seconds)
**Screen**: Confirm & Pay
- **Elements**:
  - "Review your commitment" heading

  - **Goal Summary Card**:
    - Goal name
    - Frequency and duration
    - Charity name and amount
    - Referees (if any)
    - Start date: Tomorrow (or selected date)

  - **Payment Details**:
    - "Commitment Amount: $X"
    - "Platform Fee (3%): $Y"
    - "Total Charged: $Z"
    - "Refunded if you succeed!"
    - Stripe payment form (card input)
    - "Save card for future goals" checkbox

  - **Legal**:
    - "By continuing, you agree to our Terms of Service and Privacy Policy" (small text with links)
    - "I understand this is a binding commitment" (checkbox)

  - Progress indicator: "Step 4 of 4"
  - "Start My Commitment" button (primary, large)

- **User Actions**:
  - Review details
  - Enter payment info
  - Accept terms
  - Tap "Start My Commitment"

- **Technical**:
  - Validate payment method (Stripe)
  - Create goal record
  - Set up payment intent (held in escrow)
  - Send referee invitations
  - Schedule first check-in notification
  - Record goal start date/time

- **Next Screen**: Success Confirmation

### Step 9: Success Confirmation (10 seconds)
**Screen**: Goal Created Success
- **Elements**:
  - Celebration animation (confetti or checkmark)
  - "You're all set!" heading
  - Goal summary (name, first check-in date/time)
  - "Your first check-in is tomorrow at [time]"
  - Motivational message: "You've got this! We're rooting for you."
  - "View My Goal" button (primary)
  - "Add Another Goal" button (secondary)

- **User Actions**:
  - Tap "View My Goal" → Goal Detail Screen
  - Or "Add Another Goal" → Goal Template Selection (Step 4)
  - Or auto-navigate to Dashboard after 5 seconds

- **Next Screen**: Dashboard (automatically after 5 seconds if no action)

## Success Criteria
- **Completion Rate**: 70%+ of users who start onboarding complete first goal creation
- **Time to Goal**: Median time < 5 minutes from sign-up to goal created
- **Payment Success**: 80%+ successfully complete payment
- **Drop-off Points**: Monitor each step, optimize steps with >15% drop-off

## Error Handling

### Payment Failures
- Show clear error message: "Payment failed: [reason]"
- Offer alternative payment method
- "Try Again" button
- "Need Help?" link to support

### Network Issues
- Save progress locally
- Show "Saving..." indicator
- Resume where user left off when back online
- "Looks like you're offline. Changes saved locally."

### Validation Errors
- Inline error messages (real-time)
- Highlight invalid fields in red
- Provide helpful hints (e.g., "Goal name must be at least 5 characters")
- Don't block navigation, but show "Complete required fields" when trying to continue

## Edge Cases

### User Already Has Goals
- Skip onboarding explanation (Step 3)
- Go directly to Goal Template Selection

### Returning from Incomplete Onboarding
- Detect incomplete goal creation
- Show modal: "You started creating a goal. Continue or start fresh?"
- Options: "Continue" or "Start New Goal"

### Referee Invitation Failures
- Email/phone invalid: Show error, allow correction
- Referee already exists: "X is already your referee for [other goal]"
- Invitation sent: Show success message with checkmark

### Charity Selection Issues
- No charities available (technical error): Show fallback list, alert dev team
- User can't decide: Allow "Choose Later" option, reminder to pick before first check-in

## Analytics Events
Track all funnel steps:
- `onboarding_started`
- `onboarding_step_viewed` (step_number, step_name)
- `onboarding_step_completed` (step_number, step_name, time_spent)
- `goal_template_selected` (template_name)
- `goal_created` (goal_type, frequency, duration, commitment_amount)
- `charity_selected` (charity_id, charity_name)
- `referee_invited` (referee_count)
- `payment_completed` (amount, payment_method)
- `onboarding_completed` (total_time, steps_skipped)
- `onboarding_abandoned` (last_step, time_spent)

## Future Enhancements (Post-MVP)
- Personalized goal suggestions based on interests
- Import goals from other platforms (Strava, Goodreads, etc.)
- Quick goal creation from templates (1-tap)
- Gamification: "Complete 3 goals to unlock [feature]"
- A/B test different onboarding flows
