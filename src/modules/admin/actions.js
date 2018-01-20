import Api from 'src/common/Api'
import I18n from 'src/common/I18n'
import history from 'src/common/history'
import stores from 'src/stores'

export default {
  getSites: () => {
    return Api.getSites()
      .then(res => {
        if (res.success)
          stores.admin.sites.setSites(res.data.reverse())
      })
  },
  createSite: (arg) => {
    return Api.createSite(arg)
      .then(res => {
        stores.admin.site._setSuccess(true)
        stores.admin.site._setMessage(I18n.t('admin.site.has.been.created', { siteName: res.data.name }))
      })
      .catch(err => {
        stores.admin.site._setMessage(err.error)
        stores.admin.site._setSuccess(err.success)
      })
  },
  createUser: (user) => {
    return Api.signup(user)
      .then(res => {
        stores.admin.user.setUser(res.data)
        stores.admin.user._setSuccess(true)
        stores.admin.user._setMessage(I18n.t('admin.user.has.been.created', { name: `${res.data.name}` }))
      })
      .catch(res => {
        stores.admin.user._setSuccess(false)
        stores.admin.user._setMessage(res.error)
      })
  },
  getUsers: () => {
    return Api.getUsers()
      .then(res => {
        if (res.success)
          stores.admin.users.setUsers(res.data.reverse())
      })
  },
  getSite: siteId => {
    return Api.getSite(siteId)
      .then(res => {
        stores.admin.site.setSite(res.data)
      })
  },
  getUsersBySiteId: (siteId) => {
    return Api.getUsersBySiteId(siteId)
      .then(res => {
        stores.admin.site.setUsers(res.data.reverse())
      })
  },
  getSitesByUserId: (userId) => {
    return Api.getSitesByUserId(userId)
      .then(res => {
        stores.admin.user.setSites(res.data.reverse())
      })
  },
  updateSite: (siteId, updatedSite) => {
    return Api.updateSite(siteId, updatedSite)
      .then(() => {
        stores.admin.site._setMessage(I18n.t('common.saved'))
        stores.admin.site._setSuccess(true)
      })
      .catch(() => {
        stores.admin.site._setMessage(I18n.t('common.error'))
        stores.admin.site._setSuccess(false)
      })
  },
  deleteSite: siteId => {
    return Api.deleteSite(siteId)
  },
  getUser: userId => {
    return Api.getUser(userId)
      .then((res) => {
        stores.admin.user.setUser(res.data)
      })
  },
  updateUser: (userId, updatedUser) => {
    return Api.updateUser(userId, updatedUser)
      .then(() => {
        stores.admin.user._setMessage(I18n.t('common.saved'))
        stores.admin.user._setSuccess(true)
      })
      .catch(res => {
        stores.admin.user._setMessage(res.error)
        stores.admin.user._setSuccess(false)
      })
  },
  deleteUser: userId => {
    return Api.deleteUser(userId)
  },
  goToDownloadPage: () => {
    history.push('/')
  },
  getPrivileges: () => {
    return Api.getPrivileges()
      .then(res => {
        stores.admin.users.setPrivileges(res.data)
      })
  },
  activateUser: (userId, params) => { //{ active: true, notify_active: true}
    return Api.activateUser(userId, params)
      .then(() => {
        stores.admin.user._setMessage(I18n.t('common.saved'))
        stores.admin.user._setSuccess(true)
      })
      .catch(res => {
        stores.admin.user._setMessage(res.error)
        stores.admin.user._setSuccess(false)
      })
  }
}

export const StoreActions = {
  reset: (storeName) => {
    stores.admin[storeName]._reset()
  }
}