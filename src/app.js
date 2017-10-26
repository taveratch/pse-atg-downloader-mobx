const Server = require('./server.js')
const port = (process.env.PORT || 8080)
const app = Server.app()
const production = process.env.NODE_ENV === 'production'
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

app.listen(port)

if(production) {
  console.log('Production files are served')
}

console.log(`Listening at http://localhost:${port}`)
