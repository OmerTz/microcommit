import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { formatDateToString, parseStringToDate, isDateValid } from './utils';
import { datePickerStyles } from './styles';
import FallbackDateInput from './FallbackDateInput';

// Conditionally import DateTimePicker for native
let DateTimePicker: any = null;
try {
  DateTimePicker = require('@react-native-community/datetimepicker').default;
} catch (e) {
  console.log('@react-native-community/datetimepicker not available, using fallback');
}

interface NativeDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  testID?: string;
  inline?: boolean;
}

const NativeDatePicker: React.FC<NativeDatePickerProps> = ({
  value,
  onChange,
  label,
  minDate,
  maxDate,
  modalOpen,
  setModalOpen,
  testID,
  inline = false,
}) => {
  const [tempDate, setTempDate] = useState(() => parseStringToDate(value));

  const handleDateChange = (date: Date) => {
    if (isDateValid(date, maxDate)) {
      onChange(formatDateToString(date));
      setModalOpen(false);
    }
  };

  const renderDatePicker = () => {
    if (DateTimePicker) {
      return (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="spinner"
          onChange={(event, date) => {
            if (date) {
              setTempDate(date);
              if (inline) {
                handleDateChange(date);
              }
            }
          }}
          maximumDate={maxDate}
          minimumDate={minDate}
          style={datePickerStyles.datePicker}
        />
      );
    } else {
      return (
        <FallbackDateInput
          value={value}
          onChange={onChange}
          testID={testID}
          isNative={true}
        />
      );
    }
  };

  // Inline rendering
  if (inline) {
    return (
      <View style={datePickerStyles.container}>
        {label && <Text style={datePickerStyles.label}>{label}</Text>}
        
        <View style={datePickerStyles.inlinePickerContainer}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={datePickerStyles.inlinePickerGradient}
          />
          {renderDatePicker()}
        </View>
      </View>
    );
  }

  // Modal rendering
  const isIOS18Plus = Platform.OS === 'ios' && parseInt(Platform.Version as string, 10) >= 18;
  
  return (
    <Modal
      visible={modalOpen}
      transparent
      animationType={isIOS18Plus ? "fade" : "slide"}
      presentationStyle="overFullScreen"
      onRequestClose={() => setModalOpen(false)}
      supportedOrientations={['portrait']}
    >
      <View style={datePickerStyles.modalOverlay}>
        <View style={datePickerStyles.modalContent}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={[StyleSheet.absoluteFillObject, { zIndex: -1 }]}
            pointerEvents="box-none"
          />
          
          <View style={datePickerStyles.modalHeader}>
            <Text style={datePickerStyles.modalTitle}>
              {label || 'Select Date'}
            </Text>
          </View>

          <View style={datePickerStyles.pickerContainer}>
            {renderDatePicker()}
          </View>

          <View style={datePickerStyles.modalButtons}>
            <TouchableOpacity
              style={[datePickerStyles.modalButton, datePickerStyles.cancelButton]}
              onPress={() => setModalOpen(false)}
              activeOpacity={0.8}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessible={true}
              accessibilityLabel="Cancel date selection"
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={datePickerStyles.cancelButtonText}>Cancel</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[datePickerStyles.modalButton, datePickerStyles.skipButton]}
              onPress={() => {
                // Set a default date to allow progression
                const defaultDate = new Date('1990-01-01');
                handleDateChange(defaultDate);
              }}
              activeOpacity={0.8}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessible={true}
              accessibilityLabel="Skip date selection"
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={datePickerStyles.skipButtonText}>Skip</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[datePickerStyles.modalButton, datePickerStyles.confirmButton]}
              onPress={() => {
                if (DateTimePicker) {
                  handleDateChange(tempDate);
                } else {
                  setModalOpen(false);
                }
              }}
              activeOpacity={0.8}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessible={true}
              accessibilityLabel="Confirm date selection"
            >
              <LinearGradient
                colors={[NumeraDesignSystem.colors.primary, NumeraDesignSystem.colors.primaryLight]}
                style={datePickerStyles.confirmButtonGradient}
                pointerEvents="none"
              >
                <Text style={datePickerStyles.confirmButtonText}>Confirm</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NativeDatePicker;