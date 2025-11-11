import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

interface SettingsHeaderProps {
  error?: string;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ error }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Settings</Text>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: NumeraDesignSystem.spacing.lg,
    paddingTop: NumeraDesignSystem.spacing.xl,
    paddingBottom: NumeraDesignSystem.spacing.md,
  },
  headerTitle: {
    fontSize: NumeraDesignSystem.typography.fontSize.h2,
    fontWeight: NumeraDesignSystem.typography.fontWeight.bold,
    color: NumeraDesignSystem.colors.text.primary,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: NumeraDesignSystem.colors.error + '20',
    borderRadius: NumeraDesignSystem.borderRadius.md,
    padding: NumeraDesignSystem.spacing.sm,
    marginTop: NumeraDesignSystem.spacing.sm,
  },
  errorText: {
    color: NumeraDesignSystem.colors.error,
    fontSize: NumeraDesignSystem.typography.fontSize.body,
    textAlign: 'center',
  },
});