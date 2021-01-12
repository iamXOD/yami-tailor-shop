//Imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const actorRouter = require("./routers/actor");
const materialTypeRouter = require("./routers/material-type");

//Middleware
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routers
app.use(actorRouter);
app.use(materialTypeRouter);

module.exports = app;