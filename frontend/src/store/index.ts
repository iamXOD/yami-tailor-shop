//Imports
import { createStore, combineReducers } from "redux";

//App Imports
import actorReducer from "./actor/reducer";
import userReducer from "./user/reducer";

export default createStore(combineReducers({ user: userReducer, actor: actorReducer }));