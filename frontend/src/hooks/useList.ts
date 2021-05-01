//Imports
import useFetch from "use-http";

type ReturnType<T> = {
    loading: boolean;
    error?: Error;
    data: T[];
};

export function useList<T>(url: string, page = 1, perPage = 5): ReturnType<T> {
    const { data = [], loading, error } = useFetch<T[]>(
        `${url}?page=${page}&perPage=${perPage}`,
        [url, page, perPage]
    );

    return { data, loading, error };
}
