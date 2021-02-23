//Imports
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//Services
import logger from "./services/logger";

//Routers
import actorRouter from "./routers/actor";
import materialTypeRouter from "./routers/material-type";
import userRouter from "./routers/user";
import fixRouter from "./routers/fix";
import materialRouter from "./routers/material";
import orderRouter from "./routers/order";
import investmentRouter from "./routers/investment";

//Middleware
import daoRouter from "./middlewares/db";
import { verify } from "./middlewares/auth";
import notFoundRouter from "./middlewares/not-found";
import errorHandler from "./middlewares/error";
import loggerRouter from "./middlewares/logger";

//Middleware
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//Wildcard router
app.use(notFoundRouter);

//Logger
app.use(loggerRouter(logger));

//Error Handler
app.use(errorHandler);

//Export
export default app;
