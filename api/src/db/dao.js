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
    const sql = `SELECT * FROM ${collection} WHERE ${collection}_id = ?`;
    return find(sql, [id]).then(row => {
        if (!row) { throw new Error(`${collection} with id ${id} not found`) }
        return row;
    })
}

insert = function(collection, newObject) {
    const props = Object.keys(newObject);
    const propsString = props.join(", ");
    const valuesString = props.length == 1 ? "?" : "?,".repeat(props.length - 1) + "?";
    const sql = `INSERT INTO ${collection} (${propsString})VALUES (${valuesString})`;
    const values = props.map(prop => newObject[prop])
    return query(sql, [...values]);
}

update = function(collection, newObject) {
    const idName = collection + "_id";
    const id = newObject[idName];
    const props = Object.keys(newObject).filter(value => value != idName);
    const query = props.map(value => `${value} = ?`).join(", ");
    const values = props.map(value => newObject[value]);
    const sql = `UPDATE ${collection} SET ${query} WHERE ${idName} = ?`;
    return query(sql, [...values, id]);

}

remove = function(collection, id) {
    const sql = `DELETE FROM ${collection} WHERE ${collection}_id = ?`;
    return query(sql, [id]);
}

find = function(query, params) {
    return dbWrapper((resolve, reject, db) => {
        db.get(query, params, (err, row) => {
            if (err) { reject(err) };
            resolve(row);
        })
    })
}

query = function(query, params) {
    return dbWrapper((resolve, reject, db) => {
        db.run(query, params, function(err) {
            if (err) { reject(err) }
            resolve({ lastID: this.lastID, changes: this.changes });
        })
    })
}

module.exports = {
    setURL,
    all,
    get,
    insert,
    update,
    remove,
    find,
    query
}