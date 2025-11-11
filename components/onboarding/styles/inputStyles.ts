import { StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export const createInputStyles = () => {
  return StyleSheet.create({
    inputGroup: {
      width: '100%',
      gap: NumeraDesignSystem.spacing.sm,
    },
    label: {
      fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
      color: NumeraDesignSystem.colors.text.secondary,
      textAlign: 'center',
    },
    input: {
      padding: NumeraDesignSystem.spacing.lg,
      fontSize: NumeraDesignSystem.typography.fontSize.bodyLarge,
      color: NumeraDesignSystem.colors.text.primary,
      textAlign: 'center',
    },
  });
};