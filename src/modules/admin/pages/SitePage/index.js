import AdminActions, { StoreActions } from 'src/modules/admin/actions'

import Button from 'src/common/components/Buttons/Button'
import ConfirmModal from 'src/common/components/ConfirmModal'
import DangerButton from 'src/common/components/Buttons/DangerButton'
import I18n from 'src/common/I18n'
import Input from 'src/common/components/Input'
import NoticeMessage from 'src/common/components/NoticeMessage'
import React from 'react'
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

  componentWillUnmount() {
    StoreActions.reset('site')
  }

  render() {
    const { site: siteStore } = stores.admin
    const { site, users } = stores.admin.site
    if (!site) return null
    return (
      <div>
        <ConfirmModal
          id="delete-confirm-modal"
          title={I18n.t('common.confirmation')}
          body={I18n.t('admin.remove.site.dialog.message', { siteName: site.name })}
          yesButtonLabel={I18n.t('common.remove')}
          onYes={this.onDelete}
        />
        <h5>
          <b>{I18n.t('common.edit')}</b>
        </h5>
        <Input name="name" label={I18n.t('admin.site.name')} defaultValue={site.name} onChange={this.onChange} />
        <br />
        <Input name="url" label={I18n.t('admin.site.url')} defaultValue={site.url} onChange={this.onChange} />
        <br />
        <Input type="number" name="port" label={I18n.t('admin.site.port')} defaultValue={site.port} onChange={this.onChange} />
        <br />
        <br />
        <h5>
          <b>
            {`${I18n.t('admin.users.of')} ${site.name}`}
          </b>
        </h5>
        <UsersTable users={users} />
        <br />
        <br />
        <div className="mb-3">
          <Button className="btn pl-5 pr-5" onClick={this.onSave}>{I18n.t('common.save')}</Button>
          <DangerButton className="btn ml-3 pl-5 pr-5" data-toggle="modal" data-target="#delete-confirm-modal">{I18n.t('common.remove')}</DangerButton>
        </div>
        <NoticeMessage store={siteStore} />
      </div>
    )
  }
}

export default SitePage