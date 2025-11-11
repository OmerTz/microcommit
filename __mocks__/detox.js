/**
 * Mock implementation of Detox for E2E testing
 */

export const device = {
  launchApp: jest.fn(),
  terminateApp: jest.fn(),
  reloadReactNative: jest.fn(),
  pressBack: jest.fn(),
  sendToHome: jest.fn(),
  setOrientation: jest.fn(),
  shake: jest.fn(),
  takeScreenshot: jest.fn(),
};

export const element = jest.fn(() => ({
  tap: jest.fn(),
  typeText: jest.fn(),
  clearText: jest.fn(),
  swipe: jest.fn(),
  replaceText: jest.fn(),
  scroll: jest.fn(),
  scrollTo: jest.fn(),
  multiTap: jest.fn(),
  longPress: jest.fn(),
}));

export const by = {
  id: jest.fn(),
  text: jest.fn(),
  type: jest.fn(),
  label: jest.fn(),
  accessibilityLabel: jest.fn(),
  traits: jest.fn(),
};

export const expect = jest.fn(() => ({
  toBeVisible: jest.fn(),
  toExist: jest.fn(),
  toHaveText: jest.fn(),
  toHaveLabel: jest.fn(),
  toHaveId: jest.fn(),
  not: {
    toBeVisible: jest.fn(),
    toExist: jest.fn(),
    toHaveText: jest.fn(),
    toHaveLabel: jest.fn(),
    toHaveId: jest.fn(),
  },
}));

export const waitFor = jest.fn(() => ({
  toBeVisible: jest.fn(),
  toExist: jest.fn(),
  toBeNotVisible: jest.fn(),
  toNotExist: jest.fn(),
  withTimeout: jest.fn(),
}));

export const beforeAll = jest.fn();
export const beforeEach = jest.fn();
export const afterAll = jest.fn();
export const afterEach = jest.fn();

export default {
  device,
  element,
  by,
  expect,
  waitFor,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
};