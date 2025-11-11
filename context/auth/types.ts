/**
 * Type definitions for Authentication Context
 * Extracted from AuthContext.tsx for Bible.md compliance (file size limit)
 */

import type { SimplifiedNumerologyProfile } from '@/services/numerologyTypes';

export interface User {
  id: string;
  email: string;
  created_at?: string;
}

export interface NotificationPreferences {
  dailyGuidance: boolean;
  weeklyInsights: boolean;
  specialEvents: boolean;
  reminders: boolean;
  preferredTime: string;
}

export interface ThemePreferences {
  mode: 'light' | 'dark' | 'system';
  accentColor?: string;
}

export interface PrivacyPreferences {
  profileVisibility: 'private' | 'public';
  shareInsights: boolean;
  analyticsOptOut: boolean;
}

export interface GuidancePreferences {
  contentDepth: 'brief' | 'balanced' | 'detailed';
  includeAstrology: boolean;
  focusAreas: string[];
}

export interface UserProfile {
  id?: string;
  name: string;
  email?: string;
  birth_date: string;
  birth_time?: string;
  birth_place?: string;
  avatar_url?: string;
  full_name?: string;
  onboarding_completed?: boolean;
  preferences?: {
    notifications?: NotificationPreferences;
    theme?: ThemePreferences;
    privacy?: PrivacyPreferences;
    guidance?: GuidancePreferences;
  };
  numerologyProfile?: SimplifiedNumerologyProfile;
  readingsCount?: number;
  insightsCount?: number;
  streakDays?: number;
  created_at?: string;
  updated_at?: string;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: {
    name: string;
    birth_date: string;
    birth_time?: string;
    birth_place?: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateEmail: (newEmail: string, password: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
  exportUserData: () => Promise<string>;
  refreshProfile: () => Promise<void>;
}

// Default preferences
export const defaultNotificationPreferences: NotificationPreferences = {
  dailyGuidance: true,
  weeklyInsights: true,
  specialEvents: true,
  reminders: false,
  preferredTime: '09:00'
};

export const defaultThemePreferences: ThemePreferences = {
  mode: 'system',
  accentColor: undefined
};

export const defaultPrivacyPreferences: PrivacyPreferences = {
  profileVisibility: 'private',
  shareInsights: false,
  analyticsOptOut: false
};

export const defaultGuidancePreferences: GuidancePreferences = {
  contentDepth: 'balanced',
  includeAstrology: true,
  focusAreas: []
};