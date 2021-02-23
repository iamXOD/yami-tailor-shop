//Imports
import http from "http";

//App Imports
import apiServer from "./server";
import config from "./config";
import logger from "./services/logger";

http.createServer(apiServer).listen(config.port, () => {
    logger.log(
        "info",
        `Server up and running on: http://${config.host}:${config.port}`
    );
});
