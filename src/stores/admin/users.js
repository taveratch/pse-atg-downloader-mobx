import { action, observable } from 'mobx'

import FetchedStore from 'src/stores/fetched-store'

class Users extends FetchedStore {
    @observable users = [];

    @action.bound
    setUsers(users){
      this.users = users
    }
}

const users = new Users()

export default users