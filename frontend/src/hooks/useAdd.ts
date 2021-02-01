//Imports
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { omit } from "lodash";

//App Imports
import { Model } from "../store/models";
import { api } from "../services";

//Types
import { Dispatch, SetStateAction } from "react";

export default function useAdd<I extends Model>(url: string,
    reduxActionCreator: { (item: I): Action }): [(Dispatch<SetStateAction<I | undefined>>)] {
    const [item, setItem] = useState<I>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (item) {
            const itemWithoutID = omit<I>(item, "id");

            api.postData(url, itemWithoutID)
                .then(({ lastID }: { lastID: number }) => item.id = lastID)
                .then(() => dispatch(reduxActionCreator(item)));
        }
    }, [item, url]);
    return [setItem];
}