import db from 'server/utils/database'

class SiteController {

  /**
     * 
     * @param {Object} args = {name, url, port} 
     */
  create(args) {
    return new Promise((resolve, reject) => {
      db.sites.create(args)
        .then(site => {
          resolve(site)
        })
        .catch(err => reject(err))
    })
  }

  getAll() {
    return new Promise((resolve, reject) => {
      db.sites.findAll()
        .then(sites => resolve(sites))
        .catch(err => reject(err))
    })
  }
}

export default new SiteController()