// Imports
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "react-query";
// App Imports
import { useAxios } from "./useAxios";

type UseAddMutationOptions<T, E> = UseMutationOptions<T, E, T>;
type UseAddMutationResult<T, E> = UseMutationResult<T, E, T>;

export function useAddMutation<T, E = Error>(
    url: string,
    options?: UseAddMutationOptions<T, E>
): UseAddMutationResult<T, E> {
    const axios = useAxios();
    return useMutation(
        (item: T) => axios.post<T>(url, item).then((res) => res.data),
        { ...options }
    );
}
