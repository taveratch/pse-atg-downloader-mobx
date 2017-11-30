import { AuthController } from 'src/controllers'
import config from 'config/index.js'
import { isProduction } from 'src/services/env'
import locale from 'src/common/locale'
import qs from 'query-string'

const host = isProduction() ? '' : config.proxy

class ApiManager {
  fetch(options) {
    let proxyPrefix
    if (options.external)
      proxyPrefix = '/proxy?q='
    else {
      proxyPrefix = '/_api'
      options.json = true
    }
    options.url = host + proxyPrefix + options.url + `?locale=${locale.get()}`
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