import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { t } from '@/constants/translations';

interface SignupBannerProps {
  visible: boolean;
  onDismiss?: () => void;
}

export const SignupBanner: React.FC<SignupBannerProps> = ({ visible, onDismiss }) => {
  const router = useRouter();

  if (!visible) return null;

  const handleSignup = () => {
    router.push('/(auth)/signup');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.banner}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('signup.banner.title')}</Text>
        <Text style={styles.subtitle}>
          {t('signup.banner.subtitle')}
        </Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>{t('signup.buttons.createAccount')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>{t('signup.buttons.signIn')}</Text>
          </TouchableOpacity>
        </View>
        
        {onDismiss && (
          <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
            <Text style={styles.dismissButtonText}>{t('signup.buttons.maybeLater')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: 'rgba(138, 43, 226, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#A8A8A8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  signupButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8A2BE2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
  },
  loginButtonText: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  dismissButton: {
    padding: 8,
  },
  dismissButtonText: {
    color: '#666666',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});