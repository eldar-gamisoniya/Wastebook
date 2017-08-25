/* eslint-disable import/no-extraneous-dependencies */
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
/* eslint-enable import/no-extraneous-dependencies */
const path = require('path');
const crypto = require('crypto');

const paths = require('./parts/paths');
const {
  createLoaderForStyling,
  GLOBAL_STYLES,
  LOCAL_STYLES,
} = require('./parts/styling');

// create hash for anonymous commons chunks
const createHash = str =>
  crypto.createHash('sha256').update(str).digest('base64').slice(0, 8);

const isVendor = module =>
  module.context &&
  module.context.indexOf('node_modules') !== -1 &&
  (module.resource.endsWith('.js') || module.resource.endsWith('.json'));

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
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
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
        parser: {
          requireEnsure: false,
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          failOnWarning: true,
          failOnError: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            forceEnv: 'clientProduction',
          },
        },
      },
      createLoaderForStyling(GLOBAL_STYLES, false, true, true),
      createLoaderForStyling(LOCAL_STYLES, true, true, true),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // seems to be smaller in gzipped version than HashedModuleIdsPlugin
    new webpack.NamedModulesPlugin(),
    // for caching, provide consistent chunk names
    // (for example for anonymous async commons chunks)
    new webpack.NamedChunksPlugin(
      chunk =>
        chunk.name || createHash(chunk.mapModules(m => m.identifier).join('_')),
    ),
    new StatsPlugin('stats.json'),
    new StyleLintPlugin(),
    new ExtractCssChunks({
      filename: 'css/[name].[contenthash].css',
    }),
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
    // also add specific modules to another chunk for long term hashing
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
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        ie8: false,
        ecma: 6,
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // to leverage long term caching
    // see https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
    new NameAllModulesPlugin(),
  ],
};
