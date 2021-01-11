const Conection = require("./db-wrapper");
let dbWrapper

setURL = function(dbURL) {
    dbWrapper = Conection(dbURL);
}
all = function(collection) {
    return dbWrapper((resolve, reject, db) => {
        const sql = `SELECT * FROM ${collection}`;
        db.all(sql, [], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows);
        })
    });
};

get = function(collection, id) {
    return dbWrapper((resolve, reject, db) => {
        const sql = `SELECT * FROM ${collection} WHERE ${collection}_id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) { reject(err) }
            if (!row) { reject(`${collection} with id ${id} not found`) }
            resolve(row);
        })
    })
}

insert = function(collection, newObject) {
    return dbWrapper((resolve, reject, db) => {
        const props = Object.keys(newObject);
        const propsString = props.join(", ");
        const valuesString = props.length == 1 ? "?" : "?,".repeat(props.length - 1) + "?";
        const sql = `INSERT INTO ${collection} (${propsString})VALUES (${valuesString})`;
        const values = props.map(prop => newObject[prop])

        db.run(sql, [...values], function(err) {
            if (err) { reject(err) };
            resolve(this.lastID);
        })
    });
}

update = function(collection, newObject) {
    return dbWrapper((resolve, reject, db) => {
        const idName = collection + "_id";
        const id = newObject[idName];
        const props = Object.keys(newObject)
            .filter(value => value != idName);
        const query = props.map(value => `${value} = ?`)
            .join(", ");
        const values = props.map(value => newObject[value]);
        const sql = `UPDATE ${collection} SET ${query} WHERE ${idName} = ?`;
        db.run(sql, [...values, id], function(err) {
            if (err) { reject(err) }
            resolve(this.changes);
        })
    })
}

remove = function(collection, id) {
    return dbWrapper((resolve, reject, db) => {
        const sql = `DELETE FROM ${collection} WHERE ${collection}_id = ?`;
        db.run(sql, [id], function(err) {
            if (err) { reject(err) }
            resolve(this.changes);
        })
    })
}

module.exports = {
    setURL,
    all,
    get,
    insert,
    update,
    remove
}