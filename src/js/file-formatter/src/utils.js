import moment from 'moment'

export const getNumberOfTank = data => {
  let i = 0
  for (let x in data) {
    if (data[x].length === 1) {
      i = Number(x) + 1
      break
    }
  }
  return i
}

export const formatTime = timeStr => {
  let withoutblanket = timeStr.substring(1, timeStr.length - 1)
  let arr = withoutblanket.split(' ')
  arr[0] = moment(arr[0], 'YYYY/MM/DD').format('DD/MM/YYYY')
  return arr
}

export const format = (numberOfTank, data) => {
  let formatted = []
  let temp = []
  data.map((x, i) => {
    if ((i + 1) % numberOfTank === 0) {
      let time = formatTime(x[0])
      temp.map(each => {
        formatted.push([...time, ...each])
      })
      temp = []
    } else
      temp.push(x)
  })

  return formatted
}

export const compile = (data, options = {}) => {
  let string = ''
  if (options.headers)
    string += options.headers.toString() + '\n'
  data.map(row => {
    string += row.toString() + '\n'
  })
  return string
}