import 'src/stylesheets'

import { Provider } from 'react-redux'
import React from 'react'
import Routes from 'src/modules/route/routes'
import createStore from 'src/utils/create-store'

export default props => (
  <Provider store={createStore()}>
    <Routes {...props} />
  </Provider>
)