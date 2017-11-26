import React from 'react'
import history from 'src/common/history'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const Tr = styled.tr`
  cursor: pointer;
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

@observer
class SitesTable extends React.PureComponent {

  onClick = (index) => {
    const site = this.props.sites[index]
    history.push(`/admin/sites/${site.id}`)
  }

  render() {
    const { sites } = this.props
    return (
      <div>
        <div className="mb-2 mt-4"><b>{`จำนวนหน่วยงาน : ${sites.length}`}</b></div>
        <table className='w-100'>
          <thead style={style.thead}>
            <tr>
              <th className="pl-3 pr-3">ชื่อหน่วยงาน</th>
              <th className="pl-3 pr-3">ลิ้งค์</th>
              <th className="pl-3 pr-3">พอร์ท</th>
            </tr>
          </thead>
          <tbody>
            {
              sites.map((site, i) => {
                return (
                  <Tr key={i} onClick={() => { this.onClick(i) }}>
                    <td className="pl-3 pr-3">{site.name}</td>
                    <td className="pl-3 pr-3">{site.url}</td>
                    <td className="pl-3 pr-3">{site.port}</td>
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

export default SitesTable