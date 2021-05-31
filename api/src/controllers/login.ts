//Imports
import { plainToClass } from "class-transformer";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
//App Imports
import config from "../config";
import { AuthenticationError, validateAndThrowError } from "../errors";
import { loginGroups } from "../models/constants";
import UserEntity from "../models/User";

export type LoginControllerType = (user: UserEntity) => Promise<string>;

export const loginController: LoginControllerType = async (user) => {
    await validateAndThrowError(plainToClass(UserEntity, user), {
        groups: loginGroups,
        always: true,
    });

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
