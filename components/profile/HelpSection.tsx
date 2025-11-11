/**
 * HelpSection - Help and support actions section
 * Extracted from SupportComponents.tsx for better modularity
 */

import React, { useState } from 'react';
import { View, Alert, Linking } from 'react-native';
import SettingsSection from './SettingsSection';
import QuickActionCard from './QuickActionCard';
import FeedbackForm from './FeedbackForm';

export interface HelpSectionProps {
  supportEmail: string;
  faqUrl: string;
  appVersion: string;
  buildNumber: string;
  onSendFeedback: (feedback: string, email: string, type: 'bug' | 'feature' | 'general') => Promise<boolean>;
}

const HelpSection: React.FC<HelpSectionProps> = ({
  supportEmail,
  faqUrl,
  appVersion,
  buildNumber,
  onSendFeedback,
}) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleOpenFAQ = async () => {
    try {
      const supported = await Linking.canOpenURL(faqUrl);
      if (supported) {
        await Linking.openURL(faqUrl);
      } else {
        Alert.alert('Error', 'Unable to open FAQ page');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open FAQ page');
    }
  };

  const handleEmailSupport = async () => {
    const subject = 'NumeraFlow Support Request';
    const body = `Hi NumeraFlow Support Team,

I need assistance with:

---
App Version: ${appVersion}
Build: ${buildNumber}
---

Please describe your issue:
`;

    const mailto = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      const supported = await Linking.canOpenURL(mailto);
      if (supported) {
        await Linking.openURL(mailto);
      } else {
        Alert.alert(
          'Email Not Available',
          `Please email us directly at: ${supportEmail}`,
          [
            {
              text: 'Copy Email',
              onPress: () => {
                // In a real app, you'd copy to clipboard here
                Alert.alert('Copied', 'Email address copied to clipboard');
              },
            },
            { text: 'OK' },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open email app');
    }
  };

  return (
    <SettingsSection title="Help & Support" icon="help">
      <View>
        <QuickActionCard
          icon="book"
          title="Help & FAQ"
          description="Find answers to common questions"
          onPress={handleOpenFAQ}
        />
        
        <QuickActionCard
          icon="message"
          title="Contact Support"
          description="Get help from our support team"
          onPress={handleEmailSupport}
        />
        
        {!showFeedbackForm ? (
          <QuickActionCard
            icon="edit"
            title="Send Feedback"
            description="Share your thoughts or report issues"
            onPress={() => setShowFeedbackForm(true)}
          />
        ) : (
          <FeedbackForm
            onSendFeedback={onSendFeedback}
            onCancel={() => setShowFeedbackForm(false)}
          />
        )}
      </View>
    </SettingsSection>
  );
};

export default HelpSection;