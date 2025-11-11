// Mock for lucide-react-native icons
const React = require('react');

const mockIcon = ({ size = 24, color = '#000000', ...props }) => {
  return React.createElement('div', {
    ...props,
    'data-testid': props['data-testid'] || 'lucide-icon'
  }, `${props.name || 'Icon'}-${size}-${color}`);
};

// Create a proxy that returns the mockIcon for any icon name
const LucideReactNative = new Proxy({}, {
  get: (target, prop) => {
    if (prop === '__esModule') return true;
    if (prop === 'default') return mockIcon;
    // Return mockIcon for any icon name (Calendar, User, etc.)
    return mockIcon;
  }
});

module.exports = LucideReactNative;