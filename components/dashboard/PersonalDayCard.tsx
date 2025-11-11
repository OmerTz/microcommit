/**
 * Personal Day Card Component
 * Displays the user's personal day number and details
 */

import React, { RefObject } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { dashboardStyles as styles } from '../DashboardStyles';
import LazyDashboardCard from '../performance/LazyDashboardCard';
import type { DashboardGuidanceData } from '@/services';

interface PersonalDayCardProps {
  dashboardData: DashboardGuidanceData;
  loading: boolean;
  userId: string;
  currentDate: Date;
  onPress: () => void;
  cardRef?: RefObject<View>;
}

export const PersonalDayCard: React.FC<PersonalDayCardProps> = ({
  dashboardData,
  loading,
  userId,
  currentDate,
  onPress,
  cardRef,
}) => {

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Your Personal Day</Text>
      {/* Temporarily bypass LazyDashboardCard to test if it's causing the issue */}
      <TouchableOpacity 
        ref={cardRef}
        style={styles.dayCard} 
        onPress={onPress}
      >
        <View style={styles.dayNumberCircle}>
          <Text style={styles.dayNumber}>
            {dashboardData?.personalDayNumber !== undefined ? dashboardData.personalDayNumber : 'N/A'}
          </Text>
        </View>
        <Text style={styles.dayTheme}>
          {dashboardData?.theme || 'Loading theme...'}
        </Text>
        <Text style={styles.dayEnergy}>
          Energy: {dashboardData?.energy || 'Loading energy...'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PersonalDayCard;