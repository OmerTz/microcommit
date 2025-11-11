/**
 * Mock Advanced Patterns for testing
 * Simple React Native View components to replace SVG in tests
 */

import React from 'react';
import { View, Text } from 'react-native';

interface PatternProps {
  size: number;
  numberColor: string;
  numberGradient: [string, string];
}

export const SpiritualHeptagon: React.FC<PatternProps> = ({ size }) => (
  <View testID="spiritual-heptagon" style={{ width: size, height: size }}>
    <Text>Spiritual Heptagon</Text>
  </View>
);

export const InfiniteLoop: React.FC<PatternProps> = ({ size }) => (
  <View testID="infinite-loop" style={{ width: size, height: size }}>
    <Text>Infinite Loop</Text>
  </View>
);

export const CompletionCircle: React.FC<PatternProps> = ({ size }) => (
  <View testID="completion-circle" style={{ width: size, height: size }}>
    <Text>Completion Circle</Text>
  </View>
);

export const TwinPillars: React.FC<PatternProps> = ({ size }) => (
  <View testID="twin-pillars" style={{ width: size, height: size }}>
    <Text>Twin Pillars</Text>
  </View>
);

export const MasterBuilder: React.FC<PatternProps> = ({ size }) => (
  <View testID="master-builder" style={{ width: size, height: size }}>
    <Text>Master Builder</Text>
  </View>
);

export const ChristConsciousness: React.FC<PatternProps> = ({ size }) => (
  <View testID="christ-consciousness" style={{ width: size, height: size }}>
    <Text>Christ Consciousness</Text>
  </View>
);