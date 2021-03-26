//Imports
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
//App Imports
import api from "../services/api";
import { Model } from "../store/models";

type Return<I> = [Dispatch<SetStateAction<I | undefined>>];

export default function useUpdate<I extends Model>(
    url: string,
    reduxActionCreator: { (item: I): Action }
): Return<I> {
    const [newItem, setNewItem] = useState<I>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (newItem) {
            api.put(url, newItem).then(() =>
                dispatch(reduxActionCreator(newItem))
            );
        }
    }, [newItem, url]);
    return [setNewItem];
}
