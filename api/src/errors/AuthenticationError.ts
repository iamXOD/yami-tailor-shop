export class AuthenticationError extends Error {
    constructor() {
        super();
        this.message = "Authentication Failed. Incorrect username or password";
        this.status = 403;
    }
}
