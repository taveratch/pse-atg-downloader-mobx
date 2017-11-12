import CreateSite from 'src/modules/admin/components/CreateSite'
import PageTabs from 'src/common/components/PageTabs'
import React from 'react'
import SitesTable from 'src/modules/admin/components/SitesTable'

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
          titles={['Create site', 'All sites']}
          selectedIndex={this.state.selectedIndex}
          onSelectTab={this.onSelectTab}
        >
          <CreateSite />
          <SitesTable />
        </PageTabs>
      </div>
    )
  }
}

export default SitesPage