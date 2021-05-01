//Imports
import useFetch from "use-http";

export function useDelete(url: string): (id: number) => Promise<void> {
    const { del } = useFetch(url);
    return async (id) => {
        await del(`/${id}`);
    };
}

export default useDelete;
