require('babel-core/register')
require('babel-polyfill')
require('babel-core').transform('code', {
  plugins: ['transform-object-rest-spread']
})
require('./app.js')