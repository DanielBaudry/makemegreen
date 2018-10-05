import { delay } from 'redux-saga'
import { call, put, race, select, takeEvery } from 'redux-saga/effects'

import { failData, successData } from '../reducers/data'
import { fetchData } from '../utils/data'

const fromWatchRequestDataActions = (extraConfig={}) =>
    function* (action) {
        // UNPACK
        const { method, path } = action

        // CONFIG
        const config = Object.assign({}, extraConfig, action.config)
        const { body, encode, timeout, url } = config
        const fetch = config.fetchData || fetchData

        // DATA
        try {

            // RACE
            let fetchResult, timeoutResult
            if (timeout) {
                const raceResult = yield race({
                    fetchResult: call(fetch, method, path, { body, encode, url }),
                    timeoutResult: call(delay, timeout)
                })
                fetchResult = raceResult.fetchResult
                timeoutResult = raceResult.timeoutResult
            } else {
                fetchResult = yield call(fetch, method, path, { body, encode, url })
            }

            // RESULT
            if (fetchResult) {

                // PASSING CONFIG
                const { ok, status } = fetchResult
                Object.assign(config, { ok, status })

                // SUCCESS OR FAIL
                if (fetchResult.data) {
                    yield put(successData(method, path, fetchResult.data, config))
                } else if (fetchResult.errors) {
                    console.error(fetchResult.errors)
                    yield put(failData(method, path, fetchResult.errors, config))
                } else {
                    console.warn(`expected a fetched data or a errors from ${method} ${path}`)
                }
            } else if (timeoutResult) {
                // TIMEOUT
                const errors = [{
                    global: ['La connexion au serveur est trop faible'],
                }]
                console.error(errors)
                yield put(failData(method, path, errors, config))
            }

        } catch (error) {

            // catch is a normally a fail of the api
            Object.assign(config, { ok: false, status: 500 })
            const errors = [
                {
                    global: ['Erreur serveur. Tentez de rafraîchir la page.'],
                },
                {
                    data: [String(error)]
                }
            ]
            console.error(errors)
            yield put(failData(method, path, errors, config))
        }
    }

function* fromWatchFailDataActions(action) {
    if (action.config.handleFail) {
        const state = yield select(state => state)
        yield call(action.config.handleFail, state, action)
    }
}

function* fromWatchSuccessDataActions(action) {
    if (action.config.handleSuccess) {
        const state = yield select(state => state)
        yield call(action.config.handleSuccess, state, action)
    }
}

export function* watchDataActions(config = {}) {
    yield takeEvery(
        ({ type }) => {
            const is_request = /REQUEST_DATA_(.*)/.test(type)
            return is_request

        },
        fromWatchRequestDataActions(config)
    )
    yield takeEvery(
        ({ type }) => {
            const is_fail = /FAIL_DATA_(.*)/.test(type)
            return is_fail

        },
        fromWatchFailDataActions
    )
    yield takeEvery(
        ({ type }) => /SUCCESS_DATA_(.*)/.test(type),
        fromWatchSuccessDataActions
    )
}