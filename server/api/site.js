import SiteController from 'server/controllers/site-controller'
import SiteuserController from 'server/controllers/siteuser-controller'
import VerifyToken from 'server/utils/verify-token'
import express from 'express'

let site = express()

site.use(VerifyToken)

site.get('/', async (req, res) => {
  const { decoded } = req
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

site.post('/create', async (req, res) => {
  const { decoded: user } = req
  if (!user.is_admin) throw new Error('Permission denied')

  let { name, url, port } = req.body
  let site = await SiteController.create({ name, url, port })
  
  res.status(200).send({
    success: true,
    data: site
  })
})

site.post('/adduser', async (req, res) => {
  const { decoded: user } = req
  if (!user.is_admin) throw new Error('Permission denied')
  
  let { userId, siteId } = req.body
  let siteuser = await SiteuserController.create(userId, siteId)

  res.status(200).send({
    success: true,
    data: siteuser
  })
})

export default site
