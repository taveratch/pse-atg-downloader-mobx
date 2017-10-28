import { Router, Switch } from 'react-router-dom'

import { AuthController } from 'src/controllers'
import PrivateRoute from 'src/containers/PrivateRoute'
import React from 'react'
import RedirectWithCondition from 'src/containers/RedirectWithCondition'
import SignIn from 'src/containers/signin/SignIn'
import Wrapper from 'src/containers/app/Wrapper'
import { authenticate } from 'src/services/auth'
import { connect } from 'react-redux'
import history from 'src/containers/history'
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
        </Switch>
      </Router>
    )
  }
}

const mapState = ({ auth }) => ({
  isSignedIn: auth.isSuccess
})

export default connect(mapState)(Routes)