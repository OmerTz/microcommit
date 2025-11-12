import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { authStyles } from './AuthStyles';

interface AuthHeaderProps {
  title: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title }) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(600).springify()}
      style={authStyles.header}
    >
      <View style={authStyles.iconWrapper}>
        <Ionicons name="rocket" size={32} color="#6366f1" />
      </View>
      <Text style={authStyles.title}>{title}</Text>
    </Animated.View>
  );
};
