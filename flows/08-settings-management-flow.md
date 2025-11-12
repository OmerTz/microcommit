# Settings Management Flow

## Goal
Provide users with comprehensive control over app behavior, preferences, and account settings while maintaining simplicity and discoverability (settings accessible within 2 taps).

## Entry Points
- Profile tab → Settings icon (gear/cog, top right)
- Main menu → "Settings" option
- Push notification → "Manage Notifications" → Settings
- Support chat → "Adjust settings" link

## Flow Steps

### Step 1: Settings Entry
**Screen**: Profile or Main Menu
- **Elements**:
  - Settings icon (⚙️) in navigation bar
  - Or menu item "Settings"

**User Action**: Tap Settings
**Next Screen**: Settings Home

### Step 2: Settings Home (Main)
**Screen**: Settings
- **Elements**:
  - "Settings" heading
  - Back arrow (top left)
  - Profile summary card (top):
    - Avatar
    - Name
    - Email
    - "Edit Profile" link

  **Organized in Sections** (vertical scroll):

  **🎯 Goal Settings**
  - Default Reminder Time
    - Current: 8:00 AM
    - Tap to change time picker
  - Default Goal Duration
    - Current: 1 week
    - Options: 1 week, 2 weeks, 1 month
  - Default Commitment Amount
    - Current: $15
    - Range: $5-$100
  - Auto-Extend Goals (toggle)
    - Off by default
    - "Automatically extend goals when completing early"

  **🔔 Notifications**
  - Push Notifications (master toggle)
    - Shows "Manage Notifications >" link
    - Badge if any disabled
  - Email Notifications (toggle)
  - SMS Notifications (toggle, requires phone verification)
  - Notification Schedule (quiet hours)

  **🎨 Appearance**
  - Theme
    - Current: System Default
    - Options: Light, Dark, System
  - App Icon (if alternate icons available)
  - Language
    - Current: English
    - Options: English, Spanish, French (future)

  **👥 Privacy & Account**
  - Privacy Settings
    - Default visibility
    - Data sharing
  - Linked Accounts (Google, Apple)
  - Email Address
  - Password
  - Two-Factor Authentication (2FA)

  **💳 Payment & Billing**
  - Payment Methods
    - Saved cards list
    - Add new method
  - Billing History
  - Transaction History

  **📊 Data & Storage**
  - Download My Data
  - Clear Cache
  - Storage Usage

  **🆘 Support & About**
  - Help Center
  - Contact Support
  - Send Feedback
  - Rate on App Store
  - About MicroCommit
    - Version: X.Y.Z
    - Terms of Service
    - Privacy Policy

  **🚪 Account Actions**
  - Logout
  - Delete Account (red text)

- **Navigation**:
  - Tap any item → Sub-settings screen or action
  - Toggle items work immediately (no save button)

**User Actions**: Navigate to specific setting
**Next Screen**: Depends on selection

### Step 3a: Notification Settings Detail
**Screen**: Notification Settings
- **Elements**:
  - "Notifications" heading
  - Back button

  **Push Notifications** (master toggle, top)
  - If off: All other options grayed out

  **Notification Types** (individual toggles):
  - ✅ Goal Reminders
    - Daily check-in reminders
    - Subtitle: "Reminds you to check in"
  - ✅ Deadline Warnings
    - 24 hours before deadline
    - Subtitle: "Alerts before check-in expires"
  - ✅ Streak Milestones
    - 7-day, 30-day achievements
    - Subtitle: "Celebrate your progress"
  - ✅ Referee Requests
    - When someone invites you as referee
    - Subtitle: "Accountability requests"
  - ✅ Referee Reviews
    - When referee reviews your evidence
    - Subtitle: "Review results"
  - ✅ Payment Updates
    - Payment status, refunds
    - Subtitle: "Transaction confirmations"
  - ✅ Goal Completion
    - Success/failure notifications
    - Subtitle: "When goals end"
  - 🔕 Community Updates (off)
    - Platform news, new features
    - Subtitle: "Product announcements"
  - 🔕 Weekly Summary (off)
    - Progress recap emails
    - Subtitle: "Monday morning summary"

  **Quiet Hours** (section):
  - Enable Quiet Hours (toggle)
  - Start Time: 10:00 PM
  - End Time: 8:00 AM
  - "No notifications during these hours"
  - Exception: Critical alerts only (toggle)

  **Actions**:
  - Changes save automatically
  - "Test Notification" button (sends sample)
  - "Notification Preferences" (OS settings) link

**User Actions**: Configure notifications, test
**Next Screen**: Return or stay in settings

### Step 3b: Appearance Settings
**Screen**: Appearance
- **Elements**:
  - "Appearance" heading

  **Theme** (visual cards):
  - ☀️ Light Mode (preview card)
  - 🌙 Dark Mode (preview card)
  - 🔄 System Default (preview card)
  - Selected theme has checkmark

  **Color Accent** (future feature):
  - Color picker or preset colors
  - Preview shows how it affects UI

  **Text Size** (slider):
  - Small | Medium | Large
  - Live preview of text

  **Animations** (toggle):
  - Reduce motion (accessibility)
  - "Minimizes animations for better accessibility"

**User Actions**: Select theme, adjust preferences
**Next Screen**: Changes apply immediately, stay on screen

### Step 3c: Privacy Settings
**Screen**: Privacy & Security
- **Elements**:
  - "Privacy & Security" heading

  **Profile Visibility**:
  - Default Goal Visibility (radio buttons)
    - 🔒 Private (only me)
    - 👥 Referees Only
    - 🌍 Public (community)
  - "New goals will use this setting by default"

  **Data Sharing** (toggles):
  - ✅ Share usage data (anonymous analytics)
  - ✅ Personalized recommendations
  - 🔕 Marketing emails

  **Security**:
  - Change Password
  - Two-Factor Authentication
    - Status: Disabled / Enabled
    - "Add 2FA" button or "Manage 2FA"
  - Active Sessions
    - List of devices/browsers logged in
    - "Sign out other devices" button
  - Biometric Login (if supported)
    - Face ID / Touch ID toggle

  **Connected Accounts**:
  - Google account (connected)
  - Apple account (not connected)
  - Disconnect options

**User Actions**: Adjust privacy settings
**Next Screen**: Depends on action (e.g., password change flow)

### Step 3d: Payment Methods Management
**Screen**: Payment Methods
- **Elements**:
  - "Payment methods" heading

  **Saved Cards** (list):
  Each card shows:
  - Card brand logo (Visa, Mastercard, etc.)
  - Last 4 digits: •••• 1234
  - Expiry: 12/25
  - Default badge (if default)
  - Edit icon (pencil)
  - Delete icon (trash)

  **Actions per Card**:
  - Set as Default
  - Update Card
  - Remove Card

  **Add New Card**:
  - "Add Payment Method" button (+ icon)
  - Opens Stripe card form

  **Alternative Payment Methods** (future):
  - Add Bank Account
  - Add PayPal

**User Actions**:
- Add card → Stripe form (Step 4a)
- Edit card → Update details
- Delete card → Confirmation (Step 4b)

**Next Screen**: Depends on action

### Step 4a: Add Payment Method
**Screen**: Add Payment Method
- **Elements**:
  - "Add payment method" heading
  - Stripe payment form (embedded):
    - Card number
    - Expiry (MM/YY)
    - CVC
    - Cardholder name
    - Billing ZIP
  - "Set as default" checkbox
  - "Add Card" button (primary)
  - "Cancel" button

**Validation**:
- Real-time card validation
- Expiry date format and validity
- CVC length (3-4 digits)
- All fields required

**User Action**: Enter card info, tap "Add Card"
**Technical**: Tokenize with Stripe, save token
**Next Screen**: Success message → Return to Payment Methods

### Step 4b: Delete Payment Method Confirmation
**Screen**: Remove Payment Method (Modal)
- **Elements**:
  - Warning icon
  - "Remove this card?" heading
  - Card: •••• 1234
  - "You can add it back later if needed"
  - "Remove Card" button (red, destructive)
  - "Cancel" button

**If Default Card**:
- Warning: "This is your default payment method"
- "Select a new default first or remove it anyway"

**User Action**: Confirm removal
**Technical**: Delete from Stripe & database
**Next Screen**: Return to Payment Methods list

### Step 5: Account Security Actions

**5a: Change Password**
**Screen**: Change Password
- **Elements**:
  - "Change password" heading
  - Current Password (input, password type)
  - New Password (input, password type)
  - Confirm New Password (input, password type)
  - Password strength indicator
  - Requirements checklist:
    - ✅ At least 8 characters
    - ✅ Contains uppercase & lowercase
    - ✅ Contains number
    - ✅ Contains special character
  - "Change Password" button
  - "Forgot Password?" link

**Validation**:
- Current password must be correct
- New passwords must match
- New password meets requirements
- Cannot reuse current password

**User Action**: Enter passwords, submit
**Next Screen**: Success message → Return to settings

**5b: Two-Factor Authentication Setup**
**Screen**: Enable 2FA
- **Elements**:
  - "Set up two-factor authentication" heading
  - Explanation: "Add an extra layer of security"
  - **Choose Method**:
    - 📱 Authenticator App (recommended)
      - Google Authenticator, Authy, etc.
    - 📧 Email codes
    - 📲 SMS codes

  **If Authenticator App Selected**:
  - QR code to scan
  - Manual entry code (if can't scan)
  - "Verify" button
  - Enter 6-digit code to confirm

  **Backup Codes**:
  - After setup: "Save these backup codes"
  - 10 one-time use codes
  - "Download Codes" button
  - "Print Codes" button

**User Action**: Complete setup, save codes
**Technical**: Enable 2FA in Supabase Auth
**Next Screen**: 2FA Enabled Success → Return to settings

### Step 6: Data Management

**6a: Download My Data**
**Screen**: Download Data
- **Elements**:
  - "Download your data" heading
  - Explanation: "Get a copy of your MicroCommit data"
  - Data includes:
    - Profile information
    - All goals (active & completed)
    - Check-in history
    - Payment records
    - Evidence photos
  - Format: ZIP file with JSON + images
  - "Request Download" button
  - GDPR compliance notice

**User Action**: Request download
**Technical**:
1. Generate data export (background job)
2. Create ZIP file in Supabase Storage
3. Send download link via email (within 24 hours)
4. Link expires after 7 days

**Next Screen**: Confirmation message
"We'll email you a download link within 24 hours"

**6b: Clear Cache**
**Screen**: Clear Cache
- **Elements**:
  - "Clear cache" heading
  - Storage usage:
    - App cache: 45 MB
    - Image cache: 120 MB
    - Total: 165 MB
  - "This will free up space on your device"
  - "Your data and goals will not be affected"
  - "Clear Cache" button
  - "Cancel" button

**User Action**: Confirm clear
**Technical**: Delete cached images, temp files
**Next Screen**: Success toast → Return

### Step 7: Logout & Account Deletion

**7a: Logout**
**Screen**: Settings (with logout action)
- **User Action**: Tap "Logout"
- **Modal**: "Log out of MicroCommit?"
- **Actions**:
  - "Log Out" button (primary)
  - "Cancel" button

**If Active Goals**:
- Warning: "You have X active goals"
- "Check-in reminders will still send"
- Continue with logout

**Technical**: Clear session, redirect to login
**Next Screen**: Login/Welcome screen

**7b: Delete Account**
**Screen**: Delete Account (dedicated screen)
- **Elements**:
  - Warning icon (⚠️, red)
  - "Delete your account?" heading
  - **Warning Message**:
    - "This action cannot be undone"
    - "You will lose:"
      - All goal data and history
      - Pending refunds (if any active goals)
      - Saved payment methods
      - Profile and progress

  - **Active Goals Warning** (if applicable):
    - "You have X active goals"
    - "These goals will be cancelled"
    - "Commitments will be charged and donated"
    - Goal list shown

  - **Required Confirmation**:
    - "Type 'DELETE' to confirm" (text input)
    - Checkbox: "I understand this is permanent"

  - **Actions**:
    - "Delete My Account" button (red, destructive)
    - "Cancel" button (gray)

**User Actions**:
1. Read warnings
2. Type 'DELETE'
3. Check confirmation box
4. Tap "Delete My Account"

**Technical Process**:
1. Cancel all active goals
2. Process final payments (commitments → charities)
3. Anonymize user data (GDPR compliance)
4. Delete account record (soft delete first, hard delete after 30 days)
5. Send confirmation email
6. Clear session

**Next Screen**: Account Deleted Confirmation
"Your account has been deleted. We're sorry to see you go."

## Success Criteria
- **Settings Discoverability**: 95%+ of users can find settings within 2 taps
- **Notification Control**: 90%+ understand how to manage notifications
- **Setting Change Time**: Median time < 30 seconds per setting
- **Error Rate**: <1% errors when saving settings
- **User Satisfaction**: 4+ stars for settings UX

## Error Handling

### Settings Save Failure
- **Cause**: Network error, database timeout
- **UI**: "Couldn't save changes. Try again?"
- **Actions**: "Retry" button, changes held in memory
- **Fallback**: Save locally, sync when online

### Invalid Input
- **Password Too Weak**: Show strength indicator, requirements
- **Invalid Email**: "Please enter a valid email address"
- **Invalid Phone**: "Phone number format is incorrect"
- All errors inline, red text, specific guidance

### Payment Method Add Failure
- **Stripe Error**: Show Stripe error message
- **Network Error**: "Connection lost. Try again."
- **Duplicate Card**: "This card is already saved"

### 2FA Setup Failure
- **Invalid Code**: "Code is incorrect or expired. Try again."
- **QR Scan Failed**: Provide manual entry option
- **App Not Responding**: "Try different authenticator app"

### Data Download Failure
- **Export Error**: "Data export failed. Contact support."
- **Retry Logic**: Auto-retry 3 times in background
- **Notification**: "Your data export is ready" or error message

## Edge Cases

### Changing Settings While Offline
- **Behavior**: Settings cached locally
- **UI**: Banner: "Changes will sync when online"
- **Sync**: Auto-sync when connection restored
- **Conflict**: Server value wins if changed elsewhere

### Settings Changed on Multiple Devices
- **Detection**: Timestamp comparison
- **Resolution**: Last write wins
- **UI**: Show "Settings updated from another device" toast

### Deleting Account with Pending Refunds
- **Warning**: "You have $X in pending refunds"
- **Options**:
  - Wait for refund, then delete
  - Forfeit refund and delete now
  - Cancel deletion

### Removing Default Payment Method
- **Restriction**: Cannot remove if it's the only card
- **UI**: "Add another card first" or "Set different default"

### Disabling All Notifications
- **Warning**: "You won't receive check-in reminders"
- **Confirmation**: "Are you sure?"
- **Impact**: Higher risk of missed goals

### Quiet Hours Overlap with Check-Ins
- **Scenario**: User sets quiet hours 10pm-8am, but check-in due at 7am
- **Handling**: Critical reminders bypass quiet hours (with notification)

### Account Deletion During Active Dispute
- **Restriction**: Cannot delete while dispute pending
- **UI**: "Resolve dispute before deleting account"
- **Action**: Link to dispute resolution

### Language Change (Future Feature)
- **Behavior**: App language updates immediately
- **Notification Text**: Updates on next notification
- **Existing Goals**: Language doesn't affect goal content (stored in original language)

## Analytics Events
Track all settings interactions:
- `settings_viewed` (entry_point)
- `setting_changed` (setting_name, old_value, new_value)
- `notification_setting_changed` (notification_type, enabled/disabled)
- `theme_changed` (old_theme, new_theme)
- `payment_method_added` (card_type)
- `payment_method_removed` (card_type)
- `2fa_setup_started` (method)
- `2fa_setup_completed` (method)
- `data_download_requested`
- `cache_cleared` (size_cleared_mb)
- `account_logout`
- `account_deletion_started`
- `account_deletion_completed` (reason)
- `settings_error` (error_type, setting_name)

## Future Enhancements (Post-MVP)
- Smart defaults: ML suggests optimal notification times based on behavior
- Batch settings: Export/import settings across devices
- Settings profiles: Quick switch between "Work mode" and "Weekend mode"
- Voice control: "Hey Siri, update my MicroCommit check-in time to 9am"
- Automation: "If I miss a check-in, automatically increase reminder frequency"
- Family settings: Manage settings for dependents (if family plans)
- Accessibility settings: Screen reader optimizations, high contrast mode
- Advanced scheduling: Different reminder times for different days
- Integration settings: Connect with Apple Health, Google Calendar
- Customizable dashboard: Drag-and-drop widget configuration
- Notification bundling: Group notifications by type or time
- Smart pause: Auto-pause goals during vacation (calendar integration)
- Settings search: Search bar to quickly find settings
- Settings history: Audit log of all setting changes
- Settings recommendations: "Based on your behavior, try [setting]"
