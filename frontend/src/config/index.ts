// Configurations for Frontend
import dotenv from "dotenv";
import { removeTrailingSlash } from "../util";

interface Config {
    NODE_ENV: string;
    API: string;
}

dotenv.config();

const config: Config = {
    NODE_ENV:
        process.env.NODE_ENV === "production" ? "production" : "development",
    API: removeTrailingSlash(process.env.REACT_APP_API || "/"),
};

export default config;
