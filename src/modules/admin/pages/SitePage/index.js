import AdminActions from 'src/modules/admin/actions'
import Button from 'src/common/components/Buttons/Button'
import DangerButton from 'src/common/components/Buttons/DangerButton'
import ErrorMessage from 'src/common/components/ErrorMessage'
import Input from 'src/common/components/Input'
import React from 'react'
import SuccessMessage from 'src/common/components/SuccessMessage'
import UsersTable from 'src/modules/admin/components/UsersTable'
import _ from 'lodash'
import { observer } from 'mobx-react'
import stores from 'src/stores'

@observer
class SitePage extends React.PureComponent {

  constructor(props) {
    super(props)
    const siteId = this.props.match.params.id
    AdminActions.getSite(siteId)
    AdminActions.getUsersBySiteId(siteId)
  }

  state = {
    url: null,
    name: null,
    port: null
  }

  onChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  onSave = () => {
    const siteId = this.props.match.params.id
    const withoutNull = _.pickBy(this.state, _.identity)
    AdminActions.updateSite(siteId, withoutNull)
  }

  render() {
    const { site: siteStore } = stores.admin
    const { site, users } = stores.admin.site
    if (!site) return null
    return (
      <div>
        <h5>
          <b>แก้ไข</b>
        </h5>
        <Input name="name" label="ชื่อหน่วยงาน" defaultValue={site.name} onChange={this.onChange} />
        <br />
        <Input name="url" label="ลิ้งค์" defaultValue={site.url} onChange={this.onChange} />
        <br />
        <Input type="number" name="port" label="พอร์ท" defaultValue={site.port} onChange={this.onChange} />
        <br />
        <br />
        <h5>
          <b>
            {`รายชื่อลูกค้าของ ${site.name}`}
          </b>
        </h5>
        <UsersTable users={users} />
        <br />
        <br />
        <div className="mb-3">
          <Button className="btn pl-5 pr-5" onClick={this.onSave}>บันทึก</Button>
          <DangerButton className="btn ml-3 pl-5 pr-5" >ลบ</DangerButton>
        </div>
        {siteStore.success && siteStore.message && <SuccessMessage>{siteStore.message}</SuccessMessage>}
        {!siteStore.success && siteStore.message && <ErrorMessage>{siteStore.message}</ErrorMessage>}
      </div>
    )
  }
}

export default SitePage