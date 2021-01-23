//App Imports
import { UserActionTypes, USER_LOGIN, USER_LOGOUT } from "../actions/user";
import { UserState } from "../../types";

const initialState: UserState = {
    isAuthenticated: false,
    username: undefined
}

export default (state = initialState, action: UserActionTypes = {}): UserState => {
    console.log("state:", state);
    console.log("action:", action);

    switch (action.type) {
        case USER_LOGIN:
            return {
                isAuthenticated: true,
                username: action.username
            }
        case USER_LOGOUT:
            localStorage.removeItem("token");
            return initialState;
        default:
            return state;
    }
}