import express, { Request, NextFunction, Response } from "express";
import { verify } from "./middleware/auth";
import dao from "../db/dao";
import { databaseURL } from "../config";

const orderRouter = express.Router();
dao.setURL(databaseURL);

orderRouter.get("/orders", verify, (_req: Request, res: Response, next: NextFunction) => {
    dao.all("order").then(data => res.json(data))
        .catch(err => next(err));
});

orderRouter.get("/order/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.get("order", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

orderRouter.post("/order/add", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.insert("order", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

orderRouter.post("/order/update", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.update("order", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

orderRouter.get("/order/delete/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.remove("order", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

export = orderRouter;