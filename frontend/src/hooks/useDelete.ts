//Imports
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
//App Imports
import api from "../services/api";

export function useDelete(
    url: string,
    actionCreator: { (id: number): Action }
): Dispatch<SetStateAction<number | undefined>> {
    const [id, setID] = useState<number>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            api.delete(url + id).then(() => dispatch(actionCreator(id)));
        }
    }, [id]);

    return setID;
}
