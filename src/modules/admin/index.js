import { Route, Switch } from 'react-router-dom'

import Dashboard from 'src/modules/admin/components/Dashboard'
import React from 'react'
import Sidebar from 'src/modules/admin/components/Sidebar'
import SitesPage from 'src/modules/admin/pages/SitesPage'

const routes = [
  {
    path: '/',
    exact: true,
    component: Dashboard
  },
  {
    path: '/sites',
    exact: true,
    component: SitesPage
  }
]

class Admin extends React.PureComponent {
  render() {
    const { match } = this.props
    return (
      <div className='p-3'>
        <h1><b>Administrator</b></h1>
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
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default Admin