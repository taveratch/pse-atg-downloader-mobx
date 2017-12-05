import DownloadImg from 'src/assets/images/download.svg'
import React from 'react'

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

  onClick = () => {
    this.props.download(this.props.inventory)
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