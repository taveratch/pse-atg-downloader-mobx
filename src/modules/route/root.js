import 'src/stylesheets'

import { Provider } from 'mobx-react'
import React from 'react'
import Routes from 'src/modules/route/routes'
// import createStore from 'src/utils/create-store'
import stores from 'src/stores'

export default props => (
  <Provider stores={stores}>
    <Routes {...props} />
  </Provider>
)