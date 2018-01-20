import { action, observable } from 'mobx'

import FetchedStore from 'src/stores/fetched-store'

class Users extends FetchedStore {
    @observable users = []
    @observable error = null
    @observable privileges = []

    @action.bound
    setUsers(users){
      this.users = users
      this.error = null
    }

    @action.bound
    setError(errorMessage){
      this.error = errorMessage
    }

    @action.bound
    setPrivileges(privileges) {
      this.privileges = privileges
    }
}

const users = new Users()

export default users