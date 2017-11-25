import React from 'react'

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
  render() {
    const { users } = this.props
    return (
      <div>
        <table className='w-100'>
          <thead style={style.thead}>
            <tr>
              <th className="pl-3 pr-3">อีเมลล์</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, i) => {
                return (
                  <tr key={i}>
                    <td className="pl-3 pr-3">{user.email}</td>
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

export default UsersTable