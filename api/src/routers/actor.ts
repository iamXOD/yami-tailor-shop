//App Imports
import { ActorController } from "../controllers";
import fixRouter from "./fix";
import genericHandler from "./genericHandler";
import investmentRouter from "./investment";
import orderRouter from "./order";

const ACTOR_ID_ROUTE = "/:actorId(\\d+)";

export default genericHandler(ActorController)
    .use(ACTOR_ID_ROUTE + "/fixes", fixRouter)
    .use(ACTOR_ID_ROUTE + "/investments", investmentRouter)
    .use(ACTOR_ID_ROUTE + "/orders", orderRouter);
