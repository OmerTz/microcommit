import React from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

interface OnboardingProgressBarProps {
  currentStep: number;
  totalSteps: number;
  progressAnim: Animated.Value;
  styles: any;
}

export const OnboardingProgressBar: React.FC<OnboardingProgressBarProps> = ({
  currentStep,
  totalSteps,
  progressAnim,
  styles,
}) => {
  const getProgressWidth = () => {
    try {
      // Safely handle animation interpolation
      if (progressAnim && typeof progressAnim.interpolate === 'function') {
        return progressAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0%', '100%'],
        });
      }
      // Fallback for tests or if animation is not available
      return `${(currentStep / (totalSteps - 1)) * 100}%`;
    } catch (error) {
      // Fallback for test environments
      return `${(currentStep / (totalSteps - 1)) * 100}%`;
    }
  };

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <Animated.View 
          style={[
            styles.progressFill,
            {
              width: getProgressWidth(),
            },
          ]}
        >
          <LinearGradient
            colors={[NumeraDesignSystem.colors.primary, NumeraDesignSystem.colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.progressGradient}
          />
        </Animated.View>
      </View>
      <Text testID={`progress-step-${currentStep + 1}`} style={styles.progressText}>
        Step {currentStep + 1} of {totalSteps}
      </Text>
    </View>
  );
};