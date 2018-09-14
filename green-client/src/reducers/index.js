import { combineReducers } from 'redux'

import data from './data'
import { user } from './user'

const rootReducer = combineReducers({
  data,
  user
})

export default rootReducer
