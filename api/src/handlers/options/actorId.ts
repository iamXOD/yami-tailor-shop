//App Imports
import { addNumberParamToWhere, OptionsFn } from "./utils";

export function addActorId(actorIdPropName?: string): OptionsFn {
    return addNumberParamToWhere("actorId", actorIdPropName);
}
