import { StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export const createProgressStyles = () => {
  return StyleSheet.create({
    progressContainer: {
      alignItems: 'center',
      gap: NumeraDesignSystem.spacing.sm,
    },
    progressBar: {
      width: '100%',
      height: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: NumeraDesignSystem.borderRadius.full,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
    },
    progressGradient: {
      flex: 1,
    },
    progressText: {
      fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
      color: NumeraDesignSystem.colors.text.secondary,
    },
    progressFillAnimated: {
      height: '100%',
      backgroundColor: NumeraDesignSystem.colors.primary[500],
      borderRadius: NumeraDesignSystem.borderRadius.full,
    },
  });
};