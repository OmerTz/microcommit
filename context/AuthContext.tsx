/**
 * Enhanced Auth Context for NumeraFlow with Supabase Integration
 * Refactored for Bible.md compliance (file size under 400 lines)
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/utils/supabase';
import { NumerologyService } from '@/services/numerologyService';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// Import extracted modules
import { createAuthMethods } from './auth/authMethods';
import { createUserDataService } from './auth/userDataService';
import type { 
  User, 
  UserProfile, 
  AuthContextType,
  NotificationPreferences,
  ThemePreferences,
  PrivacyPreferences,
  GuidancePreferences
} from './auth/types';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const numerologyService = new NumerologyService();

  // Create service instances
  const authMethods = createAuthMethods({ setIsLoading, setError });
  const userDataService = createUserDataService({
    setUser,
    setUserProfile,
    setIsLoading,
    setError,
    numerologyService
  });

  // Initialize auth state on mount
  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const initializeAuth = async () => {
      try {
        console.log('[AUTH] Starting auth initialization...');
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user && isMounted) {
          console.log('[AUTH] User session found, loading profile...');
          await userDataService.handleAuthUser(session.user);
        } else {
          console.log('[AUTH] No user session found');
        }
      } catch (err) {
        console.error('[AUTH] Error initializing auth:', err);
        setError('Failed to initialize authentication');
      } finally {
        if (isMounted) {
          console.log('[AUTH] Setting isLoading to false');
          setIsLoading(false);
        }
      }
    };

    // Add timeout fallback to prevent infinite loading
    timeoutId = setTimeout(() => {
      if (isMounted && isLoading) {
        console.log('[AUTH] TIMEOUT: Forcing isLoading to false after 10 seconds');
        setIsLoading(false);
        setError('Authentication initialization timed out');
      }
    }, 10000);

    initializeAuth();

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      try {
        console.log(`[AUTH] Auth state changed: ${event}`);
        if (event === 'SIGNED_IN' && session?.user) {
          await userDataService.handleAuthUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setUserProfile(null);
        }
      } catch (err) {
        console.error('[AUTH] Error in auth state change:', err);
        setError('Authentication state change failed');
      } finally {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  // Wrap service methods to include required parameters
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !userProfile) {
      throw new Error('User not authenticated');
    }
    await userDataService.updateProfile(updates, user, userProfile);
  };

  const exportUserData = async () => {
    if (!user || !userProfile) {
      throw new Error('User not authenticated');
    }
    return userDataService.exportUserData(user, userProfile);
  };

  const refreshProfile = async () => {
    if (user) {
      await userDataService.refreshProfile(user);
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    isLoading,
    error,
    signIn: authMethods.signIn,
    signUp: authMethods.signUp,
    signOut: authMethods.signOut,
    updateProfile,
    updatePassword: authMethods.updatePassword,
    updateEmail: authMethods.updateEmail,
    deleteAccount: authMethods.deleteAccount,
    exportUserData,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export types for use in components
export type {
  User,
  UserProfile,
  NotificationPreferences,
  ThemePreferences,
  PrivacyPreferences,
  GuidancePreferences
};