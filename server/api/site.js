import AuthController from 'server/controllers/auth-controller'
import SiteController from 'server/controllers/site-controller'
import SiteuserController from 'server/controllers/siteuser-controller'
import express from 'express'

let site = express()

site.get('/', async (req, res) => {
  let token = req.headers['authorization']
  if (token) {
    AuthController.verifyToken(token)
      .then(async decoded => {
        let { id: userId, is_admin } = decoded
        let sites
        if (is_admin) {
          sites = await SiteController.getAll()
        } else {
          sites = await SiteuserController.get(userId)
        }
        res.status(200).send({
          success: true,
          sites
        })
      })
      .catch(error => {
        res.status(401).json({
          success: false,
          message: 'Failed to authenticate token.',
          error
        })
      })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
})

site.post('/create', async (req, res) => {
  let token = req.headers['authorization']

  if (token) {
    try {
      let user = await AuthController.verifyToken(token)
      if (!user.is_admin) throw new Error('Permission denied')

      let { name, url, port } = req.body
      let site = await SiteController.create({ name, url, port })
      res.status(200).send({
        success: true,
        data: site
      })
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Failed to authenticate token.',
        error
      })
    }
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
})

site.post('/adduser', async (req, res) => {
  let token = req.headers['authorization']

  if (token) {
    try {
      let user = await AuthController.verifyToken(token)
      if (!user.is_admin) throw new Error('Permission denied')
      let { userId, siteId } = req.body
      let siteuser = await SiteuserController.create(userId, siteId)

      res.status(200).send({
        success: true,
        data: siteuser
      })
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Failed to authenticate token.',
        error
      })
    }
  }
})

export default site