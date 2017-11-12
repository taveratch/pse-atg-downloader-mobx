import {Redirect, Route} from 'react-router-dom'

import React from 'react'

class WithoutAuthedRoute extends React.Component {

  render() {
    if(!this.props.shouldRedirect)
      return <Route {...this.props} />
    else 
      return <Redirect to={{ pathname: this.props.redirect }} />
  }
}

export default WithoutAuthedRoute