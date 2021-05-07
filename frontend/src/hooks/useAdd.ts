//Imports
import useFetch from "use-http";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAdd<T extends Record<string, any>>(
    url: string
): (item: T) => Promise<T> {
    const { post, response } = useFetch<T>(url);

    return async (item) => {
        const data = await post(item);
        if (!response.ok) {
            throw response.data;
        }
        return data;
    };
}

export default useAdd;
