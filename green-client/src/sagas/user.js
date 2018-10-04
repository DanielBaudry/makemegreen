import get from 'lodash.get'
import { put, select, takeEvery } from 'redux-saga/effects'

import { resetData } from '../reducers/data'
import { setUser } from '../reducers/user'

function* fromWatchRequestSignActions(action) {
    console.log("fromWatchRequestSignActions")
    yield put(setUser(false)) // false while querying
}

function* fromWatchFailSignActions(action) {
    console.log("fromWatchFailSignActions")
    yield put(setUser(null)) // null otherwise
}

function* fromWatchSuccessGetSignoutActions() {
    console.log("fromWatchSuccessGetSignoutActions")
    yield put(resetData())
    yield put(setUser(null))
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

function* fromWatchSuccessPatchUsers(action) {
    const loggedUserId = yield select(state => get(state, 'user.id'))

    if (!loggedUserId) {
        console.warn('You should have a loggedUserId here')
        return
    }

    console.log("CA ne passe pas ici")
    if (loggedUserId === get(action, 'data.id')) {
        yield put(setUser(action.data))
    }
}

export function* watchUserActions() {
    yield takeEvery(
        ({ type }) =>
            /REQUEST_DATA_POST_\/?USERS\/SIGN(.*)/.test(type) ||
            /REQUEST_DATA_GET_\/?USERS\/CURRENT(.*)/.test(type),
        fromWatchRequestSignActions
    )
    yield takeEvery(
        ({ type }) => {
            console.log("type: ", type)
            const is_fail = / FAIL_DATA_POST_\/?USERS\/SIGN(.*)/.test(type) ||
            /FAIL_DATA_GET_\/?USERS\/CURRENT(.*)/.test(type)
            console.log("is_fail ", is_fail)
            return is_fail
        },
        fromWatchFailSignActions
    )
    yield takeEvery(
        ({ type }) => {
            console.log("type: ", type)
            const is_sucess = /SUCCESS_DATA_POST_\/?USERS\/SIGN(.*)/.test(type) ||
            /SUCCESS_DATA_GET_\/?USERS\/CURRENT(.*)/.test(type)
            console.log("is_success: ", is_sucess)
            return is_sucess

        },
        fromWatchSuccessSignActions
    )
    yield takeEvery(
        ({ type }) =>
            /SUCCESS_DATA_PATCH_\/?USERS/.test(type),
        fromWatchSuccessPatchUsers
    )
    yield takeEvery(
        ({ type }) => /SUCCESS_DATA_GET_\/?USERS\/SIGNOUT(.*)/.test(type),
        fromWatchSuccessGetSignoutActions
    )
}