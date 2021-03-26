//Imports
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
//App Imports
import api from "../services/api";

export default function useAdd<I>(
    url: string,
    reduxActionCreator: { (item: I): Action }
): [Dispatch<SetStateAction<I | undefined>>] {
    const [item, setItem] = useState<I>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (item) {
            api.post(url, item)
                .then(({ data }) => setItem(data))
                .then(() => dispatch(reduxActionCreator(item)));
        }
    }, [item, url]);
    return [setItem];
}
