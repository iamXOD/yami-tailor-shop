import http from "http";
import apiServer from "./server";
import config from "./config";

const PORT = process.env.PORT || config.port;


http.createServer(apiServer).listen(PORT, () => {
    console.log("Server up and running on:", `http://localhost:${PORT}`);
})