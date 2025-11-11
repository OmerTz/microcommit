const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix for Expo SDK 53+ Metro bundler issue with package exports
// This disables the new package.json exports field handling that breaks expo-router
config.resolver.unstable_enablePackageExports = false;

module.exports = config;