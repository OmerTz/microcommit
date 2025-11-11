/**
 * NotificationSettings - Comprehensive notification controls
 * Implements PS018 notification settings design
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { PROFILE_ICONS } from '@/constants/ProfileConstants';
import SettingsSection from './SettingsSection';
import SettingsToggle from './SettingsToggle';
import QuickActionCard from './QuickActionCard';

export interface NotificationPreferences {
  dailyInsights: boolean;
  weeklyReports: boolean;
  specialEvents: boolean;
  pushNotifications: boolean;
  emailSummaries: boolean;
  inAppOnly: boolean;
  dailyInsightTime: string;
  weeklyReportTime: string;
  weeklyReportDay: string;
}

export interface NotificationSettingsProps {
  preferences: NotificationPreferences;
  onPreferencesChange: (preferences: NotificationPreferences) => void;
  onTimePickerPress: (type: 'daily' | 'weekly') => void;
  onTestNotification: () => void;
  onError?: (error: string) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  preferences,
  onPreferencesChange,
  onTimePickerPress,
  onTestNotification,
  onError,
}) => {
  const updatePreference = (key: keyof NotificationPreferences, value: boolean | string) => {
    try {
      onPreferencesChange({
        ...preferences,
        [key]: value,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update notification preferences';
      onError?.(message);
    }
  };

  const formatTime = (time: string): string => {
    try {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Daily Insights Section */}
      <SettingsSection title="Daily Insights" icon={PROFILE_ICONS.calendar}>
        <View>
          <SettingsToggle
            label="Enable Daily Insights"
            description="Receive daily numerology insights and guidance"
            value={preferences.dailyInsights}
            onToggle={(value) => updatePreference('dailyInsights', value)}
          />
          
          {preferences.dailyInsights && (
            <TouchableOpacity
              style={styles.timeSelector}
              onPress={() => onTimePickerPress('daily')}
              accessibilityLabel={`Daily insights time: ${formatTime(preferences.dailyInsightTime)}`}
              accessibilityRole="button"
            >
              <View style={styles.timeSelectorContent}>
                <Text style={styles.timeSelectorLabel}>Notification Time</Text>
                <Text style={styles.timeSelectorValue}>
                  {formatTime(preferences.dailyInsightTime)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </SettingsSection>

      {/* Weekly Reports Section */}
      <SettingsSection title="Weekly Reports" icon={PROFILE_ICONS.chart}>
        <View>
          <SettingsToggle
            label="Enable Weekly Reports"
            description="Comprehensive weekly numerology analysis"
            value={preferences.weeklyReports}
            onToggle={(value) => updatePreference('weeklyReports', value)}
          />
          
          {preferences.weeklyReports && (
            <>
              <TouchableOpacity
                style={styles.timeSelector}
                onPress={() => onTimePickerPress('weekly')}
                accessibilityLabel={`Weekly report time: ${preferences.weeklyReportDay} at ${formatTime(preferences.weeklyReportTime)}`}
                accessibilityRole="button"
              >
                <View style={styles.timeSelectorContent}>
                  <Text style={styles.timeSelectorLabel}>Report Schedule</Text>
                  <Text style={styles.timeSelectorValue}>
                    {preferences.weeklyReportDay} at {formatTime(preferences.weeklyReportTime)}
                  </Text>
                </View>
              </TouchableOpacity>
              
              <View style={styles.previewContainer}>
                <Text style={styles.previewLabel}>Preview:</Text>
                <Text style={styles.previewText}>
                  "Your weekly numbers reveal new opportunities for growth and success..."
                </Text>
              </View>
            </>
          )}
        </View>
      </SettingsSection>

      {/* Special Events Section */}
      <SettingsSection title="Special Events" icon={PROFILE_ICONS.star}>
        <View>
          <SettingsToggle
            label="Personal Year Events"
            description="Important personal year transitions"
            value={preferences.specialEvents}
            onToggle={(value) => updatePreference('specialEvents', value)}
            showDivider={false}
          />
        </View>
      </SettingsSection>

      {/* Delivery Method Section */}
      <SettingsSection title="Delivery Method" icon={PROFILE_ICONS.target}>
        <View>
          <SettingsToggle
            label="Push Notifications"
            description="Instant notifications on your device"
            value={preferences.pushNotifications}
            onToggle={(value) => updatePreference('pushNotifications', value)}
          />
          
          <SettingsToggle
            label="Email Summaries"
            description="Weekly summary emails"
            value={preferences.emailSummaries}
            onToggle={(value) => updatePreference('emailSummaries', value)}
          />
          
          <SettingsToggle
            label="In-App Only"
            description="View insights only within the app"
            value={preferences.inAppOnly}
            onToggle={(value) => updatePreference('inAppOnly', value)}
            showDivider={false}
          />
        </View>
      </SettingsSection>

      {/* Test Notification */}
      <View style={styles.testContainer}>
        <QuickActionCard
          icon={PROFILE_ICONS.bell}
          title="Send Test Notification"
          description="Preview how notifications will look"
          onPress={onTestNotification}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
  },
  timeSelector: {
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    marginHorizontal: NumeraDesignSystem.spacing.md,
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  timeSelectorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeSelectorLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    color: NumeraDesignSystem.colors.text.primary,
  },
  timeSelectorValue: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.cosmic.purple,
  },
  previewContainer: {
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    marginHorizontal: NumeraDesignSystem.spacing.md,
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  previewLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.text.secondary,
    marginBottom: 4,
  },
  previewText: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraDesignSystem.colors.text.secondary,
    fontStyle: 'italic',
    lineHeight: NumeraDesignSystem.typography.lineHeight.bodySmall,
  },
  testContainer: {
    marginTop: NumeraDesignSystem.spacing.md,
    paddingBottom: NumeraDesignSystem.spacing.lg,
  },
});

export default NotificationSettings;