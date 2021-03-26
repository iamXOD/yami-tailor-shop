//App Imports
import { TODO } from "../../types";
import { User } from "../models";

export const USER_LOGIN = "USER/LOGIN";
export const USER_LOGOUT = "USER/LOGOUT";
export interface LoginUserAction {
    type: typeof USER_LOGIN;
    user: User;
}

export interface LogoutUserAction {
    type: typeof USER_LOGOUT;
}

export type UserActionTypes = LoginUserAction | LogoutUserAction;

export const userLogin = (username: string, admin: boolean): TODO => {
    return { type: USER_LOGIN, user: { username, admin } };
};

export const userLogout = (): TODO => {
    return { type: USER_LOGOUT };
};
