import { StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export const createWelcomeStyles = () => {
  return StyleSheet.create({
    mysticalDescription: {
      ...NumeraDesignSystem.typography.body,
      color: NumeraDesignSystem.colors.text.secondary,
      textAlign: 'center',
      marginVertical: NumeraDesignSystem.spacing.sm,
      lineHeight: 20,
      opacity: 0.9,
    },
    featuresContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: NumeraDesignSystem.borderRadius.card,
      padding: NumeraDesignSystem.spacing.md,
      marginVertical: NumeraDesignSystem.spacing.xs,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: NumeraDesignSystem.spacing.xs,
      gap: NumeraDesignSystem.spacing.sm,
    },
    featureDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: NumeraDesignSystem.colors.primary[500],
    },
    featureText: {
      ...NumeraDesignSystem.typography.caption,
      color: NumeraDesignSystem.colors.text.secondary,
      flex: 1,
    },
    validationHint: {
      ...NumeraDesignSystem.typography.caption,
      color: NumeraDesignSystem.colors.primary[400],
      marginTop: NumeraDesignSystem.spacing.xs,
      textAlign: 'center',
      opacity: 0.8,
    },
    inputCardError: {
      borderColor: NumeraDesignSystem.colors.error,
      borderWidth: 2,
    },
    errorText: {
      ...NumeraDesignSystem.typography.caption,
      color: NumeraDesignSystem.colors.error,
      marginTop: NumeraDesignSystem.spacing.xs,
      textAlign: 'center',
    },
  });
};