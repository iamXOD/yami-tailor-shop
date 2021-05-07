//Imports
import useFetch from "use-http";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useUpdate<T extends Record<string, any>>(
    url: string
): (item: T) => Promise<T> {
    const { put, response } = useFetch<T>(url);

    return async (item) => {
        const data = await put(item);
        if (!response.ok) {
            throw response.data;
        }
        return data;
    };
}
export default useUpdate;
