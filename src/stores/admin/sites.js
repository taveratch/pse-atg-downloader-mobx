import { action, observable } from 'mobx'

import FetchedStore from 'src/stores/fetched-store'

class Sites extends FetchedStore {
  @observable sites = []
  @observable error = null
  @observable site = {}

  @action.bound
  setSites(sites) {
    this.sites = sites
  }

  @action.bound
  setError(errorMessage) {
    this.error = errorMessage
  }

  @action.bound
  setSite(site) {
    this.site = site
  }
}

const sites = new Sites()

export default sites