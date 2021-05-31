//App Imports
import { OrderController } from "../controllers";
import { buildHandler } from "./methods";
import { addActorId, addMaterialId, OptionsFn } from "./options";

const addMaterialIdAndCostumerId: OptionsFn = (req) =>
    addActorId("costumerId")(req, addMaterialId(req));

export const OrderHandler = buildHandler(OrderController, {
    list: addMaterialIdAndCostumerId,
    get: addMaterialIdAndCostumerId,
    remove: addMaterialIdAndCostumerId,
});
