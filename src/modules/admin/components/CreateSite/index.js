import AdminActions, { StoreActions } from 'src/modules/admin/actions'

import Button from 'src/common/components/Button'
import I18n from 'src/common/I18n'
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
    console.log(name, value)
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
        <Input label={I18n.t('admin.site.name')} name="name" onChange={this.handleChange} />
        <br />
        <Input label={I18n.t('admin.site.serial.number')} name="serial_number" onChange={this.handleChange} />
        <br />
        <Input label={I18n.t('admin.site.url')} name="url" onChange={this.handleChange} />
        <br />
        <Input label={I18n.t('admin.site.port')} name="port" type="number" onChange={this.handleChange} />
        <br />
        <Button className='btn pl-5 pr-5' onClick={this.onClick}>{I18n.t('common.create')}</Button>
      </div>
    )
  }
}

export default CreateSite