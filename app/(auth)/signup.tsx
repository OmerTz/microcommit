import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { authStyles } from '@/components/auth/AuthStyles';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { useInputAnimation, useButtonAnimation } from '@/hooks/useInputAnimation';
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateFullName,
} from '@/hooks/useAuthValidation';
import { t } from '@/constants/translations';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const nameAnimation = useInputAnimation();
  const emailAnimation = useInputAnimation();
  const passwordAnimation = useInputAnimation();
  const confirmPasswordAnimation = useInputAnimation();
  const buttonAnimation = useButtonAnimation();

  const handleSignup = async () => {
    console.log('[SIGNUP] Starting signup process');
    console.log('[SIGNUP] Form data:', { email, fullName, hasPassword: !!password });

    if (!email.trim() || !password.trim() || !confirmPassword.trim() || !fullName.trim()) {
      console.log('[SIGNUP] Validation failed: empty fields');
      Alert.alert(t('auth.errors.required'), t('auth.errors.fillAllFields'));
      return;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      console.log('[SIGNUP] Validation failed: invalid email format');
      Alert.alert(t('auth.errors.invalidEmail'), emailValidation.error || t('auth.errors.invalidEmailMessage'));
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      console.log('[SIGNUP] Validation failed: weak password');
      Alert.alert(t('auth.errors.weakPassword'), passwordValidation.error || t('auth.errors.weakPasswordMessage'));
      return;
    }

    const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);
    if (!passwordMatchValidation.isValid) {
      console.log('[SIGNUP] Validation failed: password mismatch');
      Alert.alert(t('auth.errors.passwordMismatch'), passwordMatchValidation.error || t('auth.errors.passwordMismatchMessage'));
      return;
    }

    setLoading(true);
    console.log('[SIGNUP] Validation passed, calling Supabase...');

    try {
      console.log('[SIGNUP] Creating account for:', email);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      console.log('[SIGNUP] Supabase response:', {
        hasUser: !!data?.user,
        userId: data?.user?.id,
        error: error?.message,
      });

      if (error) {
        console.error('[SIGNUP] Supabase error:', error);
        throw error;
      }

      if (data.user) {
        console.log('[SIGNUP] Account created successfully:', data.user.id);

        await AsyncStorage.setItem('userFullName', fullName);
        console.log('[SIGNUP] Stored user full name in AsyncStorage');

        await AsyncStorage.removeItem('authSkipped');
        console.log('[SIGNUP] Cleared authSkipped flag');

        console.log('[SIGNUP] Account created successfully, redirecting to onboarding');
        router.replace('/onboarding');
      } else {
        console.error('[SIGNUP] No user returned from Supabase');
        throw new Error(t('auth.errors.accountCreationFailed'));
      }
    } catch (error) {
      console.error('[SIGNUP] Signup error:', error);
      if (error.message?.includes('already registered')) {
        Alert.alert(t('auth.errors.accountExists'), t('auth.errors.accountExistsMessage'));
      } else {
        Alert.alert(t('auth.errors.signupFailed'), error.message || t('auth.errors.signupFailedMessage'));
      }
    } finally {
      console.log('[SIGNUP] Setting loading to false');
      setLoading(false);
    }
  };

  const handleLoginNavigation = () => {
    router.back();
  };

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authStyles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AuthHeader title={t('auth.signup.title')} />

          <Animated.View
            entering={FadeInUp.duration(600).delay(200).springify()}
            style={authStyles.formCard}
          >
              <AuthInput
                label={t('auth.signup.fullName')}
                icon="person-outline"
                isFocused={nameFocused}
                animatedStyle={nameAnimation.animatedStyle}
                placeholder={t('auth.signup.fullNamePlaceholder')}
                value={fullName}
                onChangeText={setFullName}
                onFocus={() => {
                  setNameFocused(true);
                  nameAnimation.onFocus();
                }}
                onBlur={() => {
                  setNameFocused(false);
                  nameAnimation.onBlur();
                }}
                autoCapitalize="words"
                editable={!loading}
                testID="signup-name-input"
              />

              <AuthInput
                label={t('auth.signup.email')}
                icon="mail-outline"
                isFocused={emailFocused}
                animatedStyle={emailAnimation.animatedStyle}
                placeholder={t('auth.signup.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                onFocus={() => {
                  setEmailFocused(true);
                  emailAnimation.onFocus();
                }}
                onBlur={() => {
                  setEmailFocused(false);
                  emailAnimation.onBlur();
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                testID="signup-email-input"
              />

              <AuthInput
                label={t('auth.signup.password')}
                icon="lock-closed-outline"
                isFocused={passwordFocused}
                animatedStyle={passwordAnimation.animatedStyle}
                placeholder={t('auth.signup.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                onFocus={() => {
                  setPasswordFocused(true);
                  passwordAnimation.onFocus();
                }}
                onBlur={() => {
                  setPasswordFocused(false);
                  passwordAnimation.onBlur();
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!loading}
                testID="signup-password-input"
                showPasswordToggle
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                hint={t('auth.signup.passwordHint')}
              />

              <AuthInput
                label={t('auth.signup.confirmPassword')}
                icon="lock-closed-outline"
                isFocused={confirmPasswordFocused}
                animatedStyle={confirmPasswordAnimation.animatedStyle}
                placeholder={t('auth.signup.confirmPasswordPlaceholder')}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => {
                  setConfirmPasswordFocused(true);
                  confirmPasswordAnimation.onFocus();
                }}
                onBlur={() => {
                  setConfirmPasswordFocused(false);
                  confirmPasswordAnimation.onBlur();
                }}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                editable={!loading}
                testID="signup-confirm-password-input"
                showPasswordToggle
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              <AuthButton
                text={t('auth.signup.submit')}
                onPress={() => buttonAnimation.onPress(handleSignup)}
                loading={loading}
                animatedStyle={buttonAnimation.animatedStyle}
                testID="signup-submit-button"
              />

              <View style={authStyles.divider}>
                <View style={authStyles.dividerLine} />
                <Text style={authStyles.dividerText}>{t('auth.signup.divider')}</Text>
                <View style={authStyles.dividerLine} />
              </View>

              <TouchableOpacity
                style={authStyles.secondaryButton}
                onPress={handleLoginNavigation}
                disabled={loading}
                activeOpacity={0.7}
              >
                <Text style={authStyles.secondaryButtonText}>{t('auth.signup.hasAccount')}</Text>
              </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(600).delay(400).springify()}
            style={[authStyles.terms, authStyles.termsBlur]}
          >
            <Text style={authStyles.termsText}>
              {t('auth.signup.termsPrefix')}{' '}
              <Text style={authStyles.termsLink}>{t('auth.signup.terms')}</Text>
              {' '}{t('auth.signup.termsAnd')}{' '}
              <Text style={authStyles.termsLink}>{t('auth.signup.privacy')}</Text>
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
