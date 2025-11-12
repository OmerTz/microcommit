# Goal Template Selection Screen - Design Specification

## Overview
Browse goal templates by category or create custom goal. Clean, browsable interface with visual template cards.

---

## Visual Hierarchy

```
[SEARCH BAR] ← Top, prominent
       ↓
[CATEGORY FILTER CHIPS] ← Horizontal scroll
       ↓
[TEMPLATE CARDS GRID] ← Primary content, scrollable
       ↓
[CREATE CUSTOM BUTTON] ← Fixed bottom, alternative path
```

---

## Color Scheme

```
Background: Gray 50

Search Bar:
  - Background: White
  - Border: 1px solid Gray 300
  - Focus: Teal 400 border
  - Icon: Gray 400

Category Chips:
  - Inactive: White background, Gray 300 border, Gray 700 text
  - Active: Teal 400 background, White text
  - Icon: Matches text color

Template Cards:
  - Background: White
  - Border: 1px solid Gray 200
  - Hover: Teal 50 background, Teal 300 border
  - Selected: Teal 400 border (2px)
  - Shadow: Small elevation (default), Medium (hover)

Category Icon Backgrounds:
  - Fitness: Red 50, Red 500 icon
  - Learning: Blue 50, Blue 500 icon
  - Productivity: Amber 50, Amber 500 icon
  - Health: Green 50, Green 500 icon
  - Mindfulness: Purple 50, Purple 500 icon
  - Finance: Teal 50, Teal 500 icon

Create Custom Button:
  - Background: White
  - Border: 2px dashed Teal 400
  - Icon: Plus (Teal 500, 32px)
  - Text: Teal 500
  - Hover: Teal 50 background
```

---

## Typography

```
Search Placeholder:
  - Font: Inter Regular
  - Size: 16px
  - Color: Gray 400

Category Chip:
  - Font: Inter Semibold
  - Size: 14px
  - Color: Gray 700 (inactive), White (active)

Template Card Title:
  - Font: Inter Semibold
  - Size: 16px
  - Line Height: 24px
  - Color: Gray 900

Template Card Description:
  - Font: Inter Regular
  - Size: 14px
  - Line Height: 20px
  - Color: Gray 600
  - Max Lines: 2 (ellipsis)

Template Metadata:
  - Font: Inter Medium
  - Size: 12px
  - Color: Gray 500

Create Custom Text:
  - Font: Inter Semibold
  - Size: 16px
  - Color: Teal 500
```

---

## Spacing & Layout

```
Screen Padding: 16px horizontal

Search Bar:
  - Height: 48px
  - Margin: 16px bottom
  - Padding: 12px 16px
  - Border Radius: 12px

Category Chips Container:
  - Height: 40px
  - Margin Bottom: 20px
  - Horizontal scroll (no scrollbar)

Category Chip:
  - Height: 36px
  - Padding: 8px 16px
  - Border Radius: Full (pill)
  - Gap: 8px between chips
  - First chip: Margin Left 16px
  - Last chip: Margin Right 16px

Template Cards Grid:
  - Columns: 2 (mobile), 3 (tablet)
  - Gap: 12px horizontal and vertical
  - Padding Bottom: 100px (space for fixed button)

Template Card:
  - Aspect Ratio: 1:1.2 (portrait)
  - Padding: 16px
  - Border Radius: 12px

Create Custom Button:
  - Height: 64px
  - Width: Full (minus 32px padding)
  - Fixed: 16px from bottom (above safe area)
  - Border Radius: 12px
  - Padding: 16px
```

---

## Component Styling

```css
Search Bar:
  - Display: Flex Row
  - Align Items: Center
  - Background: White
  - Border: 1px solid #D1D5DB
  - Border Radius: 12px
  - Height: 48px
  - Padding: 0 16px
  - Focus Within: Border #2DD4BF, shadow small

Search Icon:
  - Size: 20px
  - Color: #9CA3AF
  - Margin Right: 8px

Search Input:
  - Flex: 1
  - Border: None
  - Font: Inter Regular, 16px
  - Color: #111827

Category Chip:
  - Display: Flex Row
  - Align Items: Center
  - Gap: 6px
  - Height: 36px
  - Padding: 0 16px
  - Border: 1px solid #D1D5DB
  - Border Radius: Full (pill)
  - Background: White
  - Transition: 200ms ease

  Active:
    - Background: #2DD4BF
    - Border: #2DD4BF
    - Color: White

Template Card:
  - Display: Flex Column
  - Background: White
  - Border: 1px solid #E5E7EB
  - Border Radius: 12px
  - Padding: 16px
  - Box Shadow: Small elevation
  - Transition: 200ms ease
  - Hover: Border #2DD4BF (2px), shadow medium
  - Pressed: Scale 0.98

Category Icon Container:
  - Width: 48px
  - Height: 48px
  - Border Radius: 12px
  - Background: [category color 50]
  - Display: Flex
  - Align Items: Center
  - Justify Content: Center
  - Margin Bottom: 12px

Category Icon:
  - Size: 24px
  - Color: [category color 500]

Template Title:
  - Font: Inter Semibold, 16px
  - Color: #111827
  - Margin Bottom: 6px

Template Description:
  - Font: Inter Regular, 14px
  - Color: #6B7280
  - Line Height: 20px
  - Overflow: Hidden
  - Text Overflow: Ellipsis
  - Display: -webkit-box
  - -webkit-line-clamp: 2
  - Margin Bottom: 12px

Template Metadata:
  - Display: Flex Row
  - Gap: 12px
  - Font: Inter Medium, 12px
  - Color: #9CA3AF

Metadata Item:
  - Display: Flex Row
  - Align Items: Center
  - Gap: 4px

Metadata Icon:
  - Size: 14px
  - Color: #9CA3AF

Create Custom Button:
  - Display: Flex Row
  - Align Items: Center
  - Justify Content: Center
  - Gap: 8px
  - Height: 64px
  - Background: White
  - Border: 2px dashed #2DD4BF
  - Border Radius: 12px
  - Pressed: Background #F0FDFA
```

---

## Animations

```
Search Focus:
  - Border color: Gray 300 → Teal 400 (200ms)
  - Shadow: Fade in (150ms)

Category Chip Toggle:
  - Background + text color transition (200ms)
  - Scale: 1.0 → 0.95 → 1.0 (on tap)

Template Card Interaction:
  - Hover (web): Scale 1.02, shadow increase (200ms)
  - Pressed: Scale 0.98 (100ms)
  - Selected: Border pulse animation (500ms)

Grid Load:
  - Cards stagger in: Fade + slide up
  - Delay: 50ms between cards
  - Duration: 300ms each

Create Custom Button:
  - Pressed: Background color fade (150ms)
  - Icon: Rotate 90° (200ms) on press
```

---

## Interaction States

```
Search Bar:
  - Empty: Placeholder text, gray icon
  - Typing: Active cursor, Teal border
  - Has Text: Show clear button (X icon)
  - Results: Filter cards dynamically

Category Chips:
  - Default: White background, gray border
  - Active: Teal background, white text
  - Multi-select: No (radio behavior)
  - "All" chip: Selected by default

Template Card:
  - Default: White, small shadow
  - Hover: Teal background (5% opacity), border Teal
  - Pressed: Scale 0.98
  - Tapped: Navigate to goal creation form with template data

Create Custom Button:
  - Default: Dashed border, Teal text
  - Hover: Teal 50 background
  - Pressed: Teal 100 background
  - Tapped: Navigate to goal creation form (blank)
```

---

## Template Card Content

```
Example Cards:

1. "Morning Workout" (Fitness)
   - Icon: Dumbbell (Red 500)
   - Description: "Exercise for 30+ minutes, 5 days/week"
   - Metadata: "🔥 2.4K using" | "⭐ 4.8 rating"

2. "Read Daily" (Learning)
   - Icon: Book (Blue 500)
   - Description: "Read for 20+ minutes every day"
   - Metadata: "🔥 3.1K using" | "⭐ 4.9 rating"

3. "No Spending Challenge" (Finance)
   - Icon: Wallet (Teal 500)
   - Description: "30-day no discretionary spending"
   - Metadata: "🔥 1.8K using" | "⭐ 4.6 rating"

Display:
  - Most popular templates first
  - Category filtering changes order
  - Search filtering shows matches only
```

---

## Empty States

```
No Search Results:
  - Icon: Search with X (Gray 300, 64px)
  - Heading: "No templates found"
  - Description: "Try different keywords or create a custom goal"
  - Button: "Create Custom Goal" (Teal)
  - Centered layout

No Templates in Category (edge case):
  - Icon: Category icon (Gray 300)
  - Heading: "Coming soon!"
  - Description: "We're adding more [Category] templates"
  - Button: "View All Templates" or "Create Custom"
```

---

## Search Functionality

```
Search Behavior:
  - Real-time filtering (debounced 300ms)
  - Searches: Title, description, tags
  - Case-insensitive
  - Partial matches highlighted

Clear Button:
  - Appears when text present
  - X icon (Gray 400, 20px)
  - Clears input and resets filter

Search History (future):
  - Recent searches dropdown
  - Max 5 items
  - Tappable to reuse
```

---

## Category Filter

```
Categories:
  - All (default)
  - Fitness
  - Learning
  - Productivity
  - Health
  - Mindfulness
  - Finance
  - Custom

Behavior:
  - Horizontal scroll (snap to start)
  - Radio selection (one active at a time)
  - Filters template cards instantly
  - Scroll position preserved

Icons:
  - All: Grid icon
  - Fitness: Dumbbell
  - Learning: Book
  - Productivity: Target
  - Health: Heart
  - Mindfulness: Brain
  - Finance: DollarSign
  - Custom: Sparkles
```

---

## Responsive Breakpoints

```
Small Mobile (320-374px):
  - Grid: 1 column
  - Card aspect ratio: 1:1.3
  - Reduce padding: 12px

Medium Mobile (375-414px):
  - Grid: 2 columns (default)
  - Card aspect ratio: 1:1.2

Large Mobile (415px+):
  - Grid: 2 columns
  - Larger cards, more generous spacing

Tablet (768px+):
  - Grid: 3 columns
  - Max content width: 800px (centered)
  - Category chips: Show more inline (less scroll)
```

---

## Accessibility

```
Screen Reader:
  "Goal template selection.
   Search field: Find templates.
   Heading: Categories. [Category list].
   Heading: Templates. [Template cards list].
   Button: Create custom goal."

Category Chip:
  "[Category name]. [Selected/Not selected]. Button."

Template Card:
  "[Template title]. [Description].
   [Popularity and rating metadata].
   Button."

Keyboard Navigation:
  - Tab through search, categories, template cards
  - Enter to select category or template
  - Arrow keys for grid navigation (optional)

Touch Targets:
  - Search bar: 48px height
  - Category chips: 36px height (44px tappable area with padding)
  - Template cards: Full card tappable
  - Create button: 64px height
```

---

## Performance

```
Optimization:
  - Lazy load template cards (render first 12, load more on scroll)
  - Cache template data locally
  - Compress category icons (SVG)
  - Debounce search input (300ms)

Loading State:
  - Show skeleton cards while fetching
  - Shimmer effect on placeholders
  - Maintain grid layout (prevent jumps)

Data:
  - Fetch templates on screen mount
  - Cache for session
  - Refresh on pull-to-refresh
```

---

## Design Review Notes

**Key Decisions**:
- 2-column grid (balances browsability with detail)
- Category icons with color coding (visual recognition)
- "Create Custom" as prominent option (flexibility)
- Metadata shows social proof (trust indicators)
- Horizontal chip scroll (saves vertical space)

**Implementation Priority**:
1. Template card grid with basic templates
2. Category filtering
3. Search functionality
4. Create custom navigation

**Future Enhancements**:
- Template favorites/bookmarks
- Sorting options (popular, newest, difficulty)
- Template preview modal
- User-created templates (community)

**Version**: 1.0 (MVP)
**Date**: 2025-11-12
