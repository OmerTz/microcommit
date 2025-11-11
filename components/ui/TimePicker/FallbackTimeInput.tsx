import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { formatTimeInput } from './utils';
import { timePickerStyles } from './styles';

interface FallbackTimeInputProps {
  value: string;
  onChange: (time: string) => void;
  format24Hour?: boolean;
}

const FallbackTimeInput: React.FC<FallbackTimeInputProps> = ({
  value,
  onChange,
  format24Hour = false,
}) => {
  return (
    <View style={timePickerStyles.fallbackContainer}>
      <Text style={timePickerStyles.fallbackText}>
        Enter time manually:
      </Text>
      <TextInput
        style={timePickerStyles.timeInput}
        value={value}
        onChangeText={(text) => {
          const formatted = formatTimeInput(text);
          onChange(formatted);
        }}
        placeholder={format24Hour ? "HH:MM" : "HH:MM AM/PM"}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        maxLength={format24Hour ? 5 : 8}
      />
      <Text style={timePickerStyles.formatHint}>
        Format: {format24Hour ? "24-hour (13:30)" : "12-hour (1:30 PM)"}
      </Text>
    </View>
  );
};

export default FallbackTimeInput;