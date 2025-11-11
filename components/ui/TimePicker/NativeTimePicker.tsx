import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { formatTimeFromDate, parseTimeToDate } from './utils';
import { timePickerStyles } from './styles';
import FallbackTimeInput from './FallbackTimeInput';

// Conditionally import DateTimePicker for native
let DateTimePicker: any = null;
if (Platform.OS !== 'web') {
  try {
    DateTimePicker = require('@react-native-community/datetimepicker').default;
  } catch (e) {
    console.log('@react-native-community/datetimepicker not available, using fallback');
  }
}

interface NativeTimePickerProps {
  value: string;
  onChange: (time: string) => void;
  label?: string;
  format24Hour?: boolean;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  inline?: boolean;
}

const NativeTimePicker: React.FC<NativeTimePickerProps> = ({
  value,
  onChange,
  label,
  format24Hour = false,
  modalOpen,
  setModalOpen,
  inline = false,
}) => {
  const [tempDate, setTempDate] = useState(() => parseTimeToDate(value));

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      const timeString = formatTimeFromDate(selectedDate, format24Hour);
      setTempDate(selectedDate);
      
      if (inline) {
        onChange(timeString);
      } else if (Platform.OS === 'android') {
        onChange(timeString);
        setModalOpen(false);
      }
    }
  };

  const handleConfirm = () => {
    const timeString = formatTimeFromDate(tempDate, format24Hour);
    onChange(timeString);
    setModalOpen(false);
  };

  const renderTimePicker = () => {
    if (DateTimePicker && Platform.OS !== 'web') {
      return (
        <DateTimePicker
          value={tempDate}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
          style={timePickerStyles.timePicker}
          is24Hour={format24Hour}
        />
      );
    } else {
      return (
        <FallbackTimeInput
          value={value}
          onChange={onChange}
          format24Hour={format24Hour}
        />
      );
    }
  };

  // Inline rendering
  if (inline) {
    return (
      <View style={timePickerStyles.container}>
        {label && <Text style={timePickerStyles.label}>{label}</Text>}
        
        <View style={timePickerStyles.inlinePickerContainer}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={timePickerStyles.inlinePickerGradient}
          />
          {renderTimePicker()}
        </View>
      </View>
    );
  }

  // Modal rendering
  return (
    <Modal
      visible={modalOpen}
      transparent
      animationType="slide"
      onRequestClose={() => setModalOpen(false)}
    >
      <View style={timePickerStyles.modalOverlay}>
        <View style={timePickerStyles.modalContent}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={StyleSheet.absoluteFillObject}
          />
          
          <View style={timePickerStyles.modalHeader}>
            <Text style={timePickerStyles.modalTitle}>
              {label || 'Select Time'}
            </Text>
          </View>

          <View style={timePickerStyles.pickerContainer}>
            {renderTimePicker()}
          </View>

          <View style={timePickerStyles.modalButtons}>
            <TouchableOpacity
              style={[timePickerStyles.modalButton, timePickerStyles.cancelButton]}
              onPress={() => setModalOpen(false)}
            >
              <Text style={timePickerStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[timePickerStyles.modalButton, timePickerStyles.confirmButton]}
              onPress={handleConfirm}
            >
              <LinearGradient
                colors={[NumeraDesignSystem.colors.primary, NumeraDesignSystem.colors.primaryLight]}
                style={timePickerStyles.confirmButtonGradient}
              >
                <Text style={timePickerStyles.confirmButtonText}>Confirm</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NativeTimePicker;