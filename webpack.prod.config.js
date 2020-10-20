const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    publicPath: '/react-library/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: ['babel-loader']
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.(png)$/,
        loader: 'file-loader',
        options: {
          name: 'public/[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'prod-index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'public', to: 'public'},
      ]
    })
  ],
  devServer: {
    historyApiFallback: true,
  }
};
