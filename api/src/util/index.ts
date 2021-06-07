export type Primitive = string | boolean | number | symbol;

export function stringify(item: any): string {
    return JSON.stringify(item).replace(/(\\)?"/g, "'");
}

export function isPrimitive(value: unknown): value is Primitive {
    const type = typeof value;
    return (
        type === "string" ||
        type === "boolean" ||
        type === "number" ||
        type === "symbol"
    );
}

export function castString(value: string): Primitive {
    if (value === "true") {
        return true;
    }
    if (value === "false") {
        return false;
    }
    if (value.match(/^d+$/)) {
        return Number(value);
    }
    return value;
}
