/*eslint no-unused-vars: "off"*/
import { inject, observer } from 'mobx-react'

import AppActions from 'src/modules/app/actions'
import DangerButton from 'src/common/components/Buttons/DangerButton'
import DefaultButton from 'src/common/components/Buttons/DefaultButton'
import Dropdown from 'src/common/components/Dropdown'
import ErrorMessage from 'src/modules/app/components/ErrorMessage'
import I18n from 'src/common/I18n'
import InventoryList from 'src/modules/app/components/InventoryList'
import LanguageSwitcher from 'src/common/components/LanguageSwitcher'
import LoadingSpinner from 'src/common/components/LoadingSpinner'
import React from 'react'
import Selectors from 'src/modules/app/selectors'
import { TopRightContainer } from 'src/common/components/Styled'
import createDownloadLink from 'src/utils/create-download-link'
import vm from 'src/modules/app/viewmodel'

@inject('stores')
@observer
class Wrapper extends React.PureComponent {

  downloadPageStore = this.props.stores.downloadPage
  sitesStore = this.props.stores.sites
  authStore = this.props.stores.auth
  inventoryStore = this.props.stores.inventory

  componentDidMount() {
    this.sitesStore.getSites()
  }

  dispatch(action) {
    this.setState(vm(this.state, action))
  }

  read = (index, site) => {
    this.downloadPageStore.setSelectedSite(site)
    this.downloadPageStore.fetchInventoryList(site)
  }

  download = (inventory) => {
    const downloadType = this.inventoryStore.downloadType
    this.downloadPageStore.downloadInventory(inventory, { downloadType })
      .then(res => {
        createDownloadLink(inventory.name, res)
      })
  }

  signout = () => {
    AppActions.signout()
  }

  goToAdmin = () => {
    AppActions.goToAdmin()
  }

  renderProgressbar(name) {
    if (this.state.downloadedInventories.indexOf(name) < 0 && this.state.downloading)
      return (
        <div>
          <div className="progress">
            <div className="progress-bar bg-info progress-bar-striped progress-bar-animated"
              id={`progress-${name}`} role="progressbar"
              ariaValuenow="100"
              style={{ width: '100%' }}
              ariaValuemin="0"
              ariaValuemax="100">Downloading...</div>
          </div>
        </div>
      )
    else if (this.state.downloadedInventories.indexOf(name) >= 0 && this.state.downloading)
      return (
        <div>
          <div className="progress">
            <div className="progress-bar bg-success progress-bar-striped progress-bar-animated"
              id={`progress-${name}`} role="progressbar"
              ariaValuenow="100"
              ariaValuemin="0"
              style={{ width: '100%' }}
              ariaValuemax="100">Downloaded</div>
          </div>
        </div>
      )
  }

  render() {
    const { sites } = this.sitesStore
    return (
      <div className='p-5 d-flex flex-column' style={{ minHeight: '100vh' }}>
        <TopRightContainer>
          <LanguageSwitcher className="d-inline" />
          <b className="ml-3">{`${this.authStore.user.firstname} ${this.authStore.user.lastname}`}</b>
          {this.authStore.user.is_admin && <DefaultButton className="btn ml-3" onClick={this.goToAdmin}>{I18n.t('admin.administrator')}</DefaultButton>}
          <DangerButton className="btn ml-3" onClick={this.signout}>{I18n.t('app.signout')}</DangerButton>
        </TopRightContainer>
        <h1><b>{I18n.t('app.site')}</b></h1>
        <div className='d-flex'>
          <Dropdown
            itemSelector={Selectors.getSiteName}
            id="dropdownSite"
            className="w-100"
            items={sites}
            onItemClick={this.read}
            initialLabel={this.downloadPageStore.selectedSite.name}
          />
        </div>
        {this.downloadPageStore.message && <ErrorMessage />}
        <br />
        <br />
        {this.downloadPageStore.fetching && <LoadingSpinner />}
        {this.downloadPageStore.hasInventoryList && <InventoryList download={this.download} inventories={this.downloadPageStore.inventoryList} />}
        <footer className="footer mt-auto">
          <div className="container">
            <span>
              {I18n.t('app.copyright.1')}<br></br>{I18n.t('app.copyright.2')}
            </span>
          </div>
        </footer>
      </div>
    )
  }
}

export default Wrapper


