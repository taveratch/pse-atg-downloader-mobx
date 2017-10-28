import { action, computed, observable } from 'mobx'

class Inventory {

  @observable downloadingList = new Map()

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
}

const inventory = new Inventory()
export default inventory