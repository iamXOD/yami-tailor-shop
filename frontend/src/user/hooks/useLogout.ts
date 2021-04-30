//Imports
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//App Imports
import { removeTOKEN } from "../../services/storage";
import { userLogout } from "../store";

type Return = [{ (): void }];

export default function useLogout(): Return {
    const [doLogout, setDoLogout] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (doLogout) {
            removeTOKEN();
            dispatch(userLogout());
        }
    }, [doLogout]);
    return [() => setDoLogout(true)];
}
