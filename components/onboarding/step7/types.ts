import { Animated } from 'react-native';

export interface NumerologyResults {
  lifePath: any;
  expression: any;
  soulUrge: any;
  personality: any;
  birthday: any;
  personalCycles: any;
}

export interface OnboardingStep7Props {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  name: string;
  styles: any;
  results: NumerologyResults;
  onContinue: () => void;
}

export interface NumberDisplayProps {
  title: string;
  number: number | string;
  description: string;
  color: string;
}