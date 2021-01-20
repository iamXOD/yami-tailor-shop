declare namespace Express {
    export interface Request {
        user?: Model.User
    }
}
interface Error {
    statusCode?: number
}