const webpack = require('webpack');
const path = require('path');
const DeadCodePlugin = require('webpack-deadcode-plugin');

module.exports = {
  entry: './app.js',
  target: 'web',
  devtool: 'source-map',
  
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },

  mode: 'development',

  optimization: {
    usedExports: true
  },

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            'stage-2'
          ],
          plugins: [
            [
              'transform-react-jsx',
              {
                pragma: 'createElement'
              }
            ],
            'transform-class-properties'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new DeadCodePlugin({
      patterns: ['*.js'],
      exclude: ['**/node_modules/**']
    }),
  ],
}