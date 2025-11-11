/**
 * Mock Sacred Geometry Patterns for testing
 * Simple React Native View components to replace SVG in tests
 */

import React from 'react';
import { View, Text } from 'react-native';

interface PatternProps {
  size: number;
  numberColor: string;
  numberGradient: [string, string];
}

export const UnityCircle: React.FC<PatternProps> = ({ size }) => (
  <View testID="unity-circle" style={{ width: size, height: size }}>
    <Text>Unity Circle</Text>
  </View>
);

export const DualitySymbol: React.FC<PatternProps> = ({ size }) => (
  <View testID="duality-symbol" style={{ width: size, height: size }}>
    <Text>Duality Symbol</Text>
  </View>
);

export const TrinityTriangle: React.FC<PatternProps> = ({ size }) => (
  <View testID="trinity-triangle" style={{ width: size, height: size }}>
    <Text>Trinity Triangle</Text>
  </View>
);

export const FoundationSquare: React.FC<PatternProps> = ({ size }) => (
  <View testID="foundation-square" style={{ width: size, height: size }}>
    <Text>Foundation Square</Text>
  </View>
);

export const FreedomStar: React.FC<PatternProps> = ({ size }) => (
  <View testID="freedom-star" style={{ width: size, height: size }}>
    <Text>Freedom Star</Text>
  </View>
);

export const HarmonyHexagon: React.FC<PatternProps> = ({ size }) => (
  <View testID="harmony-hexagon" style={{ width: size, height: size }}>
    <Text>Harmony Hexagon</Text>
  </View>
);