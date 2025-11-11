// Combined styles module for onboarding components
import { createBaseStyles } from './baseStyles';
import { createWelcomeStyles } from './welcomeStyles';
import { createProgressStyles } from './progressStyles';
import { createStepStyles } from './stepStyles';
import { createInputStyles } from './inputStyles';
import { createInterestsStyles } from './interestsStyles';
import { createNotificationStyles } from './notificationStyles';
import { createNavigationStyles } from './navigationStyles';
import { createCalculationStyles } from './calculationStyles';

export const createOnboardingStyles = () => {
  const baseStyles = createBaseStyles();
  const welcomeStyles = createWelcomeStyles();
  const progressStyles = createProgressStyles();
  const stepStyles = createStepStyles();
  const inputStyles = createInputStyles();
  const interestsStyles = createInterestsStyles();
  const notificationStyles = createNotificationStyles();
  const navigationStyles = createNavigationStyles();
  const calculationStyles = createCalculationStyles();

  return {
    ...baseStyles,
    ...welcomeStyles,
    ...progressStyles,
    ...stepStyles,
    ...inputStyles,
    ...interestsStyles,
    ...notificationStyles,
    ...navigationStyles,
    ...calculationStyles,
  };
};

// Create styles with fallback for tests
export const onboardingStyles = createOnboardingStyles();

// Re-export helper function
export { getDimensionsHelper } from './baseStyles';