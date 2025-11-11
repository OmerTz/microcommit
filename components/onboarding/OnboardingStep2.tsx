import React from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { ClockIcon } from '@/constants/Icons';
import ImprovedTimePicker from '@/components/ui/ImprovedTimePicker';
import { t } from '@/constants/translations';

interface OnboardingStep2Props {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  birthTime: string;
  onBirthTimeChange: (time: string) => void;
  styles: any;
}

export const OnboardingStep2: React.FC<OnboardingStep2Props> = ({
  fadeAnim,
  slideAnim,
  birthTime,
  onBirthTimeChange,
  styles,
}) => {
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
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={[NumeraDesignSystem.colors.primary, NumeraDesignSystem.colors.primaryLight]}
          style={styles.iconGradient}
        >
          <ClockIcon size={32} color="#FFFFFF" />
        </LinearGradient>
      </View>
      
      <Text style={styles.title}>{t('optionalDetails.birthTimeLabel')}</Text>
      <Text style={styles.subtitle}>{t('optionalDetails.subtitle')}</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('optionalDetails.birthTimeLabel')}</Text>
        <View style={styles.inputCard}>
          <ImprovedTimePicker
            testID="birth-time"
            value={birthTime}
            onChange={onBirthTimeChange || (() => {})}
            placeholder={t('optionalDetails.birthTimePlaceholder')}
            format24Hour={false}
          />
        </View>
      </View>
    </Animated.View>
  );
};