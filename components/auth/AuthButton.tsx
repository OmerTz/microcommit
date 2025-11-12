import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import { authStyles } from './AuthStyles';

interface AuthButtonProps {
  text: string;
  onPress: () => void;
  loading: boolean;
  disabled?: boolean;
  animatedStyle: any;
  testID?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  text,
  onPress,
  loading,
  disabled = false,
  animatedStyle,
  testID,
}) => {
  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[authStyles.submitButton, (loading || disabled) && authStyles.disabledButton]}
        onPress={onPress}
        disabled={loading || disabled}
        testID={testID}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={authStyles.submitButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={authStyles.submitButtonText}>{text}</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};
