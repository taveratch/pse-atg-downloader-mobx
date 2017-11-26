import ApiManager from 'src/services/api-manager'

export default {
  getSites: () => {
    return ApiManager.fetch({
      url: '/site'
    })
  },
  createSite: ({ name, url, port }) => {
    return ApiManager.fetch({
      url: '/site/create',
      method: 'POST',
      body: {
        name,
        url,
        port
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
  signup: (email, password, siteId, isAdmin) => {
    return ApiManager.fetch({
      url: '/auth/signup',
      method: 'POST',
      body: {
        email,
        password,
        site_id: siteId,
        is_admin: isAdmin
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
        is_admin: updatedUser.isAdmin,
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
}