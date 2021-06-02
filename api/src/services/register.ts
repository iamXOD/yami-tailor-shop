//Imports
import { createConnection } from "typeorm";
//App Imports
import { errorLogger } from ".";
import { UserController } from "../controllers";
import { UserEntity } from "../models";

async function registerFromConsole(): Promise<void> {
    const { argv } = process;

    if (argv.length < 4) {
        throw new Error("Input is missing data");
    }

    const user = {} as UserEntity;

    user.username = argv[2];
    user.password = argv[3];
    user.admin = argv[4] === "-a" || argv[4] === "-admin";

    await UserController.register(user);
}

createConnection()
    .then(async () => await registerFromConsole())
    .catch((err: Error) =>
        errorLogger.log("error", `${err.name} - ${err.message}`)
    );
