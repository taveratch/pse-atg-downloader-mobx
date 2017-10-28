import Controls from './Controls'
import DownloadButton from 'src/containers/app/inventory-list/DownloadButton'
import React from 'react'
import { observer } from 'mobx-react'
import stores from 'src/stores'
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

const downloadingBar = () => <div style={style.progress.downloading} className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Downloading...</div>
const errorBar = () => <div style={style.progress.error} className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">File not found.</div>

@observer
class InventoryList extends React.Component {
  render() {
    let { inventories } = this.props
    const downloadingList = stores.inventory.getDownloadingList
    return (
      <div>
        <h1><b>Inventory</b></h1>
        <Controls inventories={inventories} />
        <br />
        <table className='w-100'>
          <thead style={style.thead}>
            <tr className='pt-4 pb-4'>
              <th className='text-right pr-5'>Date</th>
              <th className='pl-5'>Download</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              inventories.map((inventory, i) => {
                return (
                  <tr key={i}>
                    <td className='text-right pr-5'>{inventory.dateStr}</td>
                    <td className='pl-5 pr-3'>
                      <div className='d-flex'>
                        <DownloadButton url={inventory.url} name={inventory.name} />
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
                    </td>
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