//Imports
import useFetch from "use-http";
//App Imports
import { Model } from "../store";

export function useUpdate<T extends Model>(
    url: string
): (item: T) => Promise<T> {
    const { put, response } = useFetch(url);

    return async (item) => {
        const data = await put(item);
        if (!response.ok) {
            throw response.data;
        }
        return data;
    };
}
export default useUpdate;
