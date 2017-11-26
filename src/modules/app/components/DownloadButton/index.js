import DownloadImg from 'src/assets/images/download.svg'
import React from 'react'
import { downloadInventory } from 'src/js/service'
import stores from 'src/stores'

const style = {
  container: {
    border: '1px solid #47C1BF',
    borderRadius: 5,
    width: 60,
    height: 30,
    cursor: 'pointer'
  }
}
class DownloadButton extends React.Component {

  inventoryStore = stores.inventory

  download = (fileName, text) => {
    var element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', fileName)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  onClick = () => {
    let { url, name } = this.props
    stores.inventory.addDownloadQueue(name)
    downloadInventory(url, { useHeader: true, downloadType: this.inventoryStore.downloadType.type })
      .then(res => {
        this.download(name, res)
        stores.inventory.removeDownloadQueue(name)
      })
      .catch(() => stores.inventory.setError(name))
  }

  render() {
    return (
      <div style={style.container} className='d-flex justify-content-center align-items-center' onClick={this.onClick}>
        <img src={DownloadImg} alt="" />
      </div>
    )
  }
}

export default DownloadButton