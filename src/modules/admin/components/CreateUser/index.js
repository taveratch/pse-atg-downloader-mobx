import AdminActions from 'src/modules/admin/actions'
import Button from 'src/common/components/Button'
import ErrorMessage from 'src/common/components/ErrorMessage'
import Input from 'src/common/components/Input'
import React from 'react'
import SuccessMessage from 'src/common/components/SuccessMessage'
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

@observer
class CreateUser extends React.Component {
  state = {
    email: '',
    password: '',
    siteId: null,
    isAdmin: false,
    dropdownText: 'Choose site...'
  }

  componentDidMount() {
    AdminActions.getSites()
  }
  
  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  onClick = () => {
    AdminActions.createUser(this.state.email, this.state.password, this.state.siteId, this.state.isAdmin)
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
    const { res } = stores.admin.createUser
    return (
      <div className="col-xs-10 col-sm-7 col-md-7">
        { res.error && <ErrorMessage>{res.error}</ErrorMessage>}
        { res.success && <SuccessMessage>{`${res.user.email} has been created`}</SuccessMessage>}
        <Input label="Email" name="email" onChange={this.handleChange} />
        <br />
        <Flex>
          <FlexItemFillWidth>
            <Input label="Password" name="password" onChange={this.handleChange} />
          </FlexItemFillWidth>
          <Button className='btn' onClick={this.generatePassword}>Generate</Button>
        </Flex>
        <br />
        <div className="dropdown w-100">
          <a className="w-100 btn btn-secondary dropdown-toggle" href="https://example.com" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {this.state.dropdownText}
          </a>
          <div className="w-100 dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuLink">
            {
              sites.map((site, i) => <span key={i} className='dropdown-item' onClick={this.changeSite.bind(this, site)}>{site.name}</span>)
            }
          </div>
        </div>
        <br />
        <Button className='btn' onClick={this.onClick}>Create</Button>
      </div>
    )
  }
}

export default CreateUser