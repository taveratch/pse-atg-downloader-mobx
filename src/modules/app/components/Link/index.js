import React from 'react'
import { downloadInventory } from 'src/js/service'

class Link extends React.Component {

  download(fileName, text) {
    var element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', fileName)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  onClick() {
    let { url, name } = this.props
    downloadInventory(url, { useHeader: true })
      .then(res => {
        this.download(name, res)
      })
  }

  render() {
    return (
      <div onClick={this.onClick.bind(this)}>Download</div>
    )
  }
}

export default Link