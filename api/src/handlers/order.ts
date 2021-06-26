//App Imports
import { OrderController } from "../controllers";
import { buildHandler } from "./methods";
import { addActorId, addMaterialId, pipe } from "./options";

const addMaterialIdAndCostumerId = pipe(
    addMaterialId,
    addActorId("costumerId")
);

export const OrderHandler = buildHandler(OrderController, {
    all: addMaterialIdAndCostumerId,
});
