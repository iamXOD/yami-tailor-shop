//Imports
import express, { Request, Response, NextFunction } from "express";

//Setup
const fixRouter = express.Router();

fixRouter.get("/fixes",  (req: Request, res: Response, next: NextFunction) => {
    req.dao.all("fix").then(data => res.json(data))
        .catch(err => next(err));
});

fixRouter.get("/fix/:id",  (req: Request, res: Response, next: NextFunction) => {
    req.dao.get("fix", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

fixRouter.post("/fix/add",  (req: Request, res: Response, next: NextFunction) => {
    req.dao.insert("fix", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

fixRouter.post("/fix/update",  (req: Request, res: Response, next: NextFunction) => {
    req.dao.update("fix", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

fixRouter.get("/fix/delete/:id",  (req: Request, res: Response, next: NextFunction) => {
    req.dao.remove("fix", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

export = fixRouter;