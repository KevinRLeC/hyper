const path = require('path');

const webpack = require('webpack');
const Copy = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: isProd ? 'hidden-source-map' : 'cheap-module-source-map',
  entry: './lib/index.js',
  output: {
    path: path.join(__dirname, 'app', 'renderer'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      },
      // for xterm.js
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/.*\.js.map$/i),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new Copy([
      {
        from: './assets',
        to: './assets'
      }
    ])
  ],
  target: 'electron'
};
