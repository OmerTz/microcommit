/**
 * AccountInfoSection - Account information display and edit actions
 * Extracted from AccountManagement.tsx for better modularity
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { PROFILE_TEXT, PROFILE_ICONS } from '@/constants/ProfileConstants';
import SettingsSection from './SettingsSection';
import QuickActionCard from './QuickActionCard';
import EmailChangeForm from './EmailChangeForm';
import PasswordChangeForm from './PasswordChangeForm';

export interface AccountInfoSectionProps {
  email: string;
  onUpdateEmail: (newEmail: string, password: string) => Promise<boolean>;
  onChangePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

const AccountInfoSection: React.FC<AccountInfoSectionProps> = ({
  email,
  onUpdateEmail,
  onChangePassword,
}) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <SettingsSection title={PROFILE_TEXT.accountInfoTitle} icon={PROFILE_ICONS.user}>
      <View>
        <View style={styles.accountInfo}>
          <Text style={styles.infoLabel}>{PROFILE_TEXT.emailLabel}</Text>
          <Text style={styles.infoValue}>{email}</Text>
        </View>
        
        {!showEmailForm ? (
          <QuickActionCard
            icon={PROFILE_ICONS.edit}
            title={PROFILE_TEXT.updateEmailTitle}
            description={PROFILE_TEXT.updateEmailDesc}
            onPress={() => setShowEmailForm(true)}
          />
        ) : (
          <EmailChangeForm
            onUpdateEmail={onUpdateEmail}
            onCancel={() => setShowEmailForm(false)}
          />
        )}
        
        {!showPasswordForm ? (
          <QuickActionCard
            icon={PROFILE_ICONS.key}
            title={PROFILE_TEXT.changePasswordTitle}
            description={PROFILE_TEXT.changePasswordDesc}
            onPress={() => setShowPasswordForm(true)}
          />
        ) : (
          <PasswordChangeForm
            onChangePassword={onChangePassword}
            onCancel={() => setShowPasswordForm(false)}
          />
        )}
      </View>
    </SettingsSection>
  );
};

const styles = StyleSheet.create({
  accountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    backgroundColor: NumeraDesignSystem.colors.background,
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  infoLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    color: NumeraDesignSystem.colors.text.secondary,
  },
  infoValue: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    color: NumeraDesignSystem.colors.text.primary,
  },
});

export default AccountInfoSection;