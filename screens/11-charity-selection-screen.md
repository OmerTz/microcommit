# Charity Selection Screen

## Overview
The Charity Selection Screen allows users to browse and choose which charity will receive their commitment if they fail their goal. It provides detailed charity information, impact metrics, and filtering options to help users make meaningful choices.

## Screen Purpose
- Present curated list of verified charities
- Display charity missions and impact metrics
- Enable filtering by cause category
- Build trust through transparency
- Show real impact of donations
- Allow charity research and comparison

## Access
- **Entry Points**:
  - Goal Creation Form → Step 2 "Choose charity" dropdown
  - Settings → "Change default charity"
  - Goal Edit → Update charity for existing goal
  - Browse charities (explore mode, no goal context)
- **Exit Points**:
  - Select charity → Return to Goal Form with selection
  - Back button → Return to previous screen without selection

---

## Layout Structure

### Header Section
**Elements**:
- Back button (top left)
- Title: "Choose a charity"
- Subtitle: "Pick a cause you care about"
- Context indicator (if from goal): "$15 will go here if you don't succeed"

---

### Filter/Category Section
**Category Pills** (Horizontal scroll):
```
[All] [Health] [Education] [Environment] [Animals] [Poverty] [Disaster Relief]
```

**Pill Design**:
- Rounded capsules
- Selected: Teal background, white text
- Unselected: Light gray border, gray text
- Tap: Filter charity list

---

### Search Bar (Optional)
**Search Input**:
- Placeholder: "Search charities..."
- Icon: Magnifying glass
- Real-time filtering
- Clear button (X) when typing

---

### Charity List Section

**Charity Card Design**:
```
┌─────────────────────────────────────┐
│ [Logo]  Red Cross                   │
│         Emergency relief worldwide  │
│                                     │
│ 🎯 $15 provides 3 emergency meals  │
│ ⭐ 4.8 rating • 1,234 donations    │
│                                     │
│ [Select]                            │
└─────────────────────────────────────┘
```

**Card Elements**:

1. **Charity Logo**:
   - Circle or square, 60x60px
   - Left side of card
   - Fallback: Colored initial if no logo

2. **Charity Name**:
   - Font: Inter Bold, 18px
   - Color: Dark gray
   - Position: Top right of logo

3. **Mission Statement**:
   - 1-2 line description
   - Font: Inter Regular, 14px
   - Color: Medium gray
   - Truncated with "...more"

4. **Impact Preview**:
   - Icon: Target 🎯
   - Text: "$15 provides X" or "Impact: [specific outcome]"
   - Font: Inter Medium, 14px
   - Color: Brand teal
   - Dynamic based on commitment amount

5. **Social Proof**:
   - Rating: ⭐ 4.8
   - Donation count: "1,234 donations via MicroCommit"
   - Font: Inter Regular, 12px
   - Color: Gray

6. **Select Button**:
   - Text: "Select" or "Choose"
   - Style: Outlined button, teal border
   - Full-width at bottom of card
   - Tap: Select charity and return

**Card Styling**:
- Background: White
- Border: 1px solid light gray
- Border radius: 12px
- Shadow: Subtle
- Padding: 16px
- Margin: 12px between cards
- Tap state: Slight scale (0.98)

---

### Featured Charity Section (Top)
**"Recommended" Banner** (optional):
```
┌─────────────────────────────────────┐
│ ⭐ Featured This Month              │
│                                     │
│ [Charity Card - slightly larger]    │
│                                     │
│ This charity aligns with your       │
│ fitness goals                       │
└─────────────────────────────────────┘
```
- Highlight 1 charity per month
- Larger card with badge
- Personalization note (optional)

---

### Charity Detail Modal (Tap "...more")

**Bottom Sheet or Full Screen**:
```
┌─────────────────────────────────────┐
│ [Logo] Red Cross                 [X]│
│                                     │
│ About:                              │
│ Full mission statement and history  │
│                                     │
│ Impact:                             │
│ • $10 provides 2 meals              │
│ • $20 provides emergency kit        │
│ • $50 provides shelter for 1 family │
│                                     │
│ Transparency:                       │
│ • Tax ID: XX-XXXXXXX                │
│ • 95% goes to programs              │
│ • Charity Navigator: 4/4 stars      │
│                                     │
│ [Visit Website] [Select Charity]    │
└─────────────────────────────────────┘
```

**Detail Elements**:
- Full logo (larger)
- Complete mission statement
- Tiered impact metrics
- Transparency data (tax ID, ratings)
- External ratings (Charity Navigator, GuideStar)
- Website link
- "Select Charity" button (primary)

---

## Interactions

### Category Filter Tap
**Flow**:
1. User taps category pill (e.g., "Health")
2. Pill changes to selected state
3. Charity list filters to category
4. Scroll resets to top
5. Show count: "12 charities in Health"

### Charity Card Tap (Not Button)
**Flow**:
1. User taps anywhere on card (not "Select" button)
2. Open charity detail modal
3. Show full information
4. User can read more or select

### "Select" Button Tap
**Flow**:
1. User taps "Select" on card
2. Haptic feedback (medium)
3. Card briefly highlights (green border)
4. Return to previous screen (Goal Form Step 2)
5. Pre-fill charity: Name, logo, impact preview
6. Show toast: "Red Cross selected"

### Search
**Flow**:
1. User types in search bar
2. Real-time filter as they type
3. Show "No results" if no matches
4. Clear button to reset search

---

## States & Loading

### Initial Load
- Show skeleton cards (3-5)
- Fetch charity list from API
- Populate cards when data ready
- Load time: < 1 second (cached)

### Empty State (No Charities)
- Illustration: Empty box or sad emoji
- "No charities found"
- "Try a different category or search term"
- "Contact support" link

### Error State (API Failure)
- Error message: "Couldn't load charities"
- "Try again" button
- Fallback: Show 3 hardcoded default charities

### Offline Mode
- Show cached charity list
- Banner: "Showing cached results. Connect for latest."
- Selection still works

---

## Visual Design

### Color Palette
- **Background**: Light gray (#F9FAFB)
- **Cards**: White with shadow
- **Primary**: Teal (#2DD4BF) for selected state
- **Text Primary**: Dark gray (#1F2937)
- **Text Secondary**: Medium gray (#6B7280)
- **Borders**: Light gray (#E5E7EB)
- **Impact Text**: Teal (#2DD4BF)

### Typography
- **Title**: Inter Bold, 28px
- **Charity Name**: Inter Bold, 18px
- **Mission**: Inter Regular, 14px
- **Impact**: Inter Medium, 14px
- **Social Proof**: Inter Regular, 12px

### Layout
- Screen padding: 16px
- Card padding: 16px
- Card spacing: 12px
- Logo size: 60x60px
- Button height: 44px

---

## Data Requirements

### Charity Object Structure
```json
{
  "id": "red_cross",
  "name": "American Red Cross",
  "logo_url": "https://...",
  "mission_short": "Emergency relief worldwide",
  "mission_full": "Full mission statement...",
  "category": "disaster_relief",
  "impact_tiers": {
    "5": "1 meal",
    "15": "3 meals",
    "25": "5 meals + water"
  },
  "rating": 4.8,
  "donation_count": 1234,
  "tax_id": "XX-XXXXXXX",
  "transparency": {
    "program_percent": 0.95,
    "charity_navigator_rating": 4
  },
  "website": "https://redcross.org"
}
```

### API Endpoints
- **GET /api/charities**: List all charities (with pagination)
- **GET /api/charities?category=health**: Filter by category
- **GET /api/charities/:id**: Get charity details
- **GET /api/charities/featured**: Get featured charity

---

## Analytics Events
- `charity_selection_viewed` (context: goal/browse)
- `charity_category_selected` (category)
- `charity_searched` (search_term)
- `charity_card_tapped` (charity_id, source: list/featured)
- `charity_detail_viewed` (charity_id)
- `charity_selected` (charity_id, amount)
- `charity_website_opened` (charity_id)

---

## Trust & Transparency

### Verification Badges
- ✅ "Verified 501(c)(3)"
- ⭐ "4-star Charity Navigator"
- 🏆 "GuideStar Platinum"

### Impact Transparency
- Show exactly where money goes
- Display percentage to programs vs overhead
- Real impact metrics (meals, vaccinations, trees planted)

### User-Generated Social Proof
- "1,234 MicroCommit users support this charity"
- Average rating from users (optional, post-MVP)

---

## Accessibility
- Screen reader: "Charity selection. List of X charities."
- Each card: Full charity info read aloud
- Search: "Search charities. Text field."
- Select button: "Select [Charity Name]. Button."
- High contrast for logos and text

---

## Future Enhancements
- "Recently selected" charities (quick access)
- "My favorites" saved charities
- Charity comparison (side-by-side)
- Charity impact stories and testimonials
- User reviews and ratings
- Split donation across multiple charities
- Charity of the month with spotlight
- Local charity suggestions based on location
- Impact tracking: "You've donated $X total to this charity"
