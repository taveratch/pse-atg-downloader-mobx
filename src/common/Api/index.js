import ApiManager from 'src/services/api-manager'

export default {
  getSites: () => {
    return ApiManager.fetch({
      url: '/site'
    })
  },
  createSite: ({ name, url, port, serial_number }) => {
    return ApiManager.fetch({
      url: '/site/create',
      method: 'POST',
      body: {
        name,
        url,
        port,
        serial_number
      }
    })
  },
  authUser: () => {
    return ApiManager.fetch({
      url: '/auth/authenticate',
      method: 'POST'
    })
  },
  signin: (email, password) => {
    return ApiManager.fetch({
      url: '/auth/signin',
      method: 'POST',
      body: {
        email,
        password
      }
    })
  },
  signup: (user) => {
    return ApiManager.fetch({
      url: '/auth/signup',
      method: 'POST',
      body: {
        email: user.email,
        password: user.password,
        site_id: user.site_id,
        is_admin: user.is_admin,
        firstname: user.firstname,
        lastname: user.lastname,
        tel: user.tel
      }
    })
  },
  getUsers: () => {
    return ApiManager.fetch({
      url: '/users'
    })
  },
  getSite: siteId => {
    return ApiManager.fetch({
      url: `/site/${siteId}`
    })
  },
  getUsersBySiteId: siteId => {
    return ApiManager.fetch({
      url: `/site/${siteId}/users`
    })
  },
  getSitesByUserId: userId => {
    return ApiManager.fetch({
      url: `/users/${userId}/sites`
    })
  },
  updateSite: (siteId, updatedSite) => {
    return ApiManager.fetch({
      method: 'PUT',
      url: `/site/${siteId}`,
      body: {
        url: updatedSite.url,
        name: updatedSite.name,
        port: updatedSite.port,
        serial_number: updatedSite.serial_number
      }
    })
  },
  deleteSite: (siteId) => {
    return ApiManager.fetch({
      method: 'DELETE',
      url: `/site/${siteId}`
    })
  },
  getUser: userId => {
    return ApiManager.fetch({
      url: `/users/${userId}`
    })
  },
  updateUser: (userId, updatedUser) => {
    return ApiManager.fetch({
      method: 'PUT',
      url: `/users/${userId}`,
      body: {
        email: updatedUser.email,
        password: updatedUser.password,
        is_admin: updatedUser.is_admin,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        tel: updatedUser.tel,
        site_ids: updatedUser.siteIds
      }
    })
  },
  deleteUser: (userId) => {
    return ApiManager.fetch({
      method: 'DELETE',
      url: `/users/${userId}`
    })
  },
  getInventoryList: (url, port) => {
    return ApiManager.fetch({
      external: true,
      url: `${url}:${port}/inventory/filesrecord.txt`,
      headers: {
        'Authorization': 'Basic dXNlcjpwYXNz'
      }
    })
  },
  downloadInventory: (site, inventory) => {
    return ApiManager.fetch({
      external: true,
      url: `${site.url}:${site.port}/Inventory/${inventory.name}`,
      headers: {
        'Authorization': 'Basic dXNlcjpwYXNz'
      }
    })
  }
}