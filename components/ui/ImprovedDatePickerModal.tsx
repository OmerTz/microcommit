import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CosmicDesignSystem } from '@/constants/CosmicDesignSystem';
import GlassCard from './GlassCard';

interface ImprovedDatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  initialDate?: Date;
  title?: string;
  maxDate?: Date;
}

const ImprovedDatePickerModal: React.FC<ImprovedDatePickerModalProps> = ({
  visible,
  onClose,
  onDateSelect,
  initialDate = new Date(),
  title = 'Select Date',
  maxDate = new Date(),
}) => {
  const [selectedDate, setSelectedDate] = React.useState(initialDate);

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      onClose();
      if (event.type === 'set' && date) {
        onDateSelect(date);
      }
    } else if (date) {
      setSelectedDate(date);
    }
  };

  const handleConfirm = () => {
    onDateSelect(selectedDate);
    onClose();
  };

  if (Platform.OS === 'ios') {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <GlassCard variant="cosmic" style={styles.modalContent}>
            <Text style={styles.title}>{title}</Text>
            
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              maximumDate={maxDate}
              style={styles.picker}
            />
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        </View>
      </Modal>
    );
  }

  // Android - DateTimePicker opens its own modal
  if (Platform.OS === 'android' && visible) {
    return (
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={handleDateChange}
        maximumDate={maxDate}
      />
    );
  }

  // Web fallback - simple date input
  if (Platform.OS === 'web') {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <GlassCard variant="cosmic" style={styles.modalContent}>
            <Text style={styles.title}>{title}</Text>
            
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              max={maxDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              style={{
                padding: 12,
                fontSize: 16,
                borderRadius: 8,
                border: '1px solid rgba(139, 92, 246, 0.3)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                color: '#fff',
                width: '100%',
                marginVertical: 20,
              }}
            />
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        </View>
      </Modal>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: CosmicDesignSystem.spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    padding: CosmicDesignSystem.spacing.xl,
  },
  title: {
    fontSize: CosmicDesignSystem.typography.fontSize.h4,
    color: CosmicDesignSystem.colors.text.primary,
    fontWeight: CosmicDesignSystem.typography.fontWeight.semibold,
    marginBottom: CosmicDesignSystem.spacing.lg,
    textAlign: 'center',
  },
  picker: {
    height: 200,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: CosmicDesignSystem.spacing.lg,
    gap: CosmicDesignSystem.spacing.md,
  },
  cancelButton: {
    flex: 1,
    padding: CosmicDesignSystem.spacing.md,
    borderRadius: CosmicDesignSystem.borderRadius.medium,
    borderWidth: 1,
    borderColor: CosmicDesignSystem.colors.cosmic.nebulaDark,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: CosmicDesignSystem.colors.text.secondary,
    fontSize: CosmicDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: CosmicDesignSystem.typography.fontWeight.medium,
  },
  confirmButton: {
    flex: 1,
    padding: CosmicDesignSystem.spacing.md,
    borderRadius: CosmicDesignSystem.borderRadius.medium,
    backgroundColor: CosmicDesignSystem.colors.cosmic.purple,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: CosmicDesignSystem.colors.white,
    fontSize: CosmicDesignSystem.typography.fontSize.bodyMedium,
    fontWeight: CosmicDesignSystem.typography.fontWeight.semibold,
  },
});

export default ImprovedDatePickerModal;