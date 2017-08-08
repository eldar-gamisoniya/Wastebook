const clientConfig = require('./webpack.client.prod');
const serverConfig = require('./webpack.server.prod');

module.exports = [clientConfig, serverConfig];
