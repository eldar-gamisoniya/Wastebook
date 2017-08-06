const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const paths = require('./parts/paths');

module.exports = {
  name: 'client',
  target: 'web',
  entry: [
    'babel-polyfill',
    path.join(paths.clientAppPath, 'index.js'),
  ],
  output: {
    path: paths.clientOutputPath,
    publicPath: paths.publicPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        parser: {
          requireEnsure: false,
        },
      },
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
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                sourceMap: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
            { loader: 'postcss-loader', options: { sourceMap: true } },
          ],
        }),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([paths.clientOutputPath]),
    // seems to be smaller in gzipped version than HashedModuleIdsPlugin
    new webpack.NamedModulesPlugin(),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'],
      filename: '[name].js',
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      parallel: {
        cache: true,
        workers: 2,
      },
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        screw_ie8: true,
        comments: false,
      },
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
