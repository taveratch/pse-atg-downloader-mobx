import AdminActions from 'src/modules/admin/actions'
import CreateUser from 'src/modules/admin/components/CreateUser'
import PageTabs from 'src/common/components/PageTabs'
import React from 'react'
import UsersTable from 'src/modules/admin/components/UsersTable'
import { observer } from 'mobx-react'
import stores from 'src/stores'

@observer
class UsersPage extends React.PureComponent {
  
  constructor(props){
    super(props)
    AdminActions.getUsers()
  }
  state = {
    selectedIndex: 0
  }

  onSelectTab = (index) => {
    this.setState({ selectedIndex: index })
  }
  
  render() {
    return (
      <div className='container'>
        <PageTabs
          titles={['Create user', 'All users']}
          selectedIndex={this.state.selectedIndex}
          onSelectTab={this.onSelectTab}
        >
          <CreateUser />
          <UsersTable users={stores.admin.users.users} />
        </PageTabs>
      </div>
    )
  }
}

export default UsersPage