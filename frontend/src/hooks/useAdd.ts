//Imports
import useFetch from "use-http";
//App Imports
import { Model } from "../store";

export function useAdd<T extends Model>(url: string): (item: T) => Promise<T> {
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
