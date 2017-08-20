const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

exports.GLOBAL_STYLES = /\.global\.css$/;
exports.LOCAL_STYLES = /^((?!\.global).)*\.css$/;

exports.createLoaderForStyling = (test, modules, isClient, isProduction) => {
  const cssLoader = {
    loader: isClient ? 'css-loader' : 'css-loader/locals',
    options: {
      importLoaders: 1,
      modules,
      localIdentName: '[name]__[local]--[hash:base64:5]',
      minimize: isClient && isProduction,
      sourceMap: isClient && isProduction,
    },
  };
  const postCssLoader = {
    loader: 'postcss-loader',
    options: { sourceMap: isClient && isProduction },
  };
  const loaders = [cssLoader, postCssLoader];

  return {
    test,
    use: isClient
      ? ExtractCssChunks.extract({
          use: loaders,
        })
      : loaders,
  };
};
