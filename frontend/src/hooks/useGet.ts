//Imports
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//App Imports
import useFetch from "./useFetch";

//Types
import { Action } from "redux";
import { TODO } from "../types";
type Return = { loading: boolean, error?: Error };

export default function useGet(url: string,
    reduxActionCreator: { (item: TODO): Action }, mapper: TODO): Return {
    const { loading, data, error } = useFetch<TODO>(url);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            let newData = [...data];
            if (mapper) {
                newData = data.map(mapper);
            }
            dispatch(reduxActionCreator(newData));
        }
    }, [url, loading, error])

    return { loading, error };
}