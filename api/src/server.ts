//Imports
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "reflect-metadata";
//Routers
import routes from "./routers";

//Middleware
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
app.use(routes);

//Export
export default app;
