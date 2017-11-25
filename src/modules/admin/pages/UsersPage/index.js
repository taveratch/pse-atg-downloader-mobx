import AdminActions from 'src/modules/admin/actions'
import CreateUser from 'src/modules/admin/components/CreateUser'
import PageTabs from 'src/common/components/PageTabs'
import React from 'react'
import UsersTable from 'src/modules/admin/components/UsersTable'
import { colors } from 'src/common/mixins'
import { css } from 'styled-components'
import { observer } from 'mobx-react'
import stores from 'src/stores'

const tabStyle = css`
  border-bottom: 3px solid ${colors.green};
  color: ${colors.black};
`

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
          titles={['ผู้ใช้งานทั้งหมด', 'สร้างผู้ใช้งานใหม่']}
          selectedIndex={this.state.selectedIndex}
          onSelectTab={this.onSelectTab}
          activeStyle={tabStyle}
        >
          <UsersTable users={stores.admin.users.users} />
          <CreateUser />
        </PageTabs>
      </div>
    )
  }
}

export default UsersPage