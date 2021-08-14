// Imports
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
// App Imports
import { useAxios } from "./useAxios";

type UseListQueryOptions<T, E> = UseQueryOptions<
    T[],
    E,
    T[],
    [string, number, number]
>;
type UseListQueryResult<T, E> = UseQueryResult<T[], E>;

export function useListQuery<T, E = Error>(
    url: string,
    page = 1,
    perPage = 5,
    options?: UseListQueryOptions<T, E>
): UseListQueryResult<T, E> {
    const axios = useAxios();
    return useQuery(
        [url, page, perPage],
        async function makeRequest({ queryKey: [url, page, perPage] }) {
            const fullURL = `${url}?page=${page}&perPage=${perPage}`;
            return await axios.get<T[]>(fullURL).then((res) => res.data);
        },
        { ...options }
    );
}
