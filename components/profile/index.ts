/**
 * Profile Components Index
 * Exports all profile management components for NumeraFlow
 */

// Core Profile Components
export { default as ProfileHeaderCard } from './ProfileHeaderCard';
export type { ProfileHeaderCardProps, UserProfile } from './ProfileHeaderCard';

export { default as EnhancedNumberCard } from './EnhancedNumberCard';
export type { EnhancedNumberCardProps } from './EnhancedNumberCard';

export { default as StatisticsCard } from './StatisticsCard';
export type { StatisticsCardProps, StatisticsData } from './StatisticsCard';

export { default as QuickActionCard } from './QuickActionCard';
export type { QuickActionCardProps } from './QuickActionCard';

// Settings Infrastructure
export { default as SettingsSection } from './SettingsSection';
export type { SettingsSectionProps } from './SettingsSection';

export { default as SettingsToggle } from './SettingsToggle';
export type { SettingsToggleProps } from './SettingsToggle';

// Settings Components
export { default as NotificationSettings } from './NotificationSettings';
export type { NotificationSettingsProps, NotificationPreferences } from './NotificationSettings';

export { default as ThemeSelector } from './ThemeSelector';
export type { ThemeSelectorProps, ThemePreferences } from './ThemeSelector';

export { default as DataPrivacy } from './DataPrivacy';
export type { DataPrivacyProps, PrivacyPreferences } from './DataPrivacy';

// Account Management
export { default as AccountManagement } from './AccountManagement';
export type { AccountManagementProps, AccountInfo } from './AccountManagement';

// Account Management Sub-components
export { default as PremiumStatusSection } from './PremiumStatusSection';
export type { PremiumStatusSectionProps } from './PremiumStatusSection';

export { default as AccountInfoSection } from './AccountInfoSection';
export type { AccountInfoSectionProps } from './AccountInfoSection';

export { default as AccountActionsSection } from './AccountActionsSection';
export type { AccountActionsSectionProps } from './AccountActionsSection';

export { default as PasswordChangeForm } from './PasswordChangeForm';
export type { PasswordChangeFormProps } from './PasswordChangeForm';

export { default as EmailChangeForm } from './EmailChangeForm';
export type { EmailChangeFormProps } from './EmailChangeForm';

// Support Components
export { default as HelpSection } from './HelpSection';
export type { HelpSectionProps } from './HelpSection';

export { default as RateSection } from './RateSection';
export type { RateSectionProps } from './RateSection';

export { default as VersionInfoSection } from './VersionInfoSection';
export type { VersionInfoSectionProps } from './VersionInfoSection';

export { default as FeedbackForm } from './FeedbackForm';
export type { FeedbackFormProps } from './FeedbackForm';

// Integration Components
export { default as SocialShare } from './SocialShare';
export { default as ShareOptionsSection } from './ShareOptionsSection';
export { default as PlatformSelectionModal } from './PlatformSelectionModal';
export { default as ProfilePreview } from './ProfilePreview';
export type { SocialShareProps } from './SocialShare';
export type { UserProfileData } from './ProfilePreview';

export { default as SupportComponents } from './SupportComponents';
export type { SupportComponentsProps, SupportInfo } from './SupportComponents';