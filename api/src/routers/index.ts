//Imports
import { Router } from "express";
//Routes
import actorRouter from "./actor";
import fixRouter from "./fix";
import investmentRouter from "./investment";
import materialRouter from "./material";
import notFoundRouter from "./notFound";
import orderRouter from "./order";
import userRouter from "./user";

export default Router()
    //CRUD
    .use("/actors", actorRouter)
    .use("/fixes", fixRouter)
    .use("/investments", investmentRouter)
    .use("/materials", materialRouter)
    .use("/orders", orderRouter)
    .use(userRouter)
    //Wildcard router
    .use(notFoundRouter);
