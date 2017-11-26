import Api from 'src/common/Api'

export const authenticate = () => {
  return Api.authUser()
}


export const signin = (email, password) => {
  return Api.signin(email, password)
}