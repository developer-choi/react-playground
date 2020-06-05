const HtmlWebpackPlugin = require("html-webpack-plugin");
const port = 8365;

module.exports = {
  mode: "development",
  output: {
    publicPath: "/",
    filename: "[name].[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/, //
        use: ["babel-loader"]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
    ]
  },
  resolve: {
    extensions: [".js", ".ts",".tsx"]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      favicon: "static/images/icons/favicon.ico"
    })
  ],

  devServer: {
    port: port,
    historyApiFallback: true,
  },
};
