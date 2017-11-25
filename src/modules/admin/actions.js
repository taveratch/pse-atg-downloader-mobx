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
        if (!res.success)
          stores.admin.sites.setError(res.error)
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
        stores.admin.sites.setSite(res.data)
      })
  }
}