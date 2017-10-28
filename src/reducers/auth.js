import { AUTH_ERROR, AUTH_SUCCESS, SIGNIN_ERROR, SIGNIN_SUCCESS } from 'src/constants'

import _ from 'lodash'

const initialState = {
  isSuccess: false,
  isError: false,
  message: ''
}

export default (state = initialState, {type, data}) => {
  let newState = _.cloneDeep(state)
  switch(type) {

  case AUTH_SUCCESS:
  case SIGNIN_SUCCESS: {
    return _.merge(initialState, {
      isSuccess: true
    })
  }

  case AUTH_ERROR:
  case SIGNIN_ERROR: {
    return _.merge(initialState, {
      isError: true,
      message: data
    })
  }

  default:
    return newState
  }
}

