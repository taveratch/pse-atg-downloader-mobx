import ApiManager from 'src/services/api-manager'
import { config } from 'src/constants'

export const authenticate = token => {
  let options = {
    method: 'POST',
    body: {
      token: token || ''
    },
    json: true
  }
  return ApiManager.fetch(`${config.API_ENDPOINT}/auth/authenticate`, options)
}


export const signin = (email, password) => {
  let options = {
    method: 'POST',
    body: {
      email,
      password
    },
    json: true
  }
  return ApiManager.fetch(`${config.API_ENDPOINT}/auth/signin`, options)
}