import { action, computed, observable } from 'mobx'

import FetchedStore from 'src/stores/fetched-store'

class Auth extends FetchedStore {
    @observable user = null;

    @action.bound
    setUser(user){
      this.user = user
    }

    @computed get isSignedIn() {
      return this.user !== null
    }

    @computed get isAdmin() {
      if(!this.user) return false
      return this.user.is_admin
    }

    reset() {
      this.user = null
    }

}

const auth = new Auth()

export default auth