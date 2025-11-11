import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { BellIcon, SparklesIcon } from '@/constants/Icons';
import GlassCard from '@/components/ui/GlassCard';
import { t } from '@/constants/translations';

interface OnboardingStep5Props {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  notificationsEnabled: boolean;
  onNotificationsChange: (enabled: boolean) => void;
  styles: any;
}

export const OnboardingStep5: React.FC<OnboardingStep5Props> = ({
  fadeAnim,
  slideAnim,
  notificationsEnabled,
  onNotificationsChange,
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
          <BellIcon size={32} color="#FFFFFF" />
        </LinearGradient>
      </View>
      
      <Text style={styles.title}>{t('accountSetup.title')}</Text>
      <Text style={styles.subtitle}>{t('accountSetup.subtitle')}</Text>
      
      <View style={styles.notificationOptions}>
        <TouchableOpacity
          testID="enable-notifications"
          onPress={() => onNotificationsChange && onNotificationsChange(true)}
          activeOpacity={0.8}
        >
          <GlassCard variant={notificationsEnabled ? "medium" : "light"} animated={false}>
            <View style={[
              styles.notificationCard,
              notificationsEnabled && styles.notificationCardSelected,
            ]}>
              <BellIcon 
                size={24} 
                color={notificationsEnabled ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)"} 
              />
              <View style={styles.notificationCardText}>
                <Text style={[
                  styles.notificationTitle,
                  notificationsEnabled && styles.notificationTitleSelected,
                ]}>
                  {t('accountSetup.dailyInsightsToggle')}
                </Text>
                <Text style={[
                  styles.notificationSubtitle,
                  notificationsEnabled && styles.notificationSubtitleSelected,
                ]}>
                  Receive personalized numerological insights daily
                </Text>
              </View>
            </View>
          </GlassCard>
        </TouchableOpacity>
        
        <TouchableOpacity
          testID="skip-notifications"
          onPress={() => onNotificationsChange && onNotificationsChange(false)}
          activeOpacity={0.8}
        >
          <GlassCard variant={!notificationsEnabled ? "medium" : "light"} animated={false}>
            <View style={[
              styles.notificationCard,
              !notificationsEnabled && styles.notificationCardSelected,
            ]}>
              <SparklesIcon 
                size={24} 
                color={!notificationsEnabled ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)"} 
              />
              <View style={styles.notificationCardText}>
                <Text style={[
                  styles.notificationTitle,
                  !notificationsEnabled && styles.notificationTitleSelected,
                ]}>
                  {t('common.skip')} Notifications
                </Text>
                <Text style={[
                  styles.notificationSubtitle,
                  !notificationsEnabled && styles.notificationSubtitleSelected,
                ]}>
                  Visit the app when you want to explore your numerological insights
                </Text>
              </View>
            </View>
          </GlassCard>
        </TouchableOpacity>
      </View>
      
      <View style={styles.notificationDisclaimer}>
        <Text style={styles.disclaimerText}>
          You can always change notification preferences in Settings
        </Text>
      </View>
    </Animated.View>
  );
};