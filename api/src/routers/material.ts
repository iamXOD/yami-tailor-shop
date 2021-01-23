//Imports
import express, { Request, Response, NextFunction } from "express";

//Setup
const materialRouter = express.Router();

materialRouter.get("/materials", (req: Request, res: Response, next: NextFunction) => {
    req.dao.all("material").then(data => res.json(data))
        .catch(err => next(err));
});

materialRouter.get("/material/:id", (req: Request, res: Response, next: NextFunction) => {
    req.dao.get("material", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

materialRouter.post("/material/add", (req: Request, res: Response, next: NextFunction) => {
    req.dao.insert("material", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

materialRouter.post("/material/update", (req: Request, res: Response, next: NextFunction) => {
    req.dao.update("material", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

materialRouter.get("/material/delete/:id", (req: Request, res: Response, next: NextFunction) => {
    req.dao.remove("material", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

export = materialRouter;