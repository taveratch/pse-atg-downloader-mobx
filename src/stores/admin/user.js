import { action, observable } from 'mobx'

import FetchedStore from 'src/stores/fetched-store'
import _ from 'lodash'

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

  @action.bound
  deleteSite(site) {
    _.remove(this.sites, x => x.id === site.id)
  }
}

const model = new User()

export default model