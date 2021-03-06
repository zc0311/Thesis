const webpack = require('webpack');
const path = require('path');

const DEV = path.resolve(__dirname, 'client');
const OUTPUT = path.resolve(__dirname, 'output');

const config = {
  entry: `${DEV}/index.jsx`,
  output: {
    path: OUTPUT,
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      include: DEV,
      query: {
        presets: ['react', 'es2015'],
        plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties'],
      },
    }],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};

module.exports = config;
