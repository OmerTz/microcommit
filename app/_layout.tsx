import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { SubscriptionProvider } from '@/context/SubscriptionContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
      console.log('[_LAYOUT] checkAuthAndOnboarding called, isLoading:', isLoading);
      if (isLoading) return;

      const inAuthGroup = segments[0] === '(auth)';
      const inPaymentGroup = segments[0] === '(payment)';
      const inOnboarding = segments[0] === 'onboarding';
      
      // Check if onboarding has been completed
      const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
      
      console.log('[_LAYOUT] Auth check:', {
        user: !!user,
        userId: user?.id,
        isLoading,
        inAuthGroup,
        inOnboarding,
        onboardingCompleted,
        currentSegments: segments,
        currentPath: segments.join('/')
      });

      if (!user && !inPaymentGroup) {
        // User is not authenticated - always redirect to login
        if (!inAuthGroup) {
          console.log('[_LAYOUT] Redirecting to login - user not authenticated');
          router.replace('/(auth)/login');
        } else {
          console.log('[_LAYOUT] User not authenticated but already in auth group');
        }
      } else if (user) {
        // User is authenticated
        console.log('[_LAYOUT] User is authenticated:', user.id);
        if (onboardingCompleted !== 'true' && !inOnboarding) {
          // Onboarding not completed, redirect to onboarding
          console.log('[_LAYOUT] Redirecting to onboarding - not completed');
          router.replace('/onboarding');
        } else if (onboardingCompleted === 'true' && (inAuthGroup || inOnboarding)) {
          // User has completed onboarding but still in auth/onboarding screens
          console.log('[_LAYOUT] Redirecting to main app - onboarding completed');
          router.replace('/(tabs)');
        } else {
          console.log('[_LAYOUT] No redirect needed');
        }
      } else if (inPaymentGroup) {
        // User not authenticated but in payment group - allow access for direct URL navigation
        console.log('[_LAYOUT] Allowing unauthenticated access to payment group');
      }
    };

    checkAuthAndOnboarding();
  }, [user, isLoading, segments]);

  return (
    <View testID="app-root" style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(payment)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <SubscriptionProvider apiKey="mock_api_key" appUserId="test_user">
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </SubscriptionProvider>
    </ErrorBoundary>
  );
}