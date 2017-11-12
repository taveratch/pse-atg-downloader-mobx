import Input from 'src/common/components/Input'
import React from 'react'

class SitesPage extends React.PureComponent {
  render() {
    return (
      <div className='container'>
        <h5><b>Create new site</b></h5>
        <div className="row">
          <div className="col-xs-12 col-md-5">
            <Input label="Name" name="name" />
          </div>

          <div className="col-xs-12 col-md-5">
            <Input label="Url" name="url" />
          </div>
          <div className="col-xs-12 col-md-2">
            <Input label="port" name="port" type="number" />
          </div>
        </div>
      </div>
    )
  }
}

export default SitesPage