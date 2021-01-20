import express, { Request, Response, NextFunction } from "express";
import { verify } from "./middleware/auth";
import dao from "../db/dao";
import { databaseURL } from "../config";

const materialRouter = express.Router();
dao.setURL(databaseURL);

materialRouter.get("/materials", verify, (_req: Request, res: Response, next: NextFunction) => {
    dao.all("material").then(data => res.json(data))
        .catch(err => next(err));
});

materialRouter.get("/material/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.get("material", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

materialRouter.post("/material/add", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.insert("material", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

materialRouter.post("/material/update", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.update("material", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

materialRouter.get("/material/delete/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.remove("material", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

export = materialRouter;