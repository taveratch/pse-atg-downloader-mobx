import { action, observable } from 'mobx'

class FetchedStore {
    @observable fetching = false
    @observable success = true

    @action.bound
    setFetching(fetching) {
      this.fetching = fetching
    }

    @action.bound
    setSuccess(success) {
      this.success = success
    }
}

export default FetchedStore