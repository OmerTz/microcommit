# Charity Selection Screen - Design Specification

## Overview
Browse and select verified charities with filtering, impact metrics, and transparency information. Trust-focused design.

---

## Visual Hierarchy

```
[SEARCH BAR] ← Top, prominent
       ↓
[CATEGORY FILTER] ← Horizontal chips
       ↓
[CHARITY CARDS] ← Primary content, scrollable
       ↓
[SELECTED CHARITY BAR] ← Fixed bottom (when selected)
```

---

## Color Scheme

```
Background: Gray 50

Search Bar:
  - Background: White
  - Border: 1px solid Gray 300
  - Focus: Teal 400 border

Category Chips:
  - Inactive: White, Gray 300 border
  - Active: Teal 400 background, White text

Charity Cards:
  - Background: White
  - Border: Gray 200 (default), Teal 400 (selected - 2px)
  - Verified badge: Blue 500 background, White icon
  - Impact bar: Teal 400 fill

Selected Bar:
  - Background: Teal gradient (#2DD4BF → #14B8A6)
  - Text: White, Bold
  - Shadow: Extra large elevation
```

---

## Typography

```
Search Placeholder:
  - Font: Inter Regular
  - Size: 16px
  - Color: Gray 400

Charity Name:
  - Font: Inter Semibold
  - Size: 18px
  - Color: Gray 900

Charity Category:
  - Font: Inter Medium
  - Size: 14px
  - Color: Gray 600

Impact Text:
  - Font: Inter Regular
  - Size: 14px
  - Color: Gray 700

Verified Badge:
  - Font: Inter Semibold
  - Size: 11px
  - Color: White

Selected Bar Button:
  - Font: Inter Bold
  - Size: 18px
  - Color: White
```

---

## Spacing & Layout

```
Screen Padding: 16px horizontal

Search Bar:
  - Height: 48px
  - Margin: 16px 0
  - Padding: 12px 16px

Category Filter:
  - Height: 40px
  - Margin Bottom: 20px
  - Horizontal scroll

Charity Cards:
  - Gap: 12px vertical
  - Padding Bottom: 100px (space for selected bar)

Charity Card:
  - Padding: 16px
  - Border Radius: 12px
  - Min Height: 120px

Logo:
  - Size: 64px
  - Margin Right: 16px

Selected Bar:
  - Height: 72px
  - Fixed to bottom
  - Padding: 16px
```

---

## Charity Card Content

```
Top Row:
  - Charity logo (left)
  - Charity info (center)
  - Verified badge (top right corner)

Charity Info:
  - Name (bold, 18px)
  - Category (e.g., "Health & Wellness")
  - One-line mission statement

Impact Section:
  - "Impact: $127K donated" with icon
  - Progress bar showing relative impact
  - "Learn More" link

Selected State:
  - 2px Teal border
  - Checkmark icon (top right, overlaying badge)
  - Subtle Teal background (5% opacity)
```

---

## Component Styling

```css
Charity Card:
  - Display: Flex Row
  - Background: White
  - Border: 1px solid #E5E7EB
  - Border Radius: 12px
  - Padding: 16px
  - Box Shadow: Small elevation
  - Transition: 200ms ease
  - Pressed: Scale 0.98
  - Selected: Border 2px solid #2DD4BF

Logo Container:
  - Width: 64px
  - Height: 64px
  - Border Radius: 8px
  - Border: 1px solid #E5E7EB
  - Overflow: Hidden
  - Flex Shrink: 0

Logo Image:
  - Width: 100%
  - Height: 100%
  - Object Fit: Cover

Info Column:
  - Flex: 1
  - Padding: 0 12px
  - Display: Flex Column
  - Justify Content: Space Between

Charity Name:
  - Font: Inter Semibold, 18px
  - Color: #111827
  - Margin Bottom: 4px

Category:
  - Font: Inter Medium, 14px
  - Color: #6B7280
  - Margin Bottom: 6px

Mission Statement:
  - Font: Inter Regular, 14px
  - Color: #6B7280
  - Line Height: 20px
  - Max Lines: 2
  - Overflow: Ellipsis

Impact Row:
  - Display: Flex Row
  - Align Items: Center
  - Gap: 8px
  - Margin Top: 8px

Impact Bar:
  - Height: 4px
  - Background: #E5E7EB
  - Border Radius: Full
  - Overflow: Hidden
  - Flex: 1

Impact Fill:
  - Height: 100%
  - Background: #2DD4BF
  - Width: [calculated]%

Verified Badge:
  - Position: Absolute
  - Top: 12px
  - Right: 12px
  - Background: #3B82F6
  - Padding: 4px 8px
  - Border Radius: Full
  - Display: Flex Row
  - Align Items: Center
  - Gap: 4px

Badge Icon:
  - Size: 12px
  - Color: White

Badge Text:
  - Font: Inter Semibold, 11px
  - Color: White
  - Text Transform: Uppercase

Selected Bar:
  - Position: Fixed
  - Bottom: 0
  - Left: 0
  - Right: 0
  - Height: 72px
  - Background: linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)
  - Display: Flex Row
  - Align Items: Center
  - Justify Content: Space Between
  - Padding: 16px
  - Box Shadow: 0 -4px 20px rgba(0, 0, 0, 0.1)

Selected Info:
  - Display: Flex Row
  - Align Items: Center
  - Gap: 12px

Selected Logo:
  - Size: 40px
  - Border Radius: 6px
  - Border: 2px solid White

Selected Name:
  - Font: Inter Semibold, 16px
  - Color: White

Continue Button:
  - Height: 48px
  - Padding: 0 24px
  - Background: White
  - Border: None
  - Border Radius: 8px
  - Font: Inter Bold, 16px
  - Color: #0D9488
  - Box Shadow: Small
```

---

## Category Filter

```
Categories:
  - All
  - Health & Wellness
  - Education
  - Environment
  - Animal Welfare
  - Human Rights
  - Community Development

Behavior:
  - Horizontal scroll (snap)
  - Radio selection
  - Filters cards instantly
```

---

## Search Functionality

```
Search Behavior:
  - Real-time filtering (debounced 300ms)
  - Searches: Name, category, mission
  - Case-insensitive
  - Partial matches

Empty Results:
  - Icon: Search with X (Gray 300, 64px)
  - Heading: "No charities found"
  - Description: "Try different keywords or browse all charities"
  - Button: "Clear Search"
```

---

## Charity Detail Modal

```
Triggered by: "Learn More" link

Content:
  - Full charity logo
  - Full mission statement
  - Impact metrics:
    - Total donations received
    - Number of donors
    - Recent projects
  - Transparency info:
    - Verified status explanation
    - Tax ID (EIN)
    - Website link
  - "Select This Charity" button

Layout:
  - Bottom sheet (mobile)
  - Modal (tablet)
  - Scrollable content
  - Close button (top right)
```

---

## Animations

```
Card Selection:
  - Border color transition (200ms)
  - Background tint fade in (200ms)
  - Checkmark scale in (300ms)

Selected Bar:
  - Slide up from bottom (300ms)
  - When selection changes: Crossfade charity info (200ms)

Search Filter:
  - Cards stagger out/in (50ms delay between)
  - Duration: 200ms fade

Category Toggle:
  - Background transition (200ms)
  - Scale press effect (100ms)
```

---

## Interaction States

```
Charity Card:
  - Default: White background, small shadow
  - Hover (web): Border Teal, scale 1.01
  - Pressed: Scale 0.98
  - Selected: 2px Teal border, checkmark, tint

Learn More Link:
  - Underline on press
  - Opens detail modal

Continue Button:
  - Pressed: Scale 0.96
  - Navigate: To goal creation (with charity data)
```

---

## Trust Indicators

```
Verified Badge:
  - Always visible on vetted charities
  - Tooltip: "Verified nonprofit organization"

Impact Metrics:
  - Show total donations to date
  - Relative bar (compared to most popular)
  - Builds social proof

Transparency:
  - Tax ID visible in detail modal
  - Direct website link
  - Clear "Verified" explanation
```

---

## Responsive Breakpoints

```
Small Mobile (320-374px):
  - Logo: 56px
  - Reduce card padding: 12px
  - Stack logo and info vertically (if needed)

Large Mobile (415px+):
  - Standard layout
  - Larger charity cards

Tablet (768px+):
  - 2-column grid for charity cards
  - Max content width: 800px
  - Detail modal: Centered (max 500px)
```

---

## Accessibility

```
Charity Card:
  "[Charity name]. [Category]. Verified nonprofit.
   Impact: [amount] donated. [Mission statement].
   Button."

Selected:
  "[Charity name]. Selected. Button: Continue."

Learn More:
  "Learn more about [charity name]. Opens detail view."

Keyboard Navigation:
  - Tab through search, categories, charity cards
  - Enter to select charity
  - Escape to close modal
```

---

## Performance

```
Optimization:
  - Lazy load charity logos
  - Cache charity data
  - Debounce search (300ms)
  - Paginate if >50 charities

Loading State:
  - Skeleton cards (shimmer effect)
  - Maintain layout
  - Show 6 skeleton cards while loading
```

---

## Design Review Notes

**Key Decisions**:
- Trust-first design (verified badges, transparency)
- Impact metrics (social proof)
- Fixed bottom bar when selected (clear action)
- Category filtering (easy browsing)
- Clean card layout (scannable)

**Version**: 1.0 (MVP)
**Date**: 2025-11-12
