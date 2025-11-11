/**
 * SupportComponents - Feedback, contact, and version info components
 * Implements PS018 support section design
 */

import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import HelpSection from './HelpSection';
import RateSection from './RateSection';
import VersionInfoSection from './VersionInfoSection';

export interface SupportInfo {
  appVersion: string;
  buildNumber: string;
  supportEmail: string;
  faqUrl: string;
  appStoreUrl: string;
}

export interface SupportComponentsProps {
  supportInfo: SupportInfo;
  onSendFeedback: (feedback: string, email: string, type: 'bug' | 'feature' | 'general') => Promise<boolean>;
  onContactSupport: () => void;
  onRateApp: () => void;
}

const SupportComponents: React.FC<SupportComponentsProps> = ({
  supportInfo,
  onSendFeedback,
  onContactSupport,
  onRateApp,
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HelpSection
        supportEmail={supportInfo.supportEmail}
        faqUrl={supportInfo.faqUrl}
        appVersion={supportInfo.appVersion}
        buildNumber={supportInfo.buildNumber}
        onSendFeedback={onSendFeedback}
      />

      <RateSection onRateApp={onRateApp} />

      <VersionInfoSection
        appVersion={supportInfo.appVersion}
        buildNumber={supportInfo.buildNumber}
        supportEmail={supportInfo.supportEmail}
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

export default SupportComponents;