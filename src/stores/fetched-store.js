import { action, observable } from 'mobx'

class FetchedStore {
  @observable fetching = false
  @observable success = true
  @observable message = ''

  @action.bound
  _setFetching(fetching) {
    this.fetching = fetching
  }

  @action.bound
  _setSuccess(success) {
    this.success = success
  }

  @action.bound
  _setMessage(message) {
    this.message = message
  }
}

export default FetchedStore