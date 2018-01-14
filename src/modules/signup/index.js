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
class SignUp extends React.Component {

  authStore = this.props.stores.auth

  handleChange = (event) => {
    const { name, value } = event.target
    this.authStore.signupState[name] = value
  }

  componentWillUnmount() {
    StoreActions.reset('auth')
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.authStore.signup()
  }

  renderSignupForm = () => {
    return (
      <div className='p-4'>
        {!this.authStore.success && <ErrorMessage>{this.authStore.message}</ErrorMessage>}
        <form onSubmit={this.onSubmit} className="mb-0">
          <input className='form-control' name='name' placeholder={I18n.t('common.name')} onChange={this.handleChange} required />
          <input className='form-control mt-2' name='email' type='email' placeholder={I18n.t('common.email')} onChange={this.handleChange.bind(this)} required />
          <input className='form-control mt-2' name='password' type='password' placeholder={I18n.t('common.password')} onChange={this.handleChange.bind(this)} required/>
          <input className='form-control mt-2' name='tel' placeholder={I18n.t('common.tel')} onChange={this.handleChange.bind(this)} required/>
          <input className='form-control mt-2' name='serial_number' placeholder={I18n.t('common.serial.number')} onChange={this.handleChange.bind(this)} required/>
          <div className="form-check mt-2">
            <input className='form-check-input ml-1' id="agreement" name="agreement" type="checkbox" onChange={this.handleChange.bind(this)} required/>
            <label className="form-check-label ml-2" htmlFor="agreement">{I18n.t('signup.agreement')}</label>
          </div>
          <Button className='btn text-white mt-4 mb-2 w-100' >{I18n.t('signup.signup')}</Button>
          <Link to='/signin' className="d-block text-center">{`${I18n.t('common.or')} ${I18n.t('signin.signin')}`}</Link>
        </form>
        {this.authStore.fetching && <LoadingSpinner />}
      </div>
    )
  }

  renderGreetingMessage = () => {
    return (
      <div className="p-4">
        <div>{I18n.t('signup.email.verification.message', {email: this.authStore.signupState.email})}</div>
        <Link to="/signin" className="d-block text-center">{I18n.t('signup.back.to.signin')}</Link>
      </div>
    )
  }

  render() {
    return (
      <Page className='h-100 w-100'>
        <div className='container d-flex align-items-center h-100 justify-content-center'>
          <LoginBox className='col-md-6 col-sm-10 col-xs-10 col-lg-6 p-0'>
            <Header title={I18n.t('signup.signup')} />
            { this.authStore.signupPassed && this.renderGreetingMessage()}
            { !this.authStore.signupPassed && this.renderSignupForm()}
          </LoginBox>
        </div>
      </Page>
    )
  }
}

export default SignUp