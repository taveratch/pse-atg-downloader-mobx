import formatter from './formatter'

formatter('src/files/inventory.csv', { isPath: true, useHeader: true })
  .then(res => {
    console.log(res)
  })