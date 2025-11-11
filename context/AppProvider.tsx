/**
 * App Provider - Combines all app-level contexts
 * Provides unified context management for the entire app
 */

import React from 'react';
import { AuthProvider } from './AuthContext';
import { SubscriptionProvider } from './SubscriptionContext';
import { getSubscriptionConfig, logSubscriptionConfig } from '@/utils/subscriptionConfig';
import { useAuth } from './AuthContext';

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * Inner provider that has access to auth context
 */
const SubscriptionProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  const subscriptionConfig = getSubscriptionConfig(user?.id);
  
  // Log configuration on mount (development only)
  // Disabled to prevent error toasts overlapping UI
  // React.useEffect(() => {
  //   if (__DEV__) {
  //     logSubscriptionConfig();
  //   }
  // }, []);

  return (
    <SubscriptionProvider
      apiKey={subscriptionConfig.apiKey}
      appUserId={subscriptionConfig.appUserId}
    >
      {children}
    </SubscriptionProvider>
  );
};

/**
 * Main App Provider - wraps entire app with all contexts
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <SubscriptionProviderWrapper>
        {children}
      </SubscriptionProviderWrapper>
    </AuthProvider>
  );
};