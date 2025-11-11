import { StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { getDimensionsHelper } from './baseStyles';

export const createInterestsStyles = () => {
  const { width } = getDimensionsHelper();
  
  return StyleSheet.create({
    interestsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: NumeraDesignSystem.spacing.sm,
      justifyContent: 'center',
      paddingHorizontal: NumeraDesignSystem.spacing.sm,
    },
    interestCard: {
      alignItems: 'center',
      gap: NumeraDesignSystem.spacing.xs,
      padding: NumeraDesignSystem.spacing.md,
      minWidth: (width - 120) / 2,
      maxWidth: (width - 120) / 2,
    },
    interestCardSelected: {
      backgroundColor: 'rgba(139, 69, 255, 0.3)',
    },
    interestLabel: {
      fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
      color: 'rgba(255, 255, 255, 0.7)',
      textAlign: 'center',
      lineHeight: 18,
    },
    interestLabelSelected: {
      color: '#FFFFFF',
      fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    },
  });
};