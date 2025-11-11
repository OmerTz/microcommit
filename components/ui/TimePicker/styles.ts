import { StyleSheet, Platform } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { NumeraColors } from '@/constants/Colors';

export const timePickerStyles = StyleSheet.create({
  container: {
    marginVertical: NumeraDesignSystem.spacing.sm,
  },
  label: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    color: NumeraColors.neutral[500],
    marginBottom: NumeraDesignSystem.spacing.xs,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
  },
  inputContainer: {
    width: '100%',
  },
  glassCard: {
    padding: 0,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: NumeraDesignSystem.spacing.md,
    paddingVertical: NumeraDesignSystem.spacing.md,
    minHeight: 56,
  },
  inputText: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyLarge,
    color: NumeraDesignSystem.colors.text.primary,
    flex: 1,
  },
  placeholder: {
    color: NumeraDesignSystem.colors.text.tertiary,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: NumeraDesignSystem.borderRadius.card,
    borderTopRightRadius: NumeraDesignSystem.borderRadius.card,
    overflow: 'hidden',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  modalHeader: {
    padding: NumeraDesignSystem.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: NumeraDesignSystem.typography.fontSize.h3,
    fontWeight: NumeraDesignSystem.typography.fontWeight.bold,
    color: NumeraDesignSystem.colors.text.primary,
    textAlign: 'center',
  },
  pickerContainer: {
    paddingVertical: NumeraDesignSystem.spacing.lg,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  timePicker: {
    width: 320,
    height: 200,
  },
  modalButtons: {
    flexDirection: 'row',
    padding: NumeraDesignSystem.spacing.lg,
    gap: NumeraDesignSystem.spacing.md,
  },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cancelButtonText: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    color: NumeraColors.neutral[500],
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
  },
  confirmButton: {
    overflow: 'hidden',
  },
  confirmButtonGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    color: '#FFFFFF',
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
  },
  
  // Fallback styles
  fallbackContainer: {
    padding: NumeraDesignSystem.spacing.lg,
    alignItems: 'center',
  },
  timeInput: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: NumeraDesignSystem.borderRadius.input,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: NumeraDesignSystem.spacing.lg,
    fontSize: NumeraDesignSystem.typography.fontSize.bodyLarge,
    color: NumeraDesignSystem.colors.text.primary,
    textAlign: 'center',
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  formatHint: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraColors.neutral[500],
    marginTop: NumeraDesignSystem.spacing.xs,
    textAlign: 'center',
  },
  fallbackText: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyMedium,
    color: NumeraColors.neutral[500],
    textAlign: 'center',
    marginBottom: NumeraDesignSystem.spacing.md,
  },
  
  // Inline picker styles
  inlinePickerContainer: {
    borderRadius: NumeraDesignSystem.borderRadius.card,
    overflow: 'hidden',
    padding: NumeraDesignSystem.spacing.md,
    alignItems: 'center',
  },
  inlinePickerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});