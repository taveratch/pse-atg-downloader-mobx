const path = require('path')
const express = require('express')
const port = (process.env.PORT || 8080)
const app = express()
const production = process.env.NODE_ENV === 'production'

import proxy  from '../proxy-server/server'
if (!production) {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.dev.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }))
}

let indexPath = path.join(__dirname, '/../index.html')
let publicPath = express.static(path.join(__dirname, '../'))
if (process.env.NODE_ENV === 'production') {
  indexPath = path.join(__dirname, '/../public/index.html')
  publicPath = express.static(path.join(__dirname, '../public'))
}

app.use('/public', publicPath)
app.use('/stylesheet', express.static(path.join(__dirname, '../stylesheet')))

if(production) {
  app.use(proxy)
  console.log('Production files are served')
}

app.use('*', function (_, res) { res.sendFile(indexPath) })

app.listen(port)



console.log(`Listening at http://localhost:${port}`)
