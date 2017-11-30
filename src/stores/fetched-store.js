import { action, observable } from 'mobx'

class FetchedStore {
  @observable fetching = false
  @observable success = true
  @observable message = null

  @action.bound
  _setFetching(fetching) {
    this.fetching = fetching
  }

  @action.bound
  _setSuccess(success) {
    this.success = success
    this.fetching = false
  }

  @action.bound
  _setMessage(message) {
    this.message = message
    this.fetching = false
  }

  @action.bound
  _reset() {
    this.fetching = false
    this.success = true
    this.message = null
  }
}

export default FetchedStore