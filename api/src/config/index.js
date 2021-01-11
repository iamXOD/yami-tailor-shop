const config = {
    port: 3000,
    databaseURL: "./src/db/storage.sqlite3",
    saltRounds: 12,
    secret: "my secret for the token"
}
module.exports = config;