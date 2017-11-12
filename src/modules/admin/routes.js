import Admin from 'src/modules/admin'
import { AuthController } from 'src/controllers'
import PrivateRoute from 'src/common/components/PrivateRoute'
import React from 'react'
import { Switch } from 'react-router-dom'
import { authenticate } from 'src/services/auth'

class Routes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      authed: false
    }
  }

  componentDidMount() {
    authenticate(AuthController.getToken())
      .then(res => {
        this.setState({
          authed: res.user.is_admin,
          loading: false
        })
      })
      .catch(() => {
        this.setState({
          authed: false,
          loading: false
        })
      })
  }

  render() {
    return (
      <Switch>
        <PrivateRoute exact path='/admin' redirect={'/admin/signin'} component={Admin} authed={this.state.authed} />
      </Switch>
    )
  }
}

export default Routes