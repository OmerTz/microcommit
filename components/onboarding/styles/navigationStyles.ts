import { StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export const createNavigationStyles = () => {
  return StyleSheet.create({
    contentCard: {
      flex: 1,
      justifyContent: 'center',
    },
    navigation: {
      flexDirection: 'row',
      gap: NumeraDesignSystem.spacing.md,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    navButton: {
      minWidth: 100,
      borderRadius: NumeraDesignSystem.borderRadius.button,
      overflow: 'hidden',
    },
    navButtonPrimary: {
      flex: 1,
    },
    navButtonDisabled: {
      opacity: 0.6,
    },
    navButtonCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: NumeraDesignSystem.borderRadius.button,
      overflow: 'hidden',
    },
    navButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: NumeraDesignSystem.spacing.xs,
      padding: NumeraDesignSystem.spacing.md,
      paddingHorizontal: NumeraDesignSystem.spacing.lg,
    },
    navButtonText: {
      fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
      color: '#FFFFFF',
      fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    },
    navButtonGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: NumeraDesignSystem.spacing.xs,
      padding: NumeraDesignSystem.spacing.md,
      paddingHorizontal: NumeraDesignSystem.spacing.lg,
      minHeight: 48,
    },
    navButtonTextPrimary: {
      fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
      color: '#FFFFFF',
      fontWeight: NumeraDesignSystem.typography.fontWeight.bold,
    },
    navButtonTextDisabled: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  });
};