//App Imports
import { MaterialController } from "../controllers";
import genericHandler from "./genericHandler";
import investmentRouter from "./investment";
import materialTypeRouter from "./materialType";
import orderRouter from "./order";

const MATERIAL_ID_ROUTE = "/:materialId(\\d+)";

export default genericHandler(MaterialController)
    .use("/types", materialTypeRouter)
    .use(MATERIAL_ID_ROUTE + "/investments", investmentRouter)
    .use(MATERIAL_ID_ROUTE + "/orders", orderRouter);
