//Imports
import express, { Request, Response, NextFunction } from "express";

//App Imports
import dao from "../../db/dao";
import { databaseURL } from "../../config";

//Setup
const daoRouter = express.Router();
dao.setURL(databaseURL);

daoRouter.use((req: Request, _res: Response, next: NextFunction) => {
    req.dao = dao;
    next();
})

export = daoRouter;