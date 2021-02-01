//App Imports
import config from "../config";
import { storage } from ".";

//Types
import { TODO } from "../types";

export const postData = (url: string, data: TODO): Promise<TODO> => {
    const body = typeof data === "string" ? data : JSON.stringify(data);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": body.length.toString(),
        },
        body
    }
    return XHR(url, addTokenIfLogged(options));
}

export const getData = function (url: string): Promise<TODO> {
    const options = {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }
    return XHR(url, addTokenIfLogged(options));
}

const XHR = (url: string, options: RequestInit): Promise<TODO> => {
    return fetch(config.url.api + url, options)
        .then((res: Response) => {
            if (res.ok) { return res.json() }
            return res.json()
                .then(({ error }) => { throw new Error(error) });
        })
}

function addTokenIfLogged(options: TODO): TODO {
    const token = storage.loadTOKEN();
    if (token) {
        return Object.assign(options, { headers: { ...options.headers, ["x-access-token"]: token } });
    }
    return options;
}