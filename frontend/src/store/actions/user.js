export const USER_LOGIN = "USER/LOGIN"
export const USER_LOGOUT = "USER/LOGOUT"

export function userLogin(username) {
    return dispatch => dispatch({ type: USER_LOGIN, username })
}

export function userLogout() {
    return dispatch => dispatch({ type: USER_LOGOUT })
}