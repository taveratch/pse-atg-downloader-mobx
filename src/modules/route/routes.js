import { Route, Router, Switch } from 'react-router-dom'

import Admin from 'src/modules/admin'
import { AuthController } from 'src/controllers'
import NotFound from 'src/common/components/NotFound'
import PrivateRoute from 'src/common/components/PrivateRoute'
import React from 'react'
import RedirectWithCondition from 'src/common/components/RedirectWithCondition'
import SignIn from 'src/modules/signin'
import Wrapper from 'src/modules/app'
import { authenticate } from 'src/services/auth'
import { connect } from 'react-redux'
import history from 'src/common/history'
import { observer } from 'mobx-react'
import stores from 'src/stores'

@observer
class Routes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    authenticate(AuthController.getToken())
      .then(res => {
        if (res.success) {
          stores.auth.setUser(res.user)
        }
        this.setState({ loading: false })
      })
      .catch(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    if(this.state.loading) return <span>loading</span>
    return (
      <Router history={history}>
        <Switch>
          <RedirectWithCondition exact path='/signin' redirect='/' component={SignIn} shouldRedirect={stores.auth.isSignedIn} />
          <PrivateRoute exact path='/' redirect='/signin' component={Wrapper} authed={stores.auth.isSignedIn} />
          <PrivateRoute path='/admin' redirect='/' component={Admin} authed={stores.auth.isSignedIn && stores.auth.isAdmin} />
          <Route path='*' component={NotFound}/>
        </Switch>
      </Router>
    )
  }
}

const mapState = ({ auth }) => ({
  isSignedIn: auth.isSuccess
})

export default connect(mapState)(Routes)