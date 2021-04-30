//Imports
import { combineReducers, createStore } from "redux";
//App Imports
import { Actor, actorReducer, ActorState } from "../actor/store";
import { User, userReducer, UserState } from "../user/store";

export interface State {
    user: UserState;
    actor: ActorState;
}

export type Model = Actor | User;

export default createStore(
    combineReducers({ user: userReducer, actor: actorReducer })
);
