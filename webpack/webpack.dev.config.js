var webpack = require('webpack');
var path = require('path');

var config = {
  context: path.join(__dirname, '..', '/src'),
  entry: {
    corona: './index.ts',
  },
  output: {
    path: path.join(__dirname, '..', '/build'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')), // judge if dev environment.
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')) // judge if secret environment.
    })
  ],
  module: {
    perLoaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader'
      }
    ],
    noParse: []
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', ".webpack.js", ".web.js", ".ts", ".tsx"],
    alias: {}
  },
  devtool: 'eval-source-map',
  jshint: {
    "esnext": true
  }
};

module.exports = config;
