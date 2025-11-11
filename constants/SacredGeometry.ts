/**
 * Sacred Geometry Constants - Descriptions and data for number visualizations
 * Extracted from NumberVisualization for Bible.md compliance (file size <400 lines)
 */

export const VISUALIZATION_DESCRIPTIONS = {
  1: 'The Unity Circle - Symbol of individuality and new beginnings',
  2: 'The Duality Symbol - Balance between opposing forces',
  3: 'The Trinity Triangle - Creative expression and communication',
  4: 'The Foundation Square - Stability and practical foundations',
  5: 'The Freedom Star - Adventure and dynamic change',
  6: 'The Harmony Hexagon - Nurturing and healing energy',
  7: 'The Spiritual Heptagon - Inner wisdom and mystical insight',
  8: 'The Infinite Loop - Material mastery and achievement',
  9: 'The Completion Circle - Universal love and humanitarian service',
  11: 'The Twin Pillars - Intuitive gateway between dimensions',
  22: 'The Master Builder - Manifestation of grand visions',
  33: 'The Christ Consciousness - Divine love and spiritual teaching',
} as const;

export const getVisualizationDescription = (number: number): string => {
  return VISUALIZATION_DESCRIPTIONS[number as keyof typeof VISUALIZATION_DESCRIPTIONS] || VISUALIZATION_DESCRIPTIONS[1];
};