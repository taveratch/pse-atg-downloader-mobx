import app from 'src/reducers/app'
import auth from 'src/reducers/auth'
import { combineReducers } from 'redux'
import site from 'src/reducers/site'

export default combineReducers({auth, app, site})