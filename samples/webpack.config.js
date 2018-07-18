const webpack = require("webpack");
const path = require("path");
const DeadCodePlugin = require("webpack-deadcode-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  styleLoader,
  MiniCssExtractPlugin,
  miniCssExtractLoader,
} = require("es6-css-loader");

module.exports = {
  entry: [
    `webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr`,
    "./index.js",
  ],
  target: "web",
  devtool: "source-map",

  output: {
    path: __dirname,
    filename: "bundle.js",
  },

  mode: "development",

  optimization: {
    usedExports: true,
  },

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        loader: "babel-loader",
        query: {
          babelrc: false,
          presets: ["stage-2"],
          plugins: [
            [
              "transform-react-jsx",
              {
                pragma: "createElement",
              },
            ],
            "transform-class-properties",
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          styleLoader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DeadCodePlugin({
      patterns: ["*.(js|css)"],
      exclude: ["**/node_modules/**"],
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
};
