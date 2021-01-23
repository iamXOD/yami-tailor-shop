//Imports
import express, { NextFunction, Response, Request } from "express";

//Setup
const investmentRouter = express.Router();

investmentRouter.get("/investments", (req: Request, res: Response, next: NextFunction) => {
    req.dao.all("investment").then(data => res.json(data))
        .catch(err => next(err));
});

investmentRouter.get("/investment/:id", (req: Request, res: Response, next: NextFunction) => {
    req.dao.get("investment", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

investmentRouter.post("/investment/add", (req: Request, res: Response, next: NextFunction) => {
    req.dao.insert("investment", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

investmentRouter.post("/investment/update", (req: Request, res: Response, next: NextFunction) => {
    req.dao.update("investment", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

investmentRouter.get("/investment/delete/:id", (req: Request, res: Response, next: NextFunction) => {
    req.dao.remove("investment", Number(req.params.id)).then(data => res.json(data))
        .catch(err => next(err));
})

export = investmentRouter;