/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
/* eslint-enable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const paths = require('./parts/paths');
const { assoc } = require('ramda');

const {
  createLoaderForStyling,
  GLOBAL_STYLES,
  LOCAL_STYLES,
} = require('./parts/styling');

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
  .readdirSync(path.join(paths.rootPath))
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((ext, mod) => assoc(mod, `commonjs ${mod}`, ext), {});

module.exports = {
  name: 'server',
  target: 'node',
  entry: paths.serverRenderPath,
  externals,
  output: {
    path: paths.serverOutputPath,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    alias: {
      core: paths.coreAliasPath,
      modules: paths.modulesAliasPath,
      shared: paths.sharedAliasPath,
      utilities: paths.utilitiesAliasPath,
      api: paths.apiAliasPath,
    },
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          // TODO: add cache directory for babel-loader with identifier
          options: {
            forceEnv: 'server',
          },
        },
      },
      createLoaderForStyling(GLOBAL_STYLES, false, false, false),
      createLoaderForStyling(LOCAL_STYLES, true, false, false),
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
