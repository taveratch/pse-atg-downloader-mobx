import CreateSite from 'src/modules/admin/components/CreateSite'
import PageTabs from 'src/common/components/PageTabs'
import React from 'react'
import SitesTable from 'src/modules/admin/components/SitesTable'
import { colors } from 'src/common/mixins'
import { css } from 'styled-components'

const tabStyle = css`
  border-bottom: 3px solid ${colors.green};
  color: ${colors.black};
`

class SitesPage extends React.PureComponent {

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
          titles={['หน่วยงานทั้งหมด', 'สร้างหน่วยงานใหม่']}
          selectedIndex={this.state.selectedIndex}
          onSelectTab={this.onSelectTab}
          activeStyle={tabStyle}
        >
          <SitesTable />
          <CreateSite />
        </PageTabs>
      </div>
    )
  }
}

export default SitesPage