//Imports
import { useDispatch } from "react-redux";
import { Action } from "redux";
import useFetch from "use-http";
//App Imports
import { Model } from "../store/models";

type Return<I> = (item: I) => Promise<void>;

export default function useUpdate<I extends Model>(
    url: string,
    actionCreator: { (item: I): Action }
): Return<I> {
    const { put, response } = useFetch(url);
    const dispatch = useDispatch();

    return async (item) => {
        const data = await put(item);

        if (response.ok) {
            dispatch(actionCreator(data));
        }
    };
}
