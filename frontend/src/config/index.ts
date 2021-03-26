// Configurations for Frontend
import dotenv from "dotenv";

interface Config {
    NODE_ENV: string;
    API: string;
}

dotenv.config();

const config: Config = {
    NODE_ENV:
        process.env.NODE_ENV === "production" ? "production" : "development",
    API: process.env.REACT_APP_API || "/",
};

export default config;
