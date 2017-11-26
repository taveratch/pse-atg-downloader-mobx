import _ from 'lodash'
import moment from 'moment'

let vm = (state, action) => {
  switch (action.type) {
  case 'init':
    return {
      error: false,
      inventories: [],
      downloadedInventories: [],
      downloading: false,
      downloadAllButtonDisabled: true,
      isLocal: false,
      selectedItem: 'โปรดเลือกหน่วยงาน ...'
    }
  case 'load_inventory':
    state.error = false
    state.downloadAllButtonDisabled = false
    state.downloading = false
    state.inventories = dataFormatter(action.data, action.url)
    return state
  case 'downloaded_inventory':
    state.downloadedInventories.push(action.data)
    return state
  case 'start_downloading_all_inventory':
    state.downloading = true
    return state
  case 'use_local':
    state.isLocal = action.data
    return state
  case 'error':
    state.downloadAllButtonDisabled = true
    state.error = true
    state.inventories = []
    return state
  }
}


const dataFormatter = (raw, domain) => {
  let data = []
  let lines = raw.split('\n')
  lines.splice(0, 2)
  _.map(lines, (line) => {
    // line = mmc:0:\Inventory\I10_20170916.csv
    let url = line.substring(6)
    let fileName = url.substring(11)
    // url = \Inventory\I10_20170916.csv
    // fileName = I10_20170916.csv
    let date = getDateFromFileName(fileName)
    data.push({
      url: getDomain(domain) + url,
      name: fileName,
      dateStr: date.dateStr,
      date: date.date
    })
  })
  data.pop()
  return data
}

const getDateFromFileName = fileName => {
  let underScorePosition = fileName.indexOf('_')
  let dotPosition = fileName.indexOf('.')
  let dateStr = fileName.substring(underScorePosition + 1, dotPosition)
  let date = moment(dateStr)
  return { dateStr: date.format('D/MM/YYYY'), date }
}

const getDomain = (url) => {
  let first = url.indexOf('/')
  let third = url.indexOf('/', first + 2)
  return url.substring(0, third)
}

const insertHeader = (url) => {
  return 'http://user:pass@' + url.substring(7)
}

vm.insertHeader = insertHeader
export default vm
