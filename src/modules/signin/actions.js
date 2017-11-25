import { AuthController } from 'src/controllers'
import stores from 'src/stores'

export default {
  signin: (email, password) => {
    AuthController.signin(email, password)
      .then((res) => {
        stores.auth.setUser(res.user)
      })
      .catch(err => {
        stores.auth._setSuccess(false)
        stores.auth._setMessage(err.error)
      })
  },
}