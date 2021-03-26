//Imports
import decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//App Imports
import api from "../services/api";
import { saveTOKEN } from "../services/storage";
import { User } from "../store/models";
import { userLogin } from "../store/user/actions";
import { isValidToken } from "../util";

type Return = {
    doLogin: { (username: string, password: string): void };
    error?: Error;
};

export default function useLogin(): Return {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<Error>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (username && password) {
            api.post("login", { username, password })
                .then(({ data: token }) => {
                    if (isValidToken(token)) {
                        saveTOKEN(token);
                        return decode<User>(token);
                    }
                    throw new Error("Invalid Token");
                })
                .then(({ username, admin }) =>
                    dispatch(userLogin(username, admin))
                )
                .catch((err) => setError(err));
        }
    }, [username, password]);
    function doLogin(username: string, password: string) {
        setUsername(username);
        setPassword(password);
    }

    return { doLogin, error };
}
