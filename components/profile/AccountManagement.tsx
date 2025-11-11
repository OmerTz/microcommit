/**
 * AccountManagement - Password, email, and account management components
 * Implements PS018 account management design with security focus
 */

import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import PremiumStatusSection from './PremiumStatusSection';
import AccountInfoSection from './AccountInfoSection';
import AccountActionsSection from './AccountActionsSection';

export interface AccountInfo {
  email: string;
  version: string;
  lastSync: string;
  isPremium: boolean;
}

export interface AccountManagementProps {
  accountInfo: AccountInfo;
  onChangePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  onUpdateEmail: (newEmail: string, password: string) => Promise<boolean>;
  onSignOut: () => void;
  onDeleteAccount: () => void;
  onRestorePurchases: () => void;
  onUpgradeToPremium: () => void;
}

const AccountManagement: React.FC<AccountManagementProps> = ({
  accountInfo,
  onChangePassword,
  onUpdateEmail,
  onSignOut,
  onDeleteAccount,
  onRestorePurchases,
  onUpgradeToPremium,
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <PremiumStatusSection
        isPremium={accountInfo.isPremium}
        onUpgradeToPremium={onUpgradeToPremium}
        onRestorePurchases={onRestorePurchases}
      />

      <AccountInfoSection
        email={accountInfo.email}
        onUpdateEmail={onUpdateEmail}
        onChangePassword={onChangePassword}
      />

      <AccountActionsSection
        version={accountInfo.version}
        lastSync={accountInfo.lastSync}
        onSignOut={onSignOut}
        onDeleteAccount={onDeleteAccount}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
  },
});

export default AccountManagement;