import moment from 'moment'
import get from 'lodash.get'
import { put, select, takeEvery } from 'redux-saga/effects'

import { resetData } from '../reducers/data'
import { setUser } from '../reducers/user'

function* fromWatchRequestSignActions(action) {
    yield put(setUser(false)) // false while querying
}

function* fromWatchFailSignActions(action) {
    yield put(setUser(null)) // null otherwise
}

function* fromWatchSuccessGetSignoutActions() {
    yield put(resetData())
    yield put(setUser(null))
}

function* fromWatchSuccessPatchUsers(action) {
    const loggedUserId = yield select(state => get(state, 'user.id'))

    if (!loggedUserId) {
        console.warn('You should have a loggedUserId here')
        return
    }

    if (loggedUserId === get(action, 'data.id')) {
        yield put(setUser(action.data))
    }
}

function* fromWatchSuccessSignActions() {
    console.log("3")
    const user = yield select(state => get(state, 'data.users[0]'))
    const currentUser = yield select(state => state.user)
    console.log("4: " , currentUser, user)
    if (user && !currentUser) {
        console.log("5")
        yield put(setUser(user))
    } else if (!user) {
        console.log("5 bis")
        yield put(setUser(false))
    }
}

export function* watchUserActions() {
    yield takeEvery(
        ({ type }) =>
            /REQUEST_DATA_POST_USERS\/SIGN(.*)/.test(type) ||
            /REQUEST_DATA_GET_USERS\/CURRENT(.*)/.test(type),
        fromWatchRequestSignActions
    )
    yield takeEvery(
        ({ type }) =>
            /FAIL_DATA_POST_USERS\/SIGN(.*)/.test(type) ||
            /FAIL_DATA_GET_USERS\/CURRENT(.*)/.test(type),
        fromWatchFailSignActions
    )
    yield takeEvery(
        ({ type }) =>
            /SUCCESS_DATA_POST_USERS\/SIGN(.*)/.test(type) ||
            /SUCCESS_DATA_GET_USERS\/CURRENT(.*)/.test(type),
        fromWatchSuccessSignActions
    )
    yield takeEvery(
        ({ type }) =>
            /SUCCESS_DATA_PATCH_USERS/.test(type),
        fromWatchSuccessPatchUsers
    )

    yield takeEvery(
        ({ type }) => /SUCCESS_DATA_GET_USERS\/SIGNOUT(.*)/.test(type),
        fromWatchSuccessGetSignoutActions
    )
}