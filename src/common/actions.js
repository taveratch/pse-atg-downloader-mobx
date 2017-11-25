import { AuthController } from 'src/controllers'
import stores from 'src/stores'

export default {
  authenticate: () => {
    return AuthController.authenticate()
      .then(res => {
        stores.auth.setUser(res.data)
        return res
      })
  }
}