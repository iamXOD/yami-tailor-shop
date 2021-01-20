import express, { Request, Response, NextFunction } from "express";
import { verify } from "./middleware/auth";
import dao from "../db/dao";
import { databaseURL } from "../config";

const fixRouter = express.Router();
dao.setURL(databaseURL);

fixRouter.get("/fixes", verify, (_req: Request, res: Response, next: NextFunction) => {
    dao.all("fix").then(data => res.json(data))
        .catch(err => next(err));
});

fixRouter.get("/fix/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.get("fix", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

fixRouter.post("/fix/add", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.insert("fix", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

fixRouter.post("/fix/update", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.update("fix", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

fixRouter.get("/fix/delete/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.remove("fix", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

export = fixRouter;