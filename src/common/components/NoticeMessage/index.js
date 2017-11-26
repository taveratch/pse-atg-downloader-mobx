import ErrorMessage from 'src/common/components/ErrorMessage'
import React from 'react'
import SuccessMessage from 'src/common/components/SuccessMessage'
import { observer } from 'mobx-react'

@observer
class NoticeMessage extends React.PureComponent {
  render() {
    const { store } = this.props
    return (
      <div>
        {!store.success && store.message && <ErrorMessage>{store.message}</ErrorMessage>}
        {store.success && store.message && <SuccessMessage>{store.message}</SuccessMessage>}
      </div>
    )
  }
}

export default NoticeMessage