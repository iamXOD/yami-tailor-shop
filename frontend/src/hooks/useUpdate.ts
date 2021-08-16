// Imports
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "react-query";
// App Imports
import { useAxios } from "./useAxios";

type UseUpdateMutationOptions<T, E> = UseMutationOptions<T, E, T>;
type UseUpdateMutationResult<T, E> = UseMutationResult<T, E, T>;

export function useUpdateMutation<T, E = Error>(
    url: string,
    id: string,
    options?: UseUpdateMutationOptions<T, E>
): UseUpdateMutationResult<T, E> {
    const axios = useAxios();
    return useMutation(
        async (item: T) =>
            await axios.put<T>(`${url}/${id}`, item).then((res) => res.data),
        { ...options }
    );
}
