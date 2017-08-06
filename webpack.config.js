const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  module.exports = require('./scripts/webpack.config.prod'); // eslint-disable-line global-require
  return;
}

module.exports = require('./scripts/webpack.config.dev');
