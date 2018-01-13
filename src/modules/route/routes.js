import {Route, Router, Switch} from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Admin from 'src/modules/admin'
import I18n from 'src/common/I18n'
import NotFound from 'src/common/components/NotFound'
import PrivateRoute from 'src/common/components/PrivateRoute'
import React from 'react'
import RedirectWithCondition from 'src/common/components/RedirectWithCondition'
import SignIn from 'src/modules/signin'
import SignUp from 'src/modules/signup'
import Wrapper from 'src/modules/app'
import history from 'src/common/history'
import locale from 'src/common/locale'
import moment from 'moment'
import qs from 'query-string'

const initI18n = () => {
  let localeFromParams = qs.parse(history.location.search).locale
  const localeFromStorage = locale.get()
  if (localeFromParams && localeFromParams !== localeFromStorage)
    locale.set(localeFromParams)
  else if (localeFromStorage)
    localeFromParams = locale.get()
  else {
    localeFromParams = 'th'
    locale.set(localeFromParams)
  }
  I18n.init(localeFromParams)
}

@inject('stores')
@observer
class Routes extends React.Component {

  constructor(props) {
    super(props)
    initI18n()
    this.authStore = this.props.stores.auth
    this.authStore.verifyToken()
    moment.locale(I18n.getLocale())
  }

  render() {
    if (this.authStore.checkingToken) return <span>loading</span>
    return (
      <Router history={history}>
        <Switch>
          <RedirectWithCondition exact path='/signin' redirect='/' component={SignIn} shouldRedirect={this.authStore.isSignedIn} />
          <Route exact path='/signup' component={SignUp} />
          <PrivateRoute exact path='/' redirect='/signin' component={Wrapper} authed={this.authStore.isSignedIn} />
          <PrivateRoute path='/admin' redirect='/' component={Admin} authed={this.authStore.isAdmin} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default Routes


