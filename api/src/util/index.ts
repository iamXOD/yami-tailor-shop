export function stringify(item: Record<string, unknown>): string {
    return Object.keys(item)
        .filter((key) => isPrimitive(item[key]))
        .map((key) => `${key}: ${item[key]}`)
        .join(" and ");
}

export function isPrimitive(value: unknown): boolean {
    const type = typeof value;
    return (
        type === "string" ||
        type === "boolean" ||
        type === "number" ||
        type === "symbol"
    );
}
