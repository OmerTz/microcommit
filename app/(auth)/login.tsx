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
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { authStyles } from '@/components/auth/AuthStyles';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { useInputAnimation, useButtonAnimation } from '@/hooks/useInputAnimation';
import { validateEmail, validatePassword } from '@/hooks/useAuthValidation';
import { t } from '@/constants/translations';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const emailAnimation = useInputAnimation();
  const passwordAnimation = useInputAnimation();
  const buttonAnimation = useButtonAnimation();

  const handleLogin = async () => {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError(t('auth.errors.required'));
      return;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error || t('auth.errors.invalidEmail'));
      return;
    }

    setLoading(true);
    try {
      console.log('[LOGIN] Signing in user:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        console.log('[LOGIN] Sign in successful:', data.user.id);

        await AsyncStorage.removeItem('authSkipped');

        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('[LOGIN] Login error:', error);
      setError(error.message || t('auth.errors.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignupNavigation = () => {
    router.push('/(auth)/signup');
  };

  const handleForgotPassword = () => {
    Alert.alert(t('auth.passwordReset.title'), t('auth.passwordReset.message'));
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
          <AuthHeader title={t('auth.login.title')} />

          <Animated.View
            entering={FadeInUp.duration(600).delay(200).springify()}
            style={authStyles.formCard}
          >
              {error ? (
                <Animated.View
                  entering={FadeInDown.duration(300)}
                  style={authStyles.errorContainer}
                >
                  <Ionicons name="alert-circle" size={20} color="#ff4757" />
                  <Text style={authStyles.errorText}>{error}</Text>
                </Animated.View>
              ) : null}

              <AuthInput
                label={t('auth.login.email')}
                icon="mail-outline"
                isFocused={emailFocused}
                animatedStyle={emailAnimation.animatedStyle}
                placeholder={t('auth.login.emailPlaceholder')}
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
                testID="login-email-input"
              />

              <AuthInput
                label={t('auth.login.password')}
                icon="lock-closed-outline"
                isFocused={passwordFocused}
                animatedStyle={passwordAnimation.animatedStyle}
                placeholder={t('auth.login.passwordPlaceholder')}
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
                testID="login-password-input"
                showPasswordToggle
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                labelRight={
                  <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={authStyles.forgotLink}>{t('auth.login.forgot')}</Text>
                  </TouchableOpacity>
                }
              />

              <AuthButton
                text={t('auth.login.submit')}
                onPress={() => buttonAnimation.onPress(handleLogin)}
                loading={loading}
                animatedStyle={buttonAnimation.animatedStyle}
                testID="login-submit-button"
              />

              <View style={authStyles.divider}>
                <View style={authStyles.dividerLine} />
                <Text style={authStyles.dividerText}>{t('auth.login.divider')}</Text>
                <View style={authStyles.dividerLine} />
              </View>

              <TouchableOpacity
                style={authStyles.secondaryButton}
                onPress={handleSignupNavigation}
                disabled={loading}
                testID="login-signup-link"
                activeOpacity={0.7}
              >
                <Text style={authStyles.secondaryButtonText}>{t('auth.login.createAccount')}</Text>
                <Ionicons name="person-add-outline" size={18} color="#6b7280" />
              </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(600).delay(400).springify()}
            style={[authStyles.testInfo, authStyles.testInfoBlur]}
          >
            <Text style={authStyles.testInfoTitle}>{t('auth.login.testAccounts')}</Text>
            <Text style={authStyles.testInfoText}>{t('auth.login.testUser')}</Text>
            <Text style={authStyles.testInfoText}>{t('auth.login.testAdmin')}</Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
