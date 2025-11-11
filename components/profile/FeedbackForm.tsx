/**
 * FeedbackForm - User feedback form with different types
 * Extracted from SupportComponents.tsx for better modularity
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export interface FeedbackFormProps {
  onSendFeedback: (feedback: string, email: string, type: 'bug' | 'feature' | 'general') => Promise<boolean>;
  onCancel: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onSendFeedback,
  onCancel,
}) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'general'>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackTypes = [
    { key: 'bug' as const, label: 'Bug Report', icon: 'bug', description: 'Report an issue' },
    { key: 'feature' as const, label: 'Feature Request', icon: 'lightbulb', description: 'Suggest new features' },
    { key: 'general' as const, label: 'General Feedback', icon: 'comment', description: 'Share your thoughts' },
  ];

  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim()) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }

    if (feedbackEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedbackEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onSendFeedback(feedbackText.trim(), feedbackEmail, feedbackType);
      if (success) {
        Alert.alert(
          'Thank You!',
          'Your feedback has been submitted successfully. We appreciate your input!',
          [
            {
              text: 'OK',
              onPress: () => {
                setFeedbackText('');
                setFeedbackEmail('');
                setFeedbackType('general');
                onCancel();
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFeedbackText('');
    setFeedbackEmail('');
    setFeedbackType('general');
    onCancel();
  };

  return (
    <View style={styles.feedbackForm}>
      <Text style={styles.formTitle}>Send Feedback</Text>
      
      {/* Feedback Type Selection */}
      <Text style={styles.sectionLabel}>Feedback Type:</Text>
      <View style={styles.typeGrid}>
        {feedbackTypes.map((type) => (
          <TouchableOpacity
            key={type.key}
            style={[
              styles.typeOption,
              feedbackType === type.key && styles.selectedType,
            ]}
            onPress={() => setFeedbackType(type.key)}
            accessibilityLabel={`${type.label}: ${type.description}`}
            accessibilityRole="radio"
            accessibilityState={{ selected: feedbackType === type.key }}
          >
            <Text style={styles.typeIcon}>{type.icon}</Text>
            <Text style={styles.typeLabel}>{type.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Feedback Text */}
      <Text style={styles.sectionLabel}>Your Feedback:</Text>
      <TextInput
        style={styles.feedbackInput}
        placeholder={
          feedbackType === 'bug'
            ? 'Describe the bug you encountered...'
            : feedbackType === 'feature'
            ? "Describe the feature you'd like to see..."
            : 'Share your thoughts about NumeraFlow...'
        }
        value={feedbackText}
        onChangeText={setFeedbackText}
        multiline
        textAlignVertical="top"
        maxLength={1000}
      />
      
      <Text style={styles.characterCount}>
        {feedbackText.length}/1000 characters
      </Text>
      
      {/* Optional Email */}
      <Text style={styles.sectionLabel}>Email (optional):</Text>
      <TextInput
        style={styles.emailInput}
        placeholder="your.email@example.com"
        value={feedbackEmail}
        onChangeText={setFeedbackEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <Text style={styles.emailNote}>
        Provide your email if you'd like us to follow up
      </Text>
      
      {/* Action Buttons */}
      <View style={styles.formButtons}>
        <TouchableOpacity
          style={[styles.formButton, styles.cancelButton]}
          onPress={handleCancel}
          disabled={isSubmitting}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.formButton, styles.submitButton]}
          onPress={handleSubmitFeedback}
          disabled={isSubmitting || !feedbackText.trim()}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Sending...' : 'Send Feedback'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackForm: {
    padding: NumeraDesignSystem.spacing.md,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    marginHorizontal: NumeraDesignSystem.spacing.md,
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  formTitle: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyLarge,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.text.primary,
    marginBottom: NumeraDesignSystem.spacing.md,
  },
  sectionLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.text.primary,
    marginBottom: NumeraDesignSystem.spacing.sm,
    marginTop: NumeraDesignSystem.spacing.md,
  },
  typeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: NumeraDesignSystem.spacing.md,
  },
  typeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: NumeraDesignSystem.spacing.md,
    marginHorizontal: 4,
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    backgroundColor: NumeraDesignSystem.colors.background,
    borderWidth: 1,
    borderColor: NumeraDesignSystem.colors.border,
  },
  selectedType: {
    backgroundColor: NumeraDesignSystem.colors.primary[50],
    borderColor: NumeraDesignSystem.colors.primary[500],
  },
  typeIcon: {
    fontSize: 16,
    marginBottom: 4,
    color: NumeraDesignSystem.colors.text.primary,
  },
  typeLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.caption,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    color: NumeraDesignSystem.colors.text.primary,
    textAlign: 'center',
  },
  feedbackInput: {
    backgroundColor: NumeraDesignSystem.colors.background,
    borderRadius: NumeraDesignSystem.borderRadius.md,
    padding: NumeraDesignSystem.spacing.md,
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    color: NumeraDesignSystem.colors.text.primary,
    borderWidth: 1,
    borderColor: NumeraDesignSystem.colors.border,
    minHeight: 120,
    marginBottom: 4,
  },
  characterCount: {
    fontSize: NumeraDesignSystem.typography.fontSize.caption,
    color: NumeraDesignSystem.colors.text.secondary,
    textAlign: 'right',
    marginBottom: NumeraDesignSystem.spacing.md,
  },
  emailInput: {
    backgroundColor: NumeraDesignSystem.colors.background,
    borderRadius: NumeraDesignSystem.borderRadius.md,
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    color: NumeraDesignSystem.colors.text.primary,
    borderWidth: 1,
    borderColor: NumeraDesignSystem.colors.border,
    marginBottom: 4,
  },
  emailNote: {
    fontSize: NumeraDesignSystem.typography.fontSize.caption,
    color: NumeraDesignSystem.colors.text.secondary,
    marginBottom: NumeraDesignSystem.spacing.md,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: NumeraDesignSystem.spacing.md,
  },
  formButton: {
    flex: 1,
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.lg,
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: NumeraDesignSystem.colors.border,
  },
  submitButton: {
    backgroundColor: NumeraDesignSystem.colors.primary[500],
  },
  cancelButtonText: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    color: NumeraDesignSystem.colors.text.secondary,
  },
  submitButtonText: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.text.inverse,
  },
});

export default FeedbackForm;