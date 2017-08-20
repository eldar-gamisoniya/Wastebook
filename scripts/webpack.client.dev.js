const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

const paths = require('./parts/paths');

module.exports = {
  name: 'client',
  target: 'web',
  entry: {
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
      'react-hot-loader/patch',
      path.join(paths.clientAppPath, 'index.js'),
    ],
  },
  output: {
    path: paths.clientOutputPath,
    publicPath: paths.publicPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  resolve: {
    alias: {
      core: paths.coreAliasPath,
      modules: paths.modulesAliasPath,
      shared: paths.sharedAliasPath,
      utilities: paths.utilitiesAliasPath,
    },
  },
  devtool: 'cheap-module-inline-source-map',
  module: {
    rules: [
      {
        parser: {
          requireEnsure: false,
        },
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            forceEnv: 'clientDevelopment',
          },
        },
      },
      {
        test: /\.global\.css$/,
        exclude: /(node_modules)/,
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: false,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /^((?!\.global).)*\.css$/,
        exclude: /(node_modules)/,
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
            'postcss-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new StyleLintPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
