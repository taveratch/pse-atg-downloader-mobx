import 'react-datepicker/dist/react-datepicker.css'

import { filterInventoryFromDate, getOnlyName } from 'src/js/utils'
import { inject, observer } from 'mobx-react'

import $ from 'jquery'
import Button from 'src/common/components/Buttons/Button'
import DatePicker from 'react-datepicker'
import DownloadImg from 'src/assets/images/download-white.svg'
import Dropdown from 'src/common/components/Dropdown'
import I18n from 'src/common/I18n'
import React from 'react'
import Selectors from 'src/modules/app/selectors'
import _ from 'lodash'
import downloadTypes from 'src/modules/app/components/Controls/download-types'
import moment from 'moment'

@inject('stores')
@observer
class Controls extends React.Component {

  downloadPageStore = this.props.stores.downloadPage
  inventoryStore = this.props.stores.inventory

  constructor(props) {
    super(props)
    this.downloadTypes = downloadTypes()
    this.minDate = moment(_.first(props.inventories).date)
    this.maxDate = moment(_.last(props.inventories).date)
    this.state = {
      startDate: moment(_.first(props.inventories).date),
      endDate: moment(_.last(props.inventories).date)
    }
  }

  changeDownloadType = (index, type) => {
    this.inventoryStore.setDownloadType(type)
  }

  downloadAll = () => {
    $('.loading-spin').removeClass('hidden')
    const { inventories } = this.props
    const { downloadType } = this.inventoryStore
    const { startDate, endDate } = this.state
    const filteredInventories = filterInventoryFromDate(inventories, startDate, endDate)
    const onlyName = getOnlyName(filteredInventories)
    this.inventoryStore.setDownloadingList(onlyName)

    const callback = (inventory, success) => {
      if(success)
        this.inventoryStore.removeDownloadQueue(inventory.name)
      else
        this.inventoryStore.setError(inventory.name)
    }
    
    this.downloadPageStore.downloadAllInventories(filteredInventories, callback, downloadType.type)
  }

  handleStartDateChange = (date) => {
    this.setState({
      startDate: date
    })
  }

  handleEndDateChange = (date) => {
    this.setState({
      endDate: date
    })
  }
    
  render() {
    return (
      <div className='d-flex align-items-end'>
        <div>
          <span>{I18n.t('app.from')}</span>
          <DatePicker minDate={this.minDate} maxDate={this.maxDate} dateFormat='DD MMM YYYY' className='form-control' selected={this.state.startDate} onChange={this.handleStartDateChange} />
        </div>
        <div className='ml-4'>
          <span>{I18n.t('app.to')}</span>
          <DatePicker minDate={this.minDate} maxDate={this.maxDate} dateFormat='DD MMM YYYY' className='form-control' selected={this.state.endDate} onChange={this.handleEndDateChange} />
        </div>
        <Dropdown 
          itemSelector={Selectors.getDownloadTypeLabel}
          items={this.downloadTypes}
          id="dropdownDownloadTypes"
          initialLabel={this.inventoryStore.downloadType.label}
          className="ml-4"
          onItemClick={this.changeDownloadType}
        />
        <Button className="btn align-self-end ml-4" onClick={this.downloadAll.bind(this)}>
          {I18n.t('app.download.all')}
          <img className='ml-2' src={DownloadImg} alt="" />
        </Button>
      </div>
    )
  }
}

export default Controls