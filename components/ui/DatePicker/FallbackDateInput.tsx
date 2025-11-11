import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { formatDateInput } from './utils';
import { datePickerStyles } from './styles';

interface FallbackDateInputProps {
  value: string;
  onChange: (date: string) => void;
  testID?: string;
  isNative?: boolean;
}

const FallbackDateInput: React.FC<FallbackDateInputProps> = ({
  value,
  onChange,
  testID,
  isNative = false,
}) => {
  return (
    <View style={datePickerStyles.fallbackContainer}>
      <Text style={datePickerStyles.fallbackText}>
        Date picker not available. Please enter date manually:
      </Text>
      <TextInput
        testID={testID}
        style={datePickerStyles.dateInput}
        value={value}
        onChangeText={(text) => {
          const formatted = formatDateInput(text);
          onChange(formatted);
        }}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        maxLength={10}
        keyboardType={isNative ? "numeric" : "default"}
      />
      {isNative && (
        <Text style={datePickerStyles.formatHint}>Format: YYYY-MM-DD</Text>
      )}
    </View>
  );
};

export default FallbackDateInput;