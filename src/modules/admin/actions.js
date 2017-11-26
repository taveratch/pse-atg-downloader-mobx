import Api from 'src/common/Api'
import stores from 'src/stores'
export default {
  getSites: () => {
    return Api.getSites()
      .then(res => {
        if (res.success)
          stores.admin.sites.setSites(res.data)
      })
  },
  createSite: (arg) => {
    return Api.createSite(arg)
      .then(res => {
        stores.admin.site._setSuccess(true)
        stores.admin.site._setMessage(`หน่วยงาน ${res.data.name} ถูกสร้างแล้ว`)
      })
      .catch(err => {
        stores.admin.site._setMessage(err.error)
        stores.admin.site._setSuccess(err.success)
      })
  },
  createUser: (email, password, siteId, isAdmin) => {
    return Api.signup(email, password, siteId, isAdmin)
      .then(res => {
        stores.admin.user.setUser(res.data)
        stores.admin.user._setSuccess(true)
        stores.admin.user._setMessage(`ผู้ใช้งาน ${res.data.email} ถูกสร้างแล้ว`)
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
        stores.admin.site.setUsers(res.data)
      })
  },
  getSitesByUserId: (userId) => {
    return Api.getSitesByUserId(userId)
      .then(res => {
        stores.admin.user.setSites(res.data)
      })
  },
  updateSite: (siteId, updatedSite) => {
    return Api.updateSite(siteId, updatedSite)
      .then(() => {
        stores.admin.site._setMessage('บันทึกเรียบร้อย')
        stores.admin.site._setSuccess(true)
      })
      .catch(() => {
        stores.admin.site._setMessage('ผิดพลาด')
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
        stores.admin.user._setMessage('บันทึกเรียบร้อย')
        stores.admin.user._setSuccess(true)
      })
      .catch(res => {
        stores.admin.user._setMessage(res.error)
        stores.admin.user._setSuccess(false)
      })
  },
  deleteUser: userId => {
    return Api.deleteUser(userId)
  }
}

export const StoreActions = {
  reset: (storeName) => {
    stores.admin[storeName]._reset()
  }
}