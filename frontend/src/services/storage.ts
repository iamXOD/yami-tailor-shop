export function save<T>(key: string, value: T): boolean {
    try {
        if (!localStorage) {
            return false;
        }
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
        return true;
    } catch (error) {
        return false;
    }
}

export function load<T>(key: string): T | undefined {
    try {
        if (!localStorage) {
            return;
        }
        const serializedState = localStorage.getItem(key);
        if (serializedState == null) {
            return;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
}

export function remove(key: string): boolean {
    try {
        if (!localStorage) {
            return false;
        }
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        return false;
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
