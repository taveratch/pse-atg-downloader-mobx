import { action, computed, observable } from 'mobx'

import Api from 'src/common/Api'
import FetchedStore from 'src/stores/fetched-store'
import _ from 'lodash'
import tokenManager from 'src/utils/token-manager'

const signupState = {
  email: '',
  name: '',
  password: '',
  tel: '',
  serial_number: ''
}

class Auth extends FetchedStore {
  @observable user = null;
  @observable checkingToken = true
  @observable email = '';
  @observable password = '';
  @observable signupState = _.cloneDeep(signupState)
  @observable signupPassed = false
  @observable verifyPassed = false

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

  signup() {
    this._setFetching(true)
    return Api.signup(this.signupState)
      .then(() => {
        this.signupPassed = true
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
    this._setFetching(false)
    this.reset()
    this._setSuccess(err.success)
    this._setMessage(err.error)
  }

  __reset() {
    this._reset()
    this.signupPassed = false
    this.signupState = _.cloneDeep(signupState)
    this.email = ''
    this.password = ''
    this.user = null
    this.verifyPassed = false
  }

  verify(userId, token) {
    this._setFetching(true)
    return Api.verify(userId, token)
      .then(res => {
        this._setFetching(false)
        this._setSuccess(res.success)
        this.user = res.data
      })
      .catch(err => {
        this.handleError(err)
      })
  }
}

export default Auth