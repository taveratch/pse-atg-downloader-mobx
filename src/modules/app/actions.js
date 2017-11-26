import Api from 'src/common/Api'
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
  },
  getSites: () => {
    return Api.getSites()
      .then(res => {
        stores.sites.setSites(res.data)
      })
      .catch(res => {
        stores.sites._setSuccess(res.success)
        stores.sites._setMessage(res.error)
      })
  }
}