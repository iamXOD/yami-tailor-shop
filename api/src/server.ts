//Imports
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

//Routers
import actorRouter from "./routers/actor";
import materialTypeRouter from "./routers/material-type";
import userRouter from "./routers/user";
import fixRouter from "./routers/fix";
import materialRouter from "./routers/material";
import orderRouter from "./routers/order";
import investmentRouter from "./routers/investment";

//Middleware
import daoRouter from "./routers/middleware/db";
import { verify } from "./routers/middleware/auth";
import notFoundRouter from "./routers/middleware/not-found";
import errorHandler from "./routers/middleware/error";

//Middleware
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DAO Router
app.use(daoRouter);
app.use(verify);

//Routers
app.use(actorRouter);
app.use(materialTypeRouter);
app.use(userRouter);
app.use(fixRouter);
app.use(materialRouter);
app.use(investmentRouter);
app.use(orderRouter);

//Wildcar router
app.use(notFoundRouter);

//Error Handler
app.use(errorHandler);

//Export
export = app;