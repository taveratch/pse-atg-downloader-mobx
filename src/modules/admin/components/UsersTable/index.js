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

  usersStore = stores.admin.users

  componentDidMount() {
    AdminActions.getUsers()
  }

  render() {
    const { users } = this.usersStore
    return (
      <div>
        <table className='w-100'>
          <thead style={style.thead}>
            <tr>
              <th className="pl-3 pr-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((site, i) => {
                return (
                  <tr key={i}>
                    <td className="pl-3 pr-3">{site.email}</td>
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