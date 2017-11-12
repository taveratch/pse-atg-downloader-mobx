import { action, observable } from 'mobx'

import FetchedStore from 'src/stores/fetched-store'

class Sites extends FetchedStore {
    @observable sites = null;

    @action.bound
    setSites(sites){
      this.sites = sites
    }
}

const sites = new Sites()

export default sites