/**
 * Profile Constants - Icons, labels, and text for profile components
 * Replaces hardcoded emojis and strings for better maintainability
 */

// Icon constants using Lucide icon names (no emojis)
export const PROFILE_ICONS = {
  // Account Management
  diamond: 'diamond',
  star: 'star', 
  refresh: 'refresh-cw',
  user: 'user',
  edit: 'edit',
  key: 'key',
  warning: 'alert-triangle',
  logout: 'log-out',
  trash: 'trash-2',
  
  // Settings and preferences
  settings: 'settings',
  chart: 'bar-chart',
  handshake: 'handshake',
  lock: 'lock',
  lockClosed: 'lock',
  mobile: 'smartphone',
  phone: 'phone',
  folder: 'folder',
  download: 'download',
  
  // Support and help
  help: 'help-circle',
  book: 'book-open',
  message: 'message-circle',
  info: 'info',
  
  // Social and sharing
  image: 'image',
  link: 'link',
  document: 'file-text',
  camera: 'camera',
  facebook: 'facebook',
  twitter: 'twitter', 
  whatsapp: 'message-circle',
  instagram: 'instagram',
  close: 'x',
  security: 'shield',
  
  // Themes and appearance
  sun: 'sun',
  moon: 'moon',
  sparkles: 'sparkles',
  palette: 'palette',
  rainbow: 'rainbow',
  text: 'type',
  accessibility: 'accessibility',
  
  // Notifications
  calendar: 'calendar',
  clock: 'clock',
  bell: 'bell',
  target: 'target',
  
  // Statistics
  trending: 'trending-up',
  fire: 'flame',
  
  // Feedback types
  bug: 'bug',
  lightbulb: 'lightbulb',
  comment: 'message-square',
} as const;

// Profile text constants for i18n
export const PROFILE_TEXT = {
  // Premium section
  premiumTitle: 'Premium',
  statusLabel: 'Status:',
  premiumUser: 'Premium User',
  freeUser: 'Free User',
  upgradeToPremium: 'Upgrade to Premium',
  upgradeToPremiumDesc: 'Unlock advanced numerology features',
  restorePurchases: 'Restore Purchases',
  restorePurchasesDesc: 'Already purchased? Restore access',
  
  // Account Information
  accountInfoTitle: 'Account Information',
  emailLabel: 'Email:',
  updateEmailTitle: 'Update Email Address',
  updateEmailDesc: 'Change your account email',
  changePasswordTitle: 'Change Password',
  changePasswordDesc: 'Update your account password',
  
  // Account Actions
  accountActionsTitle: 'Account Actions',
  appVersionLabel: 'App Version:',
  lastSyncLabel: 'Last Sync:',
  signOutTitle: 'Sign Out',
  signOutDesc: 'Log out of your account',
  deleteAccountTitle: 'Delete Account',
  deleteAccountDesc: 'Permanently delete your account',
  
  // Support section
  helpSupportTitle: 'Help & Support',
  helpFaqTitle: 'Help & FAQ',
  helpFaqDesc: 'Find answers to common questions',
  contactSupportTitle: 'Contact Support', 
  contactSupportDesc: 'Get help from our support team',
  sendFeedbackTitle: 'Send Feedback',
  sendFeedbackDesc: 'Share your thoughts or report issues',
  
  // Rating section
  rateReviewTitle: 'Rate & Review',
  rateAppTitle: 'Rate NumeraFlow',
  rateAppDesc: 'Leave a review in the App Store',
  
  // Version info
  appInfoTitle: 'App Information',
  buildNumberLabel: 'Build Number:',
  supportContactLabel: 'Support Contact:',
  
  // Privacy section
  dataCollectionTitle: 'Data Collection',
  accountSecurityTitle: 'Account Security',
  dataManagementTitle: 'Data Management',
  privateLabel: 'Private',
  exportDataTitle: 'Export Data',
  exportDataDesc: 'Download your personal data',
  deleteDataTitle: 'Delete Data',
  deleteDataDesc: 'Remove all your data',
  
  // Themes
  themeTitle: 'Theme',
  colorSchemeTitle: 'Color Scheme', 
  textSizeTitle: 'Text Size',
  accessibilityTitle: 'Accessibility',
  lightTheme: 'Light',
  lightThemeDesc: 'Clean and bright',
  darkTheme: 'Dark',
  darkThemeDesc: 'Easy on the eyes',
  cosmicTheme: 'Cosmic',
  cosmicThemeDesc: 'Mystical and magical',
  
  // Notifications
  dailyInsightsTitle: 'Daily Insights',
  weeklyReportsTitle: 'Weekly Reports',
  deliveryMethodTitle: 'Delivery Method',
  pushNotificationsTitle: 'Push Notifications',
  
  // Statistics
  totalReadingsLabel: 'Total Readings',
  daysActiveLabel: 'Days Active',  
  streakLabel: 'Current Streak',
  
  // Share content
  shareContentTitle: 'Share Content',
  shareCustomTitle: 'Custom Share',
  shareImageTitle: 'Image Share',
  privacyNotice: 'Only your core numbers will be shared. Personal details remain private.',
  discoverNumerology: 'Discover your numerology with NumeraFlow',
  
  // Social sharing - Main section
  shareYourProfileTitle: 'Share Your Profile',
  shareYourProfileSubtitle: 'Choose how you\'d like to share your numerology insights',
  
  // Share options
  beautifulCardTitle: 'Beautiful Card',
  beautifulCardDesc: 'Create a shareable image with your core numbers',
  profileLinkTitle: 'Profile Link',
  profileLinkDesc: 'Share a secure profile URL',
  pdfReportTitle: 'PDF Report',
  pdfReportDesc: 'Generate a detailed report',
  
  // Share option features
  coreNumbersFeature: 'Your core numbers',
  personalizedMessageFeature: 'Personalized message',
  cosmicDesignFeature: 'Cosmic design',
  viewOnlyAccessFeature: 'View-only access',
  expiresIn30DaysFeature: 'Expires in 30 days',
  noPersonalDataFeature: 'No personal data shown',
  allNumbersExplainedFeature: 'All numbers explained',
  compatibilityInsightsFeature: 'Compatibility insights',
  professionalFormattingFeature: 'Professional formatting',
  
  // Platform selection modal
  shareToPlatformTitle: 'Share to Platform',
  choosePlatformTitle: 'Choose Platform:',
  closeSharingOptions: 'Close sharing options',
  shareToPrefix: 'Share to',
  
  // Profile preview labels
  numerologyProfileTitle: 'Numerology Profile',
  lifePathLabel: 'Life Path',
  expressionLabel: 'Expression',
  soulUrgeLabel: 'Soul Urge',
  
  // Alert dialogs
  generateShareLinkTitle: 'Generate Share Link',
  generateShareLinkMessage: 'Create a secure link that expires in 30 days?',
  generatePDFReportTitle: 'Generate PDF Report',
  generatePDFReportMessage: 'Create a detailed numerology report?',
  generateButton: 'Generate',
  
  // Feedback form
  feedbackTypeLabel: 'Feedback Type:',
  yourFeedbackLabel: 'Your Feedback:',
  emailOptionalLabel: 'Email (optional):',
  feedbackFollowUpNote: 'Provide your email if you\'d like us to follow up',
  bugReportLabel: 'Bug Report',
  bugReportDesc: 'Report an issue',
  featureRequestLabel: 'Feature Request', 
  featureRequestDesc: 'Suggest new features',
  generalFeedbackLabel: 'General Feedback',
  generalFeedbackDesc: 'Share your thoughts',
  
  // Form actions
  cancel: 'Cancel',
  save: 'Save',
  update: 'Update',
  change: 'Change',
  send: 'Send',
  sending: 'Sending...',
  updating: 'Updating...',
  changing: 'Changing...',
  
  // Time labels
  timeLabel: 'Time:',
  
  // Character count
  charactersLabel: 'characters',
} as const;

// Export type for icon keys
export type ProfileIconKey = keyof typeof PROFILE_ICONS;