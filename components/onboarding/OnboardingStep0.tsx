import React from 'react';
import { View, Text, TextInput, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { UserIcon } from '@/constants/Icons';
import { t, tArray } from '@/constants/translations';

interface OnboardingStep0Props {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  name: string;
  onNameChange: (name: string) => void;
  styles: any;
  validationError?: string;
}

// Name validation helper
const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return t('errors.validation.firstNameRequired');
  }
  if (name.trim().length < 2) {
    return t('errors.validation.firstNameTooShort');
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
    return t('errors.validation.firstNameInvalid');
  }
  return null;
};

export const OnboardingStep0: React.FC<OnboardingStep0Props> = ({
  fadeAnim,
  slideAnim,
  name,
  onNameChange,
  styles,
  validationError,
}) => {
  const [localError, setLocalError] = React.useState<string | null>(null);

  const handleNameChange = (newName: string) => {
    if (onNameChange) {
      onNameChange(newName);
    }
    // Clear error when user starts typing
    if (localError) {
      setLocalError(null);
    }
  };

  const handleBlur = () => {
    const error = validateName(name);
    setLocalError(error);
  };

  const displayError = validationError || localError;
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
          <UserIcon size={32} color="#FFFFFF" />
        </LinearGradient>
      </View>
      
      <Text style={styles.title}>{t('welcome.title')}</Text>
      <Text style={styles.subtitle}>{t('welcome.subtitle1')}</Text>
      <Text style={styles.mysticalDescription}>{t('welcome.description')}</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('nameInput.title')}</Text>
        <View style={[styles.inputCard, displayError && styles.inputCardError]}>
          <TextInput
            testID="name-input"
            style={styles.input}
            placeholder={t('nameInput.firstNamePlaceholder')}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={name}
            onChangeText={handleNameChange}
            onBlur={handleBlur}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>
        {displayError ? (
          <Text style={styles.errorText}>
            {displayError}
          </Text>
        ) : name && name.length > 0 && (
          <Text style={styles.validationHint}>
            {t('nameInput.previewHint')}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

export { OnboardingStep0 };