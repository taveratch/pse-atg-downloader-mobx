import { AuthController } from 'src/controllers'
import config from 'config/index.js'

const host = config.proxy

class ApiManager {
  fetch(options) {
    let proxyPrefix
    if(options.external)
      proxyPrefix = '/proxy?q='
    else{
      proxyPrefix = '/_api'
      options.json = true
    }
    options.url = host + proxyPrefix + options.url
    if (!options.headers) options.headers = {}
    if (!options.headers['Authorization'])
      options.headers['Authorization'] = AuthController.getToken()
    options.headers['Content-Type'] = 'application/json'
    if(options.body)
      options.body = JSON.stringify(options.body)
    return new Promise((resolve, reject) => {
      fetch(options.url, options)
        .then(res => {
          if(!res.ok) throw res
          if (options.json)
            return resolve(res.json())
          return resolve(res.text())
        })
        .catch(error => {
          error.json().then(err => reject(err))
        })
    })
  }
}

const apiManager = new ApiManager()

export default apiManager