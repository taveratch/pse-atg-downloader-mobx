import { AuthController } from 'src/controllers'
import history from 'src/common/history'
import stores from 'src/stores'

export default {
  signout: () => {
    AuthController.removeToken()
    stores.auth.reset()
    history.push('/signin')
  },
  goToAdmin: () => {
    history.push('/admin')
  }
}