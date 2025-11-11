import React from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { CalendarIcon } from '@/constants/Icons';
import ImprovedDatePicker from '@/components/ui/ImprovedDatePicker';
import { t } from '@/constants/translations';

interface OnboardingStep1Props {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  birthDate: string;
  onBirthDateChange: (date: string) => void;
  styles: any;
}

export const OnboardingStep1: React.FC<OnboardingStep1Props> = ({
  fadeAnim,
  slideAnim,
  birthDate,
  onBirthDateChange,
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
          <CalendarIcon size={32} color="#FFFFFF" />
        </LinearGradient>
      </View>
      
      <Text style={styles.title}>{t('birthDate.title')}</Text>
      <Text style={styles.subtitle}>{t('birthDate.subtitle')}</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('birthDate.dateLabel')}</Text>
        <View style={styles.inputCard}>
          <ImprovedDatePicker
            testID="birth-date"
            value={birthDate}
            onChange={onBirthDateChange || (() => {})}
            placeholder={t('birthDate.datePlaceholder')}
          />
        </View>
      </View>
    </Animated.View>
  );
};