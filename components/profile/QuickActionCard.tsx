/**
 * QuickActionCard - Reusable action button component for profile actions
 * Implements PS018 design with cosmic styling and accessibility
 */

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export interface QuickActionCardProps {
  icon: string | React.ComponentType<any>;
  title: string;
  description: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  title,
  description,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  const cardStyles = [
    styles.card,
    variant === 'secondary' && styles.secondaryCard,
    disabled && styles.disabledCard,
  ];

  const titleStyles = [
    styles.title,
    variant === 'secondary' && styles.secondaryTitle,
    disabled && styles.disabledText,
  ];

  const descriptionStyles = [
    styles.description,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={cardStyles}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={`${title}: ${description}`}
      accessibilityRole="button"
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {typeof icon === 'string' ? (
            <Text style={[styles.icon, disabled && styles.disabledIcon]}>
              {icon}
            </Text>
          ) : (
            React.createElement(icon, {
              size: 24,
              color: disabled 
                ? NumeraDesignSystem.colors.text.tertiary 
                : NumeraDesignSystem.colors.text.secondary,
            })
          )}
        </View>
        
        <View style={styles.textContainer}>
          <Text style={titleStyles}>{title}</Text>
          <Text style={descriptionStyles}>{description}</Text>
        </View>
        
        <View style={styles.chevronContainer}>
          <Text style={[styles.chevron, disabled && styles.disabledIcon]}>
            ›
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: NumeraDesignSystem.colors.background,
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    marginBottom: NumeraDesignSystem.spacing.sm,
    ...NumeraDesignSystem.shadows.sm,
    overflow: 'hidden',
  },
  secondaryCard: {
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: NumeraDesignSystem.colors.border,
  },
  disabledCard: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: NumeraDesignSystem.spacing.md,
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    minHeight: 72, // Ensure 44px touch target + padding
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: NumeraDesignSystem.spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  disabledIcon: {
    opacity: 0.5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.text.primary,
    marginBottom: 2,
  },
  secondaryTitle: {
    color: NumeraDesignSystem.colors.primary[600],
  },
  description: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraDesignSystem.colors.text.secondary,
    lineHeight: NumeraDesignSystem.typography.lineHeight.bodySmall,
  },
  disabledText: {
    opacity: 0.6,
  },
  chevronContainer: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    fontSize: 24,
    color: NumeraDesignSystem.colors.text.tertiary,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
  },
});

export default QuickActionCard;