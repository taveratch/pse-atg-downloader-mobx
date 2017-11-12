import { action, observable } from 'mobx'

import FetchedStore from 'src/stores/fetched-store'

class CreateUser extends FetchedStore {
    @observable res = {}

    @action.bound
    setResponse(res){
      this.res = res
    }
}

const createUser = new CreateUser()

export default createUser