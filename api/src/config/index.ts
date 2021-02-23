//Imports
import dotenv from "dotenv";

//Types
export interface Config {
    host: string;
    port: number;
    databaseURL: string;
    saltRounds: number;
    secret: string;
    logDir: string;
}

dotenv.config();

const config: Config = {
    host: process.env.HOST || "localhost",
    port: +(process.env.PORT || 3001),
    databaseURL: process.env.DB_URL || "./src/db/storage.sqlite3",
    saltRounds: +(process.env.JWT_SALT_ROUNDS || 12),
    secret: process.env.JWT_SECRET || "my secret for the token",
    logDir: process.env.LOG_DIR || "log",
};

export default config;
