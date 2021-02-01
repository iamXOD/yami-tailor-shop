//Imports
import decode from "jwt-decode";
//App Imports
import { UserActionTypes, USER_LOGIN, USER_LOGOUT } from "./actions";
import { UserState } from "../../types";
import { storage } from "../../services";
import { User } from "../models";
import { isValidToken } from "../../util";

const token = storage.loadTOKEN();

const defaultUser: User = {
    username: "",
    admin: false
};

const initialState: UserState = {
    isAuthenticated: isValidToken(token),
    user: isValidToken(token) ? decode<User>(token) : defaultUser
}


export default (state = initialState, action: UserActionTypes): UserState => {
    console.log("state:", state);
    console.log("action:", action);

    switch (action.type) {
        case USER_LOGIN:
            return {
                isAuthenticated: true,
                user: action.user
            }
        case USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: defaultUser
            };
        default:
            return state;
    }
}