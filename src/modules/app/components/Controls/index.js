import 'react-datepicker/dist/react-datepicker.css'

import { filterInventoryFromDate, getOnlyName } from 'src/js/utils'

import $ from 'jquery'
import Button from 'src/common/components/Button'
import DatePicker from 'react-datepicker'
import DownloadImg from 'src/assets/images/download-white.svg'
import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import service from 'src/js/service'
import stores from 'src/stores'

const style = {
  buttonStyle: {
    height: 38,
    padding: '.3rem 1rem'
  }
}
class Controls extends React.Component {

  constructor(props) {
    super(props)
    this.downloadTypes = ['Every', 'Hourly', 'Daily']
    this.minDate = moment(_.first(props.inventories).date)
    this.maxDate = moment(_.last(props.inventories).date)
    this.state = {
      downloadType: 0,
      startDate: moment(_.first(props.inventories).date),
      endDate: moment(_.last(props.inventories).date)
    }

  }

  changeDownloadType(type) {
    this.setState({
      downloadType: type
    })
  }

  downloadAll() {
    $('.loading-spin').removeClass('hidden')
    const { inventories } = this.props
    const { downloadType, startDate, endDate } = this.state
    const filteredInventories = filterInventoryFromDate(inventories, startDate, endDate)
    const onlyName = getOnlyName(filteredInventories)
    stores.inventory.setDownloadingList(onlyName)

    const callback = (inventory, success) => {
      if(success)
        stores.inventory.removeDownloadQueue(inventory.name)
      else
        stores.inventory.setError(inventory.name)
    }
    
    service.downloadAllInventories(filteredInventories, callback, downloadType)
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    })
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    })
  }
    
  render() {
    return (
      <div className='d-flex align-items-end'>
        <Button style={style.buttonStyle} className="btn align-self-end" onClick={this.downloadAll.bind(this)}>
                    Download all
          <img className='ml-2' src={DownloadImg} alt="" />
        </Button>
        <div className="ml-4 dropdown">
          <a className="btn btn-secondary dropdown-toggle" href="https://example.com" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {this.downloadTypes[this.state.downloadType]}
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            {
              this.downloadTypes.map((type, i) => <span key={i} className='dropdown-item' onClick={this.changeDownloadType.bind(this, i)}>{type}</span>)
            }
          </div>
        </div>
        <div className='ml-4'>
          <div>
            <span>From</span>
            <DatePicker minDate={this.minDate} maxDate={this.maxDate} dateFormat='DD/MM/YYYY' className='form-control' selected={this.state.startDate} onChange={this.handleStartDateChange.bind(this)} />
          </div>
        </div>

        <div className='ml-4'>
          <div>
            <span>To</span>
            <DatePicker minDate={this.minDate} maxDate={this.maxDate} dateFormat='DD/MM/YYYY' className='form-control' selected={this.state.endDate} onChange={this.handleEndDateChange.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default Controls