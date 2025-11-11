/**
 * Quick Actions Section Component
 * Displays action buttons for quick navigation
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { dashboardStyles as styles } from '../DashboardStyles';

interface QuickActionsSectionProps {
  onActionPress: (actionId: string) => void;
}

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  onActionPress,
}) => {
  const actions = [
    { id: 'explore-numbers', icon: 'NUM', label: 'My Numbers' },
    { id: 'daily-insights', icon: 'BOOK', label: 'Daily Reading' },
    { id: 'profile', icon: 'USER', label: 'Profile' },
    { id: 'settings', icon: 'GEAR', label: 'Settings' },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action) => (
          <TouchableOpacity 
            key={action.id}
            style={styles.actionButton} 
            onPress={() => onActionPress(action.id)}
          >
            <Text style={styles.actionText}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuickActionsSection;