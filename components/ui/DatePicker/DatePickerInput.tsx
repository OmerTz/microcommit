import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NumeraColors } from '@/constants/Colors';
import { CalendarIcon } from '@/constants/Icons';
import GlassCard from '@/components/ui/GlassCard';
import { formatDisplayDate } from './utils';
import { datePickerStyles } from './styles';

interface DatePickerInputProps {
  value: string;
  placeholder: string;
  label?: string;
  testID?: string;
  onPress: () => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  value,
  placeholder,
  label,
  testID,
  onPress,
}) => {
  return (
    <View style={datePickerStyles.container}>
      {label && <Text style={datePickerStyles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={datePickerStyles.inputContainer}
        onPress={onPress}
        testID={testID}
      >
        <GlassCard variant="light" style={datePickerStyles.glassCard}>
          <View style={datePickerStyles.inputContent}>
            <Text style={[datePickerStyles.inputText, !value && datePickerStyles.placeholder]}>
              {value ? formatDisplayDate(value) : placeholder}
            </Text>
            <CalendarIcon size={20} color={NumeraColors.neutral[500]} />
          </View>
        </GlassCard>
      </TouchableOpacity>
    </View>
  );
};

export default DatePickerInput;