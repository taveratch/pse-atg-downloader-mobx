import CreateUser from 'src/modules/admin/components/CreateUser'
import PageTabs from 'src/common/components/PageTabs'
import React from 'react'
import UsersTable from 'src/modules/admin/components/UsersTable'

class UsersPage extends React.PureComponent {
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
          <UsersTable />
        </PageTabs>
      </div>
    )
  }
}

export default UsersPage