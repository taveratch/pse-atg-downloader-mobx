import { AuthController } from 'src/controllers'
import history from 'src/common/history'
import qs from 'query-string'
import stores from 'src/stores'

export default {
  authenticate: () => {
    return AuthController.authenticate()
      .then(res => {
        stores.auth.setUser(res.data)
        return res
      })
  },
  changePageLocale: locale => {
    let { pathname, search } = history.location
    search = qs.parse(search)
    search['locale'] = locale
    history.push(pathname + '?' + qs.stringify(search))
    window.location.reload()
  }
}