const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Fix for Expo SDK 53+ Metro bundler issue with package exports
// This disables the new package.json exports field handling that breaks expo-router
config.resolver.unstable_enablePackageExports = false;

// Block native-only Stripe package on web platform
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName === '@stripe/stripe-react-native') {
    // Return empty module for web
    return {
      type: 'empty',
    };
  }
  // Use default resolution
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;