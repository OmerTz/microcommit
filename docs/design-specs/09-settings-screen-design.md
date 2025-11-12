# Settings Screen - Design Specification

## Overview
Central hub for account management, app preferences, notifications, privacy controls, and support access. Clean, organized sections.

---

## Visual Hierarchy

```
[PROFILE HEADER] ← Top, with avatar
       ↓
[SETTINGS SECTIONS] ← Grouped list items
       ↓
[DANGER ZONE] ← Bottom, visually separated
```

---

## Color Scheme

```
Background: Gray 50

Profile Header:
  - Background: White or Teal gradient (subtle)
  - Avatar border: Teal 400
  - Edit icon: Teal 500

Section Headers:
  - Text: Gray 500
  - Background: Gray 50

Setting Items:
  - Background: White
  - Border: 1px solid Gray 200 (between items)
  - Icons: Gray 600
  - Arrows: Gray 400

Toggle Switch:
  - Off: Gray 300 track, White thumb
  - On: Teal 400 track, White thumb

Danger Zone:
  - Background: Red 50
  - Border: 1px solid Red 200
  - Text: Red 700
  - Icons: Red 600
```

---

## Typography

```
Profile Name:
  - Font: Inter Bold
  - Size: 20px
  - Color: Gray 900

Profile Email:
  - Font: Inter Regular
  - Size: 14px
  - Color: Gray 600

Section Header:
  - Font: Inter Bold
  - Size: 12px
  - Color: Gray 500
  - Text Transform: Uppercase
  - Letter Spacing: 0.5px

Setting Item Label:
  - Font: Inter Medium
  - Size: 16px
  - Color: Gray 900

Setting Item Description:
  - Font: Inter Regular
  - Size: 14px
  - Color: Gray 600

Danger Action:
  - Font: Inter Semibold
  - Size: 16px
  - Color: Red 700
```

---

## Spacing & Layout

```
Profile Header:
  - Padding: 24px
  - Margin Bottom: 24px
  - Border Radius: 0 (full width) or 12px (with margins)

Avatar:
  - Size: 80px
  - Margin: 0 auto 12px (if centered)

Name & Email:
  - Gap: 4px vertical
  - Centered or left-aligned

Section Header:
  - Padding: 12px 16px 8px
  - Margin Top: 24px (first section: 0)
  - Margin Bottom: 0
  - Background: Gray 50

Settings Group:
  - Background: White
  - Border Radius: 12px
  - Margin: 0 16px
  - Overflow: Hidden

Setting Item:
  - Height: Auto (min 56px)
  - Padding: 16px
  - Display: Flex Row
  - Align Items: Center
  - Border Bottom: 1px solid Gray 200 (except last)

Item Icon:
  - Size: 24px
  - Margin Right: 12px

Item Content:
  - Flex: 1
  - Display: Flex Column

Item Arrow/Toggle:
  - Margin Left: Auto

Danger Zone:
  - Margin: 32px 16px 24px
  - Padding: 16px
  - Border Radius: 12px
```

---

## Settings Sections

```
Account:
  - Edit Profile
  - Change Password
  - Email Preferences
  - Subscription Status

Preferences:
  - Notifications
  - Language
  - Theme (Light/Dark)
  - Time Zone

Privacy:
  - Data & Privacy
  - Blocked Users
  - Download My Data
  - Delete Account

Support:
  - Help Center
  - Contact Support
  - Report a Bug
  - Rate App

About:
  - Version Info
  - Terms of Service
  - Privacy Policy
  - Licenses
```

---

## Component Styling

```css
Profile Header:
  - Display: Flex Column
  - Align Items: Center
  - Background: White
  - Padding: 24px
  - Border Bottom: 1px solid #E5E7EB

Avatar:
  - Width: 80px
  - Height: 80px
  - Border Radius: Full
  - Border: 3px solid #2DD4BF
  - Object Fit: Cover
  - Position: Relative

Avatar Edit Button:
  - Position: Absolute
  - Bottom: 0
  - Right: 0
  - Size: 32px
  - Background: #2DD4BF
  - Border: 2px solid White
  - Border Radius: Full
  - Icon: Camera (White, 16px)

Section Header:
  - Font: Inter Bold, 12px
  - Text Transform: Uppercase
  - Color: #6B7280
  - Padding: 12px 16px 8px
  - Background: #F9FAFB

Settings Group:
  - Background: White
  - Border Radius: 12px
  - Overflow: Hidden
  - Margin: 0 16px 16px

Setting Item:
  - Display: Flex Row
  - Align Items: Center
  - Padding: 16px
  - Min Height: 56px
  - Border Bottom: 1px solid #E5E7EB
  - Last Child: Border Bottom None

Item Icon:
  - Size: 24px
  - Color: #4B5563
  - Flex Shrink: 0
  - Margin Right: 12px

Item Content:
  - Flex: 1

Item Label:
  - Font: Inter Medium, 16px
  - Color: #111827

Item Description:
  - Font: Inter Regular, 14px
  - Color: #6B7280
  - Margin Top: 2px

Item Action (Arrow):
  - Size: 20px
  - Color: #9CA3AF
  - Margin Left: Auto

Toggle Switch:
  - Width: 48px
  - Height: 28px
  - Border Radius: Full
  - Off: Background #D1D5DB
  - On: Background #2DD4BF
  - Transition: 200ms

Toggle Thumb:
  - Size: 24px
  - Background: White
  - Border Radius: Full
  - Box Shadow: Small
  - Position: Left (off), Right (on)
  - Transition: 200ms

Danger Zone:
  - Background: #FEF2F2
  - Border: 1px solid #FECACA
  - Border Radius: 12px
  - Padding: 16px

Danger Item:
  - Color: #B91C1C
  - Font: Inter Semibold, 16px
  - Display: Flex Row
  - Align Items: Center
  - Padding: 12px 0
```

---

## Animations

```
Setting Item Press:
  - Background: Gray 50
  - Duration: 150ms
  - Scale: 0.98 (optional subtle effect)

Toggle Switch:
  - Background color transition: 200ms
  - Thumb slide: 200ms ease-out
  - Haptic feedback on toggle

Profile Header:
  - Avatar edit button: Pulse on first visit
  - Duration: 1s
  - Iteration: 3 times

Section Expand (future):
  - Height: 0 → auto
  - Duration: 300ms
  - Easing: Ease-in-out
```

---

## Interaction States

```
Setting Item:
  - Default: White background
  - Hover (web): Gray 50 background
  - Pressed: Gray 50 background, scale 0.98
  - Navigation: Arrow icon, tap anywhere

Toggle Item:
  - Tap on item: Toggle switch
  - Tap on switch: Toggle switch
  - Haptic feedback on toggle

Danger Actions:
  - Tap: Confirmation modal
  - Modal: "Are you sure?" with warning
  - Buttons: "Cancel" (gray) and "Delete" (red)

Profile Edit:
  - Tap avatar: Open image picker
  - Tap "Edit Profile": Navigate to edit screen
```

---

## Modals & Confirmations

```
Delete Account Modal:
  - Heading: "Delete Account?"
  - Message: "This action cannot be undone. All your data will be permanently deleted."
  - Input: "Type DELETE to confirm"
  - Buttons: "Cancel" | "Delete Account" (red)

Logout Confirmation:
  - Heading: "Sign Out?"
  - Message: "You'll need to sign in again to access your account."
  - Buttons: "Cancel" | "Sign Out"

Change Password:
  - Modal or separate screen
  - Fields: Current password, New password, Confirm new password
  - Validation: Real-time strength indicator
```

---

## Responsive Breakpoints

```
Small Mobile (320-374px):
  - Avatar: 64px
  - Reduce item padding: 12px

Large Mobile (415px+):
  - Standard sizing
  - More generous spacing

Tablet (768px+):
  - Max content width: 600px (centered)
  - 2-column layout for some settings
  - Profile header: Horizontal layout
```

---

## Accessibility

```
Profile Header:
  "Profile. [Name]. [Email]. Button: Edit profile."

Setting Item:
  "[Icon name]. [Label]. [Description]. [Action: Navigate/Toggle]."

Toggle:
  "[Label]. Switch. [On/Off]."

Danger Action:
  "[Action]. Warning: This action cannot be undone."

Keyboard Navigation:
  - Tab through all interactive items
  - Enter/Space to activate
  - Arrow keys for toggle switches

Touch Targets:
  - All items: 56px minimum height
  - Toggle switch: 48x28px (with padding)
  - Avatar edit: 44x44px tappable area
```

---

## Design Review Notes

**Key Decisions**:
- Grouped sections (organized, scannable)
- Toggle switches inline (immediate action)
- Danger zone visually separated (safety)
- Profile at top (personalization)
- Minimalist icons (clarity)

**Version**: 1.0 (MVP)
**Date**: 2025-11-12
