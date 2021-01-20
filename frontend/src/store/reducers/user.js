//App Imports
import { USER_LOGIN, USER_LOGOUT } from "../actions/user";

const initialState = {
    isAuthenticated: false,
    username: null
}

export default (state = initialState, action = {}) => {
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