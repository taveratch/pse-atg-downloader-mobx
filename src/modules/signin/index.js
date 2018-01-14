import { inject, observer } from 'mobx-react'

import Button from 'src/common/components/Button'
import ErrorMessage from 'src/common/components/ErrorMessage'
import Header from 'src/modules/signin/components/Header'
import I18n from 'src/common/I18n'
import { Link } from 'react-router-dom'
import LoadingSpinner from 'src/common/components/LoadingSpinner'
import React from 'react'
import { StoreActions } from 'src/common/actions'
import styled from 'styled-components'

const Page = styled.div`
    background-color: #FAFAFA;
`

const LoginBox = styled.div`
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 10px 0 rgba(0, 0, 0, 0.1);
`

@inject('stores')
@observer
class SignIn extends React.Component {

  authStore = this.props.stores.auth

  componentWillUnmount() {
    StoreActions.reset('auth')
  }
  
  handleChange(event) {
    const { name, value } = event.target
    this.authStore[name] = value
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.authStore.signin()
  }

  render() {
    return (
      <Page className='h-100 w-100'>
        <div className='container d-flex align-items-center h-100 justify-content-center'>
          <LoginBox className='col-md-6 col-sm-10 col-xs-10 col-lg-6 p-0'>
            <Header title={I18n.t('signin.signin')} />
            <div className='p-4'>
              {!this.authStore.success && <ErrorMessage>{this.authStore.message}</ErrorMessage>}
              <form onSubmit={this.onSubmit}>
                <input className='form-control' name='email' type='email' placeholder={I18n.t('common.email')} onChange={this.handleChange.bind(this)} />
                <input className='form-control mt-2' name='password' type='password' placeholder={I18n.t('common.password')} onChange={this.handleChange.bind(this)} />
                <Button className='btn text-white mt-4 w-100' >{I18n.t('signin.signin')}</Button>
              </form>
              <div className="text-center">
                <Link to='/signup'>{I18n.t('signin.go.to.signup.description')}</Link>
              </div>
              {this.authStore.fetching && <LoadingSpinner />}
            </div>
          </LoginBox>
        </div>
      </Page>
    )
  }
}

export default SignIn