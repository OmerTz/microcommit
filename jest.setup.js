// Jest setup file for React Native testing infrastructure
// Simplified setup for MubleExpo infrastructure tests

// Basic React Native mocks
global.__DEV__ = true;

// Mock console methods for cleaner test output
global.console = {
  ...console,
  // Suppress expected warnings in tests
  warn: jest.fn(),
  error: jest.fn(),
};