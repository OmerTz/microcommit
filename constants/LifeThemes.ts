/**
 * Life Themes Constants - Theme data and configurations
 * Extracted from LifeThemesSection for Bible.md compliance (file size <400 lines)
 */

import { NumeraColors } from '@/constants/Colors';

export interface LifeTheme {
  id: string;
  area: 'career' | 'relationships' | 'health' | 'spiritual' | 'financial' | 'personal';
  title: string;
  description: string;
  icon: string;
  influence: 'strong' | 'moderate' | 'subtle';
  keyPoints: string[];
  actionItems?: string[];
}

export const INFLUENCE_COLORS = {
  strong: NumeraColors.success.main,
  moderate: NumeraColors.warning.main,
  subtle: NumeraColors.info.main,
} as const;

export const INFLUENCE_LABELS = {
  strong: 'Strong Influence',
  moderate: 'Moderate Influence',
  subtle: 'Subtle Influence',
} as const;

export const AREA_GRADIENTS = {
  career: [NumeraColors.primary[300], NumeraColors.primary[400]],
  relationships: [NumeraColors.secondary[300], NumeraColors.secondary[400]],
  health: [NumeraColors.success.main, NumeraColors.success.dark],
  spiritual: [NumeraColors.numbers.seven.main, NumeraColors.numbers.seven.dark],
  financial: [NumeraColors.numbers.eight.main, NumeraColors.numbers.eight.dark],
  personal: [NumeraColors.numbers.one.main, NumeraColors.numbers.one.dark],
} as const;