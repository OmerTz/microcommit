import React, { useState } from 'react';
import { Platform } from 'react-native';
import DatePickerInput from './DatePickerInput';
import WebDatePicker from './WebDatePicker';
import NativeDatePicker from './NativeDatePicker';
import FallbackDateInput from './FallbackDateInput';

export interface ImprovedDatePickerProps {
  value: string; // YYYY-MM-DD format
  onChange: (date: string) => void;
  placeholder?: string;
  testID?: string;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  inline?: boolean; // When true, renders inline without modal
}

const ImprovedDatePicker: React.FC<ImprovedDatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  testID,
  label,
  minDate,
  maxDate = new Date(), // Default to today as max
  inline = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Inline rendering
  if (inline) {
    return Platform.OS === 'web' ? (
      <WebDatePicker
        value={value}
        onChange={onChange}
        label={label}
        minDate={minDate}
        maxDate={maxDate}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        testID={testID}
        inline={true}
      />
    ) : (
      <NativeDatePicker
        value={value}
        onChange={onChange}
        label={label}
        minDate={minDate}
        maxDate={maxDate}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        testID={testID}
        inline={true}
      />
    );
  }

  // Modal rendering - TEMP FIX: Show inline fallback for web debugging
  if (Platform.OS === 'web') {
    return (
      <>
        <DatePickerInput
          value={value}
          placeholder={placeholder}
          label={label}
          testID={testID}
          onPress={() => setModalOpen(true)}
        />
        
        {/* TEMP FIX: Always show fallback input inline for web debugging */}
        <FallbackDateInput
          value={value}
          onChange={onChange}
          testID={testID}
        />
        
        <WebDatePicker
          value={value}
          onChange={onChange}
          label={label}
          minDate={minDate}
          maxDate={maxDate}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          testID={testID}
        />
      </>
    );
  }

  // Native rendering
  return (
    <>
      <DatePickerInput
        value={value}
        placeholder={placeholder}
        label={label}
        testID={testID}
        onPress={() => setModalOpen(true)}
      />

      <NativeDatePicker
        value={value}
        onChange={onChange}
        label={label}
        minDate={minDate}
        maxDate={maxDate}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        testID={testID}
      />
    </>
  );
};

export default ImprovedDatePicker;