import Api from 'src/common/Api'
import stores from 'src/stores'
export default {
  getSites: () => {
    Api.getSites()
      .then(res => {
        if (res.success)
          stores.admin.sites.setSites(res.data)
      })
  },
  createSite: (arg) => {
    Api.createSite(arg)
      .then(res => {
        if (!res.success) {
          stores.admin.sites._setMessage(res.error)
          stores.admin.sites._setSuccess(res.success)
        }
      })
  },
  createUser: (email, password, siteId, isAdmin) => {
    Api.signup(email, password, siteId, isAdmin)
      .then(res => {
        stores.admin.createUser.setResponse(res)
      })
      .catch(res => {
        stores.admin.createUser.setResponse(res)
      })
  },
  getUsers: () => {
    Api.getUsers()
      .then(res => {
        if (res.success)
          stores.admin.users.setUsers(res.data)
      })
  },
  getSite: siteId => {
    Api.getSite(siteId)
      .then(res => {
        stores.admin.site.setSite(res.data)
      })
  },
  getUsersBySiteId: (siteId) => {
    Api.getUsersBySiteId(siteId)
      .then(res => {
        stores.admin.site.setUsers(res.data)
      })
  },
  updateSite: (siteId, updatedSite) => {
    Api.updateSite(siteId, updatedSite)
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
  }
} 