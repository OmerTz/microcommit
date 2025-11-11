/**
 * VersionInfoSection - App version and contact information
 * Extracted from SupportComponents.tsx for better modularity
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import SettingsSection from './SettingsSection';

export interface VersionInfoSectionProps {
  appVersion: string;
  buildNumber: string;
  supportEmail: string;
}

const VersionInfoSection: React.FC<VersionInfoSectionProps> = ({
  appVersion,
  buildNumber,
  supportEmail,
}) => {
  return (
    <SettingsSection title="App Information" icon="info" showDivider={false}>
      <View style={styles.versionInfo}>
        <View style={styles.versionItem}>
          <Text style={styles.versionLabel}>App Version:</Text>
          <Text style={styles.versionValue}>{appVersion}</Text>
        </View>
        <View style={styles.versionItem}>
          <Text style={styles.versionLabel}>Build Number:</Text>
          <Text style={styles.versionValue}>{buildNumber}</Text>
        </View>
        
        <View style={styles.supportContact}>
          <Text style={styles.supportLabel}>Support Contact:</Text>
          <Text style={styles.supportValue}>{supportEmail}</Text>
        </View>
      </View>
    </SettingsSection>
  );
};

const styles = StyleSheet.create({
  versionInfo: {
    padding: NumeraDesignSystem.spacing.md,
    backgroundColor: NumeraDesignSystem.colors.background,
  },
  versionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  versionLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraDesignSystem.colors.text.secondary,
  },
  versionValue: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    color: NumeraDesignSystem.colors.text.primary,
  },
  supportContact: {
    marginTop: NumeraDesignSystem.spacing.md,
    paddingTop: NumeraDesignSystem.spacing.md,
    borderTopWidth: 1,
    borderTopColor: NumeraDesignSystem.colors.border,
  },
  supportLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraDesignSystem.colors.text.secondary,
    marginBottom: 4,
  },
  supportValue: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    color: NumeraDesignSystem.colors.primary[600],
  },
});

export default VersionInfoSection;