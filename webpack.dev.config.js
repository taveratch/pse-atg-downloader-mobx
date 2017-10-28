const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    preLoaders: [
      // Javascript
      {
        test: /\.js|jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/,
        options: {
          fix: true
        }
      }
    ],
    loaders: [
      {
        test: /\.js|jsx?$/,
        loader: 'babel',
        query: {
          plugins: ['transform-decorators-legacy']
        },
        exclude: path.join(__dirname, 'node_modules')
      },
      {
        test: /\.scss?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'src', 'styles')
      },
      {
        test: /\.png$/,
        loader: 'file'
      },
      {
        test: /\.css$/,
        loader: 'style!css!'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  resolve: {
    root: path.resolve('.'),
    extensions: ['', '.js', '.jsx']
  },
  node: {
    net: 'empty',
    tls: 'empty',
    fs: 'empty'
  }
}
