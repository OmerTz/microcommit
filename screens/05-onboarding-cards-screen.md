# Onboarding Cards Screen

## Overview
The Onboarding Cards Screen educates new users about how MicroCommit works through a swipeable 3-card carousel. This screen explains the core concept quickly and engagingly before users create their first goal.

## Screen Purpose
- Explain MicroCommit's core mechanics in 30 seconds
- Build confidence and understanding before goal creation
- Set expectations for evidence submission and AI verification
- Maintain user excitement and momentum
- Allow skip option for users who want to jump right in

## Access
- **Entry Points**:
  - Authentication Screen → Successful signup (new users only)
  - First-time app launch (if signup happened on web)
- **Exit Points**:
  - Complete all 3 cards → Goal Template Selection Screen
  - Tap "Skip" → Goal Template Selection Screen
  - Back button → Returns to Authentication (rare)

---

## Layout Structure

### Top Section: Progress & Skip

**Progress Indicators** (top center):
```
○ ○ ○  →  ● ○ ○  →  ● ● ○  →  ● ● ●
```
- Dots show current position (1 of 3, 2 of 3, 3 of 3)
- Active dot: Brand teal, larger (12px diameter)
- Inactive dots: Light gray, smaller (8px diameter)
- Spacing: 8px between dots
- Animated: Smooth fade/scale when changing cards

**Skip Button** (top right):
- Text: "Skip" or "Skip →"
- Font: Inter Medium, 16px
- Color: Medium gray (#6B7280)
- Tappable: Minimum 44x44px
- Position: 16px from top-right corner
- Always visible on all 3 cards

---

### Middle Section: Card Carousel (80% of screen)

**Card Container**:
- Full-width swipeable carousel
- Horizontal scroll/swipe
- Snap to card center
- Smooth spring animation
- Pagination enabled (one card at a time)

---

#### Card 1: Set Your Goal

**Layout**:
```
┌─────────────────────────────────────┐
│                                     │
│      [Illustration/Animation]       │
│         (Person + Goal)             │
│                                     │
│      Set Your Goal                  │
│                                     │
│  Choose a goal you want to          │
│  achieve. Pick something            │
│  meaningful and specific.           │
│                                     │
│  Example:                           │
│  "Go to the gym 3x per week"        │
│                                     │
└─────────────────────────────────────┘
```

**Elements**:

1. **Illustration** (top 50% of card):
   - Visual: Person thinking with goal/target icon in thought bubble
   - Style: Friendly, minimal, colorful
   - Size: 200x200px to 250x250px
   - Animation: Light floating/pulsing (optional)
   - Format: Lottie animation or SVG

2. **Title**:
   - "Set Your Goal"
   - Font: Inter Bold, 24px
   - Color: Dark gray (#1F2937)
   - Centered

3. **Description**:
   - 2-3 lines of explanatory text
   - Font: Inter Regular, 16px
   - Color: Medium gray (#6B7280)
   - Centered
   - Max width: 80% of card width

4. **Example** (optional):
   - "Example:" label (gray)
   - Example goal in quotes: ""Go to the gym 3x per week""
   - Font: Inter Medium, 14px
   - Color: Brand teal (#2DD4BF)
   - Centered

**Card Styling**:
- Background: White
- Border radius: 16px
- Padding: 24px
- Shadow: Medium (0px 4px 12px rgba(0,0,0,0.1))
- Width: 90% of screen width, centered

---

#### Card 2: Make a Commitment

**Layout**:
```
┌─────────────────────────────────────┐
│                                     │
│      [Illustration/Animation]       │
│    (Hand + Money + Charity)         │
│                                     │
│   Make a Commitment                 │
│                                     │
│  Commit a small amount              │
│  ($5-$100) to charity if you        │
│  don't succeed.                     │
│                                     │
│  Example:                           │
│  "$15 to Red Cross"                 │
│                                     │
└─────────────────────────────────────┘
```

**Elements**:

1. **Illustration**:
   - Visual: Hand placing money with heart/charity icon
   - Emphasis on charity benefit (positive, not punishment)
   - Size: 200x200px to 250x250px
   - Animation: Money floating to charity icon

2. **Title**:
   - "Make a Commitment"
   - Styling: Same as Card 1

3. **Description**:
   - Explains micro-commitment concept
   - Emphasizes charity aspect (win-win)
   - Mentions amount range ($5-$100)
   - Tone: Positive, not scary

4. **Example**:
   - ""$15 to Red Cross"" or ""$25 to clean water""
   - Shows realistic, relatable amounts

**Card Styling**: Same as Card 1

---

#### Card 3: Prove Your Progress

**Layout**:
```
┌─────────────────────────────────────┐
│                                     │
│      [Illustration/Animation]       │
│    (Phone Camera + Checkmark)       │
│                                     │
│   Prove Your Progress               │
│                                     │
│  Submit evidence (photos or         │
│  check-ins). AI verifies you're     │
│  on track!                          │
│                                     │
│  Example:                           │
│  Gym selfie with ✓ checkmark        │
│                                     │
└─────────────────────────────────────┘
```

**Elements**:

1. **Illustration**:
   - Visual: Phone camera taking selfie, green checkmark appearing
   - Emphasis on AI verification (fast, easy)
   - Size: 200x200px to 250x250px
   - Animation: Camera flash → checkmark appears

2. **Title**:
   - "Prove Your Progress"
   - Styling: Same as Cards 1 & 2

3. **Description**:
   - Explains evidence submission
   - Highlights AI verification speed
   - Reassuring tone (it's easy!)

4. **Example**:
   - Visual example: Small thumbnail of gym selfie with checkmark
   - Or text: "Gym selfie with ✓" (green checkmark)

**Card Styling**: Same as Cards 1 & 2

---

### Bottom Section: Navigation Controls

**"Next" Button** (Cards 1 & 2):
```
┌─────────────────────────────────────┐
│             Next                    │
└─────────────────────────────────────┘
```
- Full-width (90% of screen)
- Height: 52px
- Background: Brand teal (#2DD4BF)
- Text: "Next" or "Next →"
- Font: Inter Bold, 16px, white
- Border radius: 12px
- Positioned: 24px from bottom (above safe area)

**"Get Started" Button** (Card 3 only):
```
┌─────────────────────────────────────┐
│         Get Started                 │
└─────────────────────────────────────┘
```
- Same styling as "Next" button
- Text: "Get Started" or "Create My First Goal"
- More prominent color (brighter teal or gradient)

**Back Navigation** (optional):
- "← Back" text link or arrow icon
- Left side, below card carousel
- Font: Inter Medium, 14px, gray
- Only on Cards 2 & 3 (Card 1 can go back to auth)

---

## Interactions

### Swipe Gesture
**Left Swipe** (next card):
1. User swipes left on card
2. Smooth slide animation (300ms)
3. Next card slides in from right
4. Progress dots update
5. Haptic feedback (light)

**Right Swipe** (previous card):
1. User swipes right
2. Smooth slide animation (300ms)
3. Previous card slides in from left
4. Progress dots update
5. Haptic feedback (light)

**Swipe Resistance**:
- Card 1: Can't swipe right (first card)
- Card 3: Can't swipe left (last card)
- Visual: Card resists with spring-back animation

### "Next" Button Tap
**Flow** (Cards 1 & 2):
1. User taps "Next"
2. Haptic feedback (light)
3. Same as left swipe: Advance to next card
4. Button text remains "Next" until Card 3

**Card 3: "Get Started" Button**:
1. User taps "Get Started"
2. Haptic feedback (medium)
3. Navigate to Goal Template Selection Screen
4. Transition: Slide from right (continue forward momentum)
5. Mark onboarding as viewed (don't show again)

### "Skip" Button Tap
**Flow** (any card):
1. User taps "Skip"
2. Confirm modal (optional): "Skip tutorial?"
   - "Yes, I understand" → Navigate to Goal Template Selection
   - "No, keep learning" → Stay on current card
3. Navigate to Goal Template Selection Screen
4. Transition: Fade or slide from right
5. Mark onboarding as skipped (track analytics)

### Progress Dots Tap (optional)
- Tap on any dot to jump to that card
- Smooth animated transition
- Useful for users who want to revisit a card

---

## States & Loading

### Initial Load
- Start on Card 1
- Dots show: ● ○ ○
- "Next" button visible
- "Skip" button in top right
- Animations play immediately (illustration entrance)

### Card Transition State
**During swipe/transition**:
- Disable buttons temporarily (prevent double-tap)
- Smooth animation (300ms)
- Update progress dots mid-transition (feels responsive)

### Auto-Advance (optional, not recommended)
- Don't auto-advance cards
- Let user control pace
- Exception: If user is inactive for 10+ seconds, subtle hint animation (card edge lifts slightly)

---

## Visual Design

### Color Palette
- **Primary**: Teal (#2DD4BF) for buttons and accents
- **Background**: White (#FFFFFF) or light gradient
- **Card Background**: White
- **Text Primary**: Dark gray (#1F2937)
- **Text Secondary**: Medium gray (#6B7280)
- **Accent**: Brand teal for examples and highlights

### Typography
- **Card Titles**: Inter Bold, 24px
- **Descriptions**: Inter Regular, 16px
- **Examples**: Inter Medium, 14px
- **Buttons**: Inter Bold, 16px
- **Skip Link**: Inter Medium, 16px

### Spacing & Layout
- Card padding: 24px all sides
- Illustration: Top 50% of card
- Text: Bottom 50% of card
- Vertical spacing: 16px between title, description, example
- Bottom button: 24px from safe area

### Illustrations
**Style Guidelines**:
- Friendly, modern, minimal
- 2-3 colors max (brand teal + neutral)
- Avoid overly detailed graphics
- Should work in light mode (dark mode: invert as needed)
- Animation duration: 1-2 seconds (loop or play once)

**Format**:
- Lottie JSON files (preferred for animation)
- SVG (fallback for static)
- WebP (if raster required)

---

## Accessibility

### Screen Reader Support
- "Onboarding screen. Page 1 of 3."
- Read title, description, and example for each card
- "Next button. Advances to next card."
- "Skip button. Skips tutorial and continues to goal creation."

### Touch Targets
- "Next" button: 52px height (sufficient)
- "Skip" link: Minimum 44x44px tappable area
- Progress dots: Optional tap targets (min 44x44px)

### Gesture Alternatives
- Always provide button alternative to swipe
- "Next" button for swipe-left
- "Back" link for swipe-right (optional)
- Keyboard navigation: Tab through buttons

### Reduce Motion
- If user has "Reduce Motion" enabled:
  - Disable card slide animations
  - Use fade transitions instead
  - Disable illustration animations

---

## Performance

### Optimization
- Pre-load all 3 cards on initial screen load
- Cache illustrations (Lottie files small, < 50KB each)
- Lazy load "Get Started" flow assets in background
- Total load time: < 1 second

### Animation Performance
- Use native animations (React Native Reanimated)
- 60fps target for swipe gestures
- Lottie animations: Limit complexity (< 100 layers)

---

## Data Requirements

### User Profile Update
- After completing or skipping onboarding:
  - Update `onboarding_viewed` = true
  - Store timestamp: `onboarding_completed_at`
  - Store `onboarding_skipped` = true (if skipped)

### Analytics Tracking
- Track which card user viewed
- Track if user swiped or used buttons
- Track if user skipped (on which card)

---

## Analytics Events

Track onboarding interactions:
- `onboarding_cards_viewed` (entry_source)
- `onboarding_card_changed` (from_card, to_card, method: swipe/button)
- `onboarding_card_viewed` (card_number, duration_seconds)
- `onboarding_next_tapped` (current_card)
- `onboarding_skip_tapped` (current_card)
- `onboarding_completed` (duration_seconds, skipped: boolean)
- `onboarding_back_tapped` (current_card)

---

## Edge Cases

### Interrupted Onboarding
- If user closes app mid-onboarding:
  - Resume on the last card viewed
  - Or restart from Card 1 (preferable for consistency)

### Returning User
- Never show onboarding again after completion
- Check `onboarding_viewed` flag before showing

### Skip Confirmation
- Optional: Show confirmation modal
- "Are you sure? This helps you understand how MicroCommit works."
- Buttons: "Skip Anyway" / "Keep Learning"
- Prevent accidental skips

---

## Responsive Design

### Mobile Portrait (Primary)
- Optimized for 375px - 428px width
- Card width: 90% of screen
- Illustrations scale proportionally

### Mobile Landscape
- Show cards horizontally (may show part of next card)
- Reduce illustration size
- Adjust padding to fit content

### Tablet (iPad)
- Center cards in max 600px wide container
- Larger illustrations (300x300px)
- Increased font sizes slightly

---

## Future Enhancements (Post-MVP)

### Advanced Features
- Video explainer (optional toggle)
- Interactive demo (tap to try sample check-in)
- Personalized onboarding based on goal type
- A/B test different illustration styles
- Localized examples (region-specific charities)

### Gamification
- Progress bar instead of dots
- Completion badge: "Tutorial Master"
- Reward for completing all 3 cards (bonus points)

### Improved UX
- Voice-over option (audio narration)
- Text-only mode (for users with slow connections)
- Expandable "Learn More" sections per card
- FAQ link on each card

---

## Design Notes for Designer

**Priority Elements**:
1. Illustrations (most important, convey concept visually)
2. Card titles (clear, concise messaging)
3. Progress indicators (help user know where they are)

**Tone**:
- Friendly and welcoming
- Educational but not preachy
- Excited about the journey ahead
- Positive focus (charity benefit, not punishment)

**Inspiration**:
- Duolingo's friendly onboarding mascot
- Headspace's calm, guided tutorials
- Robinhood's swipeable explainer cards

**Animations**:
- Smooth and professional
- Not distracting or overly playful
- Help reinforce the message (e.g., money → charity)

**Mobile-First**:
- Swipe gestures feel natural
- Large touch targets
- Easy one-handed navigation

**Key Message**:
Each card should answer:
- Card 1: What is MicroCommit? (Set goals)
- Card 2: Why is it effective? (Charity commitment)
- Card 3: How does it work? (Evidence + AI)
