export const USER_LOGIN = "USER/LOGIN";
export const USER_LOGOUT = "USER/LOGOUT";
export interface LoginUserAction {
    type: typeof USER_LOGIN,
    username: string
}

export interface LogoutUserAction {
    type: typeof USER_LOGOUT
}

export type UserActionTypes = LoginUserAction | LogoutUserAction | { type?: undefined };

export const userLogin = (username: string): any => {
    return (dispatch: any) => dispatch({ type: USER_LOGIN, username });
}

export const userLogout = (): any => {
    return (dispatch: any) => dispatch({ type: USER_LOGOUT });
}