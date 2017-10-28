import { GET_SITES, config } from 'src/constants'

import ApiManager from 'src/services/api-manager'

export const getSites = () => {
  return dispatch => {
    let options = {
      json: true
    }
    ApiManager.fetch(`${config.API_ENDPOINT}/site`, options)
      .then(res => {
        dispatch({
          type: GET_SITES,
          data: res.sites
        })
      })
  }
}