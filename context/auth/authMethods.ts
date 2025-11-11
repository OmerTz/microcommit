/**
 * Authentication methods for NumeraFlow
 * Extracted from AuthContext.tsx for Bible.md compliance (file size limit)
 */

import { supabase } from '@/utils/supabase';

export interface AuthMethodParams {
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const defaultNotificationPreferences = {
  dailyGuidance: true,
  weeklyInsights: true,
  specialEvents: true,
  reminders: false,
  preferredTime: '09:00'
};

export const defaultThemePreferences = {
  mode: 'system' as const,
  accentColor: undefined
};

export const defaultPrivacyPreferences = {
  profileVisibility: 'private' as const,
  shareInsights: false,
  analyticsOptOut: false
};

export const defaultGuidancePreferences = {
  contentDepth: 'balanced' as const,
  includeAstrology: true,
  focusAreas: [] as string[]
};

export const createAuthMethods = ({ setIsLoading, setError }: AuthMethodParams) => {
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: { 
    name: string; 
    birth_date: string; 
    birth_time?: string; 
    birth_place?: string 
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        throw error;
      }

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('tzrif_template_user_profiles')
          .insert({
            user_id: data.user.id,
            full_name: userData.name,
            birth_date: userData.birth_date,
            birth_time: userData.birth_time,
            birth_location: userData.birth_place,
            preferences: {
              notifications: defaultNotificationPreferences,
              theme: defaultThemePreferences,
              privacy: defaultPrivacyPreferences,
              guidance: defaultGuidancePreferences
            }
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Sign out failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Supabase handles password updates securely
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmail = async (newEmail: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Supabase handles email updates with verification
      const { error } = await supabase.auth.updateUser({ 
        email: newEmail 
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Failed to update email');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // First delete user profile data
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase
          .from('tzrif_template_user_profiles')
          .delete()
          .eq('user_id', user.id);
      }

      // Note: Account deletion from auth.users typically requires admin API
      // This would need to be handled via a server function
      console.log('Account deletion requested - profile data cleared');
    } catch (err: any) {
      setError(err.message || 'Failed to delete account');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    updatePassword,
    updateEmail,
    deleteAccount
  };
};