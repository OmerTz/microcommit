/**
 * Basic infrastructure tests for Tzrif86 Template
 */

describe('Tzrif86 Template Infrastructure', () => {
  test('package.json should have correct name', () => {
    const pkg = require('../package.json');
    expect(pkg.name).toBe('tzrif86-expo-template');
  });

  test('app.json should have correct configuration', () => {
    const appConfig = require('../app.json');
    expect(appConfig.expo.name).toBe('tzrif86-expo-template');
    expect(appConfig.expo.slug).toBe('tzrif86-expo-template');
  });

  test('should load without crashing', () => {
    expect(true).toBe(true);
  });
});

describe('Testing Infrastructure', () => {
  test('Jest should be working', () => {
    expect(1 + 1).toBe(2);
  });
  
  test('mocks should be available', () => {
    const mockAiService = require('../__mocks__/aiService');
    expect(mockAiService.AIService).toBeDefined();
  });
});