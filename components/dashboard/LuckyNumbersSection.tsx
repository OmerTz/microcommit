/**
 * Lucky Numbers Section Component
 * Displays the user's lucky numbers with horizontal scrolling
 */

import React, { RefObject } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { dashboardStyles as styles } from '../DashboardStyles';
import LazyDashboardCard from '../performance/LazyDashboardCard';

interface LuckyNumber {
  number: number;
  significance: string;
  timePeriod: string;
  strength: number;
}

interface LuckyNumbersSectionProps {
  luckyNumbers: LuckyNumber[];
  userId: string;
  currentDate: Date;
  onPress: () => void;
  sectionRef?: RefObject<ScrollView>;
}

export const LuckyNumbersSection: React.FC<LuckyNumbersSectionProps> = ({
  luckyNumbers,
  userId,
  currentDate,
  onPress,
  sectionRef,
}) => {

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Lucky Numbers</Text>
      {/* Temporarily bypass LazyDashboardCard to test if it's causing the issue */}
      <ScrollView 
        ref={sectionRef}
        horizontal 
        style={styles.luckyNumbersContainer} 
        showsHorizontalScrollIndicator={false}
      >
        {luckyNumbers && luckyNumbers.length > 0 ? (
          luckyNumbers.map((luckyNum, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.luckyNumberCard} 
              onPress={onPress}
            >
              <Text style={styles.luckyNumber}>{luckyNum.number}</Text>
              <Text style={styles.luckyNumberSignificance}>{luckyNum.significance}</Text>
              <Text style={styles.luckyNumberTime}>{luckyNum.timePeriod}</Text>
              <View style={styles.strengthIndicator}>
                {Array.from({ length: luckyNum.strength }).map((_, i) => (
                  <View key={i} style={styles.strengthDot} />
                ))}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.luckyNumberCard}>
            <Text style={styles.luckyNumber}>?</Text>
            <Text style={styles.luckyNumberSignificance}>Loading lucky numbers...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LuckyNumbersSection;