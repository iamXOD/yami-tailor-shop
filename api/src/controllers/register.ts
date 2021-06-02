//Imports
import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { AddControllerType, addGroupAlways } from ".";
import { validateAndThrowError } from "../errors";
import { UserEntity } from "../models";

export const registerController: AddControllerType<UserEntity> = async (
    plainUser
) => {
    const user = plainToClass(UserEntity, plainUser, addGroupAlways);

    await validateAndThrowError(user);

    await getRepository(UserEntity).save(user);

    return {
        username: user.username,
        admin: user.admin,
    } as UserEntity;
};
