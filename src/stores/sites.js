import { action, observable } from 'mobx'

import Api from 'src/common/Api'
import FetchedStore from 'src/stores/fetched-store'

class Sites extends FetchedStore {
  @observable sites = []

  @action.bound
  setSites(sites) {
    this.sites = sites
  }

  getSites() {
    return Api.getSites()
      .then(res => {
        this.setSites(res.data)
      })
      .catch(res => {
        this._setSuccess(res.success)
        this._setMessage(res.error)
      })
  }
}

const sites = new Sites()

export default sites