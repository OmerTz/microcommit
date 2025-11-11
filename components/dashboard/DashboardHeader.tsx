/**
 * Dashboard Header Component
 * Handles personalized greeting and date display
 */

import React from 'react';
import { View, Text } from 'react-native';
import { t } from '@/constants/translations';
import { dashboardStyles as styles } from '../DashboardStyles';

interface DashboardHeaderProps {
  userName?: string;
  user?: any;
  currentDate: Date;
  personalizedGreeting?: string;
  onProfilePress?: () => void;
  onSettingsPress?: () => void;
  isPremium?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  user,
  currentDate,
  personalizedGreeting = 'Hello',
  onProfilePress,
  onSettingsPress,
  isPremium,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.greeting}>
        {personalizedGreeting ? `${personalizedGreeting}, ` : ''}{userName || user?.name || 'User'}
      </Text>
      <Text style={styles.date}>
        {currentDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </Text>
    </View>
  );
};

export default DashboardHeader;