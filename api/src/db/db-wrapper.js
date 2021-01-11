const sqlite3 = require("sqlite3");

module.exports = function(url) {
    dbURL = url || "./storage.sqlite3";

    return function wrapper(action) {
        const db = new sqlite3.Database(dbURL, sqlite3.OPEN_READWRITE, (error) => {
            if (error) { throw error }
            console.log(`Database at ${dbURL} connected`);
        });
        const value = new Promise((resolve, reject) => {
            action(resolve, reject, db);
        })
        db.close(err => {
            if (err) { throw err }
            console.log("Database closed");
        })
        return value;
    }
}