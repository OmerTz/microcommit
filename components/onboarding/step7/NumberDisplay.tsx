import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import type { NumberDisplayProps } from './types';

export const NumberDisplay: React.FC<NumberDisplayProps> = ({
  title,
  number,
  description,
  color
}) => {
  return (
    <View style={styles.numberCard}>
      <LinearGradient
        colors={[color + '20', color + '10']}
        style={styles.numberGradient}
      >
        <Text style={styles.numberTitle}>{title}</Text>
        <Text style={[styles.numberValue, { color }]}>{number}</Text>
        <Text style={styles.numberDescription}>{description}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = {
  numberCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  numberGradient: {
    padding: 20,
  },
  numberTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: NumeraDesignSystem.colors.text,
    marginBottom: 8,
  },
  numberValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  numberDescription: {
    fontSize: 14,
    color: NumeraDesignSystem.colors.textSecondary,
    lineHeight: 20,
  },
};