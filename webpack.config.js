const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  client: path.join(__dirname, 'client'),
  build: path.join(__dirname, 'build'),
};

module.exports = {
  entry: {
    app: path.join(PATHS.client, 'index.js'),
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATHS.client, 'index.html'),
    }),
  ],
};