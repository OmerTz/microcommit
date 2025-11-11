import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { formatDateToString, isDateValid } from './utils';
import { datePickerStyles } from './styles';
import FallbackDateInput from './FallbackDateInput';

// Conditionally import ReactDatePicker for web
let ReactDatePicker: any = null;
if (Platform.OS === 'web') {
  try {
    // TEMPORARY FIX: Force fallback to debug the issue
    // ReactDatePicker = require('react-datepicker').default;
    // require('react-datepicker/dist/react-datepicker.css');
    // require('../cosmic-datepicker.css');
    console.log('DEBUGGING: Forcing fallback date picker');
    ReactDatePicker = null; // Force fallback
  } catch (e) {
    console.log('react-datepicker not available for web');
  }
}

interface WebDatePickerProps {
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

const WebDatePicker: React.FC<WebDatePickerProps> = ({
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
  const getSelectedDate = () => {
    if (!value) return null;
    try {
      return new Date(value);
    } catch (e) {
      return null;
    }
  };

  const handleWebDateChange = (date: Date | null) => {
    if (date && isDateValid(date, maxDate)) {
      onChange(formatDateToString(date));
    }
    if (!inline) {
      setModalOpen(false);
    }
  };

  const renderDatePicker = () => {
    if (ReactDatePicker) {
      return (
        <ReactDatePicker
          selected={getSelectedDate()}
          onChange={handleWebDateChange}
          maxDate={maxDate}
          minDate={minDate}
          inline
          calendarClassName="cosmic-datepicker"
          dayClassName={(date: Date) => "cosmic-day"}
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
        />
      );
    } else {
      return (
        <FallbackDateInput
          value={value}
          onChange={onChange}
          testID={testID}
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
  return (
    <Modal
      visible={modalOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setModalOpen(false)}
    >
      <View style={datePickerStyles.webModalOverlay}>
        <View style={datePickerStyles.webModalContent}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={StyleSheet.absoluteFillObject}
          />
          
          <View style={datePickerStyles.webModalHeader}>
            <Text style={datePickerStyles.modalTitle}>
              {label || 'Select Date'}
            </Text>
            <TouchableOpacity
              onPress={() => setModalOpen(false)}
              style={datePickerStyles.webModalCloseButton}
            >
              <Text style={datePickerStyles.webModalCloseText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={datePickerStyles.webPickerContainer}>
            {renderDatePicker()}
          </View>

          <View style={datePickerStyles.webModalButtons}>
            <TouchableOpacity
              style={[datePickerStyles.modalButton, datePickerStyles.cancelButton]}
              onPress={() => setModalOpen(false)}
            >
              <Text style={datePickerStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[datePickerStyles.modalButton, datePickerStyles.skipButton]}
              onPress={() => {
                // Set a default date to allow progression
                const defaultDate = new Date('1990-01-01');
                handleWebDateChange(defaultDate);
              }}
            >
              <Text style={datePickerStyles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WebDatePicker;