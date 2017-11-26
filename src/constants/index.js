/*eslint no-undef: "off"*/

import * as Config from './server-config.js'

// -- redux state --
export const SIGNIN = 'SIGNIN'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const LOADING = 'LOADING'

export const GET_SITES = 'GET_SITES'

export const config = Config

export const downloadTypes = {
  DAILY: 2,
  HOURLY: 1,
  EVERY: 3
}
