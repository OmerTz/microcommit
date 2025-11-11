/**
 * SettingsToggle - Enhanced toggle component for settings screens
 * Based on existing ToggleSwitch with cosmic styling and settings layout
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export interface SettingsToggleProps {
  label: string;
  description?: string;
  value: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
  showDivider?: boolean;
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({
  label,
  description,
  value,
  onToggle,
  disabled = false,
  showDivider = true,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onToggle(!value);
    }
  };

  const getTrackColor = () => {
    if (disabled) {
      return value ? NumeraDesignSystem.colors.text.tertiary : NumeraDesignSystem.colors.backgroundSecondary;
    }
    return value 
      ? NumeraDesignSystem.colors.cosmic.purple 
      : NumeraDesignSystem.colors.text.tertiary;
  };

  const trackStyle = {
    width: 48,
    height: 24,
    borderRadius: 12,
    backgroundColor: getTrackColor(),
    padding: 2,
    opacity: disabled ? 0.5 : 1,
  };

  const thumbStyle = {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: NumeraDesignSystem.colors.background,
    transform: [{ translateX: value ? 24 : 0 }],
    shadowColor: NumeraDesignSystem.colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.content}
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
        accessibilityLabel={`${label}${description ? `: ${description}` : ''}, currently ${value ? 'enabled' : 'disabled'}`}
        activeOpacity={0.8}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.label, disabled && styles.disabledText]}>
            {label}
          </Text>
          {description && (
            <Text style={[styles.description, disabled && styles.disabledText]}>
              {description}
            </Text>
          )}
        </View>
        
        <View style={trackStyle}>
          <View style={thumbStyle} />
        </View>
      </TouchableOpacity>
      
      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: NumeraDesignSystem.colors.background,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    minHeight: 60, // Ensure accessibility touch target
  },
  textContainer: {
    flex: 1,
    marginRight: NumeraDesignSystem.spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: NumeraDesignSystem.colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: NumeraDesignSystem.colors.textSecondary,
    lineHeight: 20,
  },
  disabledText: {
    opacity: 0.6,
  },
  divider: {
    height: 1,
    backgroundColor: NumeraDesignSystem.colors.border,
    marginLeft: NumeraDesignSystem.spacing.md,
  },
});

export default SettingsToggle;