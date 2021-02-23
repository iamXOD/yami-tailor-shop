declare namespace Express {
    export interface Request {
        user: Model.UserTable | null;
        dao: dbUtil.DAO;
    }
}
interface Error {
    statusCode: number;
}
