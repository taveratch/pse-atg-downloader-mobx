import 'babel-core/register'
import 'babel-polyfill'

/*eslint no-undef: "off"*/
import ApiManager from 'src/services/api-manager'
import FileSaver from 'file-saver'
import _ from 'lodash'
import fileFormatter from 'src/js/file-formatter/src/formatter'

let services = {
  getInventoryList: (url) => {
    return new Promise((resolve, reject) => {
      let options = {
        headers: {
          'Authorization': 'Basic dXNlcjpwYXNz'
        }
      }
      ApiManager.fetch(urlValidator(url), options)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  downloadAllInventories: async (inventories, callback = () => {}, downloadType) => {
    let result = ''
    const startDate = _.first(inventories).date
    const endDate = _.last(inventories).date 
    for (let i = 0; i < inventories.length; i++) {
      let item = inventories[i]
      try {
        let res = await downloadInventory(item.url, { useHeader: i === 0, downloadType })
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

export const downloadInventory = (url, { useHeader, downloadType }) => {
  return new Promise((resolve, reject) => {
    let options = {
      headers: {
        'Authorization': 'Basic dXNlcjpwYXNz'
      }
    }
    ApiManager.fetch(url, options)
      .then((res) => {
        let formatted = fileFormatter(res, { useHeader, downloadType })
        resolve(formatted)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const urlValidator = (url) => {
  let validatedUrl = ''
  if (url.endsWith('/')) {
    url = url.substring(0, url.length - 1)
  }
  if (url.indexOf('http://') === 0) {
    validatedUrl = `http://${url.substring(7)}/inventory/filesrecord.txt`
  } else {
    validatedUrl = `http://${url.substring(0)}/inventory/filesrecord.txt`
  }
  return validatedUrl
}

services.urlValidator = urlValidator

export default services
