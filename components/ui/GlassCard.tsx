import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewStyle,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'light' | 'medium' | 'dark' | 'cosmic' | 'nebula' | 'aurora' | 'stardust';
  gradient?: boolean;
  onPress?: () => void;
  animated?: boolean;
  shimmer?: boolean;
  glow?: boolean;
  noPadding?: boolean;
  testID?: string;
}

export default function GlassCard({
  children,
  style,
  variant = 'light',
  gradient = false,
  onPress,
  animated = true,
  shimmer = false,
  glow = false,
  noPadding = false,
  testID,
}: GlassCardProps) {
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const shimmerAnimation = useRef(new Animated.Value(0)).current;
  const glowAnimation = useRef(new Animated.Value(0.5)).current;
  const entranceAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    if (animated) {
      Animated.spring(entranceAnimation, {
        toValue: 1,
        tension: 100,
        friction: 10,
        useNativeDriver: true,
      }).start();
    } else {
      // Set immediately to 1 if not animated
      entranceAnimation.setValue(1);
    }

    // Shimmer effect
    if (shimmer) {
      Animated.loop(
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    }

    // Glow effect
    if (glow) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnimation, {
            toValue: 0.5,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [shimmer, glow, animated, entranceAnimation, shimmerAnimation, glowAnimation]);

  const handlePressIn = () => {
    if (onPress) {
      Animated.spring(scaleAnimation, {
        toValue: 0.95,
        tension: 200,
        friction: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      Animated.spring(scaleAnimation, {
        toValue: 1,
        tension: 200,
        friction: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  const glassStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  };

  const animatedStyle = {
    transform: [
      { scale: scaleAnimation },
      {
        translateY: entranceAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
    opacity: entranceAnimation,
  };

  const shimmerOverlayStyle = shimmer ? {
    opacity: shimmerAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.3, 0],
    }),
  } : {};

  const glowStyle = glow ? {
    shadowOpacity: glowAnimation,
  } : {};

  const isCosmicVariant = ['cosmic', 'nebula', 'aurora', 'stardust'].includes(variant);
  const cosmicConfig = null; // Simplified for now

  const content = (
    <Animated.View
      testID={testID}
      style={[
        styles.container,
        glassStyle,
        animatedStyle,
        glowStyle,
        isCosmicVariant && {
          borderColor: cosmicConfig?.border,
          shadowColor: cosmicConfig?.glow,
          shadowOpacity: 0.4,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 8 },
        },
        style,
      ]}
    >
      {/* Cosmic background or glass morphism base */}
      {isCosmicVariant && cosmicConfig ? (
        <LinearGradient
          colors={cosmicConfig.background}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      ) : (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: glassStyle.backgroundColor },
          ]}
        />
      )}

      {/* Gradient overlay */}
      {gradient && !isCosmicVariant && (
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
          style={[StyleSheet.absoluteFillObject, { borderRadius: NumeraDesignSystem.borderRadius.card }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      )}

      {/* Shimmer effect */}
      {shimmer && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            shimmerOverlayStyle,
          ]}
        >
          <LinearGradient
            colors={['transparent', 'rgba(255, 255, 255, 0.3)', 'transparent']}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>
      )}


      {/* Content */}
      <View style={noPadding ? styles.contentNoPadding : styles.content}>
        {children}
      </View>
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        testID={testID}
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: NumeraDesignSystem.borderRadius.card,
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    padding: NumeraDesignSystem.spacing.lg,
    zIndex: 1,
  },
  contentNoPadding: {
    zIndex: 1,
  },
});