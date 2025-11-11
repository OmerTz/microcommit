import { StyleSheet } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

export const createNotificationStyles = () => {
  return StyleSheet.create({
    notificationOptions: {
      gap: NumeraDesignSystem.spacing.md,
      width: '100%',
    },
    notificationCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: NumeraDesignSystem.spacing.md,
      padding: NumeraDesignSystem.spacing.lg,
    },
    notificationCardSelected: {
      backgroundColor: 'rgba(139, 69, 255, 0.3)',
    },
    notificationCardText: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: NumeraDesignSystem.typography.fontSize.bodyLarge,
      color: 'rgba(255, 255, 255, 0.7)',
      fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
      marginBottom: 4,
    },
    notificationTitleSelected: {
      color: '#FFFFFF',
    },
    notificationSubtitle: {
      fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
      color: 'rgba(255, 255, 255, 0.5)',
      lineHeight: 18,
    },
    notificationSubtitleSelected: {
      color: 'rgba(255, 255, 255, 0.8)',
    },
    notificationDisclaimer: {
      alignItems: 'center',
      paddingTop: NumeraDesignSystem.spacing.sm,
    },
    disclaimerText: {
      fontSize: NumeraDesignSystem.typography.fontSize.caption,
      color: 'rgba(255, 255, 255, 0.5)',
      textAlign: 'center',
    },
  });
};