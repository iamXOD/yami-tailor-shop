declare namespace Express {
    export interface Request {
        user: import("../models/User").default | null;
    }
}
interface Error {
    status: number;
}
