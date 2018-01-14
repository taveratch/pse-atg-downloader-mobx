import AdminActions, { StoreActions } from 'src/modules/admin/actions'

import Button from 'src/common/components/Buttons/Button'
import ConfirmModal from 'src/common/components/ConfirmModal'
import DangerButton from 'src/common/components/Buttons/DangerButton'
import Dropdown from 'src/common/components/Dropdown'
import I18n from 'src/common/I18n'
import Input from 'src/common/components/Input'
import NoticeMessage from 'src/common/components/NoticeMessage'
import React from 'react'
import Selectors from 'src/modules/admin/selectors'
import SitesTable from 'src/modules/admin/components/SitesTable'
import _ from 'lodash'
import history from 'src/common/history'
import { observer } from 'mobx-react'
import stores from 'src/stores'
import { toJS } from 'mobx'
import styled from 'styled-components'

const removeDuplicateSite = (primary, secondary) => {
  const _isEqual = (object, other) => object.id === other.id
  return _.pullAllWith(primary, secondary, _isEqual)
}

const Red = styled.span`
  color: #E57373;
`

@observer
class UserPage extends React.PureComponent {

  constructor(props) {
    super(props)
    this.userId = this.props.match.params.id
    AdminActions.getUser(this.userId)
    AdminActions.getSitesByUserId(this.userId)
    AdminActions.getSites()
  }

  userStore = stores.admin.user
  sitesStore = stores.admin.sites

  state = {
    user: {
      email: null,
      password: null,
      is_admin: null,
      name: null,
      tel: null,
      siteIds: [],
      active: null,
      notify_active: true
    }
  }

  updateUserState = (key, value) => {
    this.setState({
      user: { ...this.state.user, ...{ [key]: value } }
    })
  }

  onChange = (event) => {
    const { name, value } = event.target
    this.updateUserState(name, value)
  }

  onCheckboxChange = event => {
    const { name, checked } = event.target
    this.updateUserState(name, checked)
  }

  onSave = () => {
    const _filterer = value => _.identity(value !== null)
    const withoutNull = _.pickBy(this.state.user, _filterer)
    // Merge current site ids with site ids from store (server)
    const siteIds = [...this.state.user.siteIds, ..._.map(this.userStore.sites, 'id')]
    AdminActions.updateUser(this.userId, { ...withoutNull, ...{ siteIds } })
  }

  onDelete = async () => {
    await AdminActions.deleteUser(this.userId)
    history.push('/admin/users')
  }

  componentWillUnmount() {
    StoreActions.reset('user')
  }

  onItemClick = (index, site) => {
    this.userStore.addSite(site)
  }

  onDeleteSite = (index, site) => {
    this.userStore.deleteSite(site)
  }

  createAddSiteSection = () => {
    return (
      <div>
        <h5>
          <b>{I18n.t('admin.add.site')}</b>
        </h5>
        <div className="mb-5">
          <Dropdown
            itemSelector={Selectors.getSiteName}
            id="dropdownSites"
            items={removeDuplicateSite(toJS(this.sitesStore.sites), toJS(this.userStore.sites))}
            onItemClick={this.onItemClick}
            initialLabel={I18n.t('admin.please.choose.site')}
          />
        </div>
      </div>
    )
  }

  render() {
    const { user, sites } = this.userStore
    if (!user) return null
    return (
      <div>
        <ConfirmModal
          id="delete-confirm-modal"
          title={I18n.t('common.confirmation')}
          body={I18n.t('admin.remove.user.dialog.message', { userName: user.email })}
          yesButtonLabel={I18n.t('common.remove')}
          onYes={this.onDelete}
        />
        <div className="mb-5">
          <h5>
            <b>{I18n.t('common.edit')}</b>
          </h5>
          <Input name="email" disabled label={I18n.t('common.email')} defaultValue={user.email} onChange={this.onChange} />
          <br />
          <Input name="password" label={I18n.t('common.password')} onChange={this.onChange} placeholder={I18n.t('admin.blank.password.for.nothing')} />
          <br />
          <Input label={I18n.t('common.name')} name="name" defaultValue={user.name} onChange={this.onChange} />
          <br />
          <Input label={I18n.t('common.tel')} name="tel" defaultValue={user.tel} onChange={this.onChange} />
          <br />
          <input type="checkbox" disabled={!user.verified} checked={this.state.user.is_admin === null ? user.is_admin : this.state.user.is_admin} id="is_admin" name="is_admin" value="is_admin" onChange={this.onCheckboxChange} />
          <label className="ml-3" htmlFor="is_admin">
            {I18n.t('admin.administrator')}
            {!user.verified && <Red>{` (${I18n.t('admin.active.unverified.message')})`}</Red>}
          </label>
          <br />
          <input type="checkbox" disabled={!user.verified} checked={this.state.user.active === null ? user.active : this.state.user.active} id="active" name="active" value="active" onChange={this.onCheckboxChange} />
          <label className="ml-3" htmlFor="active">
            {I18n.t('admin.active')}
            {!user.verified && <Red>{` (${I18n.t('admin.active.unverified.message')})`}</Red>}
          </label>
          {
            this.state.user.active !== null && (
              <div className="ml-3">
                <input type="checkbox" id="notify_active" checked={this.state.user.notify_active} name="notify_active" value="notify_active" onChange={this.onCheckboxChange} />
                <label className="ml-3" htmlFor="notify_active">{I18n.t('admin.notify.active')}</label>
              </div>
            )
          }
        </div>
        {!user.is_admin && this.createAddSiteSection()}
        <h5>
          <b>
            {`${I18n.t('admin.sites.of')} ${user.email}`}
          </b>
        </h5>
        <SitesTable
          sites={sites}
          showOption={!user.is_admin}
          optionText={I18n.t('common.remove')}
          onOptionClick={this.onDeleteSite}
        />
        <br />
        <br />
        <div className="mb-3">
          <Button className="btn pl-5 pr-5" onClick={this.onSave}>{I18n.t('common.save')}</Button>
          <DangerButton className="btn ml-3 pl-5 pr-5" data-toggle="modal" data-target="#delete-confirm-modal">{I18n.t('common.remove')}</DangerButton>
        </div>
        <NoticeMessage store={this.userStore} />
      </div>
    )
  }
}

export default UserPage