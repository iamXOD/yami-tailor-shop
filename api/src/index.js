const http = require("http");
const apiServer = require("./server");
const config = require("./config");

const PORT = process.env.PORT || config.port;


http.createServer(apiServer).listen(PORT, () => {
    console.log("Server up and running on:", `http://localhost:${PORT}`);
})