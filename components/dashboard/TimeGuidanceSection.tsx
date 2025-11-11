/**
 * Time Guidance Section Component
 * Displays optimal timing for different activities
 */

import React, { RefObject } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { dashboardStyles as styles } from '../DashboardStyles';
import LazyDashboardCard from '../performance/LazyDashboardCard';

interface TimeGuidanceItem {
  hour: number;
  period: string;
  activity: string;
  energy: number;
  type: 'best' | 'challenging' | 'neutral';
}

interface TimeGuidanceSectionProps {
  timeGuidance: TimeGuidanceItem[];
  userId: string;
  currentDate: Date;
  onPress: () => void;
  sectionRef?: RefObject<View>;
}

export const TimeGuidanceSection: React.FC<TimeGuidanceSectionProps> = ({
  timeGuidance,
  userId,
  currentDate,
  onPress,
  sectionRef,
}) => {

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Time Guidance</Text>
      {/* Temporarily bypass LazyDashboardCard to test if it's causing the issue */}
      <View ref={sectionRef} style={styles.timeGuidanceContainer}>
        {timeGuidance && timeGuidance.length > 0 ? (
          timeGuidance.map((timeItem, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.timeGuidanceItem,
                timeItem.type === 'best' && styles.bestTime,
                timeItem.type === 'challenging' && styles.challengingTime
              ]}
              onPress={onPress}
            >
              <Text style={styles.timeHour}>
                {timeItem.hour.toString().padStart(2, '0')}:00
              </Text>
              <Text style={styles.timePeriod}>{timeItem.period}</Text>
              <Text style={styles.timeActivity}>{timeItem.activity}</Text>
              <View style={styles.energyLevel}>
                <Text style={styles.energyText}>Energy: {timeItem.energy}/5</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.timeGuidanceItem}>
            <Text style={styles.timeHour}>--:--</Text>
            <Text style={styles.timeActivity}>Loading time guidance...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TimeGuidanceSection;