import Api from 'src/common/Api'

export const authenticate = token => {
  return Api.authUser(token)
}


export const signin = (email, password) => {
  return Api.signin(email,password)
}