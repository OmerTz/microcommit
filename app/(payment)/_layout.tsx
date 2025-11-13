import React from 'react';
import { Stack } from 'expo-router';

export default function PaymentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="payment-failed"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-payment-method"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
