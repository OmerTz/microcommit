/**
 * User data operations for NumeraFlow
 * Extracted from AuthContext.tsx for Bible.md compliance (file size limit)
 */

import { supabase } from '@/utils/supabase';
import { NumerologyService } from '@/services/numerologyService';
import type { SimplifiedNumerologyProfile } from '@/services/numerologyTypes';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { t } from '@/constants/translations';

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
  created_at?: string;
  updated_at?: string;
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

export interface User {
  id: string;
  email: string;
  created_at?: string;
}

export interface UserDataServiceParams {
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  numerologyService: NumerologyService;
}

export const createUserDataService = ({
  setUser,
  setUserProfile,
  setIsLoading,
  setError,
  numerologyService
}: UserDataServiceParams) => {

  const handleAuthUser = async (supabaseUser: SupabaseUser) => {
    const authUser: User = {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      created_at: supabaseUser.created_at
    };
    
    setUser(authUser);
    await loadUserProfile(supabaseUser.id);
  };

  const loadUserProfile = async (userId: string) => {
    try {
      console.log('[USER_DATA] Loading user profile for:', userId);
      setError(null);

      const { data: profile, error } = await supabase
        .from('tzrif_template_user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      // Handle database errors gracefully
      if (error) {
        console.log('[USER_DATA] Profile table error (code:', error.code, '):', error.message);

        // For any database error, create a basic profile from auth data
        console.log('[USER_DATA] Database not configured or inaccessible, using basic profile from auth');
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const basicProfile: UserProfile = {
            id: user.id,
            name: user.email?.split('@')[0] || 'User',
            email: user.email,
            birth_date: '', // Required field, empty for basic profile
            onboarding_completed: true
          };
          console.log('[USER_DATA] Created basic profile:', basicProfile.name);
          setUserProfile(basicProfile);
        } else {
          console.log('[USER_DATA] No auth user available, setting null');
          setUserProfile(null);
        }
        return;
      }

      if (profile) {
        console.log('[USER_DATA] Profile found, calculating numerology...');
        // Calculate numerology profile if birth data exists
        let numerologyProfile: SimplifiedNumerologyProfile | undefined;
        
        if (profile.birth_date) {
          try {
            console.log('[USER_DATA] Calculating numerology for birth date:', profile.birth_date);
            const birthDate = new Date(profile.birth_date);
            numerologyProfile = await numerologyService.calculateNumerology({
              fullName: profile.full_name || '',
              name: profile.full_name || '',
              birthDate: new Date(profile.birth_date)
            });
            console.log('[USER_DATA] Numerology calculated successfully');
          } catch (numError) {
            console.error('[USER_DATA] Error calculating numerology:', numError);
            // Don't let numerology errors block the profile loading
          }
        }

        const userProfile: UserProfile = {
          id: profile.id,
          name: profile.full_name || profile.name || '',
          email: profile.email,
          birth_date: profile.birth_date,
          birth_time: profile.birth_time,
          birth_place: profile.birth_location,
          avatar_url: profile.avatar_url,
          full_name: profile.full_name,
          onboarding_completed: profile.onboarding_completed,
          preferences: profile.preferences,
          numerologyProfile,
          created_at: profile.created_at,
          updated_at: profile.updated_at
        };

        console.log('[USER_DATA] User profile set successfully');
        setUserProfile(userProfile);
      } else {
        console.log('[USER_DATA] No profile found, setting null');
        setUserProfile(null);
      }
    } catch (err: any) {
      console.error('[USER_DATA] Error loading user profile:', err);
      setError(err.message || t('errors.auth.accountCreationFailed'));
      // Don't throw the error - let the app continue without profile
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>, user: User, userProfile: UserProfile) => {
    if (!user || !userProfile?.id) {
      throw new Error(t('errors.auth.accountCreationFailed'));
    }

    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from('tzrif_template_user_profiles')
        .update({
          full_name: updates.name || updates.full_name,
          birth_date: updates.birth_date,
          birth_time: updates.birth_time,
          birth_location: updates.birth_location || updates.birth_place,
          avatar_url: updates.avatar_url,
          preferences: updates.preferences,
          onboarding_completed: updates.onboarding_completed
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Refresh profile to get updated data
      await loadUserProfile(user.id);
    } catch (err: any) {
      setError(err.message || t('errors.network.serverError'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const exportUserData = async (user: User, userProfile: UserProfile) => {
    if (!user || !userProfile) {
      throw new Error(t('errors.auth.accountCreationFailed'));
    }

    try {
      // Compile complete user data for export
      const exportData = {
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        },
        profile: userProfile,
        timestamp: new Date().toISOString()
      };

      // Convert to JSON string for export
      const jsonData = JSON.stringify(exportData, null, 2);
      return jsonData;
    } catch (err: any) {
      setError(err.message || t('errors.network.serverError'));
      throw err;
    }
  };

  const refreshProfile = async (user: User) => {
    if (user) {
      await loadUserProfile(user.id);
    }
  };

  return {
    handleAuthUser,
    loadUserProfile,
    updateProfile,
    exportUserData,
    refreshProfile
  };
};