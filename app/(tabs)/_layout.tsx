import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <View style={{flex: 1}}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb',
            borderRadius: 30,
            height: 70,
            paddingBottom: 8,
            paddingTop: 8,
            marginHorizontal: 10,
            marginBottom: 10,
            position: 'absolute',
            bottom: 0,
            shadowColor: '#6366f1',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 8,
          },
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: '#6b7280',
          tabBarShowLabel: true,
          headerShown: false,
        }}
      >
        {/* Dashboard */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarAccessibilityLabel: 'Dashboard Tab',
            tabBarTestID: 'dashboard-tab',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
                accessibilityLabel="Dashboard icon"
              />
            ),
          }}
        />

        {/* User Profile */}
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarAccessibilityLabel: 'User Profile Tab',
            tabBarTestID: 'profile-tab',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                size={size}
                color={color}
                accessibilityLabel="Profile icon"
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
