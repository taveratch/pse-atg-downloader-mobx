import Api from 'src/common/Api'
import stores from 'src/stores'
export default {
  getSites: () => {
    Api.getSite()
      .then(res => {
        if(res.success) 
          stores.admin.sites.setSites(res.sites)
      }) 
  },
  createSite: (arg) => {
    Api.createSite(arg)
      .then(res => {
        console.log(res)
      })
  },
  createUser: (email, password) => {
    Api.signup(email, password)
      .then(res => {
        console.log(res)
      })
  },
  getUsers: () => {
    Api.getUsers()
      .then(res => {
        if(res.success)
          stores.admin.users.setUsers(res.users)
      })
  }
}