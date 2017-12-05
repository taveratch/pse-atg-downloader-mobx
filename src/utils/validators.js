import I18n from 'src/common/I18n'
import _ from 'lodash'
import moment from 'moment'

moment.locale(I18n.getLocale())

export const urlValidator = (url) => {
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

export const dataFormatter = (raw, domain) => {
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