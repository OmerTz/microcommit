# Welcome Screen

## Overview
The Welcome Screen is the first impression users get when they open MicroCommit. It serves as the landing screen for new users and must quickly communicate the value proposition while providing clear paths to get started or sign in.

## Screen Purpose
- Introduce the MicroCommit brand and value proposition
- Build trust through social proof
- Provide immediate access to authentication
- Create excitement about the platform
- Set the tone for the user experience

## Access
- **Entry Points**:
  - App launch (first time, not authenticated)
  - Deep link from marketing campaigns
  - Web landing redirect to mobile app
  - After app reinstall (if logged out)
- **Exit Points**:
  - "Get Started" → Authentication Screen
  - "Sign In" → Authentication Screen (login mode)

---

## Layout Structure

### Top Section: Branding (25% of screen)
**Elements**:

1. **App Logo**:
   - Centered at top
   - Size: 100x100px or 120x120px
   - Animated entrance (scale in + fade)
   - Brand colors: Teal gradient (#2DD4BF to #14B8A6)

2. **App Name**:
   - "MicroCommit" text
   - Font: Inter Bold, 32px
   - Color: Dark gray or black (#1F2937)
   - Positioned directly below logo (8px spacing)

3. **Tagline**:
   - "Achieve your goals. Help charity."
   - Font: Inter Medium, 18px
   - Color: Medium gray (#6B7280)
   - Positioned below app name (4px spacing)

**Background**: Clean white or subtle gradient

---

### Middle Section: Value Proposition (40% of screen)

#### Hero Illustration (Optional)
- Illustration or animated graphic showing:
  - Person achieving goal
  - Money flowing to charity
  - Celebration/success imagery
- Style: Modern, friendly, minimal
- Size: 200x200px to 250x250px
- Centered horizontally
- Consider Lottie animation for engagement

#### Social Proof Widget
**Container** (rounded card with subtle shadow):
```
┌─────────────────────────────────────┐
│  🎯 10,000+ goals achieved          │
│  ❤️  $50K+ donated to charity       │
│  ⭐ 4.8 rating (2,500 reviews)      │
└─────────────────────────────────────┘
```

**Stats Design**:
- Horizontal layout with icons
- Each stat on separate line
- Icons: Emoji or Lucide icons (24x24px)
- Font: Inter Semibold, 16px (numbers bold)
- Color: Dark gray text with brand color for icons
- Auto-update: Pull latest stats from backend
- Animation: Count-up effect when screen loads

**Card Styling**:
- Background: White
- Border: 1px solid light gray (#E5E7EB)
- Border radius: 12px
- Padding: 16px
- Shadow: Subtle drop shadow
- Width: 90% of screen width, centered

#### Key Features (Alternative to Hero Illustration)
If no illustration, show 3 quick feature highlights:

1. **"Set Meaningful Goals"**
   - Icon: Target (🎯)
   - 1-line description: "Choose what matters to you"

2. **"Commit to Charity"**
   - Icon: Heart (❤️)
   - 1-line description: "$5-$100 goes to good causes"

3. **"Prove Your Progress"**
   - Icon: Camera (📷)
   - 1-line description: "AI verifies your check-ins"

**Layout**: Vertical stack or 3-column grid (mobile: stack)
**Spacing**: 12px between items
**Icon size**: 32x32px

---

### Bottom Section: Call-to-Action (35% of screen)

#### Primary Action Button
**"Get Started" Button**:
```
┌─────────────────────────────────────┐
│         Get Started                 │
└─────────────────────────────────────┘
```

**Button Specs**:
- Full-width: 90% of screen width, centered
- Height: 56px (tall for prominence)
- Background: Brand teal gradient (#2DD4BF)
- Text: "Get Started" or "Start Your First Goal"
- Font: Inter Bold, 18px
- Color: White
- Border radius: 12px
- Shadow: Medium drop shadow for depth
- Tap state: Slight scale down (0.98) + darker shade

**Positioning**:
- Fixed 120px from bottom (above safe area)
- Always visible (no scrolling required)

#### Secondary Action
**"Already have an account? Sign In" Link**:

**Specs**:
- Positioned below "Get Started" button (16px spacing)
- Centered text
- Font: Inter Medium, 14px
- Color: Medium gray (#6B7280)
- "Sign In" portion: Brand teal, underlined
- Tappable area: Full line (not just "Sign In")

#### Legal Footer
**Terms and Privacy Links**:
- Small text: "By continuing, you agree to our Terms of Service and Privacy Policy"
- Font: Inter Regular, 12px
- Color: Light gray (#9CA3AF)
- Links: Tappable, open in-app browser or modal
- Positioned at very bottom (24px from safe area)

---

## Interactions

### App Launch Animation
**Sequence** (total: 1.5 seconds):
1. Logo scales in + fades in (0-0.5s)
2. App name fades in (0.3-0.7s)
3. Tagline fades in (0.5-0.9s)
4. Social proof card slides up (0.7-1.2s)
5. Buttons fade in (1.0-1.5s)

**Effect**: Creates excitement, professional feel

### "Get Started" Button Tap
- Haptic feedback (light impact)
- Button animates (scale down to 0.98)
- Navigate to Authentication Screen (signup mode)
- Transition: Slide from right

### "Sign In" Link Tap
- Haptic feedback (light)
- Navigate to Authentication Screen (login mode)
- Transition: Slide from right

### Terms/Privacy Link Tap
- Open in-app modal or bottom sheet
- Display terms text (scrollable)
- Close button (X) in top right
- Alternative: Deep link to web version

---

## States & Loading

### Initial Load State
**On app launch**:
- Show splash screen first (optional, 0.5s)
- Transition to welcome screen
- Animate elements in sequence
- Fetch social proof stats from backend

### Loading Social Proof
**While fetching stats**:
- Show placeholder: "10,000+ goals • $50K+ donated"
- Replace with real data when loaded
- If fetch fails: Keep placeholder (fallback to hardcoded values)

### Error State (Network Failure)
**If critical error**:
- Still show welcome screen (works offline)
- Use cached stats or defaults
- "Get Started" button still functional
- Error logged, not shown to user

---

## Visual Design

### Color Palette
- **Primary Brand**: Teal (#2DD4BF to #14B8A6 gradient)
- **Text Primary**: Dark gray (#1F2937)
- **Text Secondary**: Medium gray (#6B7280)
- **Text Tertiary**: Light gray (#9CA3AF)
- **Background**: White (#FFFFFF) or light gradient
- **Borders**: Light gray (#E5E7EB)
- **Shadows**: Soft, subtle (0px 2px 8px rgba(0,0,0,0.1))

### Typography
- **App Name**: Inter Bold, 32px
- **Tagline**: Inter Medium, 18px
- **Stats**: Inter Semibold, 16px (numbers bold)
- **Button**: Inter Bold, 18px
- **Links**: Inter Medium, 14px
- **Legal**: Inter Regular, 12px

### Spacing & Layout
- Screen padding: 24px horizontal (left/right)
- Top margin: 60px from safe area (below status bar)
- Bottom margin: 24px from safe area (above home indicator)
- Element spacing: 16-24px between major sections
- Alignment: Center-aligned for all text and elements

### Iconography
- Logo: Custom MicroCommit icon (vector)
- Social proof icons: Emoji or Lucide icons (consistent with dashboard)
- Size: 24x24px for inline icons, 32x32px for feature icons

---

## Accessibility

### Screen Reader Support
- "Welcome to MicroCommit" announcement
- Logo: "MicroCommit logo"
- Stats: "Ten thousand goals achieved. Fifty thousand dollars donated to charity."
- Button: "Get Started. Opens sign up screen."
- Link: "Already have an account? Sign in."

### Touch Targets
- All buttons minimum 44x44px
- "Get Started" button: 56px height (larger for emphasis)
- "Sign In" link: Minimum 44px height tappable area (padding around text)
- Terms links: Adequate spacing to prevent misclicks

### Visual Accessibility
- WCAG AA contrast compliance
- Text readable on all backgrounds
- Icon + text labels (not icon-only)
- No reliance on color alone for meaning

---

## Performance

### Load Time Optimization
- Pre-load logo and static assets
- Lazy load hero illustration (if used)
- Fetch social proof stats asynchronously
- Cache stats for 1 hour (reduce API calls)
- Total screen load: < 1 second

### Animation Performance
- Use native animations (React Native Reanimated)
- 60fps target for all transitions
- Reduce motion: Respect OS settings (accessibility)

---

## Responsive Design

### Mobile Portrait (Primary)
- Optimized for 375px - 428px width (iPhone SE to Pro Max)
- Single-column layout
- Vertical stacking of elements
- Full-width buttons (with margins)

### Mobile Landscape
- Reduce logo size (80x80px)
- Compress vertical spacing
- Consider 2-column layout for social proof

### Tablet (iPad)
- Center content in max 500px wide container
- Increase font sizes slightly (app name: 36px)
- More generous spacing

---

## Data Requirements

### API Endpoints
- **GET /api/stats/public**:
  - Returns: `{ goals_achieved: number, total_donated: number, avg_rating: number, review_count: number }`
  - Cache: 1 hour
  - Fallback: Hardcoded defaults

### Local Storage
- Cache social proof stats locally
- Track if user has seen welcome screen before (prevent re-showing)

---

## Analytics Events

Track welcome screen interactions:
- `welcome_screen_viewed` (timestamp, device_type)
- `get_started_tapped`
- `sign_in_tapped` (from welcome screen)
- `terms_link_tapped` (which: terms/privacy)
- `welcome_animation_completed` (duration)
- `social_proof_stats_loaded` (success: boolean, cached: boolean)

---

## Edge Cases

### Returning User (Logged Out)
- Same welcome screen shown
- No changes to flow
- "Sign In" might be more prominent (optional: detect returning user)

### Deep Link with Referral Code
- Welcome screen shown briefly (0.5s)
- Auto-navigate to authentication with pre-filled referral
- Show welcome screen only if user cancels signup

### App Update / Version Change
- Check if welcome screen content changed
- Optional: Show "What's New" modal after welcome
- Don't re-show welcome if user previously completed onboarding

---

## Future Enhancements (Post-MVP)

### Advanced Features
- A/B test different taglines and value props
- Personalized welcome based on referral source
- Video introduction (15-second clip)
- Interactive demo (tap through sample goal)
- Language selection option

### Localization
- Multi-language support
- Translate tagline and social proof labels
- RTL layout for Arabic/Hebrew

### Seasonal Variations
- Holiday-themed illustrations
- Charity-focused messaging (e.g., December = year-end giving)
- Update social proof dynamically ("$100K donated this month!")

---

## Design Notes for Designer

**Priority Elements**:
1. "Get Started" button (most important, largest, most colorful)
2. Social proof (builds trust)
3. Logo and branding (recognition)

**Tone**:
- Welcoming and friendly, not corporate
- Aspirational but achievable
- Focus on positive outcomes (goals + charity)

**Inspiration**:
- Duolingo's friendly, achievement-focused onboarding
- Headspace's calm, centered welcome
- Strava's community-driven social proof

**Animations**:
- Smooth, professional entrance
- Not too flashy or distracting
- Respect "Reduce Motion" accessibility setting

**Mobile-First**:
- Thumb-friendly button placement
- No horizontal scrolling
- Single-column for simplicity
