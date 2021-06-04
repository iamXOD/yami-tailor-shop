//Imports
import { plainToClass } from "class-transformer";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
//App Imports
import config from "../config";
import { UnauthorizedError, validateAndThrowError } from "../errors";
import { loginGroups, UserEntity } from "../models";

export type LoginControllerType = (user: UserEntity) => Promise<string>;

export const loginController: LoginControllerType = async (user) => {
    await validateAndThrowError(plainToClass(UserEntity, user), {
        groups: loginGroups,
        always: true,
    });

    const realUser = plainToClass(
        UserEntity,
        (await getRepository(UserEntity)
            .createQueryBuilder()
            .select("username")
            .addSelect("admin")
            .addSelect("salted_password")
            .where("username = :username", {
                username: user.username.toLocaleLowerCase(),
            })
            .getRawOne()) as UserEntity
    );

    if (realUser && (await realUser.comparePassword(user.password))) {
        return jwt.sign(
            { username: realUser.username, admin: !!realUser.admin },
            config.secret
        );
    } else {
        throw new UnauthorizedError(
            "Authentication Failed. Incorrect username or password"
        );
    }
};
