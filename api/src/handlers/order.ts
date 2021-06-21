//App Imports
import { OrderController } from "../controllers";
import { buildHandler } from "./methods";
import { addActorId, addMaterialId, OptionsFn } from "./options";

const addMaterialIdAndCostumerId: OptionsFn = (req, options) =>
    addActorId("costumerId")(req, addMaterialId(req, options));

export const OrderHandler = buildHandler(OrderController, {
    all: addMaterialIdAndCostumerId,
});
