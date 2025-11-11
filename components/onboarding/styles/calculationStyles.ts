import { StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export const createCalculationStyles = () => {
  return StyleSheet.create({
    titleContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    greeting: {
      fontSize: 18,
      fontWeight: '600',
      color: NumeraDesignSystem.colors.primary[300],
      marginBottom: 8,
      textAlign: 'center',
    },
    animationContainer: {
      width: 240,
      height: 240,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 30,
      alignSelf: 'center',
    },
    outerRing: {
      position: 'absolute',
      width: 240,
      height: 240,
      borderRadius: 120,
      borderWidth: 2,
      borderColor: 'rgba(245, 158, 11, 0.3)',
    },
    ringGradient: {
      flex: 1,
      borderRadius: 120,
    },
    innerCircle: {
      position: 'absolute',
      width: 160,
      height: 160,
      borderRadius: 80,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(139, 69, 255, 0.2)',
    },
    centerIcon: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    numbersContainer: {
      position: 'absolute',
      width: 240,
      height: 240,
      alignItems: 'center',
      justifyContent: 'center',
    },
    floatingNumber: {
      position: 'absolute',
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    numberText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '700',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    stepTextContainer: {
      alignItems: 'center',
      paddingHorizontal: 20,
      marginVertical: 20,
    },
    stepText: {
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: '500',
    },
    errorText: {
      fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
      color: NumeraDesignSystem.colors.error,
      textAlign: 'center',
      marginTop: NumeraDesignSystem.spacing.sm,
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      padding: NumeraDesignSystem.spacing.sm,
      borderRadius: NumeraDesignSystem.borderRadius.sm,
      borderWidth: 1,
      borderColor: 'rgba(239, 68, 68, 0.3)',
    },
  });
};