//Imports
import dotenv from "dotenv";

//Types
export interface Config {
    host: string;
    port: number;
    saltRounds: number;
    secret: string;
    logDir: string;
}

dotenv.config();

const config: Config = {
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT) || 3001,
    saltRounds: Number(process.env.JWT_SALT_ROUNDS) || 12,
    secret: process.env.JWT_SECRET || "my secret for the token",
    logDir: process.env.LOG_DIR || "log",
};

export default config;
