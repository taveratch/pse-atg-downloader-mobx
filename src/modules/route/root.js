import 'src/stylesheets'

import { Provider } from 'mobx-react'
import React from 'react'
import Routes from 'src/modules/route/routes'
import stores from 'src/stores'

export default props => (
  <Provider stores={stores}>
    <Routes {...props} />
  </Provider>
)