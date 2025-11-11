/**
 * PremiumStatusSection - Premium status display and upgrade actions
 * Extracted from AccountManagement.tsx for better modularity
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { PROFILE_TEXT, PROFILE_ICONS } from '@/constants/ProfileConstants';
import SettingsSection from './SettingsSection';
import QuickActionCard from './QuickActionCard';

export interface PremiumStatusSectionProps {
  isPremium?: boolean;
  onUpgradePress: () => void;
  onManageSubscriptionPress: () => void;
}

const PremiumStatusSection: React.FC<PremiumStatusSectionProps> = ({
  isPremium = false,
  onUpgradePress,
  onManageSubscriptionPress,
}) => {
  return (
    <SettingsSection title={PROFILE_TEXT.premiumTitle} icon={PROFILE_ICONS.diamond}>
      <View>
        <View style={styles.premiumStatus}>
          <Text style={styles.statusLabel}>{PROFILE_TEXT.statusLabel}</Text>
          <Text style={[
            styles.statusValue,
            isPremium ? styles.premiumText : styles.freeText
          ]}>
            {isPremium ? PROFILE_TEXT.premiumUser : PROFILE_TEXT.freeUser}
          </Text>
        </View>
        
        {!isPremium && (
          <QuickActionCard
            icon={PROFILE_ICONS.star}
            title={PROFILE_TEXT.upgradeToPremium}
            description={PROFILE_TEXT.upgradeToPremiumDesc}
            onPress={onUpgradePress}
          />
        )}
        
        <QuickActionCard
          icon={PROFILE_ICONS.refresh}
          title={PROFILE_TEXT.restorePurchases}
          description={PROFILE_TEXT.restorePurchasesDesc}
          onPress={onManageSubscriptionPress}
        />
      </View>
    </SettingsSection>
  );
};

const styles = StyleSheet.create({
  premiumStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    backgroundColor: NumeraDesignSystem.colors.background,
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  statusLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    color: NumeraDesignSystem.colors.text.secondary,
  },
  statusValue: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
  },
  premiumText: {
    color: NumeraDesignSystem.colors.warning,
  },
  freeText: {
    color: NumeraDesignSystem.colors.text.primary,
  },
});

export default PremiumStatusSection;