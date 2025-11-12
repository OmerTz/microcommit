# Help & Support Screen - Design Specification

## Overview
Self-service help center with FAQs, searchable guides, contact options, and troubleshooting resources. Friendly, accessible support.

---

## Visual Hierarchy

```
[SEARCH BAR] ← Top, prominent
       ↓
[QUICK HELP CARDS] ← Common issues, visual
       ↓
[FAQ ACCORDION] ← Expandable Q&A
       ↓
[CONTACT SUPPORT] ← Bottom, clear CTA
```

---

## Color Scheme

```
Background: Gray 50

Search Bar:
  - Background: White
  - Border: Gray 300 (default), Teal 400 (focus)
  - Icon: Gray 400

Quick Help Cards:
  - Background: White
  - Icon backgrounds:
    - Getting Started: Blue 50, Blue 500 icon
    - Payments: Green 50, Green 500 icon
    - Goals: Teal 50, Teal 500 icon
    - Account: Purple 50, Purple 500 icon

FAQ Items:
  - Background: White
  - Border Bottom: Gray 200
  - Arrow: Gray 400 (collapsed), Teal 500 (expanded)

Contact Support Card:
  - Background: Teal 50
  - Border: 1px solid Teal 200
  - Button: Teal gradient

Live Chat Button (if available):
  - Background: Green 500
  - Icon: White
  - Shadow: Large elevation
```

---

## Typography

```
Screen Title:
  - Font: Inter Bold
  - Size: 28px
  - Color: Gray 900

Search Placeholder:
  - Font: Inter Regular
  - Size: 16px
  - Color: Gray 400

Quick Help Card Title:
  - Font: Inter Semibold
  - Size: 16px
  - Color: Gray 900

FAQ Question:
  - Font: Inter Semibold
  - Size: 16px
  - Color: Gray 900

FAQ Answer:
  - Font: Inter Regular
  - Size: 15px
  - Line Height: 24px
  - Color: Gray 700

Contact Card Heading:
  - Font: Inter Bold
  - Size: 20px
  - Color: Teal 900

Contact Card Description:
  - Font: Inter Regular
  - Size: 14px
  - Color: Teal 700
```

---

## Spacing & Layout

```
Screen Padding: 16px horizontal

Header:
  - Padding: 24px 16px 16px
  - Margin Bottom: 8px

Search Bar:
  - Height: 48px
  - Margin: 16px 0
  - Padding: 12px 16px

Quick Help Grid:
  - Columns: 2
  - Gap: 12px
  - Margin: 20px 0

Quick Help Card:
  - Aspect Ratio: 1:1
  - Padding: 16px
  - Border Radius: 12px

FAQ Section:
  - Margin: 32px 0

FAQ Item:
  - Padding: 16px 0
  - Min Height: 60px

FAQ Answer:
  - Padding: 0 0 16px 0
  - Margin Top: 8px

Contact Support Card:
  - Padding: 24px
  - Border Radius: 12px
  - Margin: 32px 0 24px

Contact Button:
  - Height: 52px
  - Margin Top: 16px

Live Chat FAB:
  - Size: 56px (circular)
  - Fixed: 16px from bottom-right
  - Z-Index: 100
```

---

## Quick Help Topics

```
1. Getting Started:
   - Icon: Rocket (Blue)
   - Topics: Onboarding, first goal, check-ins

2. Payments & Billing:
   - Icon: CreditCard (Green)
   - Topics: Payment methods, charges, refunds

3. Goals & Check-ins:
   - Icon: Target (Teal)
   - Topics: Creating goals, submitting evidence, streaks

4. Account Settings:
   - Icon: User (Purple)
   - Topics: Profile, password, notifications
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
  - Focus: Border #2DD4BF

Quick Help Card:
  - Display: Flex Column
  - Align Items: Center
  - Justify Content: Center
  - Background: White
  - Border: 1px solid #E5E7EB
  - Border Radius: 12px
  - Padding: 16px
  - Box Shadow: Small elevation
  - Pressed: Scale 0.98

Icon Container:
  - Width: 48px
  - Height: 48px
  - Border Radius: 12px
  - Background: [color 50]
  - Display: Flex
  - Align Items: Center
  - Justify Content: Center
  - Margin Bottom: 12px

Icon:
  - Size: 24px
  - Color: [color 500]

Card Title:
  - Font: Inter Semibold, 16px
  - Color: #111827
  - Text Align: Center

FAQ Section:
  - Background: White
  - Border Radius: 12px
  - Overflow: Hidden

FAQ Item:
  - Display: Flex Column
  - Padding: 16px
  - Border Bottom: 1px solid #E5E7EB
  - Last Child: Border None

Question Row:
  - Display: Flex Row
  - Align Items: Center
  - Justify Content: Space Between
  - Cursor: Pointer

Question Text:
  - Font: Inter Semibold, 16px
  - Color: #111827
  - Flex: 1

Expand Icon:
  - Size: 20px
  - Color: #9CA3AF (collapsed)
  - Color: #2DD4BF (expanded)
  - Transform: rotate(0deg) collapsed, rotate(180deg) expanded
  - Transition: 200ms

Answer Content:
  - Font: Inter Regular, 15px
  - Color: #374151
  - Line Height: 24px
  - Padding: 8px 0 0 0
  - Animation: Slide down + fade in (200ms)

Contact Support Card:
  - Background: #F0FDFA
  - Border: 1px solid #99F6E4
  - Border Radius: 12px
  - Padding: 24px
  - Display: Flex Column
  - Align Items: Center

Contact Icon:
  - Size: 64px
  - Color: #14B8A6
  - Margin Bottom: 16px

Contact Button:
  - Width: 100%
  - Height: 52px
  - Background: linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)
  - Border: None
  - Border Radius: 8px
  - Font: Inter Bold, 16px
  - Color: White
```

---

## FAQ Content (Examples)

```
General:
  - What is MicroCommit?
  - How does the commitment work?
  - What happens if I complete my goal?

Goals:
  - How do I create a goal?
  - Can I edit my goal after creating it?
  - What's a good check-in schedule?

Evidence:
  - What makes good evidence?
  - How does AI verification work?
  - What if AI rejects my photo?

Payments:
  - When will I be charged?
  - Can I change my commitment amount?
  - How do I get a refund?

Charities:
  - How are charities selected?
  - Can I suggest a charity?
  - Where does my money go?
```

---

## Animations

```
Search Focus:
  - Border color transition (200ms)
  - Shadow fade in (150ms)

Quick Help Card Press:
  - Scale: 0.98 (100ms)

FAQ Expand/Collapse:
  - Arrow rotate: 0deg ↔ 180deg (200ms)
  - Answer height: 0 → auto (200ms)
  - Answer opacity: 0 → 1 (200ms)
  - Easing: Ease-in-out

Live Chat FAB:
  - Entrance: Slide up + fade in (300ms)
  - Pressed: Scale 0.9 (100ms)
  - Hover: Scale 1.1 (200ms, web)
```

---

## Interaction States

```
Search Bar:
  - Empty: Placeholder, gray icon
  - Typing: Active cursor, Teal border
  - Has Text: Show clear button (X)
  - Results: Filter FAQ instantly

Quick Help Card:
  - Pressed: Scale 0.98
  - Tap: Navigate to detailed article

FAQ Item:
  - Collapsed: Show question only
  - Tap: Expand with animation
  - Expanded: Show answer + rotated arrow
  - Tap again: Collapse

Contact Button:
  - Pressed: Scale 0.98
  - Tap: Open email composer or contact form
```

---

## Search Functionality

```
Search Behavior:
  - Real-time filtering (debounced 300ms)
  - Searches: FAQ questions and answers
  - Highlights: Matching text (bold)
  - Case-insensitive

No Results:
  - Message: "No articles found"
  - Suggestion: "Try different keywords"
  - Button: "Contact Support" (escalation)
```

---

## Contact Options

```
Email Support:
  - Button: "Email Support"
  - Action: Open email with pre-filled template
  - To: support@microcommit.com
  - Subject: "Support Request - [Category]"
  - Body: Device info, app version pre-filled

Live Chat (Future):
  - FAB button: Fixed bottom-right
  - Icon: MessageCircle (White on Green)
  - Opens: Chat widget
  - Hours: Show availability

Report Bug:
  - Link in footer
  - Form: Title, description, steps to reproduce
  - Auto-attach: Device info, logs
```

---

## Responsive Breakpoints

```
Small Mobile (320-374px):
  - Quick Help: 2 columns (maintained)
  - Reduce card padding: 12px

Large Mobile (415px+):
  - Standard layout
  - Slightly larger quick help cards

Tablet (768px+):
  - Quick Help: 4 columns (across)
  - Max content width: 700px (centered)
  - FAQ: 2-column layout (optional)
```

---

## Accessibility

```
Search Bar:
  "Search help articles."

Quick Help Card:
  "[Topic name]. Button. Opens [topic] help articles."

FAQ Item:
  "[Question]. [Collapsed/Expanded]. Tap to [expand/collapse]."

Contact Button:
  "Contact support. Opens email."

Live Chat FAB:
  "Start live chat. Chat support."

Keyboard Navigation:
  - Tab through all interactive elements
  - Enter to activate buttons
  - Space to expand FAQ items
```

---

## Empty States

```
No Search Results:
  - Icon: Search with X (Gray 300, 64px)
  - Heading: "No articles found"
  - Description: "Try different keywords or contact support"
  - Button: "Contact Support" (Teal)

No Internet:
  - Icon: WifiOff (Gray 300)
  - Heading: "No connection"
  - Description: "Check your internet and try again"
  - Button: "Retry"
```

---

## Performance

```
Optimization:
  - Cache FAQ content locally
  - Debounce search (300ms)
  - Lazy load detailed articles
  - Pre-render first 10 FAQs

Loading State:
  - Show skeleton FAQ items
  - Maintain layout
  - Quick load from cache
```

---

## Design Review Notes

**Key Decisions**:
- Self-service first (reduce support load)
- Visual quick help cards (scannable)
- Searchable FAQ (fast answers)
- Multiple contact options (flexibility)
- Friendly tone (helpful, not robotic)

**Implementation Priority**:
1. Search + FAQ accordion
2. Quick help cards navigation
3. Contact support integration
4. Live chat (future)

**Version**: 1.0 (MVP)
**Date**: 2025-11-12
