import React from 'react'

const style = {
  boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.00), 0 5px 10px 0 rgba(0, 0, 0, 0.05)'
}

export default props => {
  return (
    <div style={style} className='pt-3 pb-3 align-items-center text-info'>
      <p className='text-center'><b>ATG Inventory Downloader</b></p>
      <div className='text-center w-100'>{props.title.toUpperCase()}</div>
    </div>
  )
}