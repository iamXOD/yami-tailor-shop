import express, { NextFunction, Response, Request } from "express";
import { verify } from "./middleware/auth";
import dao from "../db/dao";
import { databaseURL } from "../config";

const investmentRouter = express.Router();
dao.setURL(databaseURL);

investmentRouter.get("/investments", verify, (_req: Request, res: Response, next: NextFunction) => {
    dao.all("investment").then(data => res.json(data))
        .catch(err => next(err));
});

investmentRouter.get("/investment/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.get("investment", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

investmentRouter.post("/investment/add", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.insert("investment", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

investmentRouter.post("/investment/update", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.update("investment", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

investmentRouter.get("/investment/delete/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.remove("investment", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

export = investmentRouter;