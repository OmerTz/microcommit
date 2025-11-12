import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Root index route for Expo Router
 *
 * Handles initial app routing logic:
 * - If user not authenticated → redirect to login
 * - If user authenticated but onboarding not complete → redirect to onboarding
 * - If user authenticated and onboarding complete → redirect to main app
 *
 * This file is required for Expo Router to work properly on web platform.
 */
export default function Index() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRoute = async () => {
      if (isLoading) return;

      const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');

      if (!user) {
        // Not authenticated - go to login
        router.replace('/(auth)/login');
      } else if (onboardingCompleted !== 'true') {
        // Authenticated but onboarding not complete
        router.replace('/onboarding');
      } else {
        // Authenticated and onboarding complete - go to main app
        router.replace('/(tabs)');
      }
    };

    checkAuthAndRoute();
  }, [user, isLoading, router]);

  // Show loading state while determining route
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0B14' }} testID="app-index-loading">
      <ActivityIndicator size="large" color="#6366f1" />
    </View>
  );
}
