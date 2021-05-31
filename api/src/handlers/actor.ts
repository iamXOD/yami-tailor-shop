//AppImports
import { ActorController } from "../controllers";
import { buildHandler } from "./methods";

export const ActorHandler = buildHandler(ActorController);
