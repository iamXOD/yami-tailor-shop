//App Imports
import { stringify } from "../util";

export class EntityNotFoundError extends Error {
    constructor(entityName: string, criteria?: Record<string, unknown>) {
        super();
        this.message = `${entityName}${getCriteria(criteria)} was not found`;
        this.status = 404;
    }
}

function getCriteria(item?: Record<string, unknown>) {
    return item ? ` with ${stringify(item)}` : "";
}
