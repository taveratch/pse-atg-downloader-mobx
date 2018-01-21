import { action, computed, observable } from 'mobx'

import Api from 'src/common/Api'
import FetchedStore from 'src/stores/fetched-store'
import I18n from '../common/I18n'
import { PRIVILEGE } from 'src/constants'
import _ from 'lodash'
import tokenManager from 'src/utils/token-manager'

const signupState = {
  email: '',
  name: '',
  password: '',
  tel: '',
  serial_number: '',
  confirm_password: ''
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
    return this.user.privilege === PRIVILEGE.ADMIN
  }

  @computed get isStaff() {
    if (!this.user) return false
    return this.user.privilege >= PRIVILEGE.STAFF
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

  validatePassword() {
    if(this.signupState.password === this.signupState.confirm_password)
      return true
    this.handleError({
      error: I18n.t('signup.password.mismatch'),
      success: false
    })
    return false
  }

  signup() {
    if(!this.validatePassword())
      return false
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
    this.verifyPassed = false
  }
}

export default Auth