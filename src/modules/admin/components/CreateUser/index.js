import AdminActions, { StoreActions } from 'src/modules/admin/actions'

import Button from 'src/common/components/Buttons/Button'
import Input from 'src/common/components/Input'
import NoticeMessage from 'src/common/components/NoticeMessage'
import React from 'react'
import { observer } from 'mobx-react'
import stores from 'src/stores'
import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  button {
    height: 38px;
  }
  align-items: flex-end;
`

const FlexItemFillWidth = styled.div`
  flex: 1;
  margin-right: 8px;
`

const DropdownItem = styled.span`
  white-space: normal;
  cursor: pointer;
`

@observer
class CreateUser extends React.Component {
  state = {
    email: '',
    password: '',
    siteId: null,
    isAdmin: false,
    dropdownText: 'เลือกหน่วยงาน ...'
  }

  componentDidMount() {
    AdminActions.getSites()
  }

  componentWillUnmount() {
    StoreActions.reset('user')
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  onClick = () => {
    AdminActions.createUser(this.state.email, this.state.password, this.state.siteId, this.state.isAdmin)
      .then(() => AdminActions.getUsers())
  }

  generatePassword = () => {
    const MAX = 999999
    const MIN = 100000
    const randomPassword = parseInt(Math.random() * (MAX - MIN) + MIN)
    this.setState({
      password: randomPassword
    })
    document.getElementsByName('password')[0].value = randomPassword
  }

  changeSite = (site) => {
    this.setState({
      siteId: site.id,
      dropdownText: site.name
    })
  }

  render() {
    const { sites } = stores.admin.sites
    const { user: userStore } = stores.admin
    return (
      <div className="col-xs-12 col-sm-12 col-md-7">
        <NoticeMessage store={userStore} />
        <Input label="อีเมลล์" name="email" onChange={this.handleChange} />
        <br />
        <Flex>
          <FlexItemFillWidth>
            <Input label="รหัสผ่าน" name="password" onChange={this.handleChange} />
          </FlexItemFillWidth>
          <Button className='btn' onClick={this.generatePassword}>สุ่ม</Button>
        </Flex>
        <br />
        <div className="dropdown w-100">
          <a className="w-100 btn btn-secondary dropdown-toggle" href="https://example.com" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {this.state.dropdownText}
          </a>
          <div className="w-100 dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuLink">
            {
              sites.map((site, i) => <DropdownItem key={i} className='dropdown-item' onClick={this.changeSite.bind(this, site)}>{site.name}</DropdownItem>)
            }
          </div>
        </div>
        <br />
        <Button className='btn pl-5 pr-5' onClick={this.onClick}>สร้าง</Button>
      </div>
    )
  }
}

export default CreateUser