import { LOADING } from 'src/constants'
import _ from 'lodash'

const initialState = {
  loading: false
}

export default (state = initialState, { type }) => {
  let newState = _.cloneDeep(state)
  switch (type) {
  case LOADING: {
    return _.merge(initialState, {
      loading: true
    })
  }
  default:
    return newState
  }
}