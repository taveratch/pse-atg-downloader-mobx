import { action, computed, observable } from 'mobx'

import Api from 'src/common/Api'
import FetchedStore from 'src/stores/fetched-store'
import FileSaver from 'file-saver'
import I18n from 'src/common/I18n'
import _ from 'lodash'
import { dataFormatter } from 'src/utils/validators'
import { downloadTypes } from 'src/constants'
import fileFormatter from 'src/js/file-formatter/src/formatter'
import moment from 'moment'
import stores from 'src/stores'

moment.locale(I18n.getLocale())

class DownloadPage extends FetchedStore {
  @observable selectedSite = { name: I18n.t('app.please.choose.site') }
  @observable inventoryList = []
  @observable isFetchedError = false
  @observable downloadedInventories = []

  fetchInventoryList(site) {
    this.inventoryList = []
    this._setFetching(true)
    return Api.getInventoryList(site.url, site.port)
      .then(res => {
        this._setFetching(false)
        this._setSuccess(true)
        this.inventoryList = dataFormatter(res, site.url)
      })
      .catch(err => {
        this._setFetching(false)
        this._setSuccess(false)
        console.error(err)
      })
  }

  @action.bound
  setSelectedSite(site) {
    this.selectedSite = site
  }

  @computed
  get hasInventoryList() {
    return this.inventoryList.length > 0
  }

  downloadInventory(inventory, { useHeader = true, downloadType = downloadTypes.EVERY }) {
    stores.inventory.addDownloadQueue(inventory.name)
    return Api.downloadInventory(this.selectedSite, inventory)
      .then(res => {
        let formatted = fileFormatter(res, { useHeader, downloadType })
        stores.inventory.removeDownloadQueue(inventory.name)
        return formatted
      })
      .catch(() => {
        stores.inventory.setError(inventory.name)
      })
  }

  async downloadAllInventories(inventories, callback = () => {}, downloadType) {
    let result = ''
    const startDate = _.first(inventories).date
    const endDate = _.last(inventories).date 
    for (let i = 0; i < inventories.length; i++) {
      let item = inventories[i]
      try {
        let res = await this.downloadInventory(item, { useHeader: i === 0, downloadType })
        result += res
        callback(item, true)
      }catch(error) {
        callback(item, false)
      }
    }
    const blob = new Blob([result], {type: 'text/plain;charset=utf-8'})
    FileSaver.saveAs(blob, `inventories-${startDate.format('DDMMYYYY')}-${endDate.format('DDMMYYYY')}.csv`)
  }


}

export default DownloadPage