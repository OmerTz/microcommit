import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { FeedbackForm } from '@/components/profile';

interface SettingsFeedbackModalProps {
  showFeedback: boolean;
  onSendFeedback: (feedback: string, email: string, type: 'bug' | 'feature' | 'general') => Promise<boolean>;
  onCancel: () => void;
}

export const SettingsFeedbackModal: React.FC<SettingsFeedbackModalProps> = ({
  showFeedback,
  onSendFeedback,
  onCancel
}) => {
  if (!showFeedback) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <FeedbackForm
          onSendFeedback={onSendFeedback}
          onCancel={onCancel}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: NumeraDesignSystem.spacing.lg,
  },
  modalContent: {
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    padding: NumeraDesignSystem.spacing.lg,
    width: '100%',
    maxHeight: '80%',
  },
});