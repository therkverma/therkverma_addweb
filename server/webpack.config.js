const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');

module.exports = function (env) {
  console.log("env = ", env);
  return {
    target: 'node',
    externals: [nodeExternals()],
    entry: {
      'index': './server.js',
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].bundle.js',
      libraryTarget: 'commonjs2'
    },
    plugins: [
      new webpack.EnvironmentPlugin(['NODE_ENV'])
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
      ],
    }
  }
}