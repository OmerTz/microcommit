import React from 'react';
import { Stack, router } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0B0B14',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: 'Sign In',
          headerShown: true,
          headerLeft: () => null, // No back button on login screen
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Create Account',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              testID="auth-back-button"
              onPress={() => router.back()}
              style={{ marginLeft: 10, padding: 8 }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 17 }}>← Back</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}