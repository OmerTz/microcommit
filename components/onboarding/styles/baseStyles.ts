import { StyleSheet, Dimensions } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

const getDimensions = () => {
  try {
    const { width } = Dimensions.get('window');
    return { width };
  } catch (error) {
    // Fallback for testing environments
    return { width: 375 };
  }
};

export const createBaseStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    gradientContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderRadius: NumeraDesignSystem.borderRadius.card,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      overflow: 'hidden',
    },
    inputCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: NumeraDesignSystem.borderRadius.input,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      padding: NumeraDesignSystem.spacing.sm,
    },
    fixedContent: {
      flex: 1,
      padding: NumeraDesignSystem.spacing.screen.paddingHorizontal,
      paddingTop: NumeraDesignSystem.spacing.sm,
      paddingBottom: NumeraDesignSystem.spacing.sm,
      justifyContent: 'space-between',
    },
    contentContainer: {
      minHeight: '100%',
      paddingBottom: NumeraDesignSystem.spacing.screen.paddingBottom,
    },
    content: {
      flex: 1,
      padding: NumeraDesignSystem.spacing.screen.paddingHorizontal,
      paddingTop: NumeraDesignSystem.spacing.screen.paddingTop,
      maxWidth: 600,
      width: '100%',
      alignSelf: 'center',
      gap: NumeraDesignSystem.spacing.md,
    },
  });
};

export const getDimensionsHelper = getDimensions;