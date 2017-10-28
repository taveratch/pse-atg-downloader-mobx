const path = require('path')
const express = require('express')

const BUNDLE_DIR = path.join(__dirname, '../bundle')
module.exports = {
  app: function () {
    const app = express()
    let indexPath = path.join(__dirname, '/../index.html')
    let publicPath = express.static(path.join(__dirname, '../'))
    if (process.env.NODE_ENV === 'production') {
      indexPath = path.join(__dirname, '/../public/index.html')
      publicPath = express.static(path.join(__dirname, '../public'))
    }
    // app.use('/bundle', express.static(BUNDLE_DIR))
    app.use('/public', publicPath)
    app.use('/stylesheet', express.static(path.join(__dirname, '../stylesheet')))
    app.use('*', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
