import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import type { 
  NotificationPreferences as AuthNotificationPreferences,
  ThemePreferences as AuthThemePreferences,
  PrivacyPreferences as AuthPrivacyPreferences
} from '@/context/auth/types';

export const useSettingsHandlers = () => {
  const router = useRouter();
  const { userProfile, updateProfile, updatePassword, signOut, deleteAccount, exportUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleNotificationChange = async (preferences: AuthNotificationPreferences) => {
    try {
      setIsLoading(true);
      await updateProfile({
        preferences: {
          ...userProfile?.preferences,
          notifications: preferences
        }
      });
    } catch (err) {
      console.error('Failed to update notification settings:', err);
      Alert.alert('Error', 'Failed to save notification settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleThemeChange = async (preferences: AuthThemePreferences) => {
    try {
      setIsLoading(true);
      await updateProfile({
        preferences: {
          ...userProfile?.preferences,
          theme: preferences
        }
      });
    } catch (err) {
      console.error('Failed to update theme settings:', err);
      Alert.alert('Error', 'Failed to save theme settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivacyChange = async (preferences: AuthPrivacyPreferences) => {
    try {
      setIsLoading(true);
      await updateProfile({
        preferences: {
          ...userProfile?.preferences,
          privacy: preferences
        }
      });
    } catch (err) {
      console.error('Failed to update privacy settings:', err);
      Alert.alert('Error', 'Failed to save privacy settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              router.replace('/');
            } catch (err) {
              console.error('Failed to sign out:', err);
              Alert.alert('Error', 'Failed to sign out');
            }
          }
        }
      ]
    );
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Are you absolutely sure?',
              'Please confirm you want to permanently delete your account and all associated data.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete Forever',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      setIsLoading(true);
                      await deleteAccount();
                      router.replace('/');
                    } catch (err) {
                      console.error('Failed to delete account:', err);
                      Alert.alert('Error', 'Failed to delete account');
                    } finally {
                      setIsLoading(false);
                    }
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const handleExportData = async () => {
    try {
      setIsLoading(true);
      const userData = await exportUserData();
      
      Alert.alert(
        'Data Export',
        'Your data has been compiled. In a production app, this would be downloaded as a file or sent to your email.',
        [{ text: 'OK' }]
      );
      
      console.log('Exported data:', userData);
    } catch (err) {
      console.error('Failed to export data:', err);
      Alert.alert('Error', 'Failed to export data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackSubmit = async (feedback: { category: string; message: string; email?: string }) => {
    try {
      setIsLoading(true);
      console.log('Feedback submitted:', feedback);
      
      Alert.alert('Thank You', 'Your feedback has been sent successfully!');
      return true;
    } catch (err) {
      console.error('Failed to submit feedback:', err);
      Alert.alert('Error', 'Failed to send feedback');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/profile');
    }
  };

  return {
    isLoading,
    userProfile,
    updatePassword,
    handleNotificationChange,
    handleThemeChange,
    handlePrivacyChange,
    handleSignOut,
    handleDeleteAccount,
    handleExportData,
    handleFeedbackSubmit,
    handleGoBack
  };
};