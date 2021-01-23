//Imports
import express, { Request, Response, NextFunction } from "express";

//Setup
const actorRouter = express.Router();

actorRouter.get("/actors", (req: Request, res: Response, next: NextFunction) => {
    req.dao.all("actor").then((data: any[]) => res.json(data))
        .catch(err => next(err));
})

actorRouter.get("/actor/:id", (req: Request, res: Response, next: NextFunction) => {
    req.dao.get("actor", Number(req.params.id)).then((data: any) => res.json(data))
        .catch(err => next(err));
})

actorRouter.post("/actor/add", (req: Request, res: Response, next: NextFunction) => {
    req.dao.insert("actor", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

actorRouter.post("/actor/update", (req: Request, res: Response, next: NextFunction) => {
    req.dao.update("actor", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

actorRouter.get("/actor/delete/:id", (req: Request, res: Response, next: NextFunction) => {
    req.dao.remove("actor", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

export = actorRouter;