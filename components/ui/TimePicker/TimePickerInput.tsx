import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NumeraColors } from '@/constants/Colors';
import { ClockIcon } from '@/constants/Icons';
import GlassCard from '@/components/ui/GlassCard';
import { formatDisplayTime } from './utils';
import { timePickerStyles } from './styles';

interface TimePickerInputProps {
  value: string;
  placeholder: string;
  label?: string;
  testID?: string;
  onPress: () => void;
}

const TimePickerInput: React.FC<TimePickerInputProps> = ({
  value,
  placeholder,
  label,
  testID,
  onPress,
}) => {
  return (
    <View style={timePickerStyles.container}>
      {label && <Text style={timePickerStyles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={timePickerStyles.inputContainer}
        onPress={onPress}
        testID={testID}
      >
        <GlassCard variant="light" style={timePickerStyles.glassCard}>
          <View style={timePickerStyles.inputContent}>
            <Text style={[timePickerStyles.inputText, !value && timePickerStyles.placeholder]}>
              {value ? formatDisplayTime(value) : placeholder}
            </Text>
            <ClockIcon size={20} color={NumeraColors.neutral[500]} />
          </View>
        </GlassCard>
      </TouchableOpacity>
    </View>
  );
};

export default TimePickerInput;