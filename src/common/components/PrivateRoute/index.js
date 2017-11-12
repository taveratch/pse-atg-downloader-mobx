import {Redirect, Route} from 'react-router-dom'

import React from 'react'

class PrivateRoute extends React.Component {

  render() {
    if(this.props.authed)
      return <Route {...this.props} />
    else 
      return <Redirect to={{ pathname: this.props.redirect }} />
  }
}

export default PrivateRoute