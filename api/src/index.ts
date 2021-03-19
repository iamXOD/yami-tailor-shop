//Imports
import http from "http";
import { createConnection } from "typeorm";
//App Imports
import config from "./config";
import apiServer from "./server";
import { errorLogger, traceLogger } from "./services/logger";

createConnection()
    .then((connection) => {
        connection.runMigrations();
        http.createServer(apiServer).listen(config.port, () => {
            traceLogger.log(
                "info",
                `Server up and running on: http://${config.host}:${config.port}`
            );
        });
    })
    .catch((error: Error) => {
        errorLogger.log("error", `TypeORM connection error: ${error.stack}`);
    });
