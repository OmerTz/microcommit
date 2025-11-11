/**
 * DataPrivacy - Privacy and security settings component
 * Implements PS018 data privacy design with security controls
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { PROFILE_ICONS } from '@/constants/ProfileConstants';
import SettingsSection from './SettingsSection';
import SettingsToggle from './SettingsToggle';
import QuickActionCard from './QuickActionCard';

export interface PrivacyPreferences {
  analyticsData: boolean;
  usagePatterns: boolean;
  crashReports: boolean;
  locationData: boolean;
  shareNumbers: boolean;
  shareInsights: boolean;
  shareFullProfile: boolean;
  profileVisibility: 'private' | 'friends' | 'public';
}

export interface DataPrivacyProps {
  preferences: PrivacyPreferences;
  onPreferencesChange: (preferences: PrivacyPreferences) => void;
  onChangePassword: () => void;
  onEnable2FA: () => void;
  onManageSessions: () => void;
  onDownloadData: () => void;
  onDeleteData: () => void;
  loading?: boolean;
  onError?: (error: string) => void;
}

const DataPrivacy: React.FC<DataPrivacyProps> = ({
  preferences,
  onPreferencesChange,
  onChangePassword,
  onEnable2FA,
  onManageSessions,
  onDownloadData,
  onDeleteData,
  loading = false,
  onError,
}) => {
  const updatePreference = <K extends keyof PrivacyPreferences>(
    key: K,
    value: PrivacyPreferences[K]
  ) => {
    try {
      onPreferencesChange({
        ...preferences,
        [key]: value,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update privacy preferences';
      onError?.(message);
    }
  };

  const handleDeleteData = () => {
    Alert.alert(
      'Delete Personal Data',
      'This will permanently delete all your personal data, including numerology profiles, insights, and preferences. This action cannot be undone.\n\nAre you sure you want to continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await onDeleteData();
            } catch (error) {
              const message = error instanceof Error ? error.message : 'Failed to delete data';
              onError?.(message);
            }
          },
        },
      ]
    );
  };

  const handleDownloadData = async () => {
    try {
      await onDownloadData();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to download data';
      onError?.(message);
    }
  };

  const handleChangePassword = async () => {
    try {
      await onChangePassword();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to change password';
      onError?.(message);
    }
  };

  const handleEnable2FA = async () => {
    try {
      await onEnable2FA();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to enable 2FA';
      onError?.(message);
    }
  };

  const handleManageSessions = async () => {
    try {
      await onManageSessions();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to manage sessions';
      onError?.(message);
    }
  };

  const getDataRetentionInfo = () => {
    return {
      retention: '2 years',
      lastExport: 'Never',
      dataSize: '12.4 MB',
      lastSync: '2 hours ago',
    };
  };

  const dataInfo = getDataRetentionInfo();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Data Collection */}
      <SettingsSection title="Data Collection" icon={PROFILE_ICONS.chart}>
        <View>
          <SettingsToggle
            label="Analytics Data"
            description="Help improve the app with usage analytics"
            value={preferences.analyticsData}
            onToggle={(value) => updatePreference('analyticsData', value)}
          />
          
          <SettingsToggle
            label="Usage Patterns"
            description="Track feature usage for personalization"
            value={preferences.usagePatterns}
            onToggle={(value) => updatePreference('usagePatterns', value)}
          />
          
          <SettingsToggle
            label="Crash Reports"
            description="Send crash reports to improve stability"
            value={preferences.crashReports}
            onToggle={(value) => updatePreference('crashReports', value)}
          />
          
          <SettingsToggle
            label="Location Data"
            description="Use location for birth place suggestions"
            value={preferences.locationData}
            onToggle={(value) => updatePreference('locationData', value)}
            showDivider={false}
          />
        </View>
        
        <View style={styles.dataInfoContainer}>
          <Text style={styles.dataInfoText}>
            We use this data to improve your numerology experience
          </Text>
        </View>
      </SettingsSection>

      {/* Sharing Preferences */}
      <SettingsSection title="Sharing Preferences" icon={PROFILE_ICONS.handshake}>
        <View>
          <View style={styles.visibilityContainer}>
            <Text style={styles.visibilityLabel}>Profile Visibility</Text>
            <View style={styles.visibilityOption}>
              <Text style={styles.visibilityValue}>Private</Text>
              <Text style={styles.visibilityDescription}>
                Only you can see your profile
              </Text>
            </View>
          </View>
          
          <SettingsToggle
            label="Allow Number Sharing"
            description="Share individual numbers on social media"
            value={preferences.shareNumbers}
            onToggle={(value) => updatePreference('shareNumbers', value)}
          />
          
          <SettingsToggle
            label="Allow Insight Sharing"
            description="Share daily insights and guidance"
            value={preferences.shareInsights}
            onToggle={(value) => updatePreference('shareInsights', value)}
          />
          
          <SettingsToggle
            label="Allow Full Profile Sharing"
            description="Share complete numerology profile"
            value={preferences.shareFullProfile}
            onToggle={(value) => updatePreference('shareFullProfile', value)}
            showDivider={false}
          />
        </View>
      </SettingsSection>

      {/* Account Security */}
      <SettingsSection title="Account Security" icon={PROFILE_ICONS.lockClosed}>
        <View>
          <QuickActionCard
            icon={PROFILE_ICONS.key}
            title="Change Password"
            description="Update your account password"
            onPress={handleChangePassword}
          />
          
          <QuickActionCard
            icon={PROFILE_ICONS.phone}
            title="Two-Factor Authentication"
            description="Enable 2FA for extra security"
            onPress={handleEnable2FA}
          />
          
          <QuickActionCard
            icon={PROFILE_ICONS.mobile}
            title="Active Sessions"
            description="Manage logged in devices"
            onPress={handleManageSessions}
          />
        </View>
      </SettingsSection>

      {/* Data Management */}
      <SettingsSection title="Data Management" icon={PROFILE_ICONS.folder} showDivider={false}>
        <View>
          <View style={styles.dataStatsContainer}>
            <View style={styles.dataStat}>
              <Text style={styles.dataStatLabel}>Data Retention:</Text>
              <Text style={styles.dataStatValue}>{dataInfo.retention}</Text>
            </View>
            <View style={styles.dataStat}>
              <Text style={styles.dataStatLabel}>Last Export:</Text>
              <Text style={styles.dataStatValue}>{dataInfo.lastExport}</Text>
            </View>
            <View style={styles.dataStat}>
              <Text style={styles.dataStatLabel}>Storage Used:</Text>
              <Text style={styles.dataStatValue}>{dataInfo.dataSize}</Text>
            </View>
          </View>
          
          <QuickActionCard
            icon={PROFILE_ICONS.download}
            title="Download My Data"
            description="Export all your information"
            onPress={handleDownloadData}
          />
          
          <QuickActionCard
            icon={PROFILE_ICONS.warning}
            title="Delete My Data"
            description="Permanently remove all data"
            onPress={handleDeleteData}
          />
        </View>
      </SettingsSection>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
  },
  dataInfoContainer: {
    paddingVertical: NumeraDesignSystem.spacing.sm,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    backgroundColor: NumeraDesignSystem.colors.primary[50],
    marginHorizontal: NumeraDesignSystem.spacing.md,
    marginTop: NumeraDesignSystem.spacing.sm,
    borderRadius: NumeraDesignSystem.borderRadius.md,
  },
  dataInfoText: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraDesignSystem.colors.primary[700],
    textAlign: 'center',
  },
  visibilityContainer: {
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    backgroundColor: NumeraDesignSystem.colors.background,
  },
  visibilityLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    color: NumeraDesignSystem.colors.text.primary,
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  visibilityOption: {
    padding: NumeraDesignSystem.spacing.md,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    borderWidth: 2,
    borderColor: NumeraDesignSystem.colors.primary[500],
  },
  visibilityValue: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.text.primary,
    marginBottom: 2,
  },
  visibilityDescription: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraDesignSystem.colors.text.secondary,
  },
  dataStatsContainer: {
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    marginHorizontal: NumeraDesignSystem.spacing.md,
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  dataStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dataStatLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraDesignSystem.colors.text.secondary,
  },
  dataStatValue: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    color: NumeraDesignSystem.colors.text.primary,
  },
});

export default DataPrivacy;