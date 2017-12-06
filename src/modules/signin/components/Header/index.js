import I18n from 'src/common/I18n'
import React from 'react'

export default props => {
  return (
    <div className='pt-3 pb-3 align-items-center'>
      <p className='text-center'><b>{I18n.t('signin.header')}</b></p>
      <div className='text-center w-100'>{props.title.toUpperCase()}</div>
    </div>
  )
}