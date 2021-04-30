//Imports
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import useFetch from "use-http";

type Return = { loading: boolean; error?: Error };

export function useGet<I>(
    url: string,
    actionCreator: { (item: I): Action }
): Return {
    const { loading, error, response, data } = useFetch<I>(url, []);

    const dispatch = useDispatch();

    useEffect(() => {
        if (data && response.ok) {
            dispatch(actionCreator(data));
        }
    }, [data]);

    return { loading, error };
}

export default useGet;
