//Imports
import { omit } from "lodash";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import useFetch from "use-http";
//App Imports
import { Model } from "../store/models";

type Return<T> = (item: T) => Promise<void>;

export default function useAdd<I extends Model>(
    url: string,
    actionCreator: { (item: I): Action }
): Return<I> {
    const { post, response } = useFetch<I>(url);
    const dispatch = useDispatch();

    return async (item) => {
        const data = await post(omit<I>(item, "id"));

        if (response.ok) {
            dispatch(actionCreator(data));
        }
    };
}
