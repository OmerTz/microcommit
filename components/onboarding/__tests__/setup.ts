/**
 * Test setup for Onboarding Components
 * 
 * This file contains common test utilities and configurations
 * for the onboarding component test suite.
 */

import '@testing-library/jest-native/extend-expect';

// Global test configuration
global.console = {
  ...console,
  // Suppress console warnings during tests unless explicitly needed
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock common React Native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Common animation mocks
export const createMockAnimatedValue = (initialValue: number = 0) => ({
  setValue: jest.fn(),
  setOffset: jest.fn(),
  flattenOffset: jest.fn(),
  extractOffset: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  stopAnimation: jest.fn(),
  resetAnimation: jest.fn(),
  interpolate: jest.fn(() => initialValue),
  __getValue: () => initialValue,
});

// Common props for onboarding components
export const createDefaultOnboardingProps = () => ({
  fadeAnim: createMockAnimatedValue(1) as any,
  slideAnim: createMockAnimatedValue(0) as any,
  styles: {
    stepContainer: {},
    iconContainer: {},
    iconGradient: {},
    title: {},
    subtitle: {},
    inputGroup: {},
    label: {},
    inputCard: {},
    input: {},
    interestsGrid: {},
    interestCard: {},
    interestCardSelected: {},
    interestLabel: {},
    interestLabelSelected: {},
    notificationOptions: {},
    notificationCard: {},
    notificationCardSelected: {},
    notificationCardText: {},
    notificationTitle: {},
    notificationTitleSelected: {},
    notificationSubtitle: {},
    notificationSubtitleSelected: {},
    notificationDisclaimer: {},
    disclaimerText: {},
    navigation: {},
    navButton: {},
    navButtonCard: {},
    navButtonContent: {},
    navButtonText: {},
    navButtonPrimary: {},
    navButtonDisabled: {},
    navButtonGradient: {},
    navButtonTextPrimary: {},
    navButtonTextDisabled: {},
    progressContainer: {},
    progressBar: {},
    progressFill: {},
    progressGradient: {},
    progressText: {},
  },
});

// Test data generators
export const generateTestUserData = () => ({
  name: 'Test User',
  birthDate: '1990-05-15',
  birthTime: '14:30',
  birthLocation: 'New York, USA',
  interests: ['horoscope', 'compatibility'],
  notificationsEnabled: true,
});

export const generateInternationalUserData = () => ({
  names: [
    'José María',
    'François Dubois',
    'Müller Schmidt',
    'Søren Nielsen',
    '山田太郎',
    'محمد أحمد',
    'Владимир Петров',
    'Ελένη Παπαδάκη',
    'Björk Guðmundsdóttir'
  ],
  locations: [
    'São Paulo, Brasil',
    'München, Deutschland',
    'Москва, Россия',
    '東京, 日本',
    'القاهرة, مصر',
    'Zürich, Schweiz',
    'København, Danmark'
  ],
});

// Common test utilities
export const waitForAnimation = async (duration: number = 300) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

export const createMockCallbacks = () => ({
  onNameChange: jest.fn(),
  onBirthDateChange: jest.fn(),
  onBirthTimeChange: jest.fn(),
  onBirthLocationChange: jest.fn(),
  onToggleInterest: jest.fn(),
  onNotificationsChange: jest.fn(),
  onNext: jest.fn(),
  onBack: jest.fn(),
});

// Test validation helpers
export const validateTestId = (element: any, expectedTestId: string) => {
  expect(element).toHaveProperty('props.testID', expectedTestId);
};

export const validateAccessibility = (element: any) => {
  expect(element.props.accessible).not.toBe(false);
  // Add more accessibility validations as needed
};

// Custom matchers for onboarding-specific assertions
expect.extend({
  toBeOnboardingStep(received, expectedStep) {
    const pass = received && received.props && received.props.testID === `onboarding-step-${expectedStep}`;
    
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be onboarding step ${expectedStep}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be onboarding step ${expectedStep}`,
        pass: false,
      };
    }
  },
});

// Global test cleanup
afterEach(() => {
  jest.clearAllMocks();
});