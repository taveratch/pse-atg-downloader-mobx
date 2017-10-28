import _ from 'lodash'
import db from 'server/utils/database'
import jwt from 'jsonwebtoken'

const SECRET = 'fiowjf8dvn213s!k!dc!nopq~iod3123=='

class AuthController {

  async signin(email, password) {
    return new Promise((resolve, reject) => {
      db.users.findOne({ where: { email, password } })
        .then(user => {
          if (user)
            resolve(this.filterUserInfo(user))
          else
            reject()
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  async isExist(email) {
    return new Promise((resolve, reject) => {
      db.users.findOne({ where: { email: email } })
        .then(user => {
          resolve(user)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  async signup(args) {
    let isExist = await this.isExist(args['email'])
    return new Promise((resolve, reject) => {
      if (isExist) { reject('Email is already taken') }
      else {
        db.users.create(args)
          .then(user => {
            resolve(user)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  }

  async dropAll() {
    return new Promise((resolve, reject) => {
      db.users.drop()
        .then(() => { resolve(200) })
        .catch((err) => { reject(err) })
    })
  }

  createToken(user) {
    return jwt.sign(user, SECRET, {
      expiresIn: 1440 * 60 //24 hours
    })
  }

  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err)
          reject(null)
        else
          resolve(decoded)
      })
    })
  }

  getTokenErrorMessage() {
    return {
      success: false,
      message: 'Invalid Token'
    }
  }

  filterUserInfo(user) {
    const publicInfo = ['id', 'email', 'is_admin']
    return _.pick(user, publicInfo)
  }
}

export default new AuthController()
