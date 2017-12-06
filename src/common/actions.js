import history from 'src/common/history'
import qs from 'query-string'

export default {
  changePageLocale: locale => {
    let { pathname, search } = history.location
    search = qs.parse(search)
    search['locale'] = locale
    history.push(pathname + '?' + qs.stringify(search))
    window.location.reload()
  }
}