/**
 * ShareOptionsSection - Share options logic and UI
 * Implements PS018 share options design
 */

import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Image, Link, FileText } from 'lucide-react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { PROFILE_TEXT } from '@/constants/ProfileConstants';
import QuickActionCard from './QuickActionCard';

export interface ShareOptionsProps {
  onShareCard: () => void;
  onShareLink: () => void;
  onGeneratePDF: () => void;
}

const ShareOptionsSection: React.FC<ShareOptionsProps> = ({
  onShareCard,
  onShareLink,
  onGeneratePDF,
}) => {
  const shareOptions = [
    {
      type: 'card' as const,
      icon: Image,
      title: PROFILE_TEXT.beautifulCardTitle,
      description: PROFILE_TEXT.beautifulCardDesc,
      features: [
        PROFILE_TEXT.coreNumbersFeature,
        PROFILE_TEXT.personalizedMessageFeature,
        PROFILE_TEXT.cosmicDesignFeature,
      ],
    },
    {
      type: 'link' as const,
      icon: Link,
      title: PROFILE_TEXT.profileLinkTitle,
      description: PROFILE_TEXT.profileLinkDesc,
      features: [
        PROFILE_TEXT.viewOnlyAccessFeature,
        PROFILE_TEXT.expiresIn30DaysFeature,
        PROFILE_TEXT.noPersonalDataFeature,
      ],
    },
    {
      type: 'pdf' as const,
      icon: FileText,
      title: PROFILE_TEXT.pdfReportTitle,
      description: PROFILE_TEXT.pdfReportDesc,
      features: [
        PROFILE_TEXT.allNumbersExplainedFeature,
        PROFILE_TEXT.compatibilityInsightsFeature,
        PROFILE_TEXT.professionalFormattingFeature,
      ],
    },
  ];

  const handleShareOption = (type: 'card' | 'link' | 'pdf') => {
    if (type === 'card') {
      onShareCard();
    } else if (type === 'link') {
      Alert.alert(
        PROFILE_TEXT.generateShareLinkTitle,
        PROFILE_TEXT.generateShareLinkMessage,
        [
          { text: PROFILE_TEXT.cancel, style: 'cancel' },
          { text: PROFILE_TEXT.generateButton, onPress: onShareLink },
        ]
      );
    } else if (type === 'pdf') {
      Alert.alert(
        PROFILE_TEXT.generatePDFReportTitle,
        PROFILE_TEXT.generatePDFReportMessage,
        [
          { text: PROFILE_TEXT.cancel, style: 'cancel' },
          { text: PROFILE_TEXT.generateButton, onPress: onGeneratePDF },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{PROFILE_TEXT.shareYourProfileTitle}</Text>
      <Text style={styles.subtitle}>
        {PROFILE_TEXT.shareYourProfileSubtitle}
      </Text>

      {shareOptions.map((option) => (
        <View key={option.type} style={styles.shareOption}>
          <QuickActionCard
            icon={option.icon}
            title={option.title}
            description={option.description}
            onPress={() => handleShareOption(option.type)}
          />
          
          <View style={styles.featureList}>
            {option.features.map((feature, index) => (
              <Text key={index} style={styles.featureItem}>
                • {feature}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: NumeraDesignSystem.spacing.md,
  },
  title: {
    fontSize: NumeraDesignSystem.typography.fontSize.h3,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.text.primary,
    marginBottom: NumeraDesignSystem.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    color: NumeraDesignSystem.colors.text.secondary,
    textAlign: 'center',
    marginBottom: NumeraDesignSystem.spacing.lg,
  },
  shareOption: {
    marginBottom: NumeraDesignSystem.spacing.md,
  },
  featureList: {
    paddingHorizontal: NumeraDesignSystem.spacing.lg,
    marginTop: NumeraDesignSystem.spacing.sm,
  },
  featureItem: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraDesignSystem.colors.text.secondary,
    marginBottom: 4,
  },
});

export default ShareOptionsSection;