//App Imports
import { ActorHandler } from "../handlers";
import buildRouter from "./buildRouter";
import fixRouter from "./fix";
import investmentRouter from "./investment";
import orderRouter from "./order";

const ACTOR_ID_ROUTE = "/:actorId(\\d+)";

export default buildRouter(ActorHandler)
    .use(ACTOR_ID_ROUTE + "/fixes", fixRouter)
    .use(ACTOR_ID_ROUTE + "/investments", investmentRouter)
    .use(ACTOR_ID_ROUTE + "/orders", orderRouter);
