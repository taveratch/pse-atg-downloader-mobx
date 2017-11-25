import AdminActions from 'src/modules/admin/actions'
import Button from 'src/common/components/Buttons/Button'
import ConfirmModal from 'src/common/components/ConfirmModal'
import DangerButton from 'src/common/components/Buttons/DangerButton'
import ErrorMessage from 'src/common/components/ErrorMessage'
import Input from 'src/common/components/Input'
import React from 'react'
import SuccessMessage from 'src/common/components/SuccessMessage'
import UsersTable from 'src/modules/admin/components/UsersTable'
import _ from 'lodash'
import history from 'src/common/history'
import { observer } from 'mobx-react'
import stores from 'src/stores'

@observer
class SitePage extends React.PureComponent {

  constructor(props) {
    super(props)
    this.siteId = this.props.match.params.id
    AdminActions.getSite(this.siteId)
    AdminActions.getUsersBySiteId(this.siteId)
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
    const withoutNull = _.pickBy(this.state, _.identity)
    AdminActions.updateSite(this.siteId, withoutNull)
  }

  onDelete = async () => {
    await AdminActions.deleteSite(this.siteId)
    history.push('/admin/sites')
  }

  render() {
    const { site: siteStore } = stores.admin
    const { site, users } = stores.admin.site
    if (!site) return null
    return (
      <div>
        <ConfirmModal
          id="delete-confirm-modal"
          title={'ยืนยัน'} 
          body={`ต้องการลบหน่วยงาน ${site.name} หรือไม่ ? \n (หน่วยงานนี้จะถูกลบออกจากลูกค้าทุกคน)`}  
          yesButtonLabel={'ลบ'}
          onYes={this.onDelete}
        />
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
          <DangerButton className="btn ml-3 pl-5 pr-5" data-toggle="modal" data-target="#delete-confirm-modal">ลบ</DangerButton>
        </div>
        {siteStore.success && siteStore.message && <SuccessMessage>{siteStore.message}</SuccessMessage>}
        {!siteStore.success && siteStore.message && <ErrorMessage>{siteStore.message}</ErrorMessage>}
      </div>
    )
  }
}

export default SitePage