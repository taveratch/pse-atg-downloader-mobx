import AdminActions from 'src/modules/admin/actions'
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

@observer
class SitesTable extends React.PureComponent {

  sitesStore = stores.admin.sites

  componentDidMount() {
    AdminActions.getSites()
  }
  
  render() {
    const {sites} = this.sitesStore
    return (
      <div>
        <table className='w-100'>
          <thead style={style.thead}>
            <tr>
              <th className="pl-3 pr-3">Name</th>
              <th className="pl-3 pr-3">Url</th>
              <th className="pl-3 pr-3">Port</th>
            </tr>
          </thead>
          <tbody>
            {
              sites.map((site, i) => {
                return (
                  <tr key={i}>
                    <td className="pl-3 pr-3">{site.name}</td>
                    <td className="pl-3 pr-3">{site.url}</td>
                    <td className="pl-3 pr-3">{site.port}</td>
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

export default SitesTable