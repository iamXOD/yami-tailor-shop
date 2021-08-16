// Imports
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "react-query";
// App Imports
import { useAxios } from "./useAxios";

type UseDeleteMutationOptions<E> = UseMutationOptions<number, E, void>;
type UseDeleteMutationResult<E> = UseMutationResult<number, E, void>;

export function useDeleteMutation<E = Error>(
    url: string,
    id: string,
    options?: UseDeleteMutationOptions<E>
): UseDeleteMutationResult<E> {
    const axios = useAxios();
    return useMutation(
        async () =>
            await axios.delete<void>(`${url}/${id}`).then((res) => res.status),
        { ...options }
    );
}
