import { authenticate as authService, signin as signinService } from 'src/services/auth'

import cookie from 'js-cookie'

class Auth {

  getToken() {
    return cookie.get('token')
  }

  removeToken() {
    cookie.remove('token')
    return true
  }

  saveToken(token) {
    cookie.set('token', token)
  }

  signin(email, password) {
    return new Promise((resolve, reject) => {
      signinService(email, password)
        .then(res => {
          if (res.success) {
            this.saveToken(res.data.token)
            resolve(res)
          }
        })
        .catch(error => {
          this.removeToken()
          reject(error)
        })
    })
  }

  authenticate() {
    return authService()
  }
}

export const AuthController = new Auth()