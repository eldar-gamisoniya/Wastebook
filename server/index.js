/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack'); // aliased to webpack-universal
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
/* eslint-enable import/no-extraneous-dependencies */
const express = require('express');
const webpackConfig = require('../webpack.config');

const clientPublicPath = webpackConfig[0].output.publicPath;
const clientOutputPath = webpackConfig[0].output.path;
const serverOutputPath = webpackConfig[1].output.path;
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
  const options = { clientPublicPath, stats: { colors: true } };

  app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204);
  });
  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));
  compiler.plugin('done', done);
} else {
  /* eslint-disable import/no-dynamic-require */
  const clientStats = require(`${clientOutputPath}/stats.json`);
  const serverRender = require(`${serverOutputPath}/main.js`).default;
  /* eslint-enable import/no-dynamic-require */
  app.use(clientPublicPath, express.static(clientOutputPath));
  app.use(serverRender({ clientStats }));
  done();
}
