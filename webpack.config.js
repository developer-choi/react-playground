const HtmlWebpackPlugin = require("html-webpack-plugin");
const port = 8365;

module.exports = {
  mode: "development",
  output: {
    publicPath: "/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      favicon: "static/images/favicon.ico"
    })
  ],
  devServer: {
    port: port,
    historyApiFallback: true,
  }
};
