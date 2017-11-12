import { AuthController } from 'src/controllers'
import Button from 'src/common/components/Button'
import Header from 'src/modules/signin/components/Header'
import React from 'react'
import { connect } from 'react-redux'
import { signin } from 'src/actions/auth'
import stores from 'src/stores'
import styled from 'styled-components'

const Page = styled.div`
    background-color: #FAFAFA;
`

const LoginBox = styled.div`
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 10px 0 rgba(0, 0, 0, 0.1);
`

class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange(event) {
    let state = {}
    state[event.target.name] = event.target.value
    this.setState(state)
  }

  handleClick = () => {
    let { email, password } = this.state
    AuthController.signin(email, password)
      .then((res) => {
        stores.auth.setUser(res.user)
      })
  }

  render() {
    return (
      <Page className='h-100 w-100'>
        <div className='container d-flex align-items-center h-100 justify-content-center'>
          <LoginBox className='col-md-6 col-sm-10 col-xs-10 col-lg-6 p-0'>
            <Header title='Sign in' />
            <div className='p-4'>
              <input className='form-control' name='email' type='email' placeholder='Email address' onChange={this.handleChange.bind(this)} />
              <input className='form-control mt-2' name='password' type='password' placeholder='Password' onChange={this.handleChange.bind(this)} />
              <Button className='btn text-white mt-4 w-100' onClick={this.handleClick} >Sign in</Button>
            </div>
          </LoginBox>
        </div>
      </Page>
    )
  }
}

export default connect(null, { signin })(SignIn)