//App Imports
import { stringify } from "../util";
import { ResourceNotFoundError } from "./ResourceNotFoundError";

export class EntityNotFoundError extends ResourceNotFoundError {
    constructor(entityName: string, criteria?: any) {
        super(`${entityName} ${getCriteria(criteria)}not found`);
    }
}

function getCriteria(item?: any) {
    return item ? `with ${stringify(item)} ` : "";
}
