# Goal Template Selection Screen

## Overview
The Goal Template Selection Screen helps users quickly choose a goal category or template to streamline the goal creation process. It provides curated templates with pre-filled suggestions while allowing full customization.

## Screen Purpose
- Reduce friction in goal creation with templates
- Inspire users with popular goal examples
- Categorize goals for better organization
- Provide starting points for new users
- Allow custom goals for experienced users

## Access
- **Entry Points**:
  - Onboarding Cards Screen → "Get Started" button (new users)
  - Dashboard → "Create New Goal" button (existing users)
  - Quick Actions → "New Goal" tile
- **Exit Points**:
  - Select template → Goal Creation Form Screen (pre-filled)
  - Select "Custom" → Goal Creation Form Screen (blank)
  - Back button → Dashboard (existing users) or Onboarding (new users)

---

## Layout Structure

### Header Section
**Elements**:
1. **Back Button** (top left) - for existing users only
2. **Title**: "What do you want to achieve?"
   - Font: Inter Bold, 28px
   - Color: Dark gray (#1F2937)
3. **Subtitle**: "Choose a template or create your own"
   - Font: Inter Regular, 16px
   - Color: Medium gray (#6B7280)

---

### Template Categories Section

**Category Cards** (Grid Layout):

#### 1. 🏋️ Fitness
- Title: "Fitness"
- Icon: Dumbbell emoji or gym icon
- Examples: "Gym 3x/week", "Run 5K", "Yoga daily"
- Badge: "Popular"
- Tap: Expand to show fitness templates

#### 2. 📚 Learning
- Title: "Learning"
- Icon: Book emoji or education icon
- Examples: "Study 1hr daily", "Learn Spanish", "Read 20 pages"
- Tap: Show learning templates

#### 3. 💼 Productivity
- Title: "Productivity"
- Icon: Briefcase emoji
- Examples: "No phone before 9am", "Write 500 words", "Wake up at 6am"
- Tap: Show productivity templates

#### 4. 🧘 Wellness
- Title: "Wellness"
- Icon: Meditation emoji
- Examples: "Meditate 10min", "Sleep 8hrs", "No alcohol"
- Tap: Show wellness templates

#### 5. 🎨 Creativity
- Title: "Creativity"
- Icon: Art palette emoji
- Examples: "Draw daily", "Write poetry", "Practice instrument"
- Tap: Show creativity templates

#### 6. ✨ Custom
- Title: "Custom Goal"
- Icon: Sparkles or plus icon
- Subtitle: "Build your own"
- Tap: Go to blank goal form

**Card Design**:
- Size: 2-column grid (mobile), 3-column (tablet)
- Height: 120px
- Background: White with gradient accent
- Border: 1px solid light gray
- Border radius: 12px
- Shadow: Subtle
- Tap state: Scale to 0.98

---

### Template Details Modal (After Category Selection)

**Modal Layout** (Bottom Sheet):
```
┌─────────────────────────────────────┐
│  Fitness Goals                   [X]│
│                                     │
│  Popular Templates:                 │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🏋️ Gym 3x per week          │   │
│  │ Commitment: $15-$25         │   │
│  │ Evidence: Gym selfie        │   │
│  │ [Use This]                  │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🏃 Run 5K daily             │   │
│  │ Commitment: $20             │   │
│  │ Evidence: Running app       │   │
│  │ [Use This]                  │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Or Create Custom Fitness Goal]   │
└─────────────────────────────────────┘
```

**Template Cards**:
- Goal name (bold)
- Suggested commitment amount
- Evidence type required
- Success rate stat: "85% succeed"
- "Use This" button → Pre-fill goal form

---

## Interactions

### Category Card Tap
1. User taps category (e.g., "Fitness")
2. Haptic feedback
3. Open bottom sheet modal with templates
4. Show 3-5 popular templates in category
5. "Create Custom" option at bottom

### Template Selection
1. User taps "Use This" on template
2. Navigate to Goal Creation Form
3. Pre-fill: name, criteria, frequency suggestions
4. User can edit all pre-filled values
5. Mark template_id for analytics

### Custom Goal
1. User taps "Custom Goal" category
2. Navigate to Goal Creation Form
3. All fields blank
4. No pre-filled suggestions

---

## States & Loading

### Initial Load
- Show all 6 categories immediately (no loading)
- Categories static (no API call)
- Templates load on category selection

### Loading Templates
- Show skeleton cards in modal
- Fetch from API or use cached templates
- Load time: < 500ms

### Empty State
- If no templates available in category:
  - "No templates yet. Create your own!"
  - Direct "Create Custom" button

---

## Visual Design

### Color Palette
- **Category Cards**: White background with category-colored accent
  - Fitness: Green (#22C55E)
  - Learning: Blue (#3B82F6)
  - Productivity: Purple (#8B5CF6)
  - Wellness: Pink (#EC4899)
  - Creativity: Orange (#F97316)
  - Custom: Teal (#2DD4BF)

### Typography
- **Title**: Inter Bold, 28px
- **Category Names**: Inter Semibold, 18px
- **Examples**: Inter Regular, 14px
- **Buttons**: Inter Bold, 16px

---

## Data Requirements

### API Endpoints
- **GET /api/templates**: Returns goal templates by category
- **GET /api/templates/popular**: Returns top 10 most-used templates

### Template Structure
```json
{
  "id": "template_001",
  "category": "fitness",
  "name": "Go to gym 3x per week",
  "success_criteria": "Take selfie with gym equipment",
  "frequency": "3x_weekly",
  "suggested_amount": 20,
  "evidence_type": "photo",
  "success_rate": 0.85
}
```

---

## Analytics Events
- `template_selection_viewed`
- `category_tapped` (category_name)
- `template_selected` (template_id, category)
- `custom_goal_selected`
- `template_modal_closed` (method: back/x/outside)

---

## Future Enhancements
- Search bar for templates
- "Trending this week" section
- Personalized suggestions based on user history
- Community-created templates
- Template ratings and reviews
