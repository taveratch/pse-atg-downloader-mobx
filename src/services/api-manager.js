import { AuthController } from 'src/controllers'

const proxyPrefix = process.env['NODE_ENV'] === 'production' ? '/proxy?q=' : 'http://localhost:5000/proxy?q='
class ApiManager {
  fetch(url, options) {
    options.url = proxyPrefix + url
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
        .catch(error => reject(error))
    })
  }
}

const apiManager = new ApiManager()

export default apiManager