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
        name: user.name,
        tel: user.tel,
        serial_number: user.serial_number
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
        privilege: updatedUser.privilege,
        name: updatedUser.name,
        tel: updatedUser.tel,
        site_ids: updatedUser.siteIds,
        active: updatedUser.active,
        notify_active: updatedUser.notify_active
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
  },
  verify: (userId, token) => {
    return ApiManager.fetch({
      method: 'POST',
      url: '/verify',
      body: {
        userId,
        token
      }
    })
  },
  getPrivileges: () => {
    return ApiManager.fetch({
      url: '/users/privileges'
    })
  },
  activateUser: (userId, params) => {
    return ApiManager.fetch({
      method: 'POST',
      url: `/users/${userId}/active`,
      body: {
        active: params.active,
        notify_active: params.notify_active
      }
    })
  }
}