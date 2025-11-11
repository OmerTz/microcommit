/**
 * Help Tooltip Translations
 * Translation helper for HelpTooltip component
 */

export const helpTooltipTranslations: Record<string, string> = {
  'help.tooltip.dismiss': 'Got it',
  'help.tooltip.next': 'Next',
};

export const t = (key: string): string => {
  return helpTooltipTranslations[key] || key;
};