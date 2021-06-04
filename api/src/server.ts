//Imports
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "reflect-metadata";
//App Imports
import {
    auth,
    finalErrorHandler,
    JSONErrorHandler,
    requestLogger,
} from "./middlewares";
import routes from "./routers";

export default express()
    //Logger
    .use(requestLogger)
    //Middleware
    .use(cors())
    .use(cookieParser())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    //Auth
    .use(auth)
    //Routers
    .use(routes)
    //Error Handler
    .use(JSONErrorHandler)
    .use(finalErrorHandler);
