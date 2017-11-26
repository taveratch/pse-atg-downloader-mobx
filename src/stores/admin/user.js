import { action, observable } from 'mobx'

import FetchedStore from 'src/stores/fetched-store'

class User extends FetchedStore {
  @observable user = null
  @observable sites = []

  @action.bound
  setUser(user) {
    this.user = user
  }

  @action.bound
  setSites(sites) {
    this.sites = sites
  }

  @action.bound
  addSite(site) {
    this.sites.push(site)
  }
}

const model = new User()

export default model