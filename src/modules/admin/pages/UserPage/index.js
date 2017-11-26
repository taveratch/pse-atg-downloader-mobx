import AdminActions, { StoreActions } from 'src/modules/admin/actions'

import Button from 'src/common/components/Buttons/Button'
import ConfirmModal from 'src/common/components/ConfirmModal'
import DangerButton from 'src/common/components/Buttons/DangerButton'
import Input from 'src/common/components/Input'
import NoticeMessage from 'src/common/components/NoticeMessage'
import React from 'react'
import SitesTable from 'src/modules/admin/components/SitesTable'
import _ from 'lodash'
import history from 'src/common/history'
import { observer } from 'mobx-react'
import stores from 'src/stores'

@observer
class UserPage extends React.PureComponent {

  constructor(props) {
    super(props)
    this.userId = this.props.match.params.id
    AdminActions.getUser(this.userId)
    AdminActions.getSitesByUserId(this.userId)
  }

  userStore = stores.admin.user

  state = {
    email: null,
    password: null,
    isAdmin: null,
    siteIds: []
  }

  onChange = (event) => {
    console.log(event.target.name)
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  onCheckboxChange = event => {
    const { name, checked } = event.target
    this.setState({
      [name]: checked
    })
  }

  onSave = () => {
    const _filterer = value => _.identity(value !== null)
    const withoutNull = _.pickBy(this.state, _filterer)
    AdminActions.updateUser(this.userId, withoutNull)
  }

  onDelete = async () => {
    await AdminActions.deleteUser(this.userId)
    history.push('/admin/users')
  }

  componentWillUnmount() {
    StoreActions.reset('user')
  }

  render() {
    const { user, sites } = this.userStore
    if (!user) return null
    console.log(this.state)
    return (
      <div>
        <ConfirmModal
          id="delete-confirm-modal"
          title={'ยืนยัน'}
          body={`ต้องการลบผู้ใช้งาน ${user.email} หรือไม่ ?`}
          yesButtonLabel={'ลบ'}
          onYes={this.onDelete}
        />
        <h5>
          <b>แก้ไข</b>
        </h5>
        <Input name="email" label="อีเมลล์" defaultValue={user.email} onChange={this.onChange} />
        <br />
        <Input name="password" label="รหัสผ่าน" onChange={this.onChange} />
        <br />
        <input type="checkbox" checked={this.state.isAdmin === null ? user.is_admin : this.state.isAdmin} id="isAdmin" name="isAdmin" value="isAdmin" onChange={this.onCheckboxChange} />
        <label className="ml-3" htmlFor="isAdmin">ผู้ดูแลระบบ</label>
        <br />
        <br />
        <h5>
          <b>
            {`รายชื่อหน่วยงานทั้งหมดของ ${user.email}`}
          </b>
        </h5>
        <SitesTable sites={sites} />
        <br />
        <br />
        <div className="mb-3">
          <Button className="btn pl-5 pr-5" onClick={this.onSave}>บันทึก</Button>
          <DangerButton className="btn ml-3 pl-5 pr-5" data-toggle="modal" data-target="#delete-confirm-modal">ลบ</DangerButton>
        </div>
        <NoticeMessage store={this.userStore} />
      </div>
    )
  }
}

export default UserPage