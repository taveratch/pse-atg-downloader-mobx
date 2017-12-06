import history from 'src/common/history'
import stores from 'src/stores'

export default {
  signout: () => {
    stores.auth.reset()
    history.push('/signin')
  },
  goToAdmin: () => {
    history.push('/admin')
  }
}