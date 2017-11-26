import AdminActions, { StoreActions } from 'src/modules/admin/actions'

import Button from 'src/common/components/Button'
import Input from 'src/common/components/Input'
import NoticeMessage from 'src/common/components/NoticeMessage'
import React from 'react'
import stores from 'src/stores'

class CreateSite extends React.PureComponent {

  state = {}

  componentWillUnmount() {
    StoreActions.reset('site')
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  onClick = () => {
    AdminActions.createSite(this.state)
      .then(() => AdminActions.getSites())
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-7">
        <NoticeMessage store={stores.admin.site} />
        <Input label="ชื่อหน่วยงาน" name="name" onChange={this.handleChange} />
        <br />
        <Input label="ลิ้งค์" name="url" onChange={this.handleChange} />
        <br />
        <Input label="พอร์ท" name="port" type="number" onChange={this.handleChange} />
        <br />
        <Button className='btn pl-5 pr-5' onClick={this.onClick}>สร้าง</Button>
      </div>
    )
  }
}

export default CreateSite