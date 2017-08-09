const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const paths = require('./parts/paths');
const { assoc } = require('ramda');

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
    extensions: ['.js', '.jsx', '.json'],
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          // TODO: add cache directory for babel-loader with identifier
        },
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
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
