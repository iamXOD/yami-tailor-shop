//Imports
import { useDispatch } from "react-redux";
import { Action } from "redux";
import useFetch from "use-http";

type Return = (id: number) => Promise<void>;

export function useDelete(
    url: string,
    actionCreator: { (id: number): Action }
): Return {
    const { del, response } = useFetch(url);
    const dispatch = useDispatch();

    return async (id) => {
        await del(`${id}`);
        if (response.status === 204) {
            dispatch(actionCreator(id));
        }
    };
}
