const isProduction = process.env.NODE_ENV === 'production';

let clientConfig;
let serverConfig;
if (isProduction) {
  clientConfig = require('./scripts/webpack.client.prod');
  serverConfig = require('./scripts/webpack.server.prod');
} else {
  clientConfig = require('./scripts/webpack.client.dev');
  serverConfig = require('./scripts/webpack.server.dev');
}
module.exports = [clientConfig, serverConfig];
