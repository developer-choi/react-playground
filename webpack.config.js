//https://sujinlee.me/webpack-react-tutorial/
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const port = process.env.PORT || 8365;
require("babel-polyfill");

module.exports = {
  mode: "development",
  entry: {
    "babel-polyfill": "babel-polyfill",
    vendor: ["semantic-ui-react"],
    app: "./src/index.tsx"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "vendor",
          name: "vendor",
          enforce: true
        }
      }
    }
  },
  output: {
    publicPath: "/",
    filename: "[name].[hash].js",
  },
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, //
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx",".ts",".tsx"]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
      favicon: "static/images/icons/favicon.ico"
    })
  ],

  devServer: {
    host: "localhost",
    port: port,
    historyApiFallback: true,
    open: true,
    hot: true
  },
};
