import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from 'src/reducers'
export default () => {
  let middlewares = [thunk]
  let store = createStore(reducers, applyMiddleware(...middlewares))
  return store
}