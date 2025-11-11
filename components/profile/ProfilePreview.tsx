/**
 * ProfilePreview - Shareable profile card preview component
 * Implements PS018 profile card design for social sharing
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { PROFILE_TEXT } from '@/constants/ProfileConstants';

export interface UserProfileData {
  name: string;
  lifePathNumber: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  birthdayNumber: number;
  memberSince?: string;
}

export interface ProfilePreviewProps {
  userProfile: UserProfileData | null;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ userProfile }) => {
  // Defensive programming: Add null checks and provide fallbacks
  if (!userProfile) {
    return (
      <View style={styles.previewContainer}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Profile data unavailable</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.previewContainer}>
      <LinearGradient
        colors={[
          NumeraDesignSystem.colors.primary[500],
          NumeraDesignSystem.colors.primary[700],
          NumeraDesignSystem.colors.primary[800],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.previewCard}
      >
        <Text style={styles.previewName}>{userProfile?.name || 'User'}</Text>
        <Text style={styles.previewSubtitle}>{PROFILE_TEXT.numerologyProfileTitle}</Text>
        
        <View style={styles.numbersGrid}>
          <View style={styles.numberItem}>
            <Text style={styles.numberValue}>{userProfile?.lifePathNumber || 1}</Text>
            <Text style={styles.numberLabel}>{PROFILE_TEXT.lifePathLabel}</Text>
          </View>
          <View style={styles.numberItem}>
            <Text style={styles.numberValue}>{userProfile?.expressionNumber || 1}</Text>
            <Text style={styles.numberLabel}>{PROFILE_TEXT.expressionLabel}</Text>
          </View>
          <View style={styles.numberItem}>
            <Text style={styles.numberValue}>{userProfile?.soulUrgeNumber || 1}</Text>
            <Text style={styles.numberLabel}>{PROFILE_TEXT.soulUrgeLabel}</Text>
          </View>
        </View>
        
        <View style={styles.footerContainer}>
          <Sparkles 
            size={16} 
            color={NumeraDesignSystem.colors.text.inverse} 
            style={styles.sparkleIcon}
          />
          <Text style={styles.previewFooter}>{PROFILE_TEXT.discoverNumerology}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    marginTop: NumeraDesignSystem.spacing.lg,
    alignItems: 'center',
  },
  previewCard: {
    width: 280,
    height: 200,
    borderRadius: NumeraDesignSystem.borderRadius.xl,
    padding: NumeraDesignSystem.spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewName: {
    fontSize: NumeraDesignSystem.typography.fontSize.h4,
    fontWeight: NumeraDesignSystem.typography.fontWeight.bold,
    color: NumeraDesignSystem.colors.text.inverse,
    textAlign: 'center',
  },
  previewSubtitle: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraDesignSystem.colors.text.inverse,
    opacity: 0.8,
    textAlign: 'center',
  },
  numbersGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: NumeraDesignSystem.spacing.sm,
  },
  numberItem: {
    alignItems: 'center',
  },
  numberValue: {
    fontSize: 24,
    fontWeight: NumeraDesignSystem.typography.fontWeight.bold,
    color: NumeraDesignSystem.colors.text.inverse,
  },
  numberLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.caption,
    color: NumeraDesignSystem.colors.text.inverse,
    opacity: 0.8,
    textAlign: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleIcon: {
    marginRight: NumeraDesignSystem.spacing.xs,
  },
  previewFooter: {
    fontSize: NumeraDesignSystem.typography.fontSize.caption,
    color: NumeraDesignSystem.colors.text.inverse,
    opacity: 0.9,
    textAlign: 'center',
  },
  errorContainer: {
    width: 280,
    height: 200,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    borderRadius: NumeraDesignSystem.borderRadius.large,
    alignItems: 'center',
    justifyContent: 'center',
    padding: NumeraDesignSystem.spacing.lg,
  },
  errorText: {
    fontSize: NumeraDesignSystem.typography.fontSize.body,
    color: NumeraDesignSystem.colors.text.secondary,
    textAlign: 'center',
  },
});

export default ProfilePreview;