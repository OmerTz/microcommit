/**
 * PasswordChangeForm - Password change form with validation
 * Extracted from AccountManagement.tsx for better modularity
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export interface PasswordChangeFormProps {
  onSubmit: (data: { currentPassword: string; newPassword: string; confirmPassword: string; }) => Promise<void>;
  onChangePassword?: (oldPassword: string, newPassword: string) => Promise<boolean>;
  onCancel: () => void;
  disabled?: boolean;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  onSubmit,
  onChangePassword,
  onCancel,
  disabled = false,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'New password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    try {
      const success = await onChangePassword(currentPassword, newPassword);
      if (success) {
        Alert.alert('Success', 'Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onCancel();
      } else {
        Alert.alert('Error', 'Failed to update password. Please check your current password.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onCancel();
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Change Password</Text>
      
      <TextInput
        style={styles.textInput}
        placeholder="Current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        autoComplete="current-password"
      />
      
      <TextInput
        style={styles.textInput}
        placeholder="New password (min. 8 characters)"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        autoComplete="new-password"
      />
      
      <TextInput
        style={styles.textInput}
        placeholder="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoComplete="new-password"
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
          onPress={handlePasswordChange}
          disabled={isLoading}
        >
          <Text style={styles.confirmButtonText}>
            {isLoading ? 'Changing...' : 'Change Password'}
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

export default PasswordChangeForm;