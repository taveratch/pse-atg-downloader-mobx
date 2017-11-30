import { Route, Switch } from 'react-router-dom'

import AdminActions from 'src/modules/admin/actions'
import AppActions from 'src/modules/app/actions'
import DangerButton from 'src/common/components/Buttons/DangerButton'
import DefaultButton from 'src/common/components/Buttons/DefaultButton'
import I18n from 'src/common/I18n'
import LanguageSwitcher from 'src/common/components/LanguageSwitcher'
// import Dashboard from 'src/modules/admin/components/Dashboard'
import React from 'react'
import Sidebar from 'src/modules/admin/components/Sidebar'
import SitePage from 'src/modules/admin/pages/SitePage'
import SitesPage from 'src/modules/admin/pages/SitesPage'
import { TopRightContainer } from 'src/common/components/Styled'
import UserPage from 'src/modules/admin/pages/UserPage'
import UsersPage from 'src/modules/admin/pages/UsersPage'

const routes = [
  {
    path: '/sites',
    exact: true,
    component: SitesPage
  },
  {
    path: '/users',
    exact: true,
    component: UsersPage
  },
  {
    path: '/sites/:id',
    component: SitePage
  },
  {
    path: '/users/:id',
    component: UserPage
  }
]

class Admin extends React.PureComponent {

  signout = () => {
    AppActions.signout()
  }

  goToDownloadPage = () => {
    AdminActions.goToDownloadPage()
  }

  render() {
    const { match } = this.props
    return (
      <div className='p-3'>
        <TopRightContainer>
          <LanguageSwitcher className="d-inline"/>
          <DefaultButton className="btn ml-3" onClick={this.goToDownloadPage}>{I18n.t('common.back')}</DefaultButton>
          <DangerButton className="btn ml-3" onClick={this.signout}>{I18n.t('app.signout')}</DangerButton>
        </TopRightContainer>
        <h1><b>{I18n.t('admin.administrator')}</b></h1>
        <div className='row mt-4'>
          <div className='col-3'>
            <Sidebar />
          </div>
          <div className='col-9'>
            <Switch>
              {
                routes.map((route, index) => (
                  <Route key={index} path={match.url + route.path} exact={route.exact} component={route.component} />
                ))
              }
              <Route component={SitesPage} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default Admin