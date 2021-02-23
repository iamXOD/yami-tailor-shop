//Imports
import sqlite3 from "sqlite3";

//App Imports
import logger from "../services/logger";

export function getWrapper(url: string): dbUtil.Wrapper {
    const dbURL = url || "./storage.sqlite3";

    return function (action) {
        const db = new sqlite3.Database(
            dbURL,
            sqlite3.OPEN_READWRITE,
            (error) => {
                if (error) {
                    throw error;
                }
                logger.log("info", `Database connected on: ${dbURL}`);
            }
        );
        const value = new Promise((resolve, reject) => {
            action(resolve, reject, db);
        });
        db.close((err) => {
            if (err) {
                throw err;
            }
            logger.log("info", "Database closed");
        });
        return value;
    };
}
