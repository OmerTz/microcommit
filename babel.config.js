module.exports = function(api) {
  api.cache(true);

  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          '@': '.',
        },
      },
    ],
  ];

  // Transform dynamic imports to regular require in test environment
  if (process.env.NODE_ENV === 'test') {
    plugins.push(['babel-plugin-dynamic-import-node', { noInterop: true }]);
  }

  // MUST be last in plugins array - required for react-native-reanimated to work on web
  plugins.push('react-native-reanimated/plugin');

  return {
    presets: ['babel-preset-expo'],
    plugins
  };
};