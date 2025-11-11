/**
 * SettingsSection - Section grouping component for settings screens
 * Provides consistent header styling and spacing
 */

import React, { ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export interface SettingsSectionProps {
  title: string;
  children: ReactElement | ReactElement[];
  icon?: string;
  showDivider?: boolean;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
  icon,
  showDivider = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={styles.title}>{title.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        {children}
      </View>
      
      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: NumeraDesignSystem.spacing.lg,
  },
  header: {
    marginBottom: NumeraDesignSystem.spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: NumeraDesignSystem.spacing.sm,
  },
  title: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    fontWeight: NumeraDesignSystem.typography.fontWeight.bold,
    color: NumeraDesignSystem.colors.text.secondary,
    letterSpacing: 1,
  },
  content: {
    backgroundColor: NumeraDesignSystem.colors.background,
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    overflow: 'hidden',
    ...NumeraDesignSystem.shadows.sm,
  },
  divider: {
    height: 1,
    backgroundColor: NumeraDesignSystem.colors.border,
    marginTop: NumeraDesignSystem.spacing.lg,
    marginHorizontal: NumeraDesignSystem.spacing.md,
  },
});

export default SettingsSection;