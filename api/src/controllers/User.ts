//Imports
import { plainToClass } from "class-transformer";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
//App Imports
import config from "../config";
import { validateAndThrowError } from "../errors/AggregateError";
import EntityNotFound from "../errors/EntityNotFound";
import ExistingEntity from "../errors/ExistingEntity";
//Types
import UserEntity from "../models/User";

export async function list(): Promise<UserEntity[]> {
    return plainToClass(UserEntity, await getRepository(UserEntity).find());
}

export async function get(username: string): Promise<UserEntity> {
    const user = plainToClass(
        UserEntity,
        await getRepository(UserEntity).findOne({
            username: username.toLowerCase(),
        })
    );
    if (!user) {
        throw new EntityNotFound("User", `username: ${username}`);
    }
    return user;
}

export async function register(user: UserEntity): Promise<UserEntity> {
    const correctUser = plainToClass(UserEntity, user);

    await validateAndThrowError(correctUser);

    const userRepo = getRepository(UserEntity);
    if (await userRepo.findOne({ username: user.username.toLowerCase() })) {
        throw new ExistingEntity("User", `username: ${user.username}`);
    }

    await userRepo.save(correctUser);
    return user;
}

export async function login(user: UserEntity): Promise<string> {
    const correctUser = plainToClass(UserEntity, user);

    await validateAndThrowError(correctUser);

    const realUser = await getRepository(UserEntity).findOne({
        username: correctUser.username.toLowerCase(),
    });
    if (realUser && (await realUser.comparePassword(correctUser.password))) {
        return jwt.sign(
            { username: realUser.username, admin: !!realUser.admin },
            config.secret
        );
    } else {
        const error = new Error();
        error.message = "Authentication Failed. Incorrect username or password";
        error.statusCode = 403;
        throw error;
    }
}
