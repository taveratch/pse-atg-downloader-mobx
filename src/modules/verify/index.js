import { inject, observer } from 'mobx-react'

import ErrorMessage from 'src/common/components/ErrorMessage'
import Header from 'src/modules/signin/components/Header'
import I18n from 'src/common/I18n'
import { Link } from 'react-router-dom'
import LoadingSpinner from 'src/common/components/LoadingSpinner'
import React from 'react'
import { StoreActions } from 'src/common/actions'
import qs from 'query-string'
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
class Verify extends React.Component {

  authStore = this.props.stores.auth

  componentWillUnmount() {
    StoreActions.reset('auth')
  }

  componentWillMount() {
    const { token, userId } = qs.parse(this.props.location.search)
    this.authStore.verify(userId, token)
  }

  renderVerifyMessage() {
    return (
      <div>
        <div>{I18n.t('verify.message', { email: this.authStore.user.email })}</div>
        <Link to="/signin" className="d-block text-center">{I18n.t('signin.signin')}</Link>
      </div>
    )
  }

  render() {
    return (
      <Page className='h-100 w-100'>
        <div className='container d-flex align-items-center h-100 justify-content-center'>
          <LoginBox className='col-md-6 col-sm-10 col-xs-10 col-lg-6 p-0'>
            <Header title={I18n.t('verify.title')} />
            <div className="pl-4 pr-4 pb-4">
              {!this.authStore.success && <ErrorMessage className="text-center mb-0">{this.authStore.message}</ErrorMessage>}
              {this.authStore.fetching && <LoadingSpinner />}
              {this.authStore.user && this.renderVerifyMessage()}
            </div>
          </LoginBox>
        </div>
      </Page>
    )
  }
}

export default Verify