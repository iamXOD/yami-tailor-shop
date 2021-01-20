const config: {
    port: number,
    databaseURL: string,
    saltRounds: number,
    secret: string
} = {
    port: 3001,
    databaseURL: "./src/db/storage.sqlite3",
    saltRounds: 12,
    secret: "my secret for the token"
}
export = config;