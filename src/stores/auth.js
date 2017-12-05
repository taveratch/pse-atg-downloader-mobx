import { action, computed, observable } from 'mobx'

import Api from 'src/common/Api'
import FetchedStore from 'src/stores/fetched-store'
import tokenManager from 'src/utils/token-manager'

class Auth extends FetchedStore {
  @observable user = null;
  @observable checkingToken = true
  @observable email = '';
  @observable password = '';

  @action.bound
  setUser(user) {
    this.user = user
  }

  @computed get isSignedIn() {
    return this.user !== null
  }

  @computed get isAdmin() {
    if (!this.user) return false
    return this.user.is_admin
  }

  reset() {
    this.user = null
    tokenManager.set('')
  }

  signin() {
    this._setFetching(true)
    return Api.signin(this.email, this.password)
      .then(res => {
        const { data: { token, ...user } } = res
        tokenManager.set(token)
        this.user = user
        this._setFetching(false)
      })
      .catch(err => {
        this.handleError(err)
      })
  }
  
  verifyToken() {
    this.checkingToken = true
    return Api.authUser()
      .then(res => {
        const { data: user } = res
        this.user = user
        this.checkingToken = false
      })
      .catch(() => {
        this.checkingToken = false
      })
  }

  handleError(err) {
    this.reset()
    this._setSuccess(err.success)
    this._setMessage(err.error)
  }

}

export default Auth