import cookie from 'js-cookie'
import { signin as signinService } from 'src/services/auth'

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
          if(res.success) {
            this.saveToken(res.token)
            resolve(res)
          }
        })
        .catch(error => {
          this.removeToken()
          reject(error)
        })
    })
  }
}

export const AuthController = new Auth()