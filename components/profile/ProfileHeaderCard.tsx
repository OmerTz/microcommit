/**
 * ProfileHeaderCard - User profile header with avatar, name, and settings
 * Implements PS018 design specifications for cosmic theme
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { PROFILE_TEXT } from '@/constants/ProfileConstants';

export interface UserProfile {
  name: string;
  email?: string;
  memberSince?: string;
  avatar?: string;
  readingsCount?: number;
  insightsCount?: number;
  streakDays?: number;
}

export interface ProfileHeaderCardProps {
  user: UserProfile;
  onSettingsPress: () => void;
  onAvatarPress?: () => void;
}

const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
  user,
  onSettingsPress,
  onAvatarPress,
}) => {
  const getInitials = (name: string): string => {
    // Defensive programming: Handle null/undefined names
    if (!name || typeof name !== 'string') {
      return 'U'; // Default to 'U' for User
    }
    
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatMemberSince = (memberSince?: string): string => {
    if (!memberSince) return 'Member since 2025';
    
    const date = new Date(memberSince);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return `Member since ${date.toLocaleDateString(undefined, options)}`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          NumeraDesignSystem.colors.primary[500],
          NumeraDesignSystem.colors.primary[700],
          NumeraDesignSystem.colors.primary[800],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Avatar Section */}
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={onAvatarPress}
            accessibilityLabel="Edit profile picture"
            accessibilityRole="button"
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
            </View>
          </TouchableOpacity>

          {/* User Info Section */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.memberSince}>
              {formatMemberSince(user.memberSince)}
            </Text>
          </View>

          {/* Settings Button */}
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={onSettingsPress}
            accessibilityLabel="Open settings"
            accessibilityRole="button"
          >
            <Text style={styles.settingsIcon}>Settings</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: NumeraDesignSystem.spacing.md,
    marginTop: NumeraDesignSystem.spacing.lg,
    borderRadius: NumeraDesignSystem.borderRadius.xl,
    overflow: 'hidden',
    ...NumeraDesignSystem.shadows.lg,
  },
  gradient: {
    paddingVertical: NumeraDesignSystem.spacing.lg,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: NumeraDesignSystem.spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: NumeraDesignSystem.colors.text.inverse + '20',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: NumeraDesignSystem.colors.text.inverse + '30',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: NumeraDesignSystem.colors.text.inverse,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: NumeraDesignSystem.colors.text.inverse,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: NumeraDesignSystem.colors.text.inverse + '80',
    fontWeight: '500',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: NumeraDesignSystem.colors.text.inverse + '15',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: NumeraDesignSystem.colors.text.inverse + '20',
  },
  settingsIcon: {
    fontSize: 10,
    color: NumeraDesignSystem.colors.text.inverse,
    fontWeight: '600',
  },
});

export default ProfileHeaderCard;