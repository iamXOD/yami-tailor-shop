//Imports
import dotenv from "dotenv";

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

function removeTrailingSlash(url: string): string {
    return url.endsWith("/") ? url.substring(0, url.length - 1) : url;
}
