import Api from 'src/common/Api'
import { GET_SITES } from 'src/constants'

export const getSites = () => {
  return dispatch => {
    Api.getSite()
      .then(res => {
        dispatch({
          type: GET_SITES,
          data: res.data
        })
      })
  }
}