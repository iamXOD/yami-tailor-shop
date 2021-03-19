export default class EntityNotFound extends Error {
    constructor(entityName: string, criteria: string) {
        super();
        this.statusCode = 404;
        this.message = `${entityName} with ${criteria} was not found`;
    }
}
