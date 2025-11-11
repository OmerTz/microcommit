import { StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export const createStepStyles = () => {
  return StyleSheet.create({
    stepContainer: {
      padding: 12,
      alignItems: 'center',
      gap: 12,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: NumeraDesignSystem.borderRadius.full,
      overflow: 'hidden',
    },
    iconGradient: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: NumeraDesignSystem.typography.fontSize.h2,
      fontWeight: NumeraDesignSystem.typography.fontWeight.bold,
      color: NumeraDesignSystem.colors.text.primary,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: NumeraDesignSystem.typography.fontSize.bodyLarge,
      color: NumeraDesignSystem.colors.text.secondary,
      textAlign: 'center',
      marginTop: -NumeraDesignSystem.spacing.sm,
    },
  });
};