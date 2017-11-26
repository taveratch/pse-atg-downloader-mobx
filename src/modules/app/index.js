import Dropdown from 'src/common/components/Dropdown'
import ErrorMessage from 'src/modules/app/components/ErrorMessage'
import InventoryList from 'src/modules/app/components/InventoryList'
import React from 'react'
import Selectors from 'src/modules/app/selectors'
import { connect } from 'react-redux'
import cookie from 'js-cookie'
import { getSites } from 'src/actions/site'
import { observer } from 'mobx-react'
import service from 'src/js/service'
import vm from 'src/modules/app/viewmodel'

@observer
class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    /* binding functions */
    this.dispatch = this.dispatch.bind(this)
    this.read = this.read.bind(this)
    /* set initial state */
    this.state = vm({}, { type: 'init' })
  }

  componentDidMount() {
    this.props.getSites()
  }

  dispatch(action) {
    this.setState(vm(this.state, action))
  }

  read = (index, site) => {
    const { url: siteUrl, port, name } = site
    const url = `${siteUrl}:${port}`
    this.setState({
      selectedItem: name,
      inventories: []
    })
    service.getInventoryList(url)
      .then((res) => {
        cookie.set('url', url)
        this.dispatch({ type: 'load_inventory', data: res, url: service.urlValidator(url) })
      })
      .catch((err) => {
        console.log(err)
        this.dispatch({ type: 'error' })
      })
  }

  download(url) {
    service.downloadInventory(url)
  }

  downloadAll() {
    this.dispatch({ type: 'start_downloading_all_inventory' })
    service.downloadAllInventories(this.state.inventories, this.dispatch)
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
    return (
      <div className='p-5 d-flex flex-column' style={{ minHeight: '100vh' }}>
        <h1><b>หน่วยงาน</b></h1>
        <div className='d-flex'>
          <Dropdown
            itemSelector={Selectors.getSiteName}
            id="dropdownSite"
            className="w-100"
            items={this.props.sites}
            onItemClick={this.read}
            initialLabel={this.state.selectedItem}
          />
        </div>
        {this.state.error && <ErrorMessage />}
        <br />
        <br />
        {this.state.inventories.length !== 0 && <InventoryList inventories={this.state.inventories} />}
        <footer className="footer mt-auto">
          <div className="container">
            <span>
              โปรแกรมนี้เป็นทรัพย์สินของ บริษัท ผดุงศิลป์วิศวการ จำกัด<br></br>© Copyright 2017 PADUNGSILPA GROUP All right reserved.
            </span>
          </div>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sites: state.site.sites
})

export default connect(mapStateToProps, { getSites })(Wrapper)