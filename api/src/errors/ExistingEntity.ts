export default class ExistingEntity extends Error {
    constructor(entityName: string, criteria: string) {
        super();
        this.message = `${entityName} with ${criteria} already exists`;
        this.statusCode = 400;
    }
}
