//App Imports
import { UserController } from "../controllers";
import {
    addHandler,
    getByNameHandler,
    listHandler,
    loginHandler,
} from "./methods";
import { addCurrentUsername, addUsername } from "./options";

export const UserHandler = {
    list: listHandler(UserController.list, undefined, "username"),
    getByName: getByNameHandler(UserController.getByName, addUsername),
    getCurrent: getByNameHandler(UserController.getByName, addCurrentUsername),
    register: addHandler(UserController.register),
    login: loginHandler(UserController.login),
};
