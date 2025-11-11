/**
 * ThemeSelector - Theme and display preferences component
 * Implements PS018 theme selection design with cosmic variants
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { PROFILE_ICONS } from '@/constants/ProfileConstants';
import SettingsSection from './SettingsSection';
import SettingsToggle from './SettingsToggle';

export interface ThemePreferences {
  theme: 'light' | 'dark' | 'cosmic';
  colorScheme: 'cosmic-purple' | 'cosmic-blue' | 'cosmic-teal' | 'cosmic-pink';
  textSize: 'small' | 'medium' | 'large' | 'extra-large';
  animations: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}

export interface ThemeSelectorProps {
  preferences: ThemePreferences;
  onPreferencesChange: (preferences: ThemePreferences) => void;
  loading?: boolean;
  onError?: (error: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  preferences,
  onPreferencesChange,
  loading = false,
  onError,
}) => {
  const updatePreference = <K extends keyof ThemePreferences>(
    key: K,
    value: ThemePreferences[K]
  ) => {
    try {
      onPreferencesChange({
        ...preferences,
        [key]: value,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update theme preferences';
      onError?.(message);
    }
  };

  const themeOptions = [
    { key: 'light', label: 'Light', icon: PROFILE_ICONS.sun, description: 'Clean and bright' },
    { key: 'dark', label: 'Dark', icon: PROFILE_ICONS.moon, description: 'Easy on the eyes' },
    { key: 'cosmic', label: 'Cosmic', icon: PROFILE_ICONS.sparkles, description: 'Mystical and magical' },
  ] as const;

  const colorSchemeOptions = [
    { key: 'cosmic-purple', label: 'Cosmic Purple', color: NumeraDesignSystem.colors.cosmic.purple },
    { key: 'cosmic-blue', label: 'Cosmic Blue', color: NumeraDesignSystem.colors.cosmic.blue },
    { key: 'cosmic-teal', label: 'Cosmic Teal', color: NumeraDesignSystem.colors.cosmic.teal },
    { key: 'cosmic-pink', label: 'Cosmic Pink', color: NumeraDesignSystem.colors.cosmic.pink },
  ] as const;

  const textSizeOptions = [
    { key: 'small', label: 'Small', size: 14 },
    { key: 'medium', label: 'Medium', size: 16 },
    { key: 'large', label: 'Large', size: 18 },
    { key: 'extra-large', label: 'Extra Large', size: 20 },
  ] as const;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Theme Selection */}
      <SettingsSection title="Theme" icon={PROFILE_ICONS.palette}>
        <View style={styles.optionGrid}>
          {themeOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.themeOption,
                preferences.theme === option.key && styles.selectedOption,
              ]}
              onPress={() => updatePreference('theme', option.key)}
              accessibilityLabel={`${option.label} theme: ${option.description}`}
              accessibilityRole="radio"
              accessibilityState={{ selected: preferences.theme === option.key }}
            >
              {/* Theme icon will be handled by SettingsSection */}
              <Text style={styles.optionLabel}>{option.label}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SettingsSection>

      {/* Color Scheme Selection */}
      <SettingsSection title="Color Scheme" icon={PROFILE_ICONS.rainbow}>
        <View style={styles.colorGrid}>
          {colorSchemeOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.colorOption,
                preferences.colorScheme === option.key && styles.selectedColorOption,
              ]}
              onPress={() => updatePreference('colorScheme', option.key)}
              accessibilityLabel={option.label}
              accessibilityRole="radio"
              accessibilityState={{ selected: preferences.colorScheme === option.key }}
            >
              <View
                style={[
                  styles.colorSwatch,
                  { backgroundColor: option.color },
                ]}
              />
              <Text style={styles.colorLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SettingsSection>

      {/* Text Size */}
      <SettingsSection title="Text Size" icon={PROFILE_ICONS.text}>
        <View style={styles.textSizeContainer}>
          {textSizeOptions.map((option, index) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.textSizeOption,
                preferences.textSize === option.key && styles.selectedTextSize,
                index < textSizeOptions.length - 1 && styles.textSizeOptionBorder,
              ]}
              onPress={() => updatePreference('textSize', option.key)}
              accessibilityLabel={`Text size: ${option.label}`}
              accessibilityRole="radio"
              accessibilityState={{ selected: preferences.textSize === option.key }}
            >
              <Text
                style={[
                  styles.textSizeLabel,
                  { fontSize: option.size },
                  preferences.textSize === option.key && styles.selectedTextSizeLabel,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SettingsSection>

      {/* Accessibility & Motion */}
      <SettingsSection title="Accessibility" icon={PROFILE_ICONS.accessibility}>
        <View>
          <SettingsToggle
            label="Animations"
            description="Enable smooth transitions and effects"
            value={preferences.animations}
            onToggle={(value) => updatePreference('animations', value)}
          />
          
          <SettingsToggle
            label="Reduce Motion"
            description="Minimize motion for sensitivity"
            value={preferences.reducedMotion}
            onToggle={(value) => updatePreference('reducedMotion', value)}
          />
          
          <SettingsToggle
            label="High Contrast"
            description="Increase contrast for better readability"
            value={preferences.highContrast}
            onToggle={(value) => updatePreference('highContrast', value)}
            showDivider={false}
          />
        </View>
      </SettingsSection>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
  },
  optionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: NumeraDesignSystem.spacing.sm,
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: NumeraDesignSystem.spacing.md,
    marginHorizontal: 4,
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
  },
  selectedOption: {
    backgroundColor: NumeraDesignSystem.colors.primary[50],
    borderWidth: 2,
    borderColor: NumeraDesignSystem.colors.primary[500],
  },
  themeIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  optionLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.text.primary,
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: NumeraDesignSystem.typography.fontSize.caption,
    color: NumeraDesignSystem.colors.text.secondary,
    textAlign: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: NumeraDesignSystem.spacing.sm,
  },
  colorOption: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.sm,
    marginBottom: NumeraDesignSystem.spacing.sm,
    marginHorizontal: '1%',
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
  },
  selectedColorOption: {
    backgroundColor: NumeraDesignSystem.colors.primary[50],
    borderWidth: 2,
    borderColor: NumeraDesignSystem.colors.primary[500],
  },
  colorSwatch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: NumeraDesignSystem.spacing.sm,
  },
  colorLabel: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraDesignSystem.colors.text.primary,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
  },
  textSizeContainer: {
    backgroundColor: NumeraDesignSystem.colors.background,
  },
  textSizeOption: {
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    alignItems: 'center',
  },
  selectedTextSize: {
    backgroundColor: NumeraDesignSystem.colors.primary[50],
  },
  textSizeOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: NumeraDesignSystem.colors.border,
  },
  textSizeLabel: {
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    color: NumeraDesignSystem.colors.text.primary,
  },
  selectedTextSizeLabel: {
    color: NumeraDesignSystem.colors.primary[600],
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
  },
});

export default ThemeSelector;