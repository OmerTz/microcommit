# Settings Screen

## Overview
The Settings Screen provides access to account management, app preferences, notification settings, privacy controls, and support resources. It serves as the central hub for all user configuration needs.

## Screen Purpose
- Manage account information (email, password, profile)
- Configure app preferences (theme, language, units)
- Control notification settings
- Manage privacy and data preferences
- Access help, support, and legal documents
- Handle account deletion and logout

## Access
- **Entry Points**:
  - Bottom tab navigation → Profile/Settings icon
  - Dashboard → Profile avatar → Settings
  - Notification settings prompt → Deep link to Notifications
- **Exit Points**:
  - Back button → Previous screen or Dashboard
  - Logout → Welcome Screen
  - Delete account → App exit with confirmation

---

## Layout Structure

### Header Section
**Elements**:
- Title: "Settings"
- Font: Inter Bold, 28px
- Back button (if accessed from non-tab navigation)

---

### Settings Sections (Grouped List)

#### Section 1: Account
**Heading**: "Account"

**Setting Items**:

1. **Profile** →
   - Icon: User
   - Label: "Profile"
   - Sublabel: User's name
   - Tap: Navigate to Profile Edit screen

2. **Email** →
   - Icon: Mail
   - Label: "Email"
   - Sublabel: user@example.com
   - Tap: Navigate to Email Change flow

3. **Password** →
   - Icon: Lock
   - Label: "Password"
   - Sublabel: "••••••••"
   - Tap: Navigate to Password Change screen

4. **Payment Methods** →
   - Icon: Credit Card
   - Label: "Payment Methods"
   - Sublabel: "Visa •••• 4242"
   - Tap: Navigate to Payment Methods screen

---

#### Section 2: Preferences
**Heading**: "Preferences"

**Setting Items**:

1. **Notifications** →
   - Icon: Bell
   - Label: "Notifications"
   - Sublabel: "Push, Email, SMS"
   - Tap: Navigate to Notifications Screen

2. **Theme** (Toggle or Selector)
   - Icon: Sun/Moon
   - Label: "Dark Mode"
   - Toggle: On/Off
   - Or: Selector → Light / Dark / Auto

3. **Language** →
   - Icon: Globe
   - Label: "Language"
   - Sublabel: "English"
   - Tap: Language selection modal

4. **Units** →
   - Icon: Ruler
   - Label: "Units"
   - Sublabel: "Imperial" or "Metric"
   - Tap: Toggle between Imperial/Metric

---

#### Section 3: Privacy & Data
**Heading**: "Privacy & Data"

**Setting Items**:

1. **Privacy Settings** →
   - Icon: Shield
   - Label: "Privacy"
   - Sublabel: "Who can see your goals"
   - Tap: Privacy settings screen

2. **Data & Analytics** (Toggle)
   - Icon: Chart
   - Label: "Share usage data"
   - Sublabel: "Help us improve MicroCommit"
   - Toggle: On/Off (default: On)

3. **Download Your Data** →
   - Icon: Download
   - Label: "Download Your Data"
   - Sublabel: "Export all your information"
   - Tap: Initiate data export (GDPR compliance)

---

#### Section 4: Support & Legal
**Heading**: "Support"

**Setting Items**:

1. **Help Center** →
   - Icon: Question mark in circle
   - Label: "Help Center"
   - Sublabel: "FAQs and guides"
   - Tap: Navigate to Help/Support Screen

2. **Contact Support** →
   - Icon: Message
   - Label: "Contact Support"
   - Tap: Open support form or email

3. **Rate App** →
   - Icon: Star
   - Label: "Rate MicroCommit"
   - Tap: Deep link to App Store/Play Store

4. **Terms of Service** →
   - Icon: Document
   - Label: "Terms of Service"
   - Tap: Open in-app browser or modal

5. **Privacy Policy** →
   - Icon: Document
   - Label: "Privacy Policy"
   - Tap: Open in-app browser or modal

6. **Open Source Licenses** →
   - Icon: Code
   - Label: "Open Source Licenses"
   - Tap: Show licenses screen

---

#### Section 5: About
**Heading**: "About"

**Setting Items**:

1. **Version**
   - Label: "Version"
   - Sublabel: "1.0.0 (Build 42)"
   - Non-tappable (info only)
   - Secret: Tap 7 times → Debug menu

2. **Follow Us** →
   - Icons: Instagram, Twitter, Facebook
   - Label: "Follow Us"
   - Tap: Open social media links

---

#### Section 6: Danger Zone
**Heading**: "Account Actions"

**Setting Items**:

1. **Log Out** (Button)
   - Color: Amber (#F59E0B)
   - Label: "Log Out"
   - Tap: Confirmation modal → Log out

2. **Delete Account** (Button)
   - Color: Red (#EF4444)
   - Label: "Delete Account"
   - Tap: Navigate to Account Deletion flow
   - Warning: Destructive action

---

## Interactions

### Setting Item Tap
**Navigation Items** (with → arrow):
1. Tap item
2. Haptic feedback (light)
3. Navigate to detail screen
4. Slide transition from right

**Toggle Items**:
1. Tap toggle switch
2. Haptic feedback (medium)
3. Update setting immediately
4. Show toast: "Setting updated"
5. Sync to backend

### Log Out
**Flow**:
1. User taps "Log Out"
2. Show confirmation modal:
   - Title: "Log out?"
   - Message: "You can always sign back in"
   - Buttons: "Cancel" / "Log Out" (amber)
3. If confirmed:
   - Clear session tokens
   - Clear cached data (optional: keep for quick re-login)
   - Navigate to Welcome Screen
   - Show toast: "Logged out successfully"

### Delete Account
**Flow**:
1. User taps "Delete Account"
2. Navigate to Account Deletion Screen (detailed flow in flow docs)
3. Require password confirmation
4. Explain consequences (irreversible, data deleted)
5. Final confirmation: "Type DELETE to confirm"
6. If confirmed: Delete account and exit app

---

## States & Loading

### Initial Load
- Fetch user settings from backend
- Show skeleton placeholders during load
- Populate with user data when ready

### Toggle Change
- Immediate UI update (optimistic)
- Show loading spinner on toggle (small, inline)
- Revert if save fails (with error toast)

### Offline Mode
- Show cached settings
- Disable toggles (show "Offline" badge)
- Queue changes for when back online

---

## Visual Design

### Color Palette
- **Background**: Light gray (#F9FAFB)
- **Section Cards**: White with shadow
- **Text Primary**: Dark gray (#1F2937)
- **Text Secondary**: Medium gray (#6B7280)
- **Icons**: Medium gray
- **Dividers**: Light gray (#E5E7EB)
- **Toggle On**: Teal (#2DD4BF)
- **Danger**: Red (#EF4444)

### Typography
- **Title**: Inter Bold, 28px
- **Section Headings**: Inter Semibold, 14px, uppercase
- **Labels**: Inter Medium, 16px
- **Sublabels**: Inter Regular, 14px, gray

### Layout
- Section padding: 16px horizontal
- Item height: 56px minimum
- Icon size: 24x24px
- Toggle size: Standard iOS/Android toggle
- Spacing: 8px between items, 24px between sections

---

## Data Requirements

### User Settings Object
```json
{
  "user_id": "uuid",
  "theme": "auto",
  "language": "en",
  "units": "imperial",
  "notifications_enabled": true,
  "analytics_enabled": true,
  "privacy_level": "friends"
}
```

### API Endpoints
- **GET /api/users/settings**: Fetch user settings
- **PATCH /api/users/settings**: Update specific setting
- **POST /api/users/logout**: Invalidate session
- **POST /api/users/delete**: Initiate account deletion

---

## Analytics Events
- `settings_screen_viewed`
- `settings_item_tapped` (item_name)
- `setting_toggled` (setting_name, new_value)
- `logout_tapped`
- `delete_account_tapped`
- `support_contacted` (method)

---

## Accessibility
- Screen reader: "Settings. List of options."
- Each item has proper label and hint
- Toggles: "On" / "Off" state announced
- Touch targets: Minimum 44x44px
- High contrast mode support

---

## Future Enhancements
- Biometric authentication toggle
- Two-factor authentication
- App passcode/PIN
- Backup and restore settings
- Activity log (recent actions)
- Beta features toggle
- Referral program section
