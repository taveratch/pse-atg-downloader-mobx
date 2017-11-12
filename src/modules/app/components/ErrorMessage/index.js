import React from 'react'
import { Label } from 'react-bootstrap'

class ErrorMessage extends React.Component {
  render() {
    return (
      <div>
        <Label bsStyle="danger">Url is not correct.</Label>
        <p className="margin-top">Please insert a correct url with port</p>
      </div>
    )
  }
}

export default ErrorMessage