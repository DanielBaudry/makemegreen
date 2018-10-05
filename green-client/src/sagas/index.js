import { all } from 'redux-saga/effects'

import { watchDataActions } from './data'
import { watchUserActions } from './user'
import { API_URL } from '../utils/config'

function* rootSaga() {
  yield all([
    watchDataActions({
      timeout: 10000,
      url: API_URL,
    }),
    watchUserActions()
  ])
}

export default rootSaga
