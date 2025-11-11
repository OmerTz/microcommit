/**
 * StatisticsCard - User journey statistics display
 * Shows readings completed, insights generated, and day streak
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { PROFILE_TEXT, PROFILE_ICONS } from '@/constants/ProfileConstants';

export interface StatisticsData {
  readingsCompleted: number;
  insightsGenerated: number;
  dayStreak: number;
}

export interface StatisticsCardProps {
  stats: StatisticsData;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ stats }) => {
  const statisticsData = [
    {
      icon: PROFILE_ICONS.chart,
      value: stats.readingsCompleted,
      label: PROFILE_TEXT.totalReadingsLabel,
      color: NumeraDesignSystem.colors.cosmic.blue,
    },
    {
      icon: PROFILE_ICONS.sparkles,
      value: stats.insightsGenerated,
      label: PROFILE_TEXT.daysActiveLabel,
      color: NumeraDesignSystem.colors.cosmic.purple,
    },
    {
      icon: PROFILE_ICONS.fire,
      value: stats.dayStreak,
      label: PROFILE_TEXT.streakLabel,
      color: NumeraDesignSystem.colors.warning,
    },
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your Journey</Text>
      
      <View style={styles.statsGrid}>
        {statisticsData.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{stat.icon}</Text>
            </View>
            
            <Text style={[styles.statValue, { color: stat.color }]}>
              {formatNumber(stat.value)}
            </Text>
            
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: NumeraDesignSystem.colors.background,
    borderRadius: NumeraDesignSystem.borderRadius.xl,
    padding: NumeraDesignSystem.spacing.md,
    marginHorizontal: NumeraDesignSystem.spacing.md,
    marginBottom: NumeraDesignSystem.spacing.sm,
    ...NumeraDesignSystem.shadows.md,
  },
  sectionTitle: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyLarge,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.text.primary,
    marginBottom: NumeraDesignSystem.spacing.md,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  icon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: NumeraDesignSystem.typography.fontSize.h3,
    fontWeight: NumeraDesignSystem.typography.fontWeight.bold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.caption,
    color: NumeraDesignSystem.colors.text.secondary,
    textAlign: 'center',
    lineHeight: NumeraDesignSystem.typography.lineHeight.caption,
  },
});

export default StatisticsCard;