//App Imports
import { InvestmentController } from "../controllers";
import { buildHandler } from "./methods";
import { addActorId, addMaterialId, pipe } from "./options";

const addMaterialIdAndSupplierId = pipe(
    addMaterialId,
    addActorId("supplierId")
);

export const InvestmentHandler = buildHandler(InvestmentController, {
    all: addMaterialIdAndSupplierId,
});
