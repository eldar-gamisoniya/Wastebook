const express = require('express');
const webpack = require('webpack'); // aliased to webpack-universal
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const DashboardPlugin = require('webpack-dashboard/plugin');
const clientConfig = require('../scripts/webpack.client.dev');
const serverConfig = require('../scripts/webpack.server.dev');
const clientConfigProd = require('../scripts/webpack.client.prod');
const serverConfigProd = require('../scripts/webpack.server.prod');

const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
const isDevelopment = process.env.NODE_ENV === 'development';
const app = express();

let isBuilt = false;

const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true;
    console.log('BUILD COMPLETE -- Listening @ http://localhost:3000');
  });

if (isDevelopment) {
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers[0];
  clientCompiler.apply(new DashboardPlugin());
  const options = { publicPath, stats: { colors: true } };

  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));

  compiler.plugin('done', done);
} else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const serverRender = require('../buildServer/main.js').default;

    app.use(publicPath, express.static(outputPath));
    app.use(serverRender({ clientStats }));

    done();
  });
}
