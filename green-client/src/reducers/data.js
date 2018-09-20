import { getNextState } from '../utils/data'

export const ASSIGN_DATA = 'ASSIGN_DATA'
export const RESET_DATA = 'RESET_DATA'

const createData = (initialState = {}) => (
  state = initialState,
  action
) => {
  if (action.type === ASSIGN_DATA) {
    return Object.assign({}, state, action.patch)
  }
  if (action.type === RESET_DATA) {
    return initialState
  }
  if (
    /SUCCESS_DATA_(DELETE|GET|POST|PUT|PATCH)_(.*)/.test(action.type)
  ) {
    // unpack config
    const key =
      action.config.key ||
      action.path
        .replace(/\/$/, '')
        .split('?')[0]
        .split('/')[0]

    // resolve
    const nextState = getNextState(
      state,
      action.method,
      {
        // force casting into an array
        [key]: !Array.isArray(action.data) ? [action.data] : action.data,
      },
      Object.assign({ path: action.path }, action.config)
    )

    // last
    if (action.config.getSuccessState) {
      Object.assign(nextState, action.config.getSuccessState(state, action))
    }

    // return
    return Object.assign({}, state, nextState)
  }
  return state
}

// ACTIONS
export const assignData = patch => ({
  patch,
  type: ASSIGN_DATA,
})

export const failData = (method, path, errors, config) => ({
  config,
  errors,
  method,
  path,
  type: `FAIL_DATA_${method.toUpperCase()}_${path.toUpperCase()}${
    config.local ? ' (LOCAL)' : ''
  }`,
})

export const requestData = (method, path, config = {}) => ({
  config,
  method,
  path,
  type: `REQUEST_DATA_${method.toUpperCase()}_${path.toUpperCase()}${
    config.local ? ' (LOCAL)' : ''
  }`,
})

export const resetData = () => ({
  type: RESET_DATA,
})

export const successData = (method, path, data, config = {}) => ({
  config,
  data,
  method,
  path,
  type: `SUCCESS_DATA_${method.toUpperCase()}_${path.toUpperCase()}${
    config.local ? ' (LOCAL)' : ''
  }`,
})


const data = createData({
  footprints: []
})

export default data
