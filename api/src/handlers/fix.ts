//App Imports
import { FixController } from "../controllers";
import { buildHandler } from "./methods";
import { addActorId } from "./options";

const addCostumerId = addActorId("costumerId");

export const FixHandler = buildHandler(FixController, {
    all: addCostumerId,
});
