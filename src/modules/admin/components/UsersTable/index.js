import I18n from 'src/common/I18n'
import React from 'react'
import { colors } from 'src/common/mixins'
import history from 'src/common/history'
import styled from 'styled-components'

const Tr = styled.tr`
  cursor: pointer;
`

const AdminMessage = styled.span`
  color: #E57373;
`

const Active = styled.span`
  color: ${colors.green};
`

const Inactive = styled.span`
  color: #E57373;
`

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

class UsersTable extends React.PureComponent {

  onClick = (index) => {
    const user = this.props.users[index]
    history.push(`/admin/users/${user.id}`)
  }

  render() {
    const { users } = this.props
    return (
      <div>
        <table className='w-100'>
          <thead style={style.thead}>
            <tr>
              <th className="pl-3 pr-3">{I18n.t('common.email')}</th>
              <th className="pl-3 pr-3">{I18n.t('common.status')}</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, i) => {
                return (
                  <Tr key={i} onClick={() => { this.onClick(i) }}>
                    <td className="pl-3 pr-3">
                      {user.email}
                      {user.is_admin && <AdminMessage className="ml-3">{`(${I18n.t('admin.administrator')})`}</AdminMessage>}
                    </td>
                    <td className="pl-3 pr-3">
                      {user.active ?
                        <Active>{I18n.t('common.active')}</Active> :
                        <Inactive>{I18n.t('common.inactive')}</Inactive> }
                    </td>
                  </Tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default UsersTable