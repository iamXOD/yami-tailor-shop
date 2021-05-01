//Imports
import useFetch from "use-http";

export function useGet<T>(url: string): (id: number) => Promise<T> {
    const { response, get } = useFetch<T>(url);

    return async (id) => {
        const data = await get(`/${id}`);
        if (!response.ok) {
            throw response.data;
        }
        return data;
    };
}

export default useGet;
