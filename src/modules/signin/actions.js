import { AuthController } from 'src/controllers'
import stores from 'src/stores'

export default {
  signin: (email, password) => {
    stores.auth._setFetching(true)
    AuthController.signin(email, password)
      .then((res) => {
        stores.auth.setUser(res.data)
        stores.auth._setSuccess(true)
      })
      .catch(err => {
        stores.auth._setSuccess(false)
        stores.auth._setMessage(err.error)
      })
  },
}