//Imports
import { combineReducers, createStore } from "redux";
//App Imports
import { Actor, actorReducer, ActorState } from "./actor";
import { User, userReducer, UserState } from "./user";

export interface State {
    user: UserState;
    actor: ActorState;
}

export type Model = Actor | User;

export default createStore(
    combineReducers({ user: userReducer, actor: actorReducer })
);
