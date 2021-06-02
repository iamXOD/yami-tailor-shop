declare namespace Express {
    export interface Request {
        user: import("../models").UserEntity | null;
    }
}
interface Error {
    status: number;
}
