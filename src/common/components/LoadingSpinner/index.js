import I18n from 'src/common/I18n'
import React from 'react'
import Spinner from 'react-spinkit'

class LoadingSpinner extends React.PureComponent {
  render() {
    return (
      <div className="text-center">
        <Spinner name='line-scale' fadeIn='none' className="mb-3" />
        <div>{`${I18n.t('common.please.wait')} ...`}</div>
      </div>
    )
  }
}

export default LoadingSpinner