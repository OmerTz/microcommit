/**
 * EnhancedNumberCard - Numerology number display with star ratings and strength indicators
 * Implements PS018 design specifications with cosmic styling
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export interface EnhancedNumberCardProps {
  label: string;
  value: number | string;
  meaning: string;
  strength?: number; // 1-5 stars
  onPress: () => void;
  variant?: 'default' | 'featured';
  accentColor?: string;
}

const EnhancedNumberCard: React.FC<EnhancedNumberCardProps> = ({
  label,
  value,
  meaning,
  strength = 5,
  onPress,
  variant = 'default',
  accentColor,
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={[
            styles.star,
            { color: i <= strength ? NumeraDesignSystem.colors.warning : NumeraDesignSystem.colors.text.tertiary }
          ]}
        >
          {i <= strength ? '★' : '☆'}
        </Text>
      );
    }
    return stars;
  };

  const getAccentColor = () => {
    if (accentColor) return accentColor;
    
    // Map numbers to cosmic colors based on numerological meaning
    const numberColorMap: { [key: string]: string } = {
      'Life Path': NumeraDesignSystem.colors.cosmic.purple,
      'Expression': NumeraDesignSystem.colors.cosmic.indigo,
      'Soul Urge': NumeraDesignSystem.colors.cosmic.pink,
      'Personality': NumeraDesignSystem.colors.cosmic.teal,
      'Birthday': NumeraDesignSystem.colors.cosmic.blue,
    };
    
    return numberColorMap[label] || NumeraDesignSystem.colors.primary[500];
  };

  const cardStyles = [
    styles.card,
    variant === 'featured' && styles.featuredCard,
    { borderLeftColor: getAccentColor() }
  ];

  const numberStyles = [
    styles.numberValue,
    variant === 'featured' && styles.featuredNumber,
    { color: getAccentColor() }
  ];

  return (
    <TouchableOpacity
      style={cardStyles}
      onPress={onPress}
      accessibilityLabel={`${label} number ${value}, ${meaning}, strength ${strength} out of 5 stars`}
      accessibilityRole="button"
      activeOpacity={0.8}
    >
      {/* Header with label and stars */}
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.starContainer} testID="star-container">
          {renderStars()}
        </View>
      </View>

      {/* Number display */}
      <View style={styles.numberContainer}>
        <Text style={numberStyles}>{value}</Text>
        <Text style={styles.meaning}>{meaning}</Text>
      </View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(strength / 5) * 100}%`,
                backgroundColor: getAccentColor(),
              },
            ]}
          />
        </View>
        <Text style={styles.strengthLabel}>
          Understanding: {Math.round((strength / 5) * 100)}%
        </Text>
      </View>

      {/* Tap hint */}
      <Text style={styles.tapHint}>Tap to explore deeper insights</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: NumeraDesignSystem.colors.background,
    borderRadius: NumeraDesignSystem.borderRadius.xl,
    padding: NumeraDesignSystem.spacing.md,
    marginBottom: NumeraDesignSystem.spacing.sm,
    ...NumeraDesignSystem.shadows.md,
    borderLeftWidth: 4,
  },
  featuredCard: {
    ...NumeraDesignSystem.shadows.lg,
    borderWidth: 1,
    borderColor: NumeraDesignSystem.colors.primary[100],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: NumeraDesignSystem.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 1,
    fontSize: 12,
  },
  numberContainer: {
    alignItems: 'center',
    marginBottom: NumeraDesignSystem.spacing.md,
  },
  numberValue: {
    fontSize: 42,
    fontWeight: '700',
    marginBottom: 4,
  },
  featuredNumber: {
    fontSize: 48,
  },
  meaning: {
    fontSize: 16,
    fontWeight: '600',
    color: NumeraDesignSystem.colors.text,
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  progressTrack: {
    height: 4,
    backgroundColor: NumeraDesignSystem.colors.border,
    borderRadius: 2,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 12,
    color: NumeraDesignSystem.colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  tapHint: {
    fontSize: 12,
    color: NumeraDesignSystem.colors.textTertiary,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8,
  },
});

export default EnhancedNumberCard;