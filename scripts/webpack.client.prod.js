const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const webpack = require('webpack');

const paths = require('./parts/paths');

const isVendor = module =>
  module.context && module.context.indexOf('node_modules') !== -1;

module.exports = {
  bail: true,
  name: 'client',
  target: 'web',
  entry: {
    app: [path.join(paths.clientAppPath, 'index.js')],
  },
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
          failOnWarning: true,
          failOnError: true,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            forceEnv: 'clientProduction',
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
                minimize: true,
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // seems to be smaller in gzipped version than HashedModuleIdsPlugin
    new webpack.NamedModulesPlugin(),
    new StatsPlugin('stats.json'),
    new ExtractCssChunks(),
    // push app's vendor packages to chunk for long term hashing
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: isVendor,
    }),
    // as there is no much modules yet, add to async
    // bundle every vendor module which is repeating more than once
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      children: true,
      async: 'app-async-vendor',
      minChunks: (module, count) => isVendor(module) && count >= 2,
    }),
    // // also add specific modules to another chunk for long term hashing
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app'],
      children: true,
      async: 'app-async',
      minChunks: (module, count) => !isVendor(module) && count >= 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new BabiliPlugin(),
  ],
};
