import { action, computed, observable } from 'mobx'

import { downloadTypes } from 'src/constants'
import { downloadTypesObj } from 'src/modules/app/components/Controls/download-types'

class Inventory {

  @observable downloadingList = new Map()
  @observable downloadType = downloadTypesObj()[downloadTypes.EVERY]

  @action.bound
  addDownloadQueue(name) {
    this.downloadingList.set(name, {
      downloading: true,
      error: false
    })
  }

  @action.bound
  setDownloadingList(downloadingList) {
    let temp = {}
    downloadingList.map(item => {
      temp[item] = { downloading: true, error: false }
    })
    this.downloadingList.replace(temp)
  }

  @computed get getDownloadingList() {
    return this.downloadingList
  }
  
  @action.bound
  removeDownloadQueue(name) {
    this.downloadingList.delete(name)
  }

  @action.bound
  setError(name) {
    this.downloadingList.set(name, {
      downloading: false,
      error: true
    })
  }

  @action.bound
  setDownloadType(type) {
    this.downloadType = type
  }
}

const inventory = new Inventory()
export default inventory