import { action, observable } from 'mobx'

import Api from 'src/common/Api'
import FetchedStore from 'src/stores/fetched-store'
import tokenManager from 'src/utils/token-manager'

class Verify extends FetchedStore {
  @observable user = null;

  @action.bound
  setUser(user) {
    this.user = user
  }

  reset() {
    this.user = null
    tokenManager.set('')
  }

  handleError(err) {
    this._setFetching(false)
    this.reset()
    this._setSuccess(err.success)
    this._setMessage(err.error)
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

  __reset() {
    this.reset()
  }
}

export default Verify