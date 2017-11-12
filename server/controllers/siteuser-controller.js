import _ from 'lodash'
import db from 'server/utils/database'

class SiteuserController {
  async get(userId) {
    return new Promise((resolve, reject) => {
      db.siteusers.findAll(
        {
          where: { user_id: userId },
          include: [db.sites]
        })
        .then(sites => {
          sites = _.map(sites, x => x.site)
          resolve(sites)
        })
        .catch(err => reject(err))
    })
  }

  async create(userId, siteId) {
    return new Promise((resolve, reject) => {
      db.siteusers.create({ user_id: userId, site_id: siteId })
        .then(siteuser => {
          resolve(siteuser)
        })
        .catch(err => reject(err))
    })
  }
}

export default new SiteuserController()