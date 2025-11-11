/**
 * AccountActionsSection - Account metadata display and dangerous actions
 * Extracted from AccountManagement.tsx for better modularity
 */

import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { PROFILE_TEXT, PROFILE_ICONS } from '@/constants/ProfileConstants';
import SettingsSection from './SettingsSection';
import QuickActionCard from './QuickActionCard';

export interface AccountActionsSectionProps {
  version: string;
  lastSync: string;
  onSignOut: () => void;
  onDeleteAccount: () => void;
}

const AccountActionsSection: React.FC<AccountActionsSectionProps> = ({
  version,
  lastSync,
  onSignOut,
  onDeleteAccount,
}) => {
  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'default',
          onPress: onSignOut,
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all associated data. This action cannot be undone.\n\nAre you absolutely sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Final Confirmation',
              'This is your last chance to cancel. Deleting your account is irreversible.',
              [
                {
                  text: 'Keep Account',
                  style: 'cancel',
                },
                {
                  text: 'Delete Forever',
                  style: 'destructive',
                  onPress: onDeleteAccount,
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <SettingsSection title={PROFILE_TEXT.accountActionsTitle} icon={PROFILE_ICONS.warning} showDivider={false}>
      <View>
        <View style={styles.accountMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>{PROFILE_TEXT.appVersionLabel}</Text>
            <Text style={styles.metaValue}>{version}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>{PROFILE_TEXT.lastSyncLabel}</Text>
            <Text style={styles.metaValue}>{lastSync}</Text>
          </View>
        </View>
        
        <QuickActionCard
          icon={PROFILE_ICONS.logout}
          title={PROFILE_TEXT.signOutTitle}
          description={PROFILE_TEXT.signOutDesc}
          onPress={handleSignOut}
        />
        
        <QuickActionCard
          icon={PROFILE_ICONS.trash}
          title={PROFILE_TEXT.deleteAccountTitle}
          description={PROFILE_TEXT.deleteAccountDesc}
          onPress={handleDeleteAccount}
        />
      </View>
    </SettingsSection>
  );
};

const styles = StyleSheet.create({
  accountMeta: {
    padding: NumeraDesignSystem.spacing.md,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    marginHorizontal: NumeraDesignSystem.spacing.md,
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraDesignSystem.colors.text.secondary,
  },
  metaValue: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    color: NumeraDesignSystem.colors.text.primary,
  },
});

export default AccountActionsSection;