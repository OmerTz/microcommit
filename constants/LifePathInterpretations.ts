/**
 * Life Path Number Interpretations
 * Refactored for Bible.md compliance (under 400 lines per file)
 * 
 * This file combines interpretations from specialized modules while maintaining
 * the same API for backward compatibility.
 */

import { NumberSection } from '@/components/numbers/NumberDetailScreen';
import { LIFE_PATH_SECTIONS_1_TO_3 } from './LifePathInterpretations1to3';
import { LIFE_PATH_SECTIONS_4_TO_6 } from './LifePathInterpretations4to6';
import { LIFE_PATH_SECTIONS_7_TO_9 } from './LifePathInterpretations7to9';

// Combine all life path sections into a single record
export const LIFE_PATH_SECTIONS: Record<number, NumberSection[]> = {
  ...LIFE_PATH_SECTIONS_1_TO_3,
  ...LIFE_PATH_SECTIONS_4_TO_6,
  ...LIFE_PATH_SECTIONS_7_TO_9,
};

export const LIFE_PATH_TITLES: Record<number, string> = {
  1: 'The Natural Leader',
  2: 'The Peaceful Mediator',
  3: 'The Creative Communicator',
  4: 'The Practical Builder',
  5: 'The Freedom Seeker',
  6: 'The Nurturing Healer',
  7: 'The Spiritual Seeker',
  8: 'The Material Master',
  9: 'The Universal Humanitarian',
  11: 'The Intuitive Messenger',
  22: 'The Master Builder',
  33: 'The Master Teacher',
};

export const getLifePathSections = (number: number): NumberSection[] => {
  return LIFE_PATH_SECTIONS[number] || LIFE_PATH_SECTIONS[1];
};

export const getLifePathTitle = (number: number): string => {
  return LIFE_PATH_TITLES[number] || 'The Natural Leader';
};