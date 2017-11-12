import AdminActions from 'src/modules/admin/actions'
import Button from 'src/common/components/Button'
import Input from 'src/common/components/Input'
import React from 'react'
import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  button {
    height: 38px;
  }
  align-items: flex-end;
`

const FlexItemFillWidth = styled.div`
  flex: 1;
  margin-right: 8px;
`

class CreateUser extends React.Component {
  state = {
    email: '',
    password: ''
  } 
  
  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }
  
  onClick = () => {
    AdminActions.createUser(this.state.email, this.state.password)
  }

  generatePassword = () => {
    const MAX = 999999
    const MIN = 100000
    const randomPassword = parseInt(Math.random() * (MAX - MIN) + MIN)
    this.setState({
      password: randomPassword
    })
    document.getElementsByName('password')[0].value = randomPassword
  }
  
  render() {
    return (
      <div className="col-xs-10 col-sm-7 col-md-7">
        <Input label="Email" name="email" onChange={this.handleChange}/>
        <br/>
        <Flex>
          <FlexItemFillWidth>
            <Input label="Password" name="password" onChange={this.handleChange}/>
          </FlexItemFillWidth>
          <Button className='btn' onClick={this.generatePassword}>Generate</Button>
        </Flex>
        <br/>
        <Button className='btn' onClick={this.onClick}>Create</Button>
      </div>
    )
  }
}

export default CreateUser