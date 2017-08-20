const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const { assoc } = require('ramda');
const paths = require('./parts/paths');

const {
  createLoaderForStyling,
  GLOBAL_STYLES,
  LOCAL_STYLES,
} = require('./parts/styling');

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
    },
  },
  devtool: 'source-map',
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
      createLoaderForStyling(GLOBAL_STYLES, false, false, true),
      createLoaderForStyling(LOCAL_STYLES, true, false, true),
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
