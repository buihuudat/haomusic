const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: {
    app: './app',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    publicPath: '/',
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    stats: 'errors-only',
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: 10000,
    proxy: {
      '/api': 'http://localhost:3000',
      // '/api': {
      //   'target': 'https://haomusicdb.herokuapp.com/',
      //   'secure': false,
      //   'changeOrigin': true,
      // },
    },
  },
  resolve: {
    extensions: ['.js', '.sass', '.json'],
    modules: ['node_modules', 'app', 'seed'],
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: ['./app/styles'],
          },
        }],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
    new ProgressBarPlugin(),
  ],
};
