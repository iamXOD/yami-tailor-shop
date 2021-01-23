declare namespace Express {
    export interface Request {
        user?: Model.UserTable,
        dao?: dbUtil.DAO
    }
}
interface Error {
    statusCode?: number
}