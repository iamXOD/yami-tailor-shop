//Imports
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
//App Imports
import useFetch from "./useFetch";

type Return = { loading: boolean; error?: Error };

export default function useGet<I>(
    url: string,
    actionCreator: { (item: I): Action }
): Return {
    const { loading, data, error } = useFetch<I>(url);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(actionCreator(data));
        }
    }, [url, loading, error]);

    return { loading, error };
}
