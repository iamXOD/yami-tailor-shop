//App Imports
import { InvestmentController } from "../controllers";
import { buildHandler } from "./methods";
import { addActorId, addMaterialId, OptionsFn } from "./options";

const addMaterialIdAndSupplierId: OptionsFn = (req, options) =>
    addActorId("supplierId")(req, addMaterialId(req, options));

export const InvestmentHandler = buildHandler(InvestmentController, {
    all: addMaterialIdAndSupplierId,
});
