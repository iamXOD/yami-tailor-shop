import { getWrapper } from "./db-wrapper";

let dbWrapper: dbUtil.Wrapper

const dao: dbUtil.DAO = {
    setURL(dbURL) {
        dbWrapper = getWrapper(dbURL);
    },
    all(collection) {
        return dbWrapper((resolve, reject, db) => {
            const sql = `SELECT * FROM ${collection}`;
            db.all(sql, [], (err, rows) => {
                if (err) { reject(err) }
                resolve(rows);
            })
        });
    },

    get(collection, id) {
        const sql = `SELECT * FROM ${collection} WHERE ${collection}_id = ?`;
        return this.find(sql, [id]).then(row => {
            if (!row) { throw new Error(`${collection} with id ${id} not found`) }
            return row;
        })
    },

    insert(collection, newObject) {
        const props = Object.keys(newObject);
        const propsString = props.join(", ");
        const valuesString = props.length == 1 ? "?" : "?,".repeat(props.length - 1) + "?";
        const sql = `INSERT INTO ${collection} (${propsString})VALUES (${valuesString})`;
        const values = props.map(prop => newObject[prop]);
        return this.query(sql, [...values]);
    },

    update(collection, newObject) {
        const idName = collection + "_id";
        const id = newObject.id;
        const props = Object.keys(newObject).filter(value => value != "id");
        const queryString = props.map(value => `${value} = ?`).join(", ");
        const values = props.map(value => newObject[value]);
        const sql = `UPDATE ${collection} SET ${queryString} WHERE ${idName} = ?`;
        return this.query(sql, [...values, id]);
    },

    remove(collection, id) {
        const sql = `DELETE FROM ${collection} WHERE ${collection}_id = ?`;
        return this.query(sql, [id]);
    },

    find(query, params) {
        return dbWrapper((resolve, reject, db) => {
            db.get(query, params, (err, row) => {
                if (err) { reject(err) };
                resolve(row);
            })
        })
    },

    query(query, params) {
        return dbWrapper((resolve, reject, db) => {
            db.run(query, params, function (err) {
                if (err) { reject(err) }
                resolve({ lastID: this.lastID, changes: this.changes });
            })
        })
    },

    getUser(username) {
        const sql = `SELECT * FROM user WHERE username = ?`;
        return this.find(sql, [username]);
    }
}
export = dao