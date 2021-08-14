// Imports
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
// App Imports
import { useAxios } from "./useAxios";

type UseGetQueryOptions<T, E> = UseQueryOptions<T, E, T, [string, string]>;
type UseGetQueryResult<T, E> = UseQueryResult<T, E>;

export function useGet<T, E = Error>(
    url: string,
    id: string,
    options?: UseGetQueryOptions<T, E>
): UseGetQueryResult<T, E> {
    const axios = useAxios();
    return useQuery(
        [url, id],
        async ({ queryKey: [url, id] }) =>
            await axios.get<T>(`${url}/${id}`).then((res) => res.data),
        { ...options }
    );
}
