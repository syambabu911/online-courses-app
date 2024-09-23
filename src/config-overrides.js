
const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer/'),
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );
  return config;
};
const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
  };

  return config;
};

