//App Imports
import { InvestmentController } from "../controllers";
import { buildHandler } from "./methods";
import { addActorId, addMaterialId, OptionsFn } from "./options";

const addMaterialIdAndSupplierId: OptionsFn = (req) =>
    addActorId("supplierId")(req, addMaterialId(req));

export const InvestmentHandler = buildHandler(InvestmentController, {
    list: addMaterialIdAndSupplierId,
    get: addMaterialIdAndSupplierId,
    remove: addMaterialIdAndSupplierId,
});
