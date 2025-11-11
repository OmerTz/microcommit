import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

interface AuroraBackgroundProps {
  children: React.ReactNode;
  variant?: 'aurora' | 'nebula' | 'galaxy' | 'midnight';
  animated?: boolean;
  intensity?: 'light' | 'medium' | 'strong';
}

export default function AuroraBackground({
  children,
  variant = 'midnight',
  animated = true,
  intensity = 'medium',
}: AuroraBackgroundProps) {
  const getBackgroundColors = () => {
    switch (variant) {
      case 'aurora':
        return ['#1a1b3a', '#2d1b69', '#1a1b3a'];
      case 'nebula':
        return ['#0f0f23', '#1e1b4b', '#312e81'];
      case 'galaxy':
        return ['#0c1222', '#1e3a8a', '#312e81'];
      case 'midnight':
      default:
        return ['#0a0a0a', '#1a1a2e', '#16213e'];
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={getBackgroundColors()}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Subtle overlay for better readability */}
      <View style={styles.overlay} />
      
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NumeraDesignSystem.colors.background.primary,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});