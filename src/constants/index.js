/*eslint no-undef: "off"*/

import * as devConfig from './server-config-dev.js'
import * as prodConfig from './server-config-prod.js'

// -- redux state --
export const SIGNIN = 'SIGNIN'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const LOADING = 'LOADING'

export const GET_SITES = 'GET_SITES'

export const config = process.env.NODE_ENV === 'production' ? prodConfig.default : devConfig.default
