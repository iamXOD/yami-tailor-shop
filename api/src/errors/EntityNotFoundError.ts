//App Imports
import { ResourceNotFoundError } from "./ResourceNotFoundError";

export class EntityNotFoundError extends ResourceNotFoundError {
    constructor(entityName: string, criteria?: any) {
        super(`${entityName} ${stringify(criteria)}not found`);
    }
}

function stringify(item?: any) {
    return item ? `with ${JSON.stringify(item).replace(/(\/)?"/g, "'")} ` : "";
}
