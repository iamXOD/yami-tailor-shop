//Imports
import { plainToClass } from "class-transformer";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
//App Imports
import {
    addOrEditControllerType as addOrEditController,
    loginControllerType,
} from ".";
import config from "../config";
import { AuthenticationError, validateAndThrowError } from "../errors";
import UserEntity from "../models/User";
import { addGroupAlways, loginGroupAlways } from "./constants";
import { getController, listController } from "./GenericController";

export const list = listController(UserEntity);

export const getByName = getController(UserEntity);

export const register: addOrEditController<UserEntity> = async (plainUser) => {
    const user = plainToClass(UserEntity, plainUser, addGroupAlways);

    await validateAndThrowError(user);

    await getRepository(UserEntity).save(user);

    return {
        username: user.username,
        admin: user.admin,
    } as UserEntity;
};

export const login: loginControllerType = async (user) => {
    await validateAndThrowError(
        plainToClass(UserEntity, user),
        loginGroupAlways
    );

    const realUser = await getRepository(UserEntity).findOne({
        username: user.username.toLowerCase(),
    });

    if (realUser && (await realUser.comparePassword(user.password))) {
        return jwt.sign(
            { username: realUser.username, admin: !!realUser.admin },
            config.secret
        );
    } else {
        throw new AuthenticationError();
    }
};

export default {
    list,
    getByName,
    register,
    login,
};
