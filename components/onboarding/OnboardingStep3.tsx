import React from 'react';
import { View, Text, TextInput, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { MapPinIcon } from '@/constants/Icons';
import { t } from '@/constants/translations';

interface OnboardingStep3Props {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  birthLocation: string;
  onBirthLocationChange: (location: string) => void;
  styles: any;
}

const OnboardingStep3: React.FC<OnboardingStep3Props> = ({
  fadeAnim,
  slideAnim,
  birthLocation,
  onBirthLocationChange,
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
          <MapPinIcon size={32} color="#FFFFFF" />
        </LinearGradient>
      </View>
      
      <Text style={styles.title}>{t('optionalDetails.locationLabel')}</Text>
      <Text style={styles.subtitle}>{t('optionalDetails.subtitle')}</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('optionalDetails.locationLabel')}</Text>
        <View style={styles.inputCard}>
          <TextInput
            testID="birth-location"
            style={styles.input}
            placeholder={t('optionalDetails.locationPlaceholder')}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={birthLocation}
            onChangeText={onBirthLocationChange || (() => {})}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export { OnboardingStep3 };