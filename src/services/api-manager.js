import { AuthController } from 'src/controllers'
import config from 'config/index.js'
import locale from 'src/common/locale'
import qs from 'query-string'

class ApiManager {
  fetch(options) {
    let url = ''
    if (options.external)
      url = options.url
    else {
      url = config.api + '/_api' + options.url
      options.json = true
    }
    options.url = config.proxy + '/proxy?q=' + url + `?locale=${locale.get()}`
    if (options.q)
      options.url += '&' + qs.stringify(options.q)
    if (!options.headers) options.headers = {}
    if (!options.headers['Authorization'])
      options.headers['Authorization'] = AuthController.getToken()
    options.headers['Content-Type'] = 'application/json'
    if (options.body)
      options.body = JSON.stringify(options.body)
    return new Promise((resolve, reject) => {
      fetch(options.url, options)
        .then(res => {
          if (!res.ok) throw res
          if (options.json)
            return resolve(res.json())
          return resolve(res.text())
        })
        .catch(error => {
          try {
            error.json().then(err => reject(err))
          } catch (err) {
            error.text().then(err => reject(err))
          }
        })
    })
  }
}

const apiManager = new ApiManager()

export default apiManager