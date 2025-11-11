import { useEffect } from 'react';
import { Animated } from 'react-native';

export const useOnboardingAnimations = (
  fadeAnim: Animated.Value,
  slideAnim: Animated.Value,
  scaleAnim: Animated.Value,
  progressAnim: Animated.Value,
  currentStep: number
) => {
  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: (currentStep + 1) / 8,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  const animateStepTransition = () => {
    // Reset animations for new step
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return {
    animateStepTransition,
  };
};