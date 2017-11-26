import AdminActions from 'src/modules/admin/actions'
import CreateSite from 'src/modules/admin/components/CreateSite'
import PageTabs from 'src/common/components/PageTabs'
import React from 'react'
import SitesTable from 'src/modules/admin/components/SitesTable'
import { colors } from 'src/common/mixins'
import { css } from 'styled-components'
import { observer } from 'mobx-react'
import stores from 'src/stores'

const tabStyle = css`
  border-bottom: 3px solid ${colors.green};
  color: ${colors.black};
`

@observer
class SitesPage extends React.PureComponent {

  sitesStore = stores.admin.sites

  state = {
    selectedIndex: 0
  }

  componentDidMount() {
    AdminActions.getSites()
  }

  onSelectTab = (index) => {
    this.setState({ selectedIndex: index })
  }

  render() {
    const { sites } = this.sitesStore
    return (
      <div className='container'>
        <PageTabs
          titles={[`หน่วยงานทั้งหมด (${sites.length})`, 'สร้างหน่วยงานใหม่']}
          selectedIndex={this.state.selectedIndex}
          onSelectTab={this.onSelectTab}
          activeStyle={tabStyle}
        >
          <SitesTable sites={sites} />
          <CreateSite />
        </PageTabs>
      </div>
    )
  }
}

export default SitesPage