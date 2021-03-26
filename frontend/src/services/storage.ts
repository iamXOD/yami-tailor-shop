export function save<T>(key: string, value: T): boolean {
    if (!localStorage) {
        return false;
    }

    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
        return true;
    } catch (error) {
        throw new Error("Store serialization failed");
    }
}

export function load<T>(key: string): T | undefined {
    if (!localStorage) {
        return;
    }

    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState == null) {
            return;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        throw new Error("Store deserialization failed");
    }
}

export function remove(key: string): boolean {
    if (!localStorage) {
        return false;
    }
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        throw new Error("Store remove failed");
    }
}

export function saveTOKEN(value: string): boolean {
    return save<string>(TOKEN, value);
}

export function loadTOKEN(): string | undefined {
    return load<string>(TOKEN);
}

export function removeTOKEN(): boolean {
    return remove(TOKEN);
}

export const TOKEN = "TOKEN";

export default { save, load, remove, loadTOKEN, saveTOKEN, removeTOKEN, TOKEN };
