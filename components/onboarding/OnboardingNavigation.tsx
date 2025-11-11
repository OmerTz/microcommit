import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { ArrowLeftIcon, ArrowRightIcon } from '@/constants/Icons';

interface OnboardingNavigationProps {
  currentStep: number;
  isLoading: boolean;
  canGoBack: boolean;
  onBack: () => void;
  onNext: () => void;
  styles: any;
}

export const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
  currentStep,
  isLoading,
  canGoBack,
  onBack,
  onNext,
  styles,
}) => {
  return (
    <View style={styles.navigation}>
      {canGoBack && (
        <TouchableOpacity
          testID="onboarding-back"
          onPress={onBack}
          activeOpacity={0.8}
          style={styles.navButton}
        >
          <View style={styles.navButtonCard}>
            <View style={styles.navButtonContent}>
              <ArrowLeftIcon size={20} color="#FFFFFF" />
              <Text style={styles.navButtonText}>Back</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity
        testID="onboarding-next"
        onPress={() => {
          console.log('[UI] GET STARTED BUTTON TAPPED!');
          console.log('[STATE] Current step:', currentStep);
          onNext();
        }}
        activeOpacity={isLoading ? 1 : 0.8}
        disabled={isLoading}
        style={[
          styles.navButton, 
          styles.navButtonPrimary,
          isLoading && styles.navButtonDisabled
        ]}
      >
        <LinearGradient
          colors={isLoading 
            ? ['rgba(139, 69, 255, 0.5)', 'rgba(79, 70, 229, 0.5)'] 
            : [NumeraDesignSystem.colors.primary, NumeraDesignSystem.colors.primaryLight]
          }
          style={styles.navButtonGradient}
        >
          <Text style={[
            styles.navButtonTextPrimary,
            isLoading && styles.navButtonTextDisabled
          ]}>
            {isLoading 
              ? 'Saving...' 
              : (currentStep === 5 ? 'Get Started' : 'Continue')
            }
          </Text>
          {!isLoading && <ArrowRightIcon size={20} color="#FFFFFF" />}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};