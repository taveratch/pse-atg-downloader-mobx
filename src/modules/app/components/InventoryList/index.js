import Controls from 'src/modules/app/components/Controls'
import DownloadButton from 'src/modules/app/components/DownloadButton'
import I18n from 'src/common/I18n'
import React from 'react'
import moment from 'moment'
import { observer } from 'mobx-react'
import stores from 'src/stores'
import styled from 'styled-components'

const style = {
  thead: {
    background: '#F7F7F7'
  },
  progress: {
    downloading: {
      background: '#B4E0FA',
      width: '100%'
    },
    error: {
      background: '#FAB4B4',
      width: '100%'
    }
  }
}

const Th = styled.th`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 50%;
`
const Td = styled.th`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 50%;
  font-weight: normal;
`

const downloadingBar = () => <div style={style.progress.downloading} className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Downloading...</div>
const errorBar = () => <div style={style.progress.error} className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">File not found.</div>

@observer
class InventoryList extends React.Component {
  render() {
    let { inventories } = this.props
    const downloadingList = stores.inventory.getDownloadingList
    return (
      <div>
        <h1><b>{I18n.t('app.inventories')}</b></h1>
        <Controls inventories={inventories} />
        <br />
        <table className='w-100'>
          <thead style={style.thead}>
            <tr className='pt-4 pb-4'>
              <Th className='text-right pr-5'>{I18n.t('app.date')}</Th>
              <Th className='pl-5'>{I18n.t('app.download')}</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {
              inventories.map((inventory, i) => {
                return (
                  <tr key={i}>
                    <Td className='text-right pr-5'>{moment(inventory.dateStr, 'DD/MM/YYYY').format('D MMMM YYYY')}</Td>
                    <Td className='pl-5 pr-3'>
                      <div className='d-flex'>
                        <DownloadButton download={this.props.download} inventory={inventory}/>
                        {
                          downloadingList.has(inventory.name) &&
                          (
                            <div style={{ flex: 1 }} className='loading-spin d-flex justify-content-end align-items-center'>
                              <div className="progress">
                                {downloadingList.get(inventory.name).downloading && downloadingBar()}
                                {downloadingList.get(inventory.name).error && errorBar()}
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </Td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default InventoryList