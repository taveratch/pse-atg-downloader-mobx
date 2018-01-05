const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',

  entry: [
    './src/index'
  ],

  output: {
    path: path.join(__dirname, '/public/'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API': JSON.stringify(process.env.API || ''),
        'PROXY': JSON.stringify(process.env.PROXY || ''),
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js|jsx?$/,
        loader: 'babel',
        exclude: path.join(__dirname, 'node_modules'),
        query: {
          plugins: ['transform-decorators-legacy']
        },
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
        loader:'style!css!'
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
