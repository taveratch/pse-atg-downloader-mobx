import ApiManager from 'src/services/api-manager'

export default {
  getSite: () => {
    return ApiManager.fetch({
      url: '/site'
    })
  },
  createSite: ({name, url, port}) => {
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
  authUser: (token) => {
    return ApiManager.fetch({
      url:'/auth/authenticate',
      method: 'POST',
      body: {
        token
      }
    })
  },
  signin: (email, password) => {
    return ApiManager.fetch({
      url:'/auth/signin',
      method: 'POST',
      body: {
        email,
        password
      }
    })
  },
  signup: (email, password) => {
    return ApiManager.fetch({
      url: '/auth/signup',
      method: 'POST',
      body: {
        email,
        password
      }
    })
  }
}