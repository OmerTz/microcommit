module.exports = {
  preset: 'react-native',
  rootDir: '..',
  testMatch: ['<rootDir>/mobile-e2e/**/*.test.js'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  setupFilesAfterEnv: ['<rootDir>/mobile-e2e/e2e-setup.js'],
  verbose: true,
};
