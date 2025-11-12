/**
 * Consolidated translations - Modular translation system
 * Refactored from single 913-line file into focused modules
 */

import { welcomeTranslations } from './welcome';
import { onboardingTranslations } from './onboarding';
import { dashboardTranslations } from './dashboard';
import { premiumTranslations } from './premium';
import { commonTranslations } from './common';
import { numbersTranslations } from './numbers';
import { settingsTranslations } from './settings';
import { profileTranslations } from './profile';
import { authTranslations } from './auth';

// Main translations object - maintains same structure as original
export const translations = {
  welcome: welcomeTranslations,
  ...onboardingTranslations,
  ...commonTranslations, // Spread common to expose errors, buttons, etc. at root level
  ...authTranslations, // Spread auth to expose auth keys at root level
  common: {
    skip: commonTranslations.buttons.skip,
    ...commonTranslations.buttons,
  },
  dashboard: dashboardTranslations,
  premium: premiumTranslations,
  numbers: numbersTranslations,
  settings: settingsTranslations,
  profile: profileTranslations,
};

// Export individual modules for tree-shaking
export {
  welcomeTranslations,
  onboardingTranslations,
  dashboardTranslations,
  premiumTranslations,
  commonTranslations,
  numbersTranslations,
  settingsTranslations,
  profileTranslations,
  authTranslations,
};

// Default export for backward compatibility
export default translations;