import AdminActions from 'src/modules/admin/actions'
import Button from 'src/common/components/Button'
import Input from 'src/common/components/Input'
import React from 'react'

class CreateSite extends React.PureComponent {

  state = {} 
  
  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }
  
  onClick = () => {
    AdminActions.createSite(this.state)
  }
  
  render() {
    return (
      <div className="col-xs-10 col-sm-7 col-md-5">
        <Input label="Name" name="name" onChange={this.handleChange}/>
        <br/>
        <Input label="Url" name="url" onChange={this.handleChange}/>
        <br/>
        <Input label="Port" name="port" type="number" onChange={this.handleChange}/>
        <br/>
        <Button className='btn' onClick={this.onClick}>Create</Button>
      </div>
    )
  }
}

export default CreateSite