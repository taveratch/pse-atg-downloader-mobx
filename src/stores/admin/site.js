import { action, observable } from 'mobx'

import FetchedStore from 'src/stores/fetched-store'

class Site extends FetchedStore {
  @observable site = null
  @observable users = []

  @action.bound
  setSite(site) {
    this.site = site
  }

  @action.bound
  setUsers(users) {
    this.users = users
  }
}

const site = new Site()

export default site