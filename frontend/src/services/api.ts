import config from "../config";

export const postData = (url: string, data: any) => {
    const body = typeof data === "string" ? data : JSON.stringify(data);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": body.length.toString()
        },
        body
    }
    return XHR(url, options);
}

export const getData = function (url: string) {
    const options = {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }
    return XHR(url, options);
}

const XHR = (url: string, options: RequestInit): Promise<any> => {
    return fetch(config.url.api + url, options)
        .then((res: Response) => {
            if (res.ok) { return res.json() }
            else { return new Error("Network Failure") }
        })
}