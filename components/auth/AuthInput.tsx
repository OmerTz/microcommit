import React from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { authStyles } from './AuthStyles';

interface AuthInputProps extends TextInputProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  isFocused: boolean;
  animatedStyle: any;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  hint?: string;
  labelRight?: React.ReactNode;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  icon,
  isFocused,
  animatedStyle,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  hint,
  labelRight,
  ...textInputProps
}) => {
  return (
    <View style={authStyles.inputGroup}>
      {labelRight ? (
        <View style={authStyles.labelRow}>
          <Text style={authStyles.label}>{label}</Text>
          {labelRight}
        </View>
      ) : (
        <Text style={authStyles.label}>{label}</Text>
      )}
      <Animated.View
        style={[
          authStyles.inputWrapper,
          isFocused && authStyles.inputWrapperFocused,
          animatedStyle,
        ]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={isFocused ? '#6366f1' : '#9ca3af'}
          style={authStyles.inputIcon}
        />
        <TextInput
          style={authStyles.input}
          placeholderTextColor="#9ca3af"
          {...textInputProps}
        />
        {showPasswordToggle && (
          <TouchableOpacity onPress={onTogglePassword} style={authStyles.eyeIcon}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={isFocused ? '#6366f1' : '#9ca3af'}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      {hint && <Text style={authStyles.hint}>{hint}</Text>}
    </View>
  );
};
