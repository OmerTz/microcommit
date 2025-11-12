# Goal Creation Form Screen

## Overview
The Goal Creation Form Screen is where users define their goal details, commitment amount, charity selection, and accountability settings. This is a multi-step form spread across 4 progressive screens to reduce cognitive load.

## Screen Purpose
- Capture all goal parameters (name, criteria, frequency, duration)
- Set commitment amount and select charity
- Add optional referees for accountability
- Review and confirm before payment
- Guide users through complex setup with progressive disclosure

## Access
- **Entry Points**:
  - Goal Template Selection → Template selected (pre-filled) or Custom
  - Dashboard → "Edit Goal" (existing goal)
- **Exit Points**:
  - Complete all steps → Payment Screen
  - Save draft → Dashboard (with draft indicator)
  - Cancel → Discard confirmation → Dashboard or Template Selection

---

## Multi-Step Flow

### Step 1 of 4: Define Your Goal

**Header**:
- Progress: "Step 1 of 4"
- Title: "Define your goal"
- Back button (saves as draft)

**Form Fields**:

1. **Goal Name** (required):
   - Label: "What's your goal?"
   - Placeholder: "e.g., Go to gym 3x per week"
   - Max: 60 characters
   - Validation: Min 5 characters

2. **Success Criteria** (required):
   - Label: "What counts as success?"
   - Placeholder: "Be specific about what evidence you'll provide..."
   - Example hint: "e.g., Take a gym selfie showing equipment"
   - Text area: 3-4 lines
   - Max: 200 characters
   - Validation: Min 10 characters

3. **Frequency** (required):
   - Label: "How often?"
   - Options (segmented control or dropdown):
     - Daily
     - 2x per week
     - 3x per week
     - 4x per week
     - 5x per week
     - Weekly
     - Custom

4. **Duration** (required):
   - Label: "For how long?"
   - Options:
     - 1 week
     - 2 weeks
     - 1 month
     - 2 months
     - Custom (date picker)

**"Continue" Button**:
- Bottom of screen
- Enabled when all required fields valid
- Tap: Save step 1 → Navigate to Step 2

---

### Step 2 of 4: Set Commitment

**Header**:
- Progress: "Step 2 of 4"
- Title: "Make your commitment"
- Back button (returns to Step 1, preserves data)

**Form Fields**:

1. **Amount Slider**:
   - Large number display: "$15" (center, 48px font)
   - Slider: Range $5 to $100
   - Default: $15
   - Increments: $5
   - Subtitle: "Goes to charity if you don't succeed"
   - Impact preview: "$15 could provide 3 meals" (dynamic based on charity)

2. **Charity Selection**:
   - Label: "Choose a charity"
   - Card selector (3-4 visible, scroll for more):
     ```
     ┌─────────────────────────┐
     │ [Logo] Red Cross        │
     │ Emergency relief        │
     │ ⭐ Popular choice       │
     └─────────────────────────┘
     ```
   - Each card: Logo, name, 1-line description, badge
   - Tap: Select (radio behavior)
   - "See all charities" link → Full charity list modal

**Impact Preview Box**:
- "If you succeed: $15 refunded"
- "If you don't succeed: $15 → Red Cross"
- Icons: Green checkmark (success), Heart (charity)

**"Continue" Button**:
- Enabled when charity selected
- Tap: Save step 2 → Navigate to Step 3

---

### Step 3 of 4: Add Accountability (Optional)

**Header**:
- Progress: "Step 3 of 4"
- Title: "Add accountability?"
- Subtitle: "Optional but highly recommended"
- Back button

**Form Fields**:

1. **Invite Referees** (optional):
   - Label: "Invite friends to review your check-ins"
   - Input fields: Email or phone (up to 3)
   - "Add another" button
   - Or: "Import from contacts" button
   - Each referee: Name/email, remove icon

2. **Privacy Level**:
   - Label: "Who can see your goal?"
   - Radio buttons:
     - 🔒 Private (just you)
     - 👥 Friends (referees only)
     - 🌍 Public (community visible)
   - Default: Friends (if referees added) or Private

**"Continue" Button**:
- Always enabled (optional step)
- Tap: "Skip" if no referees → Step 4
- Tap: "Continue" → Save step 3 → Navigate to Step 4

---

### Step 4 of 4: Review & Confirm

**Header**:
- Progress: "Step 4 of 4"
- Title: "Review your goal"
- Back button

**Summary Cards**:

1. **Goal Details Card**:
   - Goal name
   - Frequency & duration
   - Success criteria
   - Edit button → Back to Step 1

2. **Commitment Card**:
   - Amount: $15
   - Charity: Red Cross logo + name
   - Impact preview
   - Edit button → Back to Step 2

3. **Accountability Card** (if added):
   - Referees list (names/emails)
   - Privacy level
   - Edit button → Back to Step 3

**Total Commitment Display**:
- Large card at bottom:
  - "Total Commitment: $15"
  - "Charged only if you don't succeed"
  - Stripe logo (payment method)

**"Create Goal & Pay" Button**:
- Full-width, prominent
- Background: Brand teal
- Text: "Create Goal & Pay $15"
- Tap: Navigate to Payment Screen

**Legal Text**:
- Small text below button:
  - "By continuing, you agree to our Terms and commit to donate $X to [Charity] if you don't succeed."
  - Links: Terms, Charity info

---

## Interactions

### Form Validation
- Real-time validation (red border + error text)
- "Continue" disabled until valid
- Error messages below field

### Back Navigation
- Always saves progress as draft
- Confirmation modal if substantial data entered:
  - "Save draft?" → Yes (save) / Discard / Cancel

### Edit from Review Screen
- Tap edit button on any summary card
- Navigate back to relevant step
- Preserve all other data
- Return to Review after edit

---

## States & Loading

### Draft Auto-Save
- Save draft to local storage every 30 seconds
- Save on back navigation
- Restore draft on re-entry: "Continue where you left off?"

### Loading State
- Show skeleton during charity list load
- Disable form during save operations

### Error States
- Network error during save: "Changes not saved. Retry?"
- Invalid input: Red border + error message
- Charity selection failed: Fallback list of 3 default charities

---

## Visual Design

### Color Palette
- **Primary**: Teal (#2DD4BF) for buttons
- **Success**: Green (#22C55E) for success preview
- **Error**: Red (#EF4444) for validation errors
- **Background**: Light gray (#F9FAFB)
- **Cards**: White with shadow

### Typography
- **Titles**: Inter Bold, 24px
- **Labels**: Inter Medium, 16px
- **Input Text**: Inter Regular, 16px
- **Helper Text**: Inter Regular, 14px
- **Error Text**: Inter Regular, 12px, red

### Layout
- Form padding: 16px horizontal
- Field spacing: 20px vertical
- Card padding: 16px
- Bottom button: Fixed to bottom, 16px margin

---

## Data Requirements

### Goal Object Structure
```json
{
  "user_id": "uuid",
  "name": "Go to gym 3x per week",
  "success_criteria": "Take selfie with gym equipment",
  "frequency": "3x_weekly",
  "duration_days": 30,
  "start_date": "2024-03-15",
  "end_date": "2024-04-14",
  "commitment_amount": 15,
  "charity_id": "red_cross",
  "referees": ["email1", "email2"],
  "privacy_level": "friends",
  "template_id": "fitness_gym",
  "status": "draft"
}
```

### API Endpoints
- **POST /api/goals/draft**: Save draft goal
- **GET /api/goals/draft**: Retrieve draft
- **GET /api/charities**: List available charities
- **POST /api/goals/create**: Create final goal (after payment)

---

## Analytics Events
- `goal_form_step_viewed` (step_number)
- `goal_form_field_filled` (field_name, step)
- `goal_form_step_completed` (step_number, time_spent)
- `goal_form_back_tapped` (from_step)
- `goal_form_draft_saved` (step)
- `charity_selected` (charity_id, amount)
- `referee_added` (count)
- `goal_reviewed` (final_summary)
- `create_goal_tapped` (total_amount)

---

## Accessibility
- Form labels properly associated with inputs
- Error messages announced by screen reader
- Adequate touch targets (min 44x44px)
- High contrast for validation states
- Progress indicator accessible: "Step 1 of 4"

---

## Future Enhancements
- Smart suggestions for success criteria based on goal type
- Charity recommendations based on user values
- Referee suggestions from contacts
- AI-assisted goal refinement
- Photo upload for goal visualization
- Goal sharing preview
