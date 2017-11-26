import DangerButton from 'src/common/components/Buttons/DangerButton'
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
    console.log('xxxxx')
    const site = this.props.sites[index]
    history.push(`/admin/sites/${site.id}`)
  }

  render() {
    const { sites, showOption, optionText, onOptionClick } = this.props
    return (
      <div>
        <div className="mb-2 mt-4"><b>{`จำนวนหน่วยงาน : ${sites.length}`}</b></div>
        <table className='w-100'>
          <thead style={style.thead}>
            <tr>
              <th className="pl-3 pr-3">ชื่อหน่วยงาน</th>
              <th className="pl-3 pr-3">ลิ้งค์</th>
              <th className="pl-3 pr-3">พอร์ท</th>
              {showOption && <th className="pl-3 pr-3"></th>}
            </tr>
          </thead>
          <tbody>
            {
              sites.map((site, i) => {
                return (
                  <Tr key={i}>
                    <td className="pl-3 pr-3" onClick={() => { this.onClick(i) }}>{site.name}</td>
                    <td className="pl-3 pr-3" onClick={() => { this.onClick(i) }}>{site.url}</td>
                    <td className="pl-3 pr-3" onClick={() => { this.onClick(i) }}>{site.port}</td>
                    {showOption && <td className="pl-3 pr-3">
                      <DangerButton className="pl-3 pr-3" onClick={() => { onOptionClick(i, site) }}>{optionText}</DangerButton>
                    </td>}
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