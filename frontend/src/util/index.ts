//Types
import { Primitive } from "../types";

export function isValidToken(token: string | undefined): token is string {
    if (token && typeof token == "string" && token !== 'undefined' && token !== '') {
        return true;
    }
    return false;
}

export function removeTrailingSlash(url: string): string {
    return url.endsWith("/") ?
        url.substring(0, url.length - 1) :
        url;
}

export function isPrimitive(value: unknown): value is Primitive {
    const type = typeof value;
    return (type === "string" ||
        type === "boolean" ||
        type === "number" ||
        type === "symbol")
}

export function returnsInputProps(name: string): { id: string, name: string, label: string } {
    return {
        id: name, name,
        label: name.charAt(0)
            .toLocaleUpperCase()
            .concat(name.slice(1))
    };
}