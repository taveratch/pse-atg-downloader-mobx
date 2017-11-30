import { Route, Router, Switch } from 'react-router-dom'

import Admin from 'src/modules/admin'
import CommonActions from 'src/common/actions'
import I18n from 'src/common/I18n'
import NotFound from 'src/common/components/NotFound'
import PrivateRoute from 'src/common/components/PrivateRoute'
import React from 'react'
import RedirectWithCondition from 'src/common/components/RedirectWithCondition'
import SignIn from 'src/modules/signin'
import Wrapper from 'src/modules/app'
import { connect } from 'react-redux'
import history from 'src/common/history'
import locale from 'src/common/locale'
import moment from 'moment'
import { observer } from 'mobx-react'
import qs from 'query-string'
import stores from 'src/stores'

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

@observer
class Routes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    initI18n()
    moment.locale(I18n.getLocale())
  }

  componentDidMount() {
    CommonActions.authenticate()
      .then(() => {
        this.setState({ loading: false })
      })
      .catch(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    if (this.state.loading) return <span>loading</span>
    return (
      <Router history={history}>
        <Switch>
          <RedirectWithCondition exact path='/signin' redirect='/' component={SignIn} shouldRedirect={stores.auth.isSignedIn} />
          <PrivateRoute exact path='/' redirect='/signin' component={Wrapper} authed={stores.auth.isSignedIn} />
          <PrivateRoute path='/admin' redirect='/' component={Admin} authed={stores.auth.isSignedIn && stores.auth.isAdmin} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

const mapState = ({ auth }) => ({
  isSignedIn: auth.isSuccess
})

export default connect(mapState)(Routes)