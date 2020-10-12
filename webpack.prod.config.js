const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    publicPath: '/',
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
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: 'public/[name].[ext]',
          esModule: false
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'public/manifest.json', to: 'public/manifest.json'},
        {from: 'public/translations', to: 'public/translations'},
      ]
    })
  ],
  devServer: {
    historyApiFallback: true,
  }
};
