//Imports
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

//App Imports
import { Action } from "redux";
import { api } from "../services";

//Types
import { Dispatch, SetStateAction } from "react";

export function useDelete(url: string, reduxActionCreator: { (id: number): Action }): Dispatch<SetStateAction<number | undefined>> {
    const [id, setID] = useState<number>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            api.getData(url + id)
                .then(() => dispatch(reduxActionCreator(id)))
        }

    }, [id]);

    return setID;
}