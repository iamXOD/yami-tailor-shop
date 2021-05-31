//App Imports
import { FixController } from "../controllers";
import { buildHandler } from "./methods";
import { addActorId } from "./options";

const addCostumerId = addActorId("costumerId");

export const FixHandler = buildHandler(FixController, {
    list: addCostumerId,
    get: addCostumerId,
    remove: addCostumerId,
});
