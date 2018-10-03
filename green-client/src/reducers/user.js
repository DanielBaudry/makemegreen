export const SET_USER = 'SET_USER'

const initialState = null

export function user(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return action.user
        default:
            return state
    }
}

export function setUser(user) {
    console.log("setUser function: ", user)
    return {
        type: SET_USER,
        user,
    }
}