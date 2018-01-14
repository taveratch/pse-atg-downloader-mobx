import history from 'src/common/history'
import qs from 'query-string'
import stores from 'src/stores'

export default {
  changePageLocale: locale => {
    let { pathname, search } = history.location
    search = qs.parse(search)
    search['locale'] = locale
    history.push(pathname + '?' + qs.stringify(search))
    window.location.reload()
  }
}

export const StoreActions = {
  reset: (storeName) => {
    stores[storeName].__reset()
  }
}