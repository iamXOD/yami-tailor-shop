import express, { Request, NextFunction, Response } from "express";
import { verify } from "./middleware/auth";
import dao from "../db/dao";
import { databaseURL } from "../config";

const materialTypeRouter = express.Router();
dao.setURL(databaseURL);

materialTypeRouter.get("/material_types", verify, (_req: Request, res: Response, next: NextFunction) => {
    dao.all("material_type").then(data => res.json(data))
        .catch(err => next(err));
})
materialTypeRouter.get("/material_type/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.get("material_type", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})
materialTypeRouter.post("/material_type/add", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.insert("material_type", req.body).then(data => res.json(data))
        .catch(err => next(err));
})
materialTypeRouter.post("/material_type/update", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.update("material_type", req.body).then(data => res.json(data))
        .catch(err => next(err));

})
materialTypeRouter.get("/material_type/delete/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.remove("material_type", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

export = materialTypeRouter;