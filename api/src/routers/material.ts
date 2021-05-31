//App Imports
import { MaterialHandler } from "../handlers";
import buildRouter from "./buildRouter";
import investmentRouter from "./investment";
import materialTypeRouter from "./materialType";
import orderRouter from "./order";

const MATERIAL_ID_ROUTE = "/:materialId(\\d+)";

export default buildRouter(MaterialHandler)
    .use("/types", materialTypeRouter)
    .use(MATERIAL_ID_ROUTE + "/investments", investmentRouter)
    .use(MATERIAL_ID_ROUTE + "/orders", orderRouter);
