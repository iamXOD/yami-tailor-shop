//Imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const actorRouter = require("./routers/actor");
const materialTypeRouter = require("./routers/material-type");
const userRouter = require("./routers/user");
const fixRouter = require("./routers/fix");
const materialRouter = require("./routers/material");
const orderRouter = require("./routers/order");
const investmentRouter = require("./routers/investment");

const errorHandler = require("./routers/middleware/error");

//Middleware
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routers
app.use(actorRouter);
app.use(materialTypeRouter);
app.use(userRouter);
app.use(fixRouter);
app.use(materialRouter);
app.use(investmentRouter);

//Error Handler
app.use(errorHandler);

//Export
module.exports = app;