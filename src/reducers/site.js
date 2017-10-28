import { GET_SITES } from 'src/constants'
import _ from 'lodash'

const initialState = {
  isSuccess: false,
  sites: []
}

export default (state = initialState, { type, data }) => {
  let newState = _.cloneDeep(state)
  switch (type) {
  case GET_SITES: {
    return _.merge(initialState, {
      isSuccess: true,
      sites: data
    })
  }

  default:
    return newState
  }
}

