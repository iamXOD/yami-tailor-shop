import { Wrapper, getWrapper } from "./db-wrapper";
import { RunResult } from "sqlite3";

let dbWrapper: Wrapper

type CollectionName = "actor" | "fix" | "material_type"
    | "material" | "order" | "investment" | "user";

const setURL = function (dbURL: string): void {
    dbWrapper = getWrapper(dbURL);
}
const all = function (collection: CollectionName): Promise<any[]> {
    return dbWrapper((resolve, reject, db) => {
        const sql = `SELECT * FROM ${collection}`;
        db.all(sql, [], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows);
        })
    });
};

const get = function (collection: CollectionName, id: number) {
    const sql = `SELECT * FROM ${collection} WHERE ${collection}_id = ?`;
    return find(sql, [id]).then(row => {
        if (!row) { throw new Error(`${collection} with id ${id} not found`) }
        return row;
    })
}

const insert = function (collection: CollectionName, newObject: any) {
    const props = Object.keys(newObject);
    const propsString = props.join(", ");
    const valuesString = props.length == 1 ? "?" : "?,".repeat(props.length - 1) + "?";
    const sql = `INSERT INTO ${collection} (${propsString})VALUES (${valuesString})`;
    const values = props.map(prop => newObject[prop])
    return query(sql, [...values]);
}

const update = function (collection: CollectionName, newObject: any) {
    const idName = collection + "_id";
    const id = newObject[idName];
    const props = Object.keys(newObject).filter(value => value != idName);
    const queryString = props.map(value => `${value} = ?`).join(", ");
    const values = props.map(value => newObject[value]);
    const sql = `UPDATE ${collection} SET ${queryString} WHERE ${idName} = ?`;
    return query(sql, [...values, id]);

}

const remove = function (collection: CollectionName, id: number) {
    const sql = `DELETE FROM ${collection} WHERE ${collection}_id = ?`;
    return query(sql, [id]);
}

const find = function (query: string, params: any[]) {
    return dbWrapper((resolve, reject, db) => {
        db.get(query, params, (err, row) => {
            if (err) { reject(err) };
            resolve(row);
        })
    })
}

const query = function (query: string, params: any[]): Promise<RunResult> {
    return dbWrapper((resolve, reject, db) => {
        db.run(query, params, function (err) {
            if (err) { reject(err) }
            resolve({ lastID: this.lastID, changes: this.changes });
        })
    })
}

const getUser = function (username: string): Promise<Model.UserTable> {
    const sql = `SELECT * FROM user WHERE username = ?`;
    return find(sql, [username]);
}
export = {
    setURL,
    all,
    get,
    insert,
    update,
    remove,
    find,
    query,
    getUser
}