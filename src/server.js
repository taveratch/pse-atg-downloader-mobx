const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    let indexPath = path.join(__dirname, '/../index.html')
    let publicPath = express.static(path.join(__dirname, '../'))
    if (process.env.NODE_ENV === 'production') {
      indexPath = path.join(__dirname, '/../public/index.html')
      publicPath = express.static(path.join(__dirname, '../public'))
    }
    app.use('/public', publicPath)
    app.use('/stylesheet', express.static(path.join(__dirname, '../stylesheet')))
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
