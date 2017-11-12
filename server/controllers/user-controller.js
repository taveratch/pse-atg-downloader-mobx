import db from 'server/utils/database'

class UserController {
  getAll() {
    return new Promise((resolve, reject) => {
      db.users.findAll({
        attributes: ['id', 'email', 'is_admin']
      })
        .then(users => resolve(users))
        .catch(err => reject(err))
    })
  }
}

export default new UserController()