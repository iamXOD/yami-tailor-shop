//Imports
import { Router } from "express";
//Controllers
import actorController from "../controllers/Actor";
import fixController from "../controllers/Fix";
import investmentController from "../controllers/Investment";
import materialController from "../controllers/Material";
import orderController from "../controllers/Order";
//Middleware
import { auth } from "../middlewares/auth";
import errorHandler from "../middlewares/error";
import requestLogger from "../middlewares/logger";
import notFoundRouter from "../middlewares/not-found";
//Services
import { errorLogger, traceLogger } from "../services/logger";
import materialTypeRouter from "./material-type";
//Routes
import genericRouter from "./requestHandler";
import userRouter from "./user";

export default Router()
    //Logger
    .use(requestLogger(traceLogger))
    //Auth
    .use(auth)
    //CRUD
    .use("/actors", genericRouter(actorController))
    .use("/fixes", genericRouter(fixController))
    .use("/investments", genericRouter(investmentController))
    .use("/materials", genericRouter(materialController))
    .use("/orders", genericRouter(orderController))
    .use(materialTypeRouter)
    .use(userRouter)
    //Wildcard router
    .use(notFoundRouter)
    //Error Handler
    .use(errorHandler(errorLogger));
