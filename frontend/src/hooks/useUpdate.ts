//Imports
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

//App Imports
import { api } from "../services";

//Types
import { Dispatch, SetStateAction } from "react";
import { Action } from "redux";
import { Model } from "../store/models";
type Return<I> = [Dispatch<SetStateAction<I | undefined>>];

export default function useUpdate<I extends Model>(url: string,
    reduxActionCreator: { (item: I): Action }): Return<I> {
    const [newItem, setNewItem] = useState<I>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (newItem) {
            api.postData(url, newItem)
                .then(() => dispatch(reduxActionCreator(newItem)));
        }
    }, [newItem, url]);
    return [setNewItem];
}