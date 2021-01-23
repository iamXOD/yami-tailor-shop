//Imports
import express, { Request, NextFunction, Response } from "express";

//Setup
const materialTypeRouter = express.Router();

materialTypeRouter.get("/material_types", (req: Request, res: Response, next: NextFunction) => {
    req.dao.all("material_type").then(data => res.json(data))
        .catch(err => next(err));
})
materialTypeRouter.get("/material_type/:id", (req: Request, res: Response, next: NextFunction) => {
    req.dao.get("material_type", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})
materialTypeRouter.post("/material_type/add", (req: Request, res: Response, next: NextFunction) => {
    req.dao.insert("material_type", req.body).then(data => res.json(data))
        .catch(err => next(err));
})
materialTypeRouter.post("/material_type/update", (req: Request, res: Response, next: NextFunction) => {
    req.dao.update("material_type", req.body).then(data => res.json(data))
        .catch(err => next(err));

})
materialTypeRouter.get("/material_type/delete/:id", (req: Request, res: Response, next: NextFunction) => {
    req.dao.remove("material_type", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

export = materialTypeRouter;