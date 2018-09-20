import uniqBy from 'lodash.uniqby'
import uuid from 'uuid'

const { NAME, VERSION } = process.env

const success_status_codes = [200, 201, 202, 203, 205, 206, 207, 208, 210, 226]

export async function fetchData(method, path, config = {}) {
  // unpack
  const { body, encode, token, url } = config

  // init
  const init = {
    method,
    credentials: 'include',
  }

  init.headers = {
    AppName: NAME,
    AppVersion: VERSION,
    'X-Request-ID': uuid(),
  }

  if (method && method !== 'GET' && method !== 'DELETE') {
    // encode
    if (encode !== 'multipart/form-data') {
      Object.assign(init.headers, {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
    }

    // body
    init.body =
      init.headers['Content-Type'] === 'application/json'
        ? JSON.stringify(body || {})
        : body
  }

  // token
  if (token) {
    if (!init.headers) {
      init.headers = {}
    }
    init.headers.Authorization = `Bearer ${token}`
  }

  // fetch
  const fetchResult = await fetch(`${url}/${path.replace(/^\//, '')}`, init)

  // prepare result
  const {
    ok,
    status
  } = fetchResult
  const result = {
    ok,
    status
  }

  // check
  if (success_status_codes.includes(status)) {

    // TODO: do we need that here precisely ?
    if (window.cordova) {
      window.cordova.plugins.CookieManagementPlugin.flush()
    }

    // success with data
    result.data = await fetchResult.json()
    return result
  }

  // fail with errors
  result.errors = await fetchResult.json()
  return result
}


export function getNextState(state, method, patch, config = {}) {
  // UNPACK
  const { normalizer, isMergingDatum, isMutatingDatum } = config
  const isMergingArray =
    typeof config.isMergingArray === 'undefined' ? true : config.isMergingArray
  const isMutatingArray =
    typeof config.isMutatingArray === 'undefined'
      ? true
      : config.isMutatingArray
  const nextState = config.nextState || {}

  if (!patch) {
    return state
  }

  // LOOP OVER ALL THE KEYS
  for (let key of Object.keys(patch)) {
    // PREVIOUS
    const previousData = state[key]

    // TREAT
    const data = patch[key]
    if (!data) {
      continue
    }
    let nextData = uniqBy(
      data.map((datum, index) => {

        // CLONE
        let nextDatum = Object.assign(
          // FORCE TO GIVE AN ID
          { id: index },
          datum
        )

        // MAYBE RESOLVE
        if (config.resolve) {
          nextDatum = config.resolve(nextDatum, data, config)
        }

        return nextDatum
      }),
      // UNIFY BY ID
      // (BECAUSE DEEPEST NORMALIZED DATA CAN RETURN ARRAY OF SAME ELEMENTS)
      datum => datum.id
    )

    // NORMALIZER
    if (normalizer) {
      Object.keys(normalizer).forEach(key => {
        let nextNormalizedData = []
        nextData.forEach(nextDatum => {
          if (Array.isArray(nextDatum[key])) {
            nextNormalizedData = nextNormalizedData.concat(nextDatum[key])
            // replace by an array of ids
            nextDatum[`${key}Ids`] = nextDatum[key].map(d => d.id)
            // delete
            delete nextDatum[key]
          } else if (nextDatum[key]) {
            nextNormalizedData.push(nextDatum[key])
            delete nextDatum[key]
          }
        })

        if (nextNormalizedData.length) {
          // ADAPT BECAUSE NORMALIZER VALUES
          // CAN BE DIRECTLY THE STORE KEYS IN THE STATE
          // OR AN OTHER CHILD NORMALIZER CONFIG
          // IN ORDER TO BE RECURSIVELY EXECUTED
          let nextNormalizer
          let storeKey
          if (typeof normalizer[key] === 'string') {
            storeKey = normalizer[key]
          } else {
            storeKey = normalizer[key].key
            nextNormalizer = normalizer[key].normalizer
          }

          // RECURSIVE CALL TO MERGE THE DEEPER NORMALIZED VALUE
          const nextNormalizedState = getNextState(
            state,
            null,
            { [storeKey]: nextNormalizedData },
            { nextState, normalizer: nextNormalizer }
          )

          // MERGE THE CHILD NORMALIZED DATA INTO THE
          // CURRENT NEXT STATE
          Object.assign(nextState, nextNormalizedState)
        }
      })
    }

    // no need to go further if no previous data
    if (!previousData) {
      nextState[key] = nextData
      continue
    }

    // DELETE CASE
    if (method === 'DELETE') {
      const nextDataIds = nextData.map(nextDatum => nextDatum.id)
      const resolvedData = previousData.filter(
        previousDatum => !nextDataIds.includes(previousDatum.id)
      )
      nextState[key] = resolvedData
      continue
    }

    // GET POST PATCH

    // no need to go further when we want just to trigger
    // a new fresh assign with nextData
    if (!isMergingArray) {
      nextState[key] = nextData
      continue
    }

    // Determine first if we are going to trigger a mutation of the array
    const resolvedData = isMutatingArray ? [...previousData] : previousData

    // for each datum we are going to assign (by merging or not) them into
    // their right place in the resolved array
    nextData.forEach(nextDatum => {
      const previousIndex = previousData.findIndex(
        previousDatum => previousDatum.id === nextDatum.id
      )
      const resolvedIndex =
        previousIndex === -1 ? resolvedData.length : previousIndex
      const datum = isMutatingDatum
        ? Object.assign(
            {},
            isMergingDatum && previousData[previousIndex],
            nextDatum
          )
        : isMergingDatum
          ? previousIndex !== -1
            ? Object.assign(previousData[previousIndex], nextDatum)
            : nextDatum
          : nextDatum
      resolvedData[resolvedIndex] = datum
    })

    // set
    nextState[key] = resolvedData
  }

  // return
  return nextState
}
