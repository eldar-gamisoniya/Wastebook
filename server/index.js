const express = require('express');
const path = require('path');
const webpack = require('webpack'); // aliased to webpack-universal
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackConfig = require('../webpack.config');

const publicPath = webpackConfig[0].output.publicPath;
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

let isBuilt = false;

const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true;
    console.log('BUILD COMPLETE -- Listening @ http://localhost:3000');
  });

if (!isProduction) {
  const compiler = webpack(webpackConfig);
  const clientCompiler = compiler.compilers[0];
  const options = { publicPath, stats: { colors: true } };

  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));
  compiler.plugin('done', done);
} else {
  const clientStats = require('../buildClient/stats.json');
  const serverRender = require('../buildServer/main.js').default;
  app.use(publicPath, express.static(path.join(__dirname, '../buildClient')));
  app.use(serverRender({ clientStats }));
  done();
}
