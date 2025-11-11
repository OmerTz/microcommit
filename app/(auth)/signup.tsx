import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

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

  // Animation values
  const nameScale = useSharedValue(1);
  const emailScale = useSharedValue(1);
  const passwordScale = useSharedValue(1);
  const confirmPasswordScale = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  // Animated styles
  const nameAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: nameScale.value }],
  }));

  const emailAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emailScale.value }],
  }));

  const passwordAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: passwordScale.value }],
  }));

  const confirmPasswordAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: confirmPasswordScale.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleSignup = async () => {
    console.log('[SIGNUP] Starting signup process');
    console.log('[SIGNUP] Form data:', { email, fullName, hasPassword: !!password });
    
    if (!email.trim() || !password.trim() || !confirmPassword.trim() || !fullName.trim()) {
      console.log('[SIGNUP] Validation failed: empty fields');
      Alert.alert('Required', 'Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      console.log('[SIGNUP] Validation failed: invalid email format');
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      console.log('[SIGNUP] Validation failed: weak password');
      Alert.alert('Weak Password', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      console.log('[SIGNUP] Validation failed: password mismatch');
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    setLoading(true);
    console.log('[SIGNUP] Validation passed, calling Supabase...');
    
    try {
      console.log('[SIGNUP] Creating account for:', email);
      
      // Create new user account
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
        error: error?.message 
      });

      if (error) {
        console.error('[SIGNUP] Supabase error:', error);
        throw error;
      }

      if (data.user) {
        console.log('[SIGNUP] Account created successfully:', data.user.id);
        
        // Store user's full name for later use
        await AsyncStorage.setItem('userFullName', fullName);
        console.log('[SIGNUP] Stored user full name in AsyncStorage');
        
        // Clear the authSkipped flag since user is now authenticated
        await AsyncStorage.removeItem('authSkipped');
        console.log('[SIGNUP] Cleared authSkipped flag');
        
        console.log('[SIGNUP] Account created successfully, redirecting to onboarding');
        router.replace('/onboarding');
      } else {
        console.error('[SIGNUP] No user returned from Supabase');
        throw new Error('Account creation failed - no user returned');
      }
    } catch (error) {
      console.error('[SIGNUP] Signup error:', error);
      if (error.message?.includes('already registered')) {
        Alert.alert('Account Exists', 'This email is already registered. Please sign in instead.');
      } else {
        Alert.alert('Sign Up Failed', error.message || 'Failed to create account. Please try again.');
      }
    } finally {
      console.log('[SIGNUP] Setting loading to false');
      setLoading(false);
    }
  };

  const handleLoginNavigation = () => {
    router.back();
  };

  const handleButtonPress = () => {
    buttonScale.value = withSpring(0.95, {}, () => {
      buttonScale.value = withSpring(1);
    });
    handleSignup();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Minimal Logo and Header */}
          <Animated.View
            entering={FadeInDown.duration(600).springify()}
            style={styles.header}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name="rocket" size={32} color="#6366f1" />
            </View>
            <Text style={styles.title}>Create Account</Text>
          </Animated.View>

          {/* Form Card */}
          <Animated.View
            entering={FadeInUp.duration(600).delay(200).springify()}
            style={styles.formCard}
          >
              {/* Full Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <Animated.View
                  style={[
                    styles.inputWrapper,
                    nameFocused && styles.inputWrapperFocused,
                    nameAnimatedStyle
                  ]}
                >
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={nameFocused ? '#6366f1' : '#9ca3af'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Your full name"
                    placeholderTextColor="#9ca3af"
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => {
                      setNameFocused(true);
                      nameScale.value = withSpring(1.02);
                    }}
                    onBlur={() => {
                      setNameFocused(false);
                      nameScale.value = withSpring(1);
                    }}
                    autoCapitalize="words"
                    editable={!loading}
                    testID="signup-name-input"
                  />
                </Animated.View>
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <Animated.View
                  style={[
                    styles.inputWrapper,
                    emailFocused && styles.inputWrapperFocused,
                    emailAnimatedStyle
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={emailFocused ? '#6366f1' : '#9ca3af'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="your.email@example.com"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => {
                      setEmailFocused(true);
                      emailScale.value = withSpring(1.02);
                    }}
                    onBlur={() => {
                      setEmailFocused(false);
                      emailScale.value = withSpring(1);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                    testID="signup-email-input"
                  />
                </Animated.View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <Animated.View
                  style={[
                    styles.inputWrapper,
                    passwordFocused && styles.inputWrapperFocused,
                    passwordAnimatedStyle
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={passwordFocused ? '#6366f1' : '#9ca3af'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Create a strong password"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => {
                      setPasswordFocused(true);
                      passwordScale.value = withSpring(1.02);
                    }}
                    onBlur={() => {
                      setPasswordFocused(false);
                      passwordScale.value = withSpring(1);
                    }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    editable={!loading}
                    testID="signup-password-input"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color={passwordFocused ? '#6366f1' : '#9ca3af'}
                    />
                  </TouchableOpacity>
                </Animated.View>
                <Text style={styles.hint}>Minimum 6 characters</Text>
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <Animated.View
                  style={[
                    styles.inputWrapper,
                    confirmPasswordFocused && styles.inputWrapperFocused,
                    confirmPasswordAnimatedStyle
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={confirmPasswordFocused ? '#6366f1' : '#9ca3af'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Re-enter your password"
                    placeholderTextColor="#9ca3af"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => {
                      setConfirmPasswordFocused(true);
                      confirmPasswordScale.value = withSpring(1.02);
                    }}
                    onBlur={() => {
                      setConfirmPasswordFocused(false);
                      confirmPasswordScale.value = withSpring(1);
                    }}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    editable={!loading}
                    testID="signup-confirm-password-input"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color={confirmPasswordFocused ? '#6366f1' : '#9ca3af'}
                    />
                  </TouchableOpacity>
                </Animated.View>
              </View>

              {/* Sign Up Button */}
              <Animated.View style={buttonAnimatedStyle}>
                <TouchableOpacity
                  style={[styles.signupButton, loading && styles.disabledButton]}
                  onPress={handleButtonPress}
                  disabled={loading}
                  testID="signup-submit-button"
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.signupButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {loading ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <>
                        <Text style={styles.signupButtonText}>Create Account</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Alternative Actions */}
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleLoginNavigation}
                disabled={loading}
                activeOpacity={0.7}
              >
                <Text style={styles.secondaryButtonText}>Already have an account? Sign In</Text>
              </TouchableOpacity>
          </Animated.View>

          {/* Terms */}
          <Animated.View
            entering={FadeInUp.duration(600).delay(400).springify()}
            style={[styles.terms, styles.termsBlur]}
          >
            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
  },
  inputWrapperFocused: {
    borderColor: '#6366f1',
    backgroundColor: '#ffffff',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    fontWeight: '400',
  },
  eyeIcon: {
    padding: 4,
  },
  hint: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '400',
  },
  signupButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  signupButtonGradient: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: '#f9fafb',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  terms: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  termsBlur: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  termsText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '400',
  },
  termsLink: {
    color: '#6366f1',
    fontWeight: '600',
  },
});