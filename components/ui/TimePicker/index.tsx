import React, { useState } from 'react';
import { Platform } from 'react-native';
import TimePickerInput from './TimePickerInput';
import NativeTimePicker from './NativeTimePicker';
import FallbackTimeInput from './FallbackTimeInput';

export interface ImprovedTimePickerProps {
  value: string; // HH:MM format (24-hour) or HH:MM AM/PM format (12-hour)
  onChange: (time: string) => void;
  placeholder?: string;
  testID?: string;
  label?: string;
  inline?: boolean; // When true, renders inline without modal
  format24Hour?: boolean; // When true, uses 24-hour format, otherwise 12-hour with AM/PM
}

const ImprovedTimePicker: React.FC<ImprovedTimePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select time',
  testID,
  label,
  inline = false,
  format24Hour = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Web fallback - always use fallback input for web
  if (Platform.OS === 'web') {
    if (inline) {
      return (
        <FallbackTimeInput
          value={value}
          onChange={onChange}
          format24Hour={format24Hour}
        />
      );
    }

    return (
      <>
        <TimePickerInput
          value={value}
          placeholder={placeholder}
          label={label}
          testID={testID}
          onPress={() => setModalOpen(true)}
        />
        {modalOpen && (
          <FallbackTimeInput
            value={value}
            onChange={onChange}
            format24Hour={format24Hour}
          />
        )}
      </>
    );
  }

  // Native implementation
  if (inline) {
    return (
      <NativeTimePicker
        value={value}
        onChange={onChange}
        label={label}
        format24Hour={format24Hour}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        inline={true}
      />
    );
  }

  return (
    <>
      <TimePickerInput
        value={value}
        placeholder={placeholder}
        label={label}
        testID={testID}
        onPress={() => setModalOpen(true)}
      />

      <NativeTimePicker
        value={value}
        onChange={onChange}
        label={label}
        format24Hour={format24Hour}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  );
};

export default ImprovedTimePicker;