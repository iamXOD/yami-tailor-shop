//Imports
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

//App Imports
import { userLogout } from "../store/user/actions";
import { storage } from "../services";

//Types
type Return = [{ (): void }];

export default function useLogout(): Return {
    const [doLogout, setDoLogout] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (doLogout) {
            storage.removeTOKEN();
            dispatch(userLogout());
        }
    }, [doLogout])
    return [() => setDoLogout(true)];
}