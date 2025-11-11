module.exports = function(api) {
  api.cache(true);
  
  const plugins = [];
  
  // Transform dynamic imports to regular require in test environment
  if (process.env.NODE_ENV === 'test') {
    plugins.push(['babel-plugin-dynamic-import-node', { noInterop: true }]);
  }
  
  return {
    presets: ['babel-preset-expo'],
    plugins
  };
};