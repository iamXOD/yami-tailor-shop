//Imports
import express, { Request, NextFunction, Response } from "express";

//Setup
const orderRouter = express.Router();

orderRouter.get(
    "/orders",
    (req: Request, res: Response, next: NextFunction) => {
        req.dao
            .all("order")
            .then((data) => res.json(data))
            .catch((err) => next(err));
    }
);

orderRouter.get(
    "/order/:id",
    (req: Request, res: Response, next: NextFunction) => {
        req.dao
            .get("order", Number(req.params.id))
            .then((data) => res.json(data))
            .catch((err) => next(err));
    }
);

orderRouter.post(
    "/order/add",
    (req: Request, res: Response, next: NextFunction) => {
        req.dao
            .insert("order", req.body)
            .then((data) => res.json(data))
            .catch((err) => next(err));
    }
);

orderRouter.post(
    "/order/update",
    (req: Request, res: Response, next: NextFunction) => {
        req.dao
            .update("order", req.body)
            .then((data) => res.json(data))
            .catch((err) => next(err));
    }
);

orderRouter.get(
    "/order/delete/:id",
    (req: Request, res: Response, next: NextFunction) => {
        req.dao
            .remove("order", Number(req.params.id))
            .then((data) => res.json(data))
            .catch((err) => next(err));
    }
);

export default orderRouter;
