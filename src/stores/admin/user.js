import { action, observable } from 'mobx'

import FetchedStore from 'src/stores/fetched-store'

class User extends FetchedStore {
  @observable user = null

  @action.bound
  setUser(user) {
    this.user = user
  }
}

const model = new User()

export default model