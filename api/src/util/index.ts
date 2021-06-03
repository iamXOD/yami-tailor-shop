export type Primitive = string | boolean | number | symbol;

export function stringify(item: Record<string, unknown>): string {
    return Object.keys(item)
        .filter((key) => isPrimitive(item[key]))
        .map((key) => `${key}: ${item[key]}`)
        .join(" and ");
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
