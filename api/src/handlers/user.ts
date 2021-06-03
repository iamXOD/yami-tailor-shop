//App Imports
import { UserController } from "../controllers";
import {
    addHandler,
    getByNameHandler,
    listHandler,
    loginHandler,
} from "./methods";
import { addUsername } from "./options";

export const UserHandler = {
    list: listHandler(UserController.list, undefined, "username"),
    getByName: getByNameHandler(UserController.getByName, addUsername),
    register: addHandler(UserController.register),
    login: loginHandler(UserController.login),
};
