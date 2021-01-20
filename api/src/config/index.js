const config = {
    port: 3001,
    databaseURL: "./src/db/storage.sqlite3",
    saltRounds: 12,
    secret: "my secret for the token"
}
module.exports = config;