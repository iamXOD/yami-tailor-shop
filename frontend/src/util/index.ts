export function removeTrailingSlash(url: string): string {
    return url.endsWith("/") ? url.substring(0, url.length - 1) : url;
}

export type Primitive = string | boolean | number | symbol;

export function isPrimitive(value: unknown): value is Primitive {
    const type = typeof value;
    return (
        type === "string" ||
        type === "boolean" ||
        type === "number" ||
        type === "symbol"
    );
}
