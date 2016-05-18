var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var config = {
  context: path.join(__dirname, '..', '/src'),
  entry: {
    corona: './index.ts',
  },
  output: {
    path: path.join(__dirname, '..', '/dist'),
    filename: '[name].min.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')), // judge if dev environment.
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')) // judge if secret environment.
    }),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 20000 }),
    new webpack.optimize.OccurenceOrderPlugin(false),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', ".webpack.js", ".web.js", ".ts", ".tsx"],
  }
};


module.exports = config;
