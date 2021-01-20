import express, { Request, Response, NextFunction } from "express";
import { verify } from "./middleware/auth";
import dao from "../db/dao";
import { databaseURL } from "../config";

const actorRouter = express.Router();
dao.setURL(databaseURL);

actorRouter.get("/actors", verify, (_req: Request, res: Response, next: NextFunction) => {
    dao.all("actor").then((data: any[]) => res.json(data))
        .catch(err => next(err));
})

actorRouter.get("/actor/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.get("actor", Number(req.params.id)).then((data: any) => res.json(data))
        .catch(err => next(err));
})

actorRouter.post("/actor/add", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.insert("actor", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

actorRouter.post("/actor/update", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.update("actor", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

actorRouter.get("/actor/delete/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.remove("actor", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

export = actorRouter;