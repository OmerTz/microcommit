import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { SparklesIcon } from '@/constants/Icons';
import { t, tArray } from '@/constants/translations';

interface OnboardingStep6Props {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  onCalculationComplete: (results: any) => void;
  styles: any;
  onboardingData: {
    name: string;
    birthDate: string;
    birthTime: string;
    birthLocation: string;
    interests: string[];
  };
}

export const OnboardingStep6: React.FC<OnboardingStep6Props> = ({
  fadeAnim,
  slideAnim,
  onCalculationComplete,
  styles,
  onboardingData,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [calculationProgress, setCalculationProgress] = useState(0);
  const [isCalculationStarted, setIsCalculationStarted] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.8)).current;
  const numbersOpacityAnim = useRef(new Animated.Value(0)).current;
  
  const calculationSteps = (tArray('calculation.steps') || []).map((text, index) => ({
    text,
    duration: [1200, 1000, 1300, 1100, 1200, 800][index] || 1000,
  }));

  const mysticalNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

  useEffect(() => {
    console.log('[STEP6] Component mounted, starting calculation sequence');
    
    // Prevent multiple calculations
    if (isCalculationStarted) {
      console.log('[STEP6] Calculation already started, skipping');
      return;
    }
    
    setIsCalculationStarted(true);
    
    // Start animations
    startContinuousAnimations();
    
    // Start calculation sequence
    startCalculationSequence();
    
    // Cleanup function to prevent memory leaks
    return () => {
      console.log('[STEP6] Component unmounting');
    };
  }, []); // Empty dependency array - run only once on mount

  const startContinuousAnimations = () => {
    // Rotation animation
    const rotationLoop = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    );
    if (rotationLoop && rotationLoop.start) {
      rotationLoop.start();
    }

    // Pulse animation
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.8,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    if (pulseLoop && pulseLoop.start) {
      pulseLoop.start();
    }

    // Numbers flash animation
    const numbersLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(numbersOpacityAnim, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(numbersOpacityAnim, {
          toValue: 0.2,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    if (numbersLoop && numbersLoop.start) {
      numbersLoop.start();
    }
  };

  const startCalculationSequence = async () => {
    try {
      console.log('[STEP6] Starting calculation sequence with data:', onboardingData);
      
      // Import numerology service
      console.log('[STEP6] Importing numerology service...');
      const { numerologyService } = await import('@/services/numerologyService');
      console.log('[STEP6] Numerology service imported successfully');
      
      console.log('[STEP6] Processing calculation steps...');
      for (let i = 0; i < calculationSteps.length; i++) {
        console.log(`[STEP6] Step ${i + 1}/${calculationSteps.length}: ${calculationSteps[i].text}`);
        setCurrentStep(i);
        setCalculationProgress((i + 1) / calculationSteps.length);
        
        // Wait for step duration
        await new Promise(resolve => setTimeout(resolve, calculationSteps[i].duration));
      }

      console.log('[STEP6] All calculation steps completed, performing actual calculations...');
      
      // Perform actual calculations
      try {
        const birthDate = new Date(onboardingData.birthDate);
        const personalInfo = {
          fullName: onboardingData.name,
          birthDate: birthDate,
        };

        console.log('[STEP6] Calling numerologyService.generateNumerologyProfile with:', personalInfo);
        const numerologyProfile = numerologyService.generateNumerologyProfile(personalInfo);
        console.log('[STEP6] Numerology profile generated successfully:', numerologyProfile);
        
        const results = {
          lifePath: numerologyProfile.lifePath,
          expression: numerologyProfile.expression,
          soulUrge: numerologyProfile.soulUrge,
          personality: numerologyProfile.personality,
          birthday: numerologyProfile.birthday,
          personalCycles: numerologyProfile.personalCycles,
        };

        console.log('[STEP6] Results prepared:', results);

        // Wait a bit before completing
        console.log('[STEP6] Waiting before calling onCalculationComplete...');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log('[STEP6] Calling onCalculationComplete with results');
        onCalculationComplete(results);
        console.log('[STEP6] onCalculationComplete called successfully');
        
      } catch (calculationError) {
        console.error('[STEP6] Calculation error:', calculationError);
        console.log('[STEP6] Using fallback results due to calculation error');
        
        // Provide fallback results
        const fallbackResults = {
          lifePath: { number: 7, meaning: 'The Seeker - Spiritual and analytical' },
          expression: { number: 3, meaning: 'The Communicator - Creative and expressive' },
          soulUrge: { number: 1, meaning: 'The Leader - Independent and original' },
          personality: { number: 5, meaning: 'The Explorer - Adventurous and free' },
          birthday: { number: 9, meaning: 'The Humanitarian - Compassionate and wise' },
          personalCycles: { year: 1, month: 5, day: 3 },
        };
        
        console.log('[STEP6] Calling onCalculationComplete with fallback results');
        onCalculationComplete(fallbackResults);
        console.log('[STEP6] onCalculationComplete called with fallback results');
      }
      
    } catch (sequenceError) {
      console.error('[STEP6] Fatal error in calculation sequence:', sequenceError);
      
      // Last resort fallback
      console.log('[STEP6] Using emergency fallback due to sequence error');
      const emergencyResults = {
        lifePath: { number: 7, meaning: 'The Seeker - Spiritual and analytical' },
        expression: { number: 3, meaning: 'The Communicator - Creative and expressive' },
        soulUrge: { number: 1, meaning: 'The Leader - Independent and original' },
        personality: { number: 5, meaning: 'The Explorer - Adventurous and free' },
        birthday: { number: 9, meaning: 'The Humanitarian - Compassionate and wise' },
        personalCycles: { year: 1, month: 5, day: 3 },
      };
      
      console.log('[STEP6] Emergency: calling onCalculationComplete with emergency results');
      onCalculationComplete(emergencyResults);
    }
  };

  const rotateInterpolated = rotateAnim.interpolate ? rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  }) : '0deg';

  return (
    <Animated.View 
      style={[
        styles.stepContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Main Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('calculation.title')}</Text>
        <Text style={[styles.title, { color: NumeraDesignSystem.colors.primary[300] }]}>
          {t('calculation.titleHighlight')}
        </Text>
      </View>

      {/* Central Animation */}
      <View style={styles.animationContainer}>
        {/* Outer Ring */}
        <Animated.View
          style={[
            styles.outerRing,
            {
              transform: [
                { rotate: rotateInterpolated },
                { scale: pulseAnim }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={[NumeraDesignSystem.colors.primary, NumeraDesignSystem.colors.primaryLight]}
            style={styles.ringGradient}
          />
        </Animated.View>

        {/* Inner Circle */}
        <Animated.View
          style={[
            styles.innerCircle,
            {
              transform: [
                { rotate: rotateInterpolated },
                { scale: pulseAnim }
              ]
            }
          ]}
        >
          <View style={styles.centerIcon}>
            <SparklesIcon size={40} color="#FFFFFF" />
          </View>
        </Animated.View>

        {/* Floating Numbers */}
        <Animated.View
          style={[
            styles.numbersContainer,
            { opacity: numbersOpacityAnim }
          ]}
        >
          {mysticalNumbers.map((number, index) => (
            <Animated.View
              key={number}
              style={[
                styles.floatingNumber,
                {
                  transform: [
                    {
                      rotate: `${(360 / mysticalNumbers.length) * index}deg`
                    },
                    { translateY: -80 },
                    {
                      rotate: rotateInterpolated
                    }
                  ]
                }
              ]}
            >
              <Text style={styles.numberText}>{number}</Text>
            </Animated.View>
          ))}
        </Animated.View>
      </View>

      {/* Current Step Text */}
      <View style={styles.stepTextContainer}>
        <Text style={styles.stepText}>
          {calculationSteps[currentStep]?.text || t('calculation.preparingText')}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View 
            style={[
              styles.progressFill,
              { width: `${calculationProgress * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(calculationProgress * 100)}{t('calculation.progressCompleteText')}
        </Text>
      </View>
    </Animated.View>
  );
};