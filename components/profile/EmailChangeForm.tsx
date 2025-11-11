/**
 * EmailChangeForm - Email update form with validation
 * Extracted from AccountManagement.tsx for better modularity
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export interface EmailChangeFormProps {
  onSubmit: (data: { newEmail: string; password: string; confirmEmail: string; }) => Promise<void>;
  onUpdateEmail?: (newEmail: string, password: string) => Promise<boolean>;
  onCancel: () => void;
  disabled?: boolean;
}

const EmailChangeForm: React.FC<EmailChangeFormProps> = ({
  onSubmit,
  onUpdateEmail,
  onCancel,
  disabled = false,
}) => {
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailUpdate = async () => {
    if (!newEmail || !emailPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // Use onSubmit if available, fallback to onUpdateEmail
      if (onSubmit) {
        await onSubmit({ newEmail, password: emailPassword, confirmEmail });
        Alert.alert('Success', 'Email updated successfully');
        setNewEmail('');
        setConfirmEmail('');
        setEmailPassword('');
        onCancel();
      } else if (onUpdateEmail) {
        const success = await onUpdateEmail(newEmail, emailPassword);
        if (success) {
          Alert.alert('Success', 'Email updated successfully');
          setNewEmail('');
          setEmailPassword('');
          onCancel();
        } else {
          Alert.alert('Error', 'Failed to update email. Please check your password.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setNewEmail('');
    setEmailPassword('');
    onCancel();
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Update Email Address</Text>
      
      <TextInput
        style={styles.textInput}
        placeholder="New email address"
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      
      <TextInput
        style={styles.textInput}
        placeholder="Current password"
        value={emailPassword}
        onChangeText={setEmailPassword}
        secureTextEntry
        autoComplete="current-password"
      />
      
      <View style={styles.formButtons}>
        <TouchableOpacity
          style={[styles.formButton, styles.cancelButton]}
          onPress={handleCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.formButton, styles.confirmButton]}
          onPress={handleEmailUpdate}
          disabled={isLoading}
        >
          <Text style={styles.confirmButtonText}>
            {isLoading ? 'Updating...' : 'Update Email'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
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
  textInput: {
    backgroundColor: NumeraDesignSystem.colors.background,
    borderRadius: NumeraDesignSystem.borderRadius.md,
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    color: NumeraDesignSystem.colors.text.primary,
    borderWidth: 1,
    borderColor: NumeraDesignSystem.colors.border,
    marginBottom: NumeraDesignSystem.spacing.md,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: NumeraDesignSystem.spacing.sm,
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
  confirmButton: {
    backgroundColor: NumeraDesignSystem.colors.primary[500],
  },
  cancelButtonText: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    color: NumeraDesignSystem.colors.text.secondary,
  },
  confirmButtonText: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.text.inverse,
  },
});

export default EmailChangeForm;