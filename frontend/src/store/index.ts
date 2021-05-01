//Imports
import { combineReducers, createStore } from "redux";
//App Imports
import { Actor } from "../actor";
import { User, userReducer, UserState } from "../user/store";

export interface State {
    user: UserState;
}

export type Model = Actor | User;

export default createStore(combineReducers({ user: userReducer }));
