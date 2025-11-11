// Global mocks for Jest testing environment

// Mock global fetch for React Native
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
);

// Mock global URL for React Native Web compatibility
global.URL = global.URL || require('url').URL;

// Mock requestAnimationFrame for React Native
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};

// Mock console methods to reduce noise in tests
const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args) => {
  // Suppress specific React warnings in tests
  if (
    args[0] &&
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
     args[0].includes('Warning: React.createFactory is deprecated') ||
     args[0].includes('Geocoding error') ||
     args[0].includes('Error loading usage stats') ||
     args[0].includes('React.jsx: type is invalid') ||
     args[0].includes('Error loading user profile') ||
     args[0].includes('Error calculating insights'))
  ) {
    return;
  }
  originalError.apply(console, args);
};

console.warn = (...args) => {
  // Suppress specific React warnings in tests
  if (
    args[0] &&
    typeof args[0] === 'string' &&
    args[0].includes('Warning:')
  ) {
    return;
  }
  originalWarn.apply(console, args);
};

// Mock TextEncoder/TextDecoder for Node.js environment
if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Mock IntersectionObserver for web compatibility
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock React Native PixelRatio globally
global.PixelRatio = {
  get: jest.fn(() => 3),
  getFontScale: jest.fn(() => 1),
  getPixelSizeForLayoutSize: jest.fn((size) => size * 3),
  roundToNearestPixel: jest.fn((size) => Math.round(size * 3) / 3),
};

// Mock React Native Dimensions globally
global.Dimensions = {
  window: {
    width: 375,
    height: 812,
    scale: 3,
    fontScale: 1
  },
  screen: {
    width: 375,
    height: 812,
    scale: 3,
    fontScale: 1
  },
  get: jest.fn((key) => global.Dimensions[key] || global.Dimensions.window),
  set: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// Mock React Native Platform globally
global.Platform = {
  OS: 'ios',
  Version: '16.0',
  constants: {
    forceTouchAvailable: false,
    osVersion: '16.0',
    systemName: 'iOS',
    interfaceIdiom: 'phone',
    isTesting: true,
  },
  select: jest.fn((obj) => obj.ios || obj.default),
};

// Mock React Native Animated API globally
const createAnimatedValue = (initialValue = 0) => ({
  setValue: jest.fn(),
  setOffset: jest.fn(),
  flattenOffset: jest.fn(),
  extractOffset: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  interpolate: jest.fn(() => createAnimatedValue()),
  __getValue: jest.fn(() => initialValue),
});

global.Animated = {
  Value: jest.fn((value) => createAnimatedValue(value)),
  ValueXY: jest.fn(() => ({
    x: createAnimatedValue(),
    y: createAnimatedValue(),
    setValue: jest.fn(),
    setOffset: jest.fn(),
    flattenOffset: jest.fn(),
    extractOffset: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getLayout: jest.fn(() => ({})),
    getTranslateTransform: jest.fn(() => []),
  })),
  timing: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
    stop: jest.fn(),
    reset: jest.fn(),
  })),
  spring: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
    stop: jest.fn(),
    reset: jest.fn(),
  })),
  decay: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
    stop: jest.fn(),
    reset: jest.fn(),
  })),
  delay: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
  })),
  sequence: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
  })),
  parallel: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
  })),
  stagger: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
  })),
  loop: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
    stop: jest.fn(),
  })),
  createAnimatedComponent: jest.fn((component) => component),
  View: 'AnimatedView',
  Text: 'AnimatedText',
  ScrollView: 'AnimatedScrollView',
  Image: 'AnimatedImage',
  FlatList: 'AnimatedFlatList',
  TouchableOpacity: 'AnimatedTouchableOpacity',
  Easing: {
    step0: jest.fn(),
    step1: jest.fn(),
    linear: jest.fn(),
    ease: jest.fn(),
    quad: jest.fn(),
    cubic: jest.fn(),
    poly: jest.fn(),
    circle: jest.fn(),
    sin: jest.fn(),
    exp: jest.fn(),
    elastic: jest.fn(),
    back: jest.fn(),
    bounce: jest.fn(),
    bezier: jest.fn(),
    in: jest.fn((easing) => easing),
    out: jest.fn((easing) => easing),
    inOut: jest.fn((easing) => easing),
  },
};

// Mock AuthContext to prevent auth-related errors in tests
jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    signUp: jest.fn().mockResolvedValue({ user: { id: 'test-user-id' } }),
    user: null,
    session: null,
    loading: false,
    error: null,
    updateUserProfile: jest.fn().mockResolvedValue({}),
  }))
}));